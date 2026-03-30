import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vishal Singh Rana — AI Product Manager",
  description:
    "AI Product Manager with 4+ years of ownership over a 1M+ user platform. Shipping intelligent products at the intersection of strategy, execution, and technical depth.",
  keywords: [
    "AI Product Manager",
    "Vishal Singh Rana",
    "Product Manager",
    "LLM Products",
  ],
  authors: [{ name: "Vishal Singh Rana" }],
  openGraph: {
    title: "Vishal Singh Rana — AI Product Manager",
    description: "Built for Scale. Shipping AI that actually gets used.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
