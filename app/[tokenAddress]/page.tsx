import Image from "next/image";
import type { Metadata, ResolvingMetadata } from 'next';
import { NEXT_PUBLIC_URL } from "@/config";
import { getFrameMetadata } from "@usedispatch/solarplex-frame-sdk";
import { MemecoinFrameCreateForm } from "@/components/MemecoinFrameCreateForm";





type Props = {
  params: { tokenAddress: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
 
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const did  = searchParams.did as string;
    const frameMetadata = getFrameMetadata({
      buttons: [
        {
          label: 'Check your status!',
        },
      ],
      image: `${NEXT_PUBLIC_URL}/api/image/token/${params.tokenAddress}?did=${did}`,
      post_url: `${NEXT_PUBLIC_URL}/api/postFrameAction/${params.tokenAddress}`,
    });
  const metadata: Metadata = {
    title: 'Memecoin Madness',
    description: 'Find out if you\'re a memecoin OG!',
    openGraph: {
      title: 'Memecoin Madness',
      description: 'Find out if you\'re a memecoin OG!',
      images: [`${NEXT_PUBLIC_URL}/api/image/token/${params.tokenAddress}?did=${did}`],
    },
    other: {
      ...frameMetadata,
    },
  };
  return metadata;
}


export default function Home({ params }: { params: { tokenAddress: string } }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <MemecoinFrameCreateForm />
   
    </main>
  );
}
