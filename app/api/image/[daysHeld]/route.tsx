import { NextRequest } from "next/server";
import { ImageResponse } from "next/og";

function memecoinHome(daysHeld: string, handle?: string) {
  return (
<div
  style={{
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    fontSize: 32,
    fontWeight: 600,
  }}
>
  <svg
    width="75"
    viewBox="0 0 75 65"
    fill="#000"
    style={{ margin: '0 75px' }}
  >
    <path d="M37.59.25l36.95 64H.64l36.95-64z"></path>
  </svg>
  <div>{`${handle}`}</div>
  <div style={{ marginTop: 10 }}>{`held dogwifhat for ${daysHeld} days`}</div>
</div>

  );
}
async function getResponse(
  req: NextRequest,
  daysHeld: string,
  did?: string
): Promise<ImageResponse> {
  const profileFetch = await fetch(`https://live.solarplex.xyz/xrpc/app.bsky.actor.getProfile?actor=${did}`)
  const profile = await profileFetch.json()
  const image = memecoinHome(daysHeld, profile.handle);
  return new ImageResponse(image, { width: 500, height: 200 });
}
export async function GET(
  req: NextRequest,
  { params }: { params: { daysHeld: string } }
): Promise<Response> {
  const did  = req.nextUrl.searchParams.get('did') ?? '';
  return getResponse(req, params.daysHeld, did);
}

export const dynamic = "force-dynamic";
