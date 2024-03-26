import Image from "next/image";
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from "../config";
import { getFrameMetadata } from "@usedispatch/solarplex-frame-sdk";
import { MemecoinFrameCreateForm } from "@/components/MemecoinFrameCreateForm";

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Button 1',
    },
    {
      label: 'Txn',
      post_url: 'https://frame-tx.vercel.app/api',
      action: 'txn'
    },
  ],
  image: `${NEXT_PUBLIC_URL}/api/image`,
  post_url: `${NEXT_PUBLIC_URL}/api/frame`,
});


export const metadata: Metadata = {
  title: 'Memecoin Madness',
  description: 'Find out if you\'re a memecoin OG!',
  openGraph: {
    title: 'Memecoin Madness',
    description: 'Find out if you\'re a memecoin OG!',
    images: [`${NEXT_PUBLIC_URL}/api/image`],
  },
  other: {
    ...frameMetadata,
  },
};


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <MemecoinFrameCreateForm />
   
    </main>
  );
}
