import { NextRequest } from "next/server";
import { ImageResponse } from "next/og";
import { get } from "@vercel/edge-config";
import { TokenMetadata } from "@/lib/types";

function memecoinHome(
  tokenImage: string,
  tokenSymbol: string,
  backgroundImage: ArrayBuffer
) {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        fontSize: 32,
        fontWeight: 800,
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
          padding: "50px",
          justifyContent: "space-between",
          marginBottom: "16px"
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", fontSize: "36px", color: "#5e17eb" }}
        >
          <div style={{ maxWidth: "200px" }}>
            {`Are you a ${tokenSymbol} OG?`}
          </div>
          <div style={{ maxWidth: "200px", textDecoration: "underline" }}>
            {`Prove it.`}
          </div>
        </div>
        <div style={{display: "flex", marginLeft: "60px"}}>
          <img
            src={tokenImage}
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "100%",
              marginTop: "10px",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export async function GET(
  req: NextRequest,
  { params }: { params: { tokenAddress: string } }
): Promise<Response> {
  // return getResponse(req, params.tokenAddress);
  const tokenAddress = params.tokenAddress;
  const tokenMetadata = (await get(tokenAddress)) as TokenMetadata;
  // Make sure the font exists in the specified path:
  const fontData = await fetch(
    new URL("../../../../../assets/HankenGrotesk-Bold.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  const imageData = await fetch(
    new URL(
      "../../../../../assets/memecoinFrameBackground.png",
      import.meta.url
    )
  ).then((res) => res.arrayBuffer());
  const image = memecoinHome(
    tokenMetadata.image,
    tokenMetadata.symbol,
    imageData
  );

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

// export const dynamic = "force-dynamic";
export const runtime = "edge";
