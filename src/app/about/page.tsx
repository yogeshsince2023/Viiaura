import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, HeartHandshake, Eye, Award } from "lucide-react";

export const metadata = {
  title: "About Viiaura | Atelier Philosophy & Handcrafted Candle Art",
  description:
    "Learn about Viiaura: our slow artisanal wax craft, architectural design principles, and vision for contemporary handcrafted lifestyle pieces.",
};

export default function AboutPage() {
  return (
    <div className="pt-24 sm:pt-28 pb-24 bg-[#FAF7F2] min-h-screen animate-page-enter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        {/* Header */}
        <div className="max-w-4xl space-y-5 border-b border-[#E7E2DA] pb-10">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#78716C] font-bold">
            <span>Atelier</span>
            <span>/</span>
            <span className="text-[#C86446]">Our Philosophy</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#1C1917] leading-[1.12] tracking-tight">
            Honouring the Ancient Flame through Contemporary Sculptural Form.
          </h1>
          <p className="font-serif italic text-xl sm:text-2xl text-[#C86446] font-bold">
            “Inspired by Light, Crafted by Hand”
          </p>
        </div>

        {/* Hero Visual Frame */}
        <div className="relative aspect-[21/9] sm:aspect-[24/9] w-full rounded-sm overflow-hidden border-2 border-[#E7E2DA] shadow-2xl">
          <Image
            src="/images/collection-editorial.jpg"
            alt="Viiaura candle studio craftsmanship"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute bottom-8 left-8 right-8 text-white max-w-xl space-y-2">
            <span className="font-display text-xs uppercase tracking-[0.25em] text-[#D4AF7A] font-bold">
              Studio Snapshot
            </span>
            <p className="font-serif text-xl sm:text-2xl font-bold">
              Hand-poured in Delhi atelier with natural botanical waxes.
            </p>
          </div>
        </div>

        {/* Two-Column Story Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5 space-y-4">
            <span className="font-display text-xs uppercase tracking-[0.25em] text-[#C86446] font-bold block">
              The Genesis
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#1C1917] leading-tight">
              Why We Started Viiaura
            </h2>
            <div className="w-16 h-1 bg-[#C86446]" />
          </div>

          <div className="lg:col-span-7 space-y-6 text-sm sm:text-base text-[#44403C] leading-relaxed">
            <p className="text-base sm:text-lg font-medium text-[#1C1917]">
              Viiaura was born out of an appreciation for slow, deliberate objects. For too long, the home fragrance landscape has been dominated by identical glass jars with mass-printed labels — products that lose all visual intrigue the moment their lid is closed.
            </p>
            <p>
              We challenge that convention. We ask: <em>What if a candle was designed as a free-standing sculpture first?</em> What if the curve of its wax, the texture of its ridges, and the tactile warmth of its surface could elevate a room before a match is even struck?
            </p>
            <p>
              Starting with handcrafted candles, Viiaura is building a foundation for future lifestyle and craft products — including handcrafted gifting pieces, festive décor, ceramic vessels, and curated hampers.
            </p>
            <p className="p-5 bg-[#F3EFEA] border-l-4 border-[#C86446] text-xs sm:text-sm text-[#786C5E] italic rounded-sm">
              * Note for client: All brand stories, material claims, and craft details here are neutral placeholders awaiting final brand confirmation. No false certifications or claims have been invented.
            </p>
          </div>
        </div>

        {/* 4 Craft Pillars */}
        <div className="space-y-10 border-t border-[#E7E2DA] pt-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="font-display text-xs uppercase tracking-[0.25em] text-[#C86446] font-bold">
              Core Principles
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#1C1917]">
              Four Pillars of Our Studio
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: HeartHandshake,
                title: "1. Respect for Materials",
                desc: "We prioritize pure natural soy, beeswax, and plant waxes blended for smooth burning without harsh chemical stabilizers.",
              },
              {
                icon: Eye,
                title: "2. Form Before Trend",
                desc: "Our silhouettes reference classical architecture and pure geometry rather than fleeting social media fads.",
              },
              {
                icon: Award,
                title: "3. Small-Batch Integrity",
                desc: "Each candle is individually inspected for air bubbles, crisp ridge definition, and level wick centering.",
              },
              {
                icon: Sparkles,
                title: "4. Relationship-First",
                desc: "We treat every customer interaction as a personal consultation, helping you select the right piece or custom gift set.",
              },
            ].map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={i}
                  className="p-7 bg-white border border-[#E7E2DA] rounded-sm space-y-3.5 shadow-sm hover:border-[#D4AF7A] transition-all"
                >
                  <div className="w-12 h-12 rounded-sm bg-[#F7EDE8] text-[#C86446] flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#1C1917]">{p.title}</h3>
                  <p className="text-sm text-[#57534E] leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Future Vision Section */}
        <div className="p-8 sm:p-14 bg-[#F3EFEA] border border-[#E7E2DA] rounded-sm space-y-7 shadow-sm">
          <div className="max-w-2xl space-y-3">
            <span className="font-display text-xs uppercase tracking-[0.25em] text-[#C86446] font-bold">
              The Path Ahead
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#1C1917]">
              From Candle Art to Contemporary Craft
            </h2>
            <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
              While sculptural candles are our debut medium, Viiaura's architecture is structured for an evolving horizon of handcrafted artisan lifestyle objects — including studio pottery vessels, brass snuffer tools, festive holiday collections, and curated gift hampers.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
            {["Handcrafted Gifts", "Home Décor Accents", "Bespoke Hampers", "Festive Collections"].map(
              (item, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-white border border-[#E7E2DA] rounded-sm text-center font-serif text-base font-bold text-[#1C1917] shadow-sm"
                >
                  {item}
                </div>
              )
            )}
          </div>
        </div>

        {/* CTA with enlarged buttons */}
        <div className="text-center space-y-5 pt-8">
          <h3 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#1C1917]">
            Experience Viiaura in Your Space
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/products"
              className="px-9 py-4 bg-[#1C1917] hover:bg-[#C86446] text-[#FAF7F2] text-xs uppercase tracking-widest font-extrabold rounded-sm transition-all min-h-[48px] flex items-center shadow-lg"
            >
              Explore Catalogue
            </Link>
            <Link
              href="/contact"
              className="px-9 py-4 border-2 border-[#1C1917] hover:bg-[#1C1917] hover:text-white text-[#1C1917] text-xs uppercase tracking-widest font-extrabold rounded-sm transition-all min-h-[48px] flex items-center"
            >
              Contact Atelier
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
