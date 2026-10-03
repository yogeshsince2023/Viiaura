import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { EnquiryModal } from "@/components/EnquiryModal";
import { MobileBottomBar } from "@/components/MobileBottomBar";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BackToTop } from "@/components/BackToTop";
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
          {/* Glowing Top Scroll Progress Bar */}
          <ScrollProgress />
          <Header />
          <main className="min-h-screen pb-20 lg:pb-0">{children}</main>
          <Footer />
          <EnquiryModal />
          <MobileBottomBar />
          {/* Floating Back to Top with Candle Flame Glow */}
          <BackToTop />
        </EnquiryProvider>
      </body>
    </html>
  );
}
