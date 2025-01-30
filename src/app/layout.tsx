import type { Metadata } from "next";
import { GoogleAnalytics } from '@next/third-parties/google';
import { Inter } from "next/font/google";
import "@styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "株式会社半夏HOME’S",
  description: "株式会社半夏HOME’S is a real estate company",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <GoogleAnalytics gaId="G-C920XF0P17" />
    </html>
  );
}
