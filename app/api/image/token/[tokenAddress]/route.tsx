import { NextRequest } from "next/server";
import { ImageResponse } from "next/og";
import { get } from "@vercel/edge-config";
import { TokenMetadata } from "@/lib/types";

function memecoinHome(tokenImage: string, tokenSymbol: string) {
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
        fontFamily: 'Trebuchet MS, sans-serif',
        padding: '40px',
      }}
    >
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex", flexDirection: "column", fontSize: '40px' }}>
          <div style={{ maxWidth: "200px"}}>
            {`Are you a ${tokenSymbol} OG?`}
          </div>
          <div style={{ maxWidth: "200px",  textDecoration: 'underline' }}>
            {`Prove it.`}
          </div>
        </div>
      </div>
        <img
          src={tokenImage}
          style={{ width: "150px", height: "150px", borderRadius: "100%", marginTop: '10px' }}
        />
    </div>
  );
}
async function getResponse(
  req: NextRequest,
  tokenAddress: string
): Promise<ImageResponse> {
  const tokenMetadata = (await get(tokenAddress)) as TokenMetadata;
  const image = memecoinHome(tokenMetadata.image, tokenMetadata.symbol);
  return new ImageResponse(image, { width: 500, height: 200 });
}
export async function GET(
  req: NextRequest,
  { params }: { params: { tokenAddress: string } }
): Promise<Response> {
  return getResponse(req, params.tokenAddress);
}

export const dynamic = "force-dynamic";
