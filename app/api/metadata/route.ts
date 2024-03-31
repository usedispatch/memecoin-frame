import { NextRequest, NextResponse } from "next/server";
import { get } from '@vercel/edge-config';

async function getResponse(req: NextRequest): Promise<NextResponse> {
    const metadata = await get('EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm');
    console.log(metadata);
    return new NextResponse(JSON.stringify(metadata));
  }


export async function GET(req: NextRequest): Promise<Response> {
    return getResponse(req);
  }
  
  export const dynamic = 'force-dynamic';