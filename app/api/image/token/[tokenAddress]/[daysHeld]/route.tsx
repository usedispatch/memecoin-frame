import { TokenMetadata } from "@/lib/types";
import { get } from "@vercel/edge-config";
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
// App router includes @vercel/og.
// No need to install it.
// import backgroundImage from "../../../../../../assets/background.jpg";
export const runtime = "edge";

function memecoinHome(
  daysHeld: string,
  userHandle: string,
  userImage: string,
  tokenSymbol: string,
  tokenImage: string,
  backgroundImage: ArrayBuffer
) {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        fontSize: 36,
        fontWeight: 600,
      }}
    >
      <img
        src={backgroundImage as any}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: -1,
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ marginTop: 10, maxWidth: "200px", color: "#5e17eb" }}>
          {`I've held ${tokenSymbol} for ${daysHeld} days!`}
        </div>
        <img
          src={tokenImage}
          style={{ width: "125px", height: "125px", borderRadius: "100%" }}
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginRight: "auto",
          marginLeft: "16px",
          marginBottom: "8px",
        }}
      >
        <img
          src={userImage}
          style={{ width: "50px", height: "50px", borderRadius: "100%" }}
        />
        <div
          style={{
            fontSize: "14px",
            marginLeft: "4px",
            marginTop: "auto",
            marginBottom: "8px",
          }}
        >
          {`${userHandle}`}
        </div>
      </div>
    </div>
  );
}

export async function GET(
  req: NextRequest,
  { params }: { params: { daysHeld: string; tokenAddress: string } }
) {
  const did = req.nextUrl.searchParams.get("did") ?? "";

  // Make sure the font exists in the specified path:
  const fontData = await fetch(
    new URL("../../../../../../assets/HankenGrotesk-Bold.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  const imageData = await fetch(
    new URL(
      "../../../../../../assets/memecoinFrameBackground.png",
      import.meta.url
    )
  ).then((res) => res.arrayBuffer());

  const profileFetch = await fetch(
    `https://live.solarplex.xyz/xrpc/app.bsky.actor.getProfile?actor=${did}`
  );
  const profile = await profileFetch.json();
  const tokenMetadata = (await get(params.tokenAddress)) as TokenMetadata;
  const userName = profile.displayName ?? profile.handle;
  console.log(
    params.daysHeld,
    userName,
    profile.avatar,
    tokenMetadata.symbol,
    tokenMetadata.image
  );
  const image = memecoinHome(
    params.daysHeld,
    userName,
    profile.avatar,
    tokenMetadata.symbol,
    tokenMetadata.image,
    imageData
  );
  // console.log(image);
  return new ImageResponse(image, {
    width: 500,
    height: 200,
    fonts: [
      {
        name: "Arimo",
        data: fontData,
        weight: 600,
        style: "normal",
      },
    ],
  });
}
