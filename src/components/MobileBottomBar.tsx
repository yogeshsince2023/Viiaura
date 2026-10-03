"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEnquiry } from "@/context/EnquiryContext";
import { MessageCircle, SlidersHorizontal, Sparkles } from "lucide-react";

export const MobileBottomBar: React.FC = () => {
  const pathname = usePathname();
  const { openEnquiry } = useEnquiry();

  // Show only on mobile devices
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-[#FAF7F2]/95 glass-nav border-t border-[#E7E2DA] px-4 py-2.5 shadow-lg flex items-center justify-between gap-3">
      <Link
        href="/products"
        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white border border-[#E7E2DA] rounded-sm text-xs uppercase tracking-wider text-[#1C1917] font-semibold"
      >
        <SlidersHorizontal className="w-3.5 h-3.5 text-[#C86446]" />
        Catalogue
      </Link>

      <button
        onClick={() => openEnquiry(null)}
        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#1C1917] text-[#FAF7F2] rounded-sm text-xs uppercase tracking-wider font-semibold"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#D4AF7A]" />
        Enquire
      </button>

      <a
        href="https://wa.me/919876543210?text=Hi%20Viiaura%2C%20I%20would%20like%20to%20enquire%20about%20your%20handcrafted%20candles."
        target="_blank"
        rel="noopener noreferrer"
        className="p-2.5 bg-[#1F261E] text-[#FAF7F2] rounded-sm flex items-center justify-center"
        aria-label="Direct WhatsApp Enquiry"
      >
        <MessageCircle className="w-4 h-4 text-[#25D366]" />
      </a>
    </div>
  );
};
