import {
  FrameRequest,
  getFrameMessage,
  getFrameHtmlResponse,
} from "@usedispatch/solarplex-frame-sdk";
import { NextRequest, NextResponse } from "next/server";
import { NEXT_PUBLIC_URL } from "../../../../config";
import * as solana from "@solana/web3.js";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import { encryptNumberWithKey } from "@/lib/utils";
import { get } from '@vercel/edge-config'
import { TokenMetadata } from "@/lib/types";

const rpcUrl = process.env.MAINNET_RPC_URL ?? "";

async function getResponse(
  req: NextRequest,
  tokenAddress: string
): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  const TOKEN_ADDRESS = new solana.PublicKey(tokenAddress);
  const { message } = await getFrameMessage(body);
  const connection = new solana.Connection(rpcUrl);
  // const message = body;
  let text: string = "default";
  try {
    switch (message?.button) {
      case 1:
        if (!body?.untrustedData?.connectedWallet) {
          return new NextResponse("No connected wallet found");
        }
        const tokenMetadata: TokenMetadata = await get(tokenAddress) as any;
        const userTokenAccount = await getAssociatedTokenAddress(
          TOKEN_ADDRESS,
          new solana.PublicKey(
            body?.untrustedData.connectedWallet ??
              body?.untrustedData.connectedWallet
          )
        );
        const signaturesForAsset = await connection.getSignaturesForAddress(
          userTokenAccount
        );
        const parsedSignatures = await connection.getParsedTransactions(
          signaturesForAsset.map((s) => s.signature),
          { maxSupportedTransactionVersion: 2 }
        );
        const successfulTransactions = parsedSignatures.filter(
          (s) => s?.meta?.err === null
        );
        let firstTimestamp =
          successfulTransactions[successfulTransactions.length - 1]?.blockTime;
        if (!firstTimestamp) {
          firstTimestamp = Date.now() / 1000;
        }
        const currentTimestamp = Date.now() / 1000;
        const post = body.untrustedData.itemUri;
        const timeDifference = currentTimestamp - firstTimestamp;
        const daysHeld = Math.floor(timeDifference / (60 * 60 * 24));
        const frameResponse = getFrameHtmlResponse({
          buttons: [
            {
              label: `Share your status!`,
              action: "share",
              text: `I've held ${tokenMetadata.symbol} for ${daysHeld} days! Check your status here: 
              \n \n
              ${NEXT_PUBLIC_URL}/${tokenAddress}?did=${
                body?.untrustedData?.did
              }&num=${encryptNumberWithKey(
                daysHeld.toString(),
                process.env.NUMBER_SALT as string
              )}&post=${post?.split('/').pop()} 
              
              \n \n
              `,
            },
          ],
          image: `${NEXT_PUBLIC_URL}/api/image/token/${tokenAddress}/${daysHeld}?did=${body?.untrustedData?.did}`,
          post_url: `${NEXT_PUBLIC_URL}/api/frame`,
          title: "Memecoin Madness",
        });
        return new NextResponse(frameResponse);
      default:
        text = "Home base of this frame!";
        return new NextResponse(
          getFrameHtmlResponse({
            buttons: [
              {
                label: `🌲 Text: ${text}`,
              },
            ],
            image: `${NEXT_PUBLIC_URL}/park-2.png`,
            post_url: `${NEXT_PUBLIC_URL}/api/frame`,
            title: "Memecoin Madness",
          })
        );
    }
  } catch (error) {
    console.error("Error in frame request:", error);
    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            label: `🌲 Text: ${text}`,
          },
        ],
        image: `${NEXT_PUBLIC_URL}/park-2.png`,
        post_url: `${NEXT_PUBLIC_URL}/api/frame`,
        title: "An error occurred!",
      })
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { tokenAddress: string } }
): Promise<Response> {
  return getResponse(req, params.tokenAddress);
}

export const dynamic = "force-dynamic";
