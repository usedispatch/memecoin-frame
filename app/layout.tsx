import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { NEXT_PUBLIC_URL } from "@/config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: 'Memecoin Madness',
  description: 'Find out if you\'re a memecoin OG!',
  openGraph: {
    title: 'Memecoin Madness',
    description: 'Find out if you\'re a memecoin OG!',
    images: [`${NEXT_PUBLIC_URL}/api/image`],
  }
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
