"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useEnquiry } from "@/context/EnquiryContext";
import { MessageCircle, Sparkles } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  category: "spaces" | "dining" | "festive" | "craft";
  categoryLabel: string;
  image: string;
  aspect: string;
  note: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g-01",
    title: "Afternoon Light on Solstice Swirl",
    category: "spaces",
    categoryLabel: "Living Spaces",
    image: "/images/sculptural-candle.jpg",
    aspect: "aspect-[4/5]",
    note: "Raw natural beeswax on a blackened stone console, catching raking natural window sunlight.",
  },
  {
    id: "g-02",
    title: "Banquet Suite Centerpiece",
    category: "dining",
    categoryLabel: "Dining Settings",
    image: "/images/ivory-candles.jpg",
    aspect: "aspect-[16/10]",
    note: "Layering the Roman Arch with Ionic Columns across hand-thrown ceramic serving dishes.",
  },
  {
    id: "g-03",
    title: "Twilight Luminescence",
    category: "spaces",
    categoryLabel: "Living Spaces",
    image: "/images/strong-shadows.jpg",
    aspect: "aspect-[1/1]",
    note: "The warm golden halo of a slow evening burn, casting ambient warmth across plaster walls.",
  },
  {
    id: "g-04",
    title: "Diya Dipped Festive Urli Arrangement",
    category: "festive",
    categoryLabel: "Festive & Celebrations",
    image: "/images/marigold-candle.webp",
    aspect: "aspect-[4/5]",
    note: "Festive gold-foiled votives floating alongside jasmine blossoms for holiday welcoming.",
  },
  {
    id: "g-05",
    title: "Atelier Pour & Temperature Precision",
    category: "craft",
    categoryLabel: "Atelier Craft",
    image: "/images/handmade-candle.jpg",
    aspect: "aspect-[1/1]",
    note: "Inspecting surface tension and seam-free demoulding before wick centering.",
  },
  {
    id: "g-06",
    title: "Bespoke Linen Hamper Presentation",
    category: "festive",
    categoryLabel: "Festive & Celebrations",
    image: "/images/candle-still-life.jpg",
    aspect: "aspect-[16/10]",
    note: "Handcrafted candles packaged with raw linen ribbons, match strikers, and brass snuffers.",
  },
];

export default function GalleryPage() {
  const { openEnquiry } = useEnquiry();
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredItems =
    activeTab === "all" ? GALLERY_ITEMS : GALLERY_ITEMS.filter((item) => item.category === activeTab);

  return (
    <div className="pt-24 sm:pt-28 pb-24 bg-[#FAF7F2] min-h-screen animate-page-enter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="border-b border-[#E7E2DA] pb-8 space-y-3">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#78716C] font-bold">
            <span>Inspiration</span>
            <span>/</span>
            <span className="text-[#C86446]">Styling Gallery</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1C1917] tracking-tight">
            Moments of Light & Living
          </h1>
          <p className="text-sm sm:text-base text-[#57534E] max-w-xl font-normal pt-1">
            A visual chronicle of Viiaura candles styled in architectural spaces, intimate dinner gatherings, and festive celebrations.
          </p>

          {/* Filter Tabs with large click targets */}
          <div className="flex flex-wrap gap-2.5 pt-4">
            {[
              { id: "all", label: "All Inspiration" },
              { id: "spaces", label: "Living Spaces" },
              { id: "dining", label: "Dining Tablescapes" },
              { id: "festive", label: "Festive & Gifting" },
              { id: "craft", label: "Atelier Craft" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-3 rounded-sm text-xs sm:text-sm uppercase tracking-wider font-bold transition-all min-h-[44px] cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-[#1C1917] text-[#FAF7F2] shadow-md"
                    : "bg-white text-[#44403C] border border-[#E7E2DA] hover:bg-[#FAF7F2]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetric Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8 items-start">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white border border-[#E7E2DA] rounded-sm overflow-hidden hover:shadow-xl hover:border-[#D4AF7A] transition-all duration-500 shadow-sm"
            >
              <div className={`relative ${item.aspect} w-full overflow-hidden bg-[#F3EFEA]`}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-104 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute top-3.5 left-3.5">
                  <span className="px-3 py-1.5 text-xs uppercase tracking-wider font-bold bg-white/95 backdrop-blur-md text-[#1C1917] border border-[#E7E2DA] rounded-sm shadow-sm">
                    {item.categoryLabel}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-3">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917] leading-snug">{item.title}</h3>
                <p className="text-sm text-[#44403C] leading-relaxed">{item.note}</p>
                <div className="pt-3 border-t border-[#E7E2DA] flex items-center justify-between">
                  <button
                    onClick={() => openEnquiry(null)}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#C86446] hover:text-[#B25338] font-extrabold cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" /> Enquire Styling
                  </button>
                  <Link href="/products" className="text-xs uppercase tracking-wider font-bold text-[#78716C] hover:text-[#1C1917]">
                    In Catalogue →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Styling Consultation Callout */}
        <div className="p-8 sm:p-12 bg-[#F3EFEA] border border-[#E7E2DA] rounded-sm flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#1C1917]">
              Need guidance styling your interior or celebration banquet?
            </h3>
            <p className="text-sm text-[#57534E]">
              Share your room photo or event moodboard with our studio on WhatsApp for customized candle pairings.
            </p>
          </div>
          <a
            href="https://wa.me/919876543210?text=Hi%20Viiaura%2C%20I%20would%20like%20styling%20advice%20for%20my%20space%20or%20event."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#1C1917] hover:bg-[#C86446] text-[#FAF7F2] text-xs uppercase tracking-widest font-extrabold rounded-sm transition-all flex-shrink-0 min-h-[48px] shadow-md"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            Consult on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
