import Image from "next/image";
import type { Metadata, ResolvingMetadata } from "next";
import { NEXT_PUBLIC_URL } from "@/config";
import { getFrameMetadata } from "@usedispatch/solarplex-frame-sdk";
import { MemecoinFrameCreateForm } from "@/components/MemecoinFrameCreateForm";
import { decryptNumberWithKey } from "../../lib/utils";

type Props = {
  params: { tokenAddress: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const did = props.searchParams.did as string;
  const numHash = props.searchParams.num as string;
  const frameMetadata = getFrameMetadata({
    buttons: [
      {
        label: "Check your status!",
      },
    ],
    image:
      did && numHash
        ? `${NEXT_PUBLIC_URL}/api/image/token/${props.params.tokenAddress}/${decryptNumberWithKey(
          numHash,
          process.env.NUMBER_SALT as string
        )}?did=${did}`
        : `${NEXT_PUBLIC_URL}/api/image/token/${props.params.tokenAddress}?did=${did}`,
    post_url: `${NEXT_PUBLIC_URL}/api/postFrameAction/${props.params.tokenAddress}`,
  });
  const metadata: Metadata = {
    title: "Memecoin Madness",
    description: "Find out if you're a memecoin OG!",
    openGraph: {
      title: "Memecoin Madness",
      description: "Find out if you're a memecoin OG!",
      images: [
        `${NEXT_PUBLIC_URL}/api/image/token/${props.params.tokenAddress}?did=${did}`,
      ],
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
