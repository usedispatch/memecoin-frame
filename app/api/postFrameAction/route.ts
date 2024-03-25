
import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@usedispatch/solarplex-frame-sdk';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../../config';
import * as solana from '@solana/web3.js';
import { getAssociatedTokenAddress } from '@solana/spl-token';

const rpcUrl = process.env.MAINNET_RPC_URL ?? '';
const TOKEN_ADDRESS = new solana.PublicKey('EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm')
const USER_ADDRESS = new solana.PublicKey('FsSigi7AjKtFmWA4iJMfEqaSNr4h5h6JiiBoSWNJonHx')

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  const {message} = await getFrameMessage(body);
  const connection = new solana.Connection(rpcUrl)
  // const message = body;
  let text: string = 'default'
  switch (message?.button) {
    case 1: 
      console.log('Button 1 clicked!', message)
      const userTokenAccount = await getAssociatedTokenAddress(TOKEN_ADDRESS, USER_ADDRESS)
      const signaturesForAsset = await connection.getSignaturesForAddress(userTokenAccount)
      const parsedSignatures = await connection.getParsedTransactions(signaturesForAsset.map(s => s.signature), {maxSupportedTransactionVersion: 2})
      const successfulTransactions = parsedSignatures.filter(s => s?.meta?.err === null)
      const firstTimestamp = successfulTransactions[successfulTransactions.length - 1]?.blockTime
      if (!firstTimestamp) {
        return new NextResponse('No successful transaction found')
      }
      const currentTimestamp = Date.now() / 1000

      const timeDifference = currentTimestamp - firstTimestamp
      const daysHeld = Math.floor(timeDifference / (60 * 60 * 24))
      return new NextResponse(JSON.stringify({daysHeld}))
    default: 
      text = 'Home base of this frame!'    
      return new NextResponse(
        getFrameHtmlResponse({
          buttons: [
            {
              label: `🌲 Text: ${text}`,
            },
          ],
          image: `${NEXT_PUBLIC_URL}/park-2.png`,
          post_url: `${NEXT_PUBLIC_URL}/api/frame`,
        }),
      );
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
