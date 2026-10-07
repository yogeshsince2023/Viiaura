import type { Metadata } from "next";
import "./globals.css";
import { StorefrontChrome } from "@/components/StorefrontChrome";
import { EnquiryProvider } from "@/context/EnquiryContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://viiaura.com"),
  title: "VIIAURA — Candle Art | Handcrafted Sculptural Candles & Digital Showroom",
  description:
    "Discover handcrafted sculptural candles and artisanal objects designed for modern interiors. Browse collections, view bespoke specifications, and enquire directly via WhatsApp.",
  keywords: [
    "sculptural candles",
    "handcrafted candles",
    "candle art",
    "interior decor",
    "beeswax candles",
    "festive candle gifts",
    "Viiaura",
  ],
  openGraph: {
    title: "VIIAURA — Candle Art | Handcrafted Sculptural Candles",
    description: "Inspired by Light, Crafted by Hand. Premium digital catalogue & enquiry showroom.",
    images: [{ url: "/images/hero-lit.jpg", width: 1024, height: 1024 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased text-[#1C1917] bg-[#FAF7F2] text-[15px] sm:text-[16px] leading-relaxed selection:bg-[#F7EDE8] selection:text-[#C86446]">
        <EnquiryProvider>
          <StorefrontChrome>{children}</StorefrontChrome>
        </EnquiryProvider>
      </body>
    </html>
  );
}
