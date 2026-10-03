import React from "react";
import Link from "next/link";
import Image from "next/image";
import { COLLECTIONS } from "@/data/collections";
import { ArrowRight, Sparkles } from "lucide-react";

export const metadata = {
  title: "Curated Collections | VIIAURA Candle Art",
  description: "Browse Viiaura's curated candle series: Sculptural, Minimalist Vessels, Festive, and Gifting hampers.",
};

export default function CollectionsPage() {
  return (
    <div className="pt-24 sm:pt-28 pb-24 bg-[#FAF7F2] min-h-screen animate-page-enter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="border-b border-[#E7E2DA] pb-8 space-y-3">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#78716C] font-bold">
            <span>Showroom</span>
            <span>/</span>
            <span className="text-[#C86446]">Collections</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1C1917] tracking-tight">
            Curated Collections
          </h1>
          <p className="text-sm sm:text-base text-[#57534E] max-w-xl font-normal pt-1">
            Each collection explores a distinct dialogue between sculptural silhouette, candle light geometry, and interior presence.
          </p>
        </div>

        {/* Collections Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {COLLECTIONS.map((col, index) => (
            <Link
              key={col.id}
              href={`/collections/${col.slug}`}
              className="group bg-white border border-[#E7E2DA] rounded-sm overflow-hidden hover:shadow-2xl hover:border-[#D4AF7A] transition-all duration-500 flex flex-col"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F3EFEA]">
                <Image
                  src={col.coverImage}
                  alt={col.name}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-65 transition-opacity" />
                <span className="absolute top-4 left-4 text-xs uppercase tracking-widest text-[#FAF7F2] font-mono font-bold px-3 py-1 bg-black/50 backdrop-blur-md rounded-sm">
                  Series 0{index + 1}
                </span>
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="font-display text-xs text-[#D4AF7A] uppercase tracking-wider font-bold block pb-1">
                    {col.featuredDesignsCount} Candle Designs
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white group-hover:text-[#D4AF7A] transition-colors leading-tight">
                    {col.name}
                  </h2>
                </div>
              </div>

              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 gap-5">
                <div className="space-y-2">
                  <p className="font-serif italic text-base font-bold text-[#C86446]">
                    “{col.tagline}”
                  </p>
                  <p className="text-sm text-[#44403C] leading-relaxed font-normal">
                    {col.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E7E2DA] flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest font-extrabold text-[#1C1917] group-hover:text-[#C86446] transition-colors inline-flex items-center gap-2">
                    Browse Collection <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </span>
                  <span className="font-display text-xs text-[#78716C] uppercase font-bold">Hand-Poured</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bespoke Collection Banner */}
        <div className="p-8 sm:p-12 bg-[#161413] text-[#FAF7F2] rounded-sm flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-[#2A2522]">
          <div className="space-y-2.5 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-display text-[#D4AF7A] uppercase tracking-widest font-bold">
              <Sparkles className="w-4 h-4" /> Private Commissions
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#FAF7F2]">
              Commission a Custom Collection
            </h3>
            <p className="text-sm text-[#D8D1C7] max-w-md font-normal">
              Collaborate directly with our studio to curate a bespoke candle suite for weddings, hotel interiors, or private gifting.
            </p>
          </div>
          <a
            href="https://wa.me/919876543210?text=Hi%20Viiaura%2C%20I%20am%20interested%20in%20commissioning%20a%20custom%20candle%20collection."
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-[#FAF7F2] hover:bg-[#D4AF7A] text-[#161413] text-xs uppercase tracking-[0.2em] font-extrabold rounded-sm transition-all flex-shrink-0 min-h-[48px] flex items-center justify-center shadow-lg"
          >
            WhatsApp Consultation
          </a>
        </div>
      </div>
    </div>
  );
}
