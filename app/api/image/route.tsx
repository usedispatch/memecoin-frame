
import { NextRequest } from "next/server";
import { ImageResponse } from 'next/og'

const memecoinHome = (
  <div> 
    Hello world!
  </div>
)
async function getResponse(req: NextRequest): Promise<ImageResponse> {
  return new ImageResponse(memecoinHome, { width: 500, height: 200});
}
export async function GET(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
