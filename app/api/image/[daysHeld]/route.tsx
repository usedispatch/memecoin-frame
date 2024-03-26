import { NextRequest } from "next/server";
import { ImageResponse } from "next/og";

function memecoinHome(daysHeld: string) {
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
  <div style={{ marginTop: 40 }}>{`Token held for ${daysHeld} days`}</div>
</div>

  );
}
async function getResponse(
  req: NextRequest,
  daysHeld: string
): Promise<ImageResponse> {
  const image = memecoinHome(daysHeld);
  return new ImageResponse(image, { width: 500, height: 200 });
}
export async function GET(
  req: NextRequest,
  { params }: { params: { daysHeld: string } }
): Promise<Response> {
  return getResponse(req, params.daysHeld);
}

export const dynamic = "force-dynamic";
