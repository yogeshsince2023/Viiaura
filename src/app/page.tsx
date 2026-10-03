"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HeroSection } from "@/components/HeroSection";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS } from "@/data/products";
import { COLLECTIONS } from "@/data/collections";
import { useEnquiry } from "@/context/EnquiryContext";
import { ArrowRight, Sparkles, MessageCircle, ShieldCheck, HeartHandshake, Eye, Award } from "lucide-react";

export default function HomePage() {
  const { openEnquiry } = useEnquiry();
  const [selectedOccasion, setSelectedOccasion] = useState<string>("All");

  const signatureProducts = PRODUCTS.filter((p) => p.featured).slice(0, 4);

  const occasions = [
    { id: "All", label: "All Occasions" },
    { id: "Home Décor", label: "Living & Spaces" },
    { id: "Intimate Dinners", label: "Table Centerpieces" },
    { id: "Festive", label: "Festive Celebrations" },
    { id: "Corporate Gifting", label: "Corporate & Bespoke" },
  ];

  const filteredOccasionProducts =
    selectedOccasion === "All"
      ? PRODUCTS.slice(0, 6)
      : PRODUCTS.filter((p) => p.occasion.includes(selectedOccasion)).slice(0, 6);

  return (
    <div className="flex flex-col animate-page-enter">
      {/* 1. Signature Hero Section with scroll candle illumination */}
      <HeroSection />

      {/* 2. Featured Collections Showcase */}
      <section className="py-24 sm:py-28 bg-[#FAF7F2] border-b border-[#E7E2DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
            <div className="space-y-2.5">
              <span className="font-display text-xs uppercase tracking-[0.25em] text-[#C86446] font-bold">
                Curated Series
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1C1917] tracking-tight">
                Explore Collections
              </h2>
            </div>
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-[#1C1917] hover:text-[#C86446] font-extrabold transition-colors pb-1.5 border-b-2 border-[#1C1917] hover:border-[#C86446] w-fit"
            >
              View All Collections <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {COLLECTIONS.slice(0, 3).map((col, index) => (
              <Link
                key={col.id}
                href={`/collections/${col.slug}`}
                className="group relative flex flex-col bg-white border border-[#E7E2DA] rounded-sm overflow-hidden hover:shadow-2xl hover:border-[#D4AF7A] transition-all duration-500"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F3EFEA]">
                  <Image
                    src={col.coverImage}
                    alt={col.name}
                    fill
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-85 group-hover:opacity-70 transition-opacity" />
                  <span className="absolute top-4 left-4 text-xs uppercase tracking-widest text-[#FAF7F2] font-mono font-bold px-3 py-1 bg-black/50 backdrop-blur-md rounded-sm">
                    0{index + 1}
                  </span>
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <span className="text-xs uppercase tracking-wider text-[#D4AF7A] font-bold block pb-1">
                      {col.featuredDesignsCount} Designs
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white group-hover:text-[#D4AF7A] transition-colors leading-snug">
                      {col.name}
                    </h3>
                  </div>
                </div>

                <div className="p-6 flex flex-col justify-between flex-1 gap-5">
                  <p className="text-sm text-[#44403C] leading-relaxed line-clamp-2 font-normal">
                    {col.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-xs font-bold text-[#1C1917] group-hover:text-[#C86446] transition-colors uppercase tracking-widest">
                    Explore Series <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured / Signature Designs */}
      <section className="py-24 sm:py-28 bg-[#F3EFEA]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
            <div className="space-y-2.5">
              <span className="font-display text-xs uppercase tracking-[0.25em] text-[#C86446] font-bold">
                Sculpted Masterpieces
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1C1917] tracking-tight">
                Signature Designs
              </h2>
              <p className="text-sm sm:text-base text-[#57534E] max-w-xl font-normal pt-1">
                Individually poured candle sculptures defined by balanced architecture, clean geometric ridges, and enduring aesthetic presence.
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-[#1C1917] hover:text-[#C86446] font-extrabold transition-colors pb-1.5 border-b-2 border-[#1C1917] hover:border-[#C86446] w-fit"
            >
              Browse Complete Catalogue <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-7">
            {signatureProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Short "Our Story" & Craft Philosophy */}
      <section className="py-24 sm:py-32 bg-[#FAF7F2] border-y border-[#E7E2DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            {/* Left Column: Visual Artwork */}
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden border-2 border-[#E7E2DA] shadow-2xl group">
              <Image
                src="/images/handmade-candle.jpg"
                alt="Viiaura Handcrafted Candle Artistry"
                fill
                className="object-cover object-center group-hover:scale-103 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white space-y-2">
                <span className="font-display text-xs uppercase tracking-[0.25em] text-[#D4AF7A] font-bold">
                  Slow Studio Craft
                </span>
                <p className="font-serif italic text-xl sm:text-2xl font-semibold">
                  “Every curve is shaped with patience, every wick placed by hand.”
                </p>
              </div>
            </div>

            {/* Right Column: Editorial Narrative */}
            <div className="space-y-7">
              <div className="space-y-3">
                <span className="font-display text-xs uppercase tracking-[0.25em] text-[#C86446] font-bold">
                  Atelier Philosophy
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1C1917] leading-tight">
                  Candles as Sculptural Art for Thoughtful Spaces
                </h2>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-[#44403C] leading-relaxed">
                <p>
                  Viiaura was founded on a simple belief: candles should not be disposable afterthoughts hidden in standard glass tumblers. They can be commanding, quiet objects of art that transform a mantel, a dining table, or a reading corner even in daylight.
                </p>
                <p>
                  From natural soy and beeswax formulations to custom 3D architectural master forms, our pieces balance timeless neoclassical fluting with contemporary organic curvature.
                </p>
                <p className="p-4 bg-[#F3EFEA] border-l-4 border-[#C86446] text-xs text-[#786C5E] italic rounded-sm">
                  * Note for client: All product specifications and ingredients are representative placeholders subject to final atelier confirmation.
                </p>
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-4">
                <Link
                  href="/about"
                  className="px-8 py-4 bg-[#1C1917] hover:bg-[#C86446] text-[#FAF7F2] text-xs uppercase tracking-[0.2em] font-extrabold rounded-sm transition-all shadow-md min-h-[48px] flex items-center"
                >
                  Read Our Full Story
                </Link>
                <button
                  onClick={() => openEnquiry(null)}
                  className="px-8 py-4 border-2 border-[#1C1917] hover:bg-[#1C1917] hover:text-[#FAF7F2] text-[#1C1917] text-xs uppercase tracking-[0.2em] font-extrabold rounded-sm transition-all min-h-[48px] cursor-pointer"
                >
                  Custom Bespoke Enquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. "Why Viiaura" — Neutral Craft Pillars */}
      <section className="py-24 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="font-display text-xs uppercase tracking-[0.25em] text-[#C86446] font-bold">
              The Viiaura Distinction
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#1C1917]">
              Crafted with Precision & Care
            </h2>
            <p className="text-sm sm:text-base text-[#57534E]">
              Neutral craft standards guiding our workshop creations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: HeartHandshake,
                title: "Hand-Poured in Batches",
                desc: "Every design is poured and demoulded individually in our studio to ensure crisp ridges and velvety matte wax surfaces.",
              },
              {
                icon: Eye,
                title: "Sculptural Geometry",
                desc: "Balanced silhouettes engineered to create intriguing interplay of shadow and light, whether dormant or lit.",
              },
              {
                icon: ShieldCheck,
                title: "Selected Wax Blends",
                desc: "Formulated with clean-burning plant and beeswax blends paired with lead-free braided natural cotton wicks.",
              },
              {
                icon: Award,
                title: "Bespoke Personalization",
                desc: "Custom color matching, tailored fragrance notes, and monogram packaging available for weddings and celebrations.",
              },
            ].map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={i}
                  className="p-7 bg-white border border-[#E7E2DA] rounded-sm space-y-4 hover:border-[#D4AF7A] hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 rounded-sm bg-[#F7EDE8] text-[#C86446] flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#1C1917]">{pillar.title}</h3>
                  <p className="text-sm text-[#57534E] leading-relaxed">{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Occasions Showroom */}
      <section className="py-24 sm:py-28 bg-[#F3EFEA] border-t border-[#E7E2DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
            <span className="font-display text-xs uppercase tracking-[0.25em] text-[#C86446] font-bold">
              Curated Contexts
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#1C1917]">
              Designed for Memorable Occasions
            </h2>
            <p className="text-sm sm:text-base text-[#57534E]">
              Select an occasion to explore candle pairings crafted for table settings, living rituals, and gift presentation.
            </p>

            {/* Occasion Filter Tabs with larger buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-4">
              {occasions.map((occ) => (
                <button
                  key={occ.id}
                  onClick={() => setSelectedOccasion(occ.id)}
                  className={`px-5 py-3 text-xs sm:text-sm uppercase tracking-wider font-bold rounded-sm transition-all min-h-[44px] cursor-pointer ${
                    selectedOccasion === occ.id
                      ? "bg-[#1C1917] text-[#FAF7F2] shadow-md scale-102"
                      : "bg-white text-[#44403C] border border-[#E7E2DA] hover:bg-[#FAF7F2]"
                  }`}
                >
                  {occ.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 sm:gap-7">
            {filteredOccasionProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. Lifestyle Gallery Strip */}
      <section className="py-24 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-2.5">
              <span className="font-display text-xs uppercase tracking-[0.25em] text-[#C86446] font-bold">
                Inspiration & Living
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#1C1917]">
                Viiaura in Contemporary Spaces
              </h2>
            </div>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-[#1C1917] hover:text-[#C86446] font-extrabold transition-colors pb-1.5 border-b-2 border-[#1C1917] hover:border-[#C86446] w-fit"
            >
              View Full Gallery <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden border border-[#E7E2DA] group shadow-md">
              <Image
                src="/images/ivory-candles.jpg"
                alt="Table Centerpiece candle arrangement"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="font-display text-xs uppercase tracking-widest text-[#D4AF7A] font-bold">Styling Note</span>
                <p className="font-serif text-xl font-bold">Architectural Arch & Fluted Column centerpiece</p>
              </div>
            </div>

            <div className="relative aspect-[4/5] rounded-sm overflow-hidden border border-[#E7E2DA] group shadow-md">
              <Image
                src="/images/candle-still-life.jpg"
                alt="Living room evening candle glow"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="font-display text-xs uppercase tracking-widest text-[#D4AF7A] font-bold">Atmosphere</span>
                <p className="font-serif text-xl font-bold">Golden flame glow in evening twilight</p>
              </div>
            </div>

            <div className="relative aspect-[4/5] rounded-sm overflow-hidden border border-[#E7E2DA] group sm:col-span-2 lg:col-span-1 shadow-md">
              <Image
                src="/images/strong-shadows.jpg"
                alt="Tactile sculpted candle silhouette"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="font-display text-xs uppercase tracking-widest text-[#D4AF7A] font-bold">Atelier Texture</span>
                <p className="font-serif text-xl font-bold">Raw beeswax spiral silhouette in morning light</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Concierge Enquiry Banner with generous touch targets */}
      <section className="py-20 sm:py-24 bg-[#161413] text-[#FAF7F2] border-t border-[#2A2522]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-7">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-[#D4AF7A]/30">
            <Sparkles className="w-4 h-4 text-[#D4AF7A]" />
            <span className="font-display text-xs uppercase tracking-[0.25em] text-[#D4AF7A] font-bold">
              Bespoke Commissions & Gifting
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#FAF7F2] font-black leading-tight">
            Looking for something tailored, <br />
            or planning an event?
          </h2>

          <p className="text-sm sm:text-base text-[#D8D1C7] max-w-xl mx-auto leading-relaxed">
            Our atelier crafts custom colorways, volume celebration favors, corporate gift hampers, and bespoke candle installations. Direct consultation with our team.
          </p>

          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openEnquiry(null)}
              className="w-full sm:w-auto px-9 py-4 bg-[#FAF7F2] hover:bg-[#D4AF7A] text-[#161413] text-sm uppercase tracking-[0.2em] font-extrabold rounded-sm transition-all shadow-xl min-h-[48px] cursor-pointer"
            >
              Send Custom Enquiry
            </button>
            <a
              href="https://wa.me/919876543210?text=Hi%20Viiaura%2C%20I%20am%20interested%20in%20a%20custom%20or%20bulk%20candle%20commission."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 border-2 border-[#D4AF7A] hover:bg-[#D4AF7A] hover:text-[#161413] text-[#FAF7F2] text-sm uppercase tracking-[0.2em] font-bold rounded-sm transition-all min-h-[48px]"
            >
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
              WhatsApp Direct
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
