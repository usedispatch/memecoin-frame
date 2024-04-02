import Image from "next/image";
import type { Metadata, ResolvingMetadata } from "next";
import { NEXT_PUBLIC_URL } from "@/config";
import { getFrameMetadata } from "@usedispatch/solarplex-frame-sdk";
import { decryptNumberWithKey } from "../../lib/utils";
import SolarplexRedirect from "./redirect";

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
  const image =
    did && numHash
      ? `${NEXT_PUBLIC_URL}/api/image/token/${
          props.params.tokenAddress
        }/${decryptNumberWithKey(
          numHash,
          process.env.NUMBER_SALT as string
        )}?did=${did}`
      : `${NEXT_PUBLIC_URL}/api/image/token/${props.params.tokenAddress}`;
  const frameMetadata = getFrameMetadata({
    buttons: [
      {
        label: "Check your status!",
      },
    ],
    image: image,
    post_url: `${NEXT_PUBLIC_URL}/api/postFrameAction/${props.params.tokenAddress}`,
  });
  const metadata: Metadata = {
    title: "Memecoin Madness",
    description: "Find out if you're a memecoin OG!",
    openGraph: {
      title: "Memecoin Madness",
      description: "Find out if you're a memecoin OG!",
      images: [image],
    },
    other: {
      ...frameMetadata,
    },
  };
  return metadata;
}

export default function Home(params: Props) {
  const did = params.searchParams.did as string;
  return (
    <SolarplexRedirect did={did} post={params.searchParams.post as string} />
  );
}
