import { NextRequest } from "next/server";
import { ImageResponse } from "next/og";
import { get } from "@vercel/edge-config";
import { TokenMetadata } from "@/lib/types";

function memecoinHome(
  daysHeld: string,
  userHandle: string,
  userImage: string,
  tokenSymbol: string,
  tokenImage: string
) {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        fontSize: 32,
        fontWeight: 600,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{ marginTop: 10, maxWidth: "200px" }}
        >{`I've held ${tokenSymbol} for ${daysHeld} days!`}</div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={userImage}
            style={{ width: "50px", height: "50px", borderRadius: "100%" }}
          />
          <div
            style={{ fontSize: "18px", marginLeft: "8px" }}
          >{`${userHandle}`}</div>
        </div>
      </div>
      <img
        src={tokenImage}
        style={{ width: "150px", height: "150px", borderRadius: "100%" }}
      />
    </div>
  );
}
async function getResponse(
  req: NextRequest,
  daysHeld: string,
  did: string,
  tokenAddress: string
): Promise<ImageResponse> {
  const profileFetch = await fetch(
    `https://live.solarplex.xyz/xrpc/app.bsky.actor.getProfile?actor=${did}`
  );
  const profile = await profileFetch.json();
  const tokenMetadata = (await get(tokenAddress)) as TokenMetadata;
  const userName = profile.displayName ?? profile.handle;
  console.log(
    daysHeld,
    userName,
    profile.avatar,
    tokenMetadata.symbol,
    tokenMetadata.image
  );
  const image = memecoinHome(
    daysHeld,
    userName,
    profile.avatar,
    tokenMetadata.symbol,
    tokenMetadata.image
  );
  // console.log(image);
  return new ImageResponse(image, { width: 500, height: 200 });
}
export async function GET(
  req: NextRequest,
  { params }: { params: { daysHeld: string; tokenAddress: string } }
): Promise<Response> {
  const did = req.nextUrl.searchParams.get("did") ?? "";
  return getResponse(req, params.daysHeld, did, params.tokenAddress);
}

export const dynamic = "force-dynamic";
