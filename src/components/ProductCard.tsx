"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/data/types";
import { useEnquiry } from "@/context/EnquiryContext";
import { MessageCircle, ArrowRight } from "lucide-react";

interface ProductCardProps {
  product: Product;
  showPrice?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, showPrice = true }) => {
  const { openEnquiry } = useEnquiry();

  const getStatusBadge = () => {
    switch (product.enquiryStatus) {
      case "madeToOrder":
        return { label: "Made to Order", bg: "bg-[#F3EFEA] text-[#786C5E] border-[#E7E2DA]" };
      case "limited":
        return { label: "Limited Edition", bg: "bg-[#F7EDE8] text-[#C86446] border-[#E7D6CD]" };
      case "enquire":
        return { label: "Bespoke Only", bg: "bg-[#F3EFEA] text-[#1C1917] border-[#E7E2DA]" };
      default:
        return { label: "Atelier Hand-Poured", bg: "bg-[#FAF7F2] text-[#292524] border-[#E7E2DA]" };
    }
  };

  const badge = getStatusBadge();

  return (
    <div className="group relative flex flex-col bg-white border border-[#E7E2DA] rounded-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#D4AF7A] hover:-translate-y-1">
      {/* Image Container with 4:5 Aspect Ratio */}
      <Link href={`/products/${product.slug}`} className="relative aspect-[4/5] w-full overflow-hidden bg-[#F3EFEA] block">
        <Image
          src={product.images[0] || "/images/hero-unlit.jpg"}
          alt={product.name}
          fill
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Status Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className={`inline-block px-3 py-1.5 text-[11px] uppercase tracking-wider font-bold border rounded-sm shadow-sm ${badge.bg}`}
          >
            {badge.label}
          </span>
        </div>

        {/* Hover Quick Overlay on Desktop */}
        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex items-end justify-center p-4">
          <span className="w-full py-3 bg-[#FAF7F2] text-[#1C1917] text-xs uppercase tracking-widest font-bold text-center rounded-sm shadow-lg flex items-center justify-center gap-2 hover:bg-white hover:text-[#C86446] transition-colors">
            View Design Details <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </Link>

      {/* Card Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs uppercase tracking-wider text-[#78716C] font-bold truncate">
              {product.collection}
            </span>
            <span className="text-xs font-mono text-[#A8A29E] font-medium">{product.sku}</span>
          </div>

          <Link href={`/products/${product.slug}`} className="block">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917] group-hover:text-[#C86446] transition-colors leading-snug line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-[13px] sm:text-sm text-[#57534E] line-clamp-2 leading-relaxed pt-0.5">
            {product.shortDescription}
          </p>
        </div>

        {/* Pricing & Enquiry Action Bar with larger touch target */}
        <div className="pt-3 border-t border-[#E7E2DA] flex items-center justify-between gap-2">
          <div>
            {showPrice && product.price ? (
              <div className="flex flex-col">
                <span className="text-[11px] uppercase tracking-wider text-[#78716C] font-semibold">Est. Value</span>
                <span className="text-base sm:text-lg font-bold text-[#1C1917]">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
              </div>
            ) : (
              <div className="flex flex-col">
                <span className="text-[11px] uppercase tracking-wider text-[#78716C] font-semibold">Studio Order</span>
                <span className="text-sm font-bold text-[#C86446]">Price on Request</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => openEnquiry(product)}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#1C1917] hover:bg-[#C86446] text-[#FAF7F2] text-xs uppercase tracking-wider font-bold rounded-sm transition-all shadow-sm min-h-[40px] cursor-pointer"
              title="Quick Enquiry"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#D4AF7A]" />
              <span>Enquire</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
