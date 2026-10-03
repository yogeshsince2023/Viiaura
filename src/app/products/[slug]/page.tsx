"use client";

import React, { useState } from "react";
import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { useEnquiry } from "@/context/EnquiryContext";
import {
  MessageCircle,
  Share2,
  Check,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Clock,
  Layers,
  Ruler,
  Weight,
  Flame,
  ArrowRight,
} from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { openEnquiry } = useEnquiry();

  const product = PRODUCTS.find((p) => p.slug === slug);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  // Accordion states
  const [openSection, setOpenSection] = useState<string>("specs");

  if (!product) {
    return notFound();
  }

  // Related products from same collection
  const relatedProducts = PRODUCTS.filter(
    (p) => p.collection === product.collection && p.id !== product.id
  ).slice(0, 3);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getWhatsAppEnquiryUrl = () => {
    const text = `Hi Viiaura, I am interested in ${product.name} (SKU: ${product.sku}). Please share details regarding price, custom wax options and availability. (Page: https://viiaura.com/products/${product.slug})`;
    return `https://wa.me/919876543210?text=${encodeURIComponent(text)}`;
  };

  const toggleAccordion = (id: string) => {
    setOpenSection(openSection === id ? "" : id);
  };

  return (
    <div className="pt-24 sm:pt-28 pb-24 bg-[#FAF7F2] min-h-screen animate-page-enter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#78716C] font-bold overflow-x-auto whitespace-nowrap pb-2">
          <Link href="/" className="hover:text-[#1C1917] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#1C1917] transition-colors">
            Catalogue
          </Link>
          <span>/</span>
          <span className="text-[#C86446]">{product.collection}</span>
          <span>/</span>
          <span className="text-[#1C1917]">{product.name}</span>
        </nav>

        {/* Main Product Showcase Split (55% Media / 45% Details) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Gallery (Sticky Desktop) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Primary Large Image */}
            <div className="relative aspect-[4/5] w-full rounded-sm overflow-hidden bg-[#F3EFEA] border-2 border-[#E7E2DA] shadow-xl group">
              <Image
                src={product.images[activeImageIndex] || product.images[0]}
                alt={`${product.name} detailed view`}
                fill
                priority
                className="object-cover object-center transition-transform duration-500 group-hover:scale-102"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />

              {/* Status Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3.5 py-1.5 text-xs uppercase tracking-widest font-extrabold bg-[#FAF7F2]/95 backdrop-blur-md border border-[#E7E2DA] text-[#1C1917] rounded-sm shadow-md">
                  {product.enquiryStatus === "madeToOrder"
                    ? "Made to Order"
                    : product.enquiryStatus === "limited"
                    ? "Limited Edition"
                    : "Atelier Hand-Poured"}
                </span>
              </div>
            </div>

            {/* Thumbnail Picker with comfortable tap sizes */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-22 h-26 rounded-sm overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                      activeImageIndex === idx
                        ? "border-[#C86446] shadow-md scale-102"
                        : "border-[#E7E2DA] opacity-75 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Specification & Enquiry Panel */}
          <div className="lg:col-span-5 space-y-8">
            {/* Header info */}
            <div className="space-y-3 border-b border-[#E7E2DA] pb-6">
              <div className="flex items-center justify-between">
                <span className="font-display text-xs uppercase tracking-[0.2em] text-[#C86446] font-bold">
                  {product.collection}
                </span>
                <span className="text-xs font-mono font-bold text-[#78716C] bg-white px-2.5 py-1 border border-[#E7E2DA] rounded-sm">
                  {product.sku}
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl font-black text-[#1C1917] leading-tight">
                {product.name}
              </h1>

              {product.price ? (
                <div className="flex items-baseline gap-3 pt-2">
                  <span className="text-xs text-[#78716C] uppercase tracking-wider font-bold">Estimated Value</span>
                  <span className="font-serif text-3xl font-extrabold text-[#1C1917]">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                  <span className="text-xs text-[#8C857B] font-medium">(Taxes & packaging on consultation)</span>
                </div>
              ) : (
                <div className="pt-2">
                  <span className="text-sm text-[#C86446] font-bold tracking-wide">
                    Price available upon bespoke studio quotation
                  </span>
                </div>
              )}
            </div>

            {/* Short & Full Description */}
            <div className="space-y-3.5 text-sm sm:text-base text-[#44403C] leading-relaxed">
              <p className="font-bold text-[#1C1917] text-base">{product.shortDescription}</p>
              <p>{product.fullDescription}</p>
            </div>

            {/* Colors / Available Tints */}
            {product.colours && product.colours.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-[#E7E2DA]">
                <span className="font-display text-xs uppercase tracking-wider text-[#78716C] font-bold block">
                  Available Atelier Tints
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {product.colours.map((col, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 bg-white border border-[#E7E2DA] rounded-sm text-xs font-bold text-[#1C1917] shadow-sm"
                    >
                      {col}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Primary Action Buttons with bold 52px tap targets */}
            <div className="space-y-3.5 pt-2">
              <a
                href={getWhatsAppEnquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-3 py-4 px-8 bg-[#1F261E] hover:bg-[#2F3A2E] text-[#FAF7F2] text-sm uppercase tracking-[0.2em] font-extrabold rounded-sm shadow-xl transition-all min-h-[52px] group"
              >
                <MessageCircle className="w-5 h-5 text-[#25D366] group-hover:scale-115 transition-transform" />
                Enquire on WhatsApp
              </a>

              <button
                onClick={() => openEnquiry(product)}
                className="w-full inline-flex items-center justify-center gap-2 py-4 px-8 bg-white hover:bg-[#1C1917] hover:text-[#FAF7F2] border-2 border-[#1C1917] text-[#1C1917] text-sm uppercase tracking-[0.2em] font-extrabold rounded-sm transition-all min-h-[52px] cursor-pointer"
              >
                Send Studio Enquiry Form
              </button>

              <button
                onClick={handleShare}
                className="w-full flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-[#78716C] hover:text-[#1C1917] pt-2 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-green-600" /> : <Share2 className="w-4 h-4" />}
                <span>{copied ? "Link Copied to Clipboard" : "Share this design piece"}</span>
              </button>
            </div>

            {/* Accordion Specifications Section */}
            <div className="border-t border-[#E7E2DA] pt-4 divide-y divide-[#E7E2DA]">
              {/* Accordion 1: Specifications */}
              <div className="py-4">
                <button
                  onClick={() => toggleAccordion("specs")}
                  className="w-full flex items-center justify-between text-left font-serif text-xl font-bold text-[#1C1917] cursor-pointer"
                >
                  <span>Object Specifications</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#8C857B] transition-transform ${
                      openSection === "specs" ? "rotate-180 text-[#C86446]" : ""
                    }`}
                  />
                </button>
                {openSection === "specs" && (
                  <div className="pt-4 pb-2 grid grid-cols-2 gap-4 text-sm text-[#44403C]">
                    <div className="flex items-start gap-2.5">
                      <Ruler className="w-4 h-4 text-[#C86446] mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-[#78716C] block text-xs uppercase font-bold">Dimensions</span>
                        <span className="font-semibold">{product.dimensions}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Weight className="w-4 h-4 text-[#C86446] mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-[#78716C] block text-xs uppercase font-bold">Weight</span>
                        <span className="font-semibold">{product.weight}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Layers className="w-4 h-4 text-[#C86446] mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-[#78716C] block text-xs uppercase font-bold">Wax & Wick</span>
                        <span className="line-clamp-2 font-semibold">{product.waxMaterial}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Clock className="w-4 h-4 text-[#C86446] mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-[#78716C] block text-xs uppercase font-bold">Burn Duration</span>
                        <span className="font-semibold">{product.burnTime || "Approx. 35+ hours"}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion 2: Scent Profile */}
              {product.scent && (
                <div className="py-4">
                  <button
                    onClick={() => toggleAccordion("scent")}
                    className="w-full flex items-center justify-between text-left font-serif text-xl font-bold text-[#1C1917] cursor-pointer"
                  >
                    <span>Fragrance & Scent Profile</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#8C857B] transition-transform ${
                        openSection === "scent" ? "rotate-180 text-[#C86446]" : ""
                      }`}
                    />
                  </button>
                  {openSection === "scent" && (
                    <div className="pt-3 pb-2 text-sm text-[#44403C] leading-relaxed">
                      <p className="font-medium">{product.scent}</p>
                      <p className="text-xs text-[#8C857B] pt-1">
                        * All fragrances use phthalate-free botanical perfume oils and pure essential extracts.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Accordion 3: Customization & Bespoke Info */}
              <div className="py-4">
                <button
                  onClick={() => toggleAccordion("custom")}
                  className="w-full flex items-center justify-between text-left font-serif text-xl font-bold text-[#1C1917] cursor-pointer"
                >
                  <span>Customization & Made-to-Order</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#8C857B] transition-transform ${
                      openSection === "custom" ? "rotate-180 text-[#C86446]" : ""
                    }`}
                  />
                </button>
                {openSection === "custom" && (
                  <div className="pt-3 pb-2 text-sm text-[#44403C] space-y-2 leading-relaxed">
                    <p>{product.customization || "Custom color matching and event packaging available upon request."}</p>
                    <p className="text-xs text-[#C86446] font-bold">
                      Typical production lead time: 3–5 working days for individual pieces; 7–14 days for volume event favors.
                    </p>
                  </div>
                )}
              </div>

              {/* Accordion 4: Care & Safety */}
              <div className="py-4">
                <button
                  onClick={() => toggleAccordion("care")}
                  className="w-full flex items-center justify-between text-left font-serif text-xl font-bold text-[#1C1917] cursor-pointer"
                >
                  <span>Care & Burn Instructions</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#8C857B] transition-transform ${
                      openSection === "care" ? "rotate-180 text-[#C86446]" : ""
                    }`}
                  />
                </button>
                {openSection === "care" && (
                  <div className="pt-3 pb-2 text-sm text-[#44403C] space-y-2 leading-relaxed">
                    <p>• Trim wick to 5mm (1/4 inch) before each lighting to ensure a clean flame.</p>
                    <p>• For sculptural pillars, always burn on a heat-resistant tray or ceramic dish.</p>
                    <p>• Allow wax pool to form evenly; avoid burning near strong drafts or AC vents.</p>
                    <p>• Never leave burning candles unattended or near flammable fabrics.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Section: Related Designs from the Same Collection */}
        {relatedProducts.length > 0 && (
          <section className="pt-16 border-t border-[#E7E2DA] space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-1">
                <span className="font-display text-xs uppercase tracking-[0.2em] text-[#C86446] font-bold">
                  Complementary Forms
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#1C1917]">
                  More from the {product.collection}
                </h2>
              </div>
              <Link
                href={`/products?collection=${encodeURIComponent(product.collection)}`}
                className="inline-flex items-center gap-2 text-sm uppercase tracking-wider text-[#1C1917] hover:text-[#C86446] font-extrabold"
              >
                View Series <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 sm:gap-7">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
