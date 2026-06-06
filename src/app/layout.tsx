import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dream Home AI — Discover Your Perfect Home Personality | Snaphomz",
  description:
    "Take a 2-minute AI-powered quiz to discover your home personality, see AI-generated room visuals, and get matched with real property listings that fit your unique lifestyle.",
  keywords: [
    "dream home",
    "home personality quiz",
    "AI home design",
    "property matching",
    "Snaphomz",
    "real estate",
    "home finder",
  ],
  openGraph: {
    title: "Dream Home AI — Discover Your Perfect Home Personality",
    description:
      "Take a 2-minute AI quiz to discover your home personality and get matched with real listings.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dream Home AI — Discover Your Perfect Home Personality",
    description:
      "Take a 2-minute AI quiz to discover your home personality and get matched with real listings.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark antialiased`}>
      <body className="min-h-screen bg-[#0B1020] text-white font-sans">
        {children}
      </body>
    </html>
  );
}
