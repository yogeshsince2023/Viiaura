"use client";

import React, { useState } from "react";
import { ChevronDown, MessageCircle, HelpCircle } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
  category: "ordering" | "craft" | "custom" | "care";
}

const FAQS: FAQItem[] = [
  {
    q: "How do I purchase a Viiaura candle?",
    a: "Viiaura operates as a premium digital catalogue and enquiry showroom rather than an automated checkout store. Simply click 'Enquire on WhatsApp' on any design or submit an enquiry form. Our concierge will share pricing, availability, and payment links directly with you.",
    category: "ordering",
  },
  {
    q: "Why are some prices marked 'Price on Request'?",
    a: "Because our pieces are handcrafted in small artisanal batches and frequently customized with specific pantone wax tints, bespoke fragrances, or monogram gift packaging, final pricing reflects order volume and bespoke requirements.",
    category: "ordering",
  },
  {
    q: "What types of wax do you use?",
    a: "We prioritize natural, renewable plant waxes (primarily 100% natural soy and beeswax blends). We use lead-free, unbleached braided cotton wicks and crackling booster wooden wicks.",
    category: "craft",
  },
  {
    q: "Do free-standing sculptural candles drip when lit?",
    a: "All free-standing uncontained candles have the potential to melt outward. We engineer our wax density and wick sizing for maximum burn stability, but we always advise placing sculptural candles on a heat-resistant ceramic dish or marble tray.",
    category: "care",
  },
  {
    q: "Can I commission custom colors for a wedding or event?",
    a: "Yes! We specialize in custom wax color matching to complement event decor and floral themes. We also offer custom calligraphed packaging sleeves and brass foil monogramming for orders of 20+ pieces.",
    category: "custom",
  },
  {
    q: "What is your typical production and delivery timeline?",
    a: "Individual studio pieces ship within 3–5 working days. Bespoke wedding favors, custom colorways, and volume corporate hampers typically require 10–14 working days from order confirmation.",
    category: "ordering",
  },
  {
    q: "How should I care for my candle to ensure optimal burn time?",
    a: "Always trim the wick to 5mm (1/4 inch) before lighting. Keep the candle away from drafts, fans, and open windows. Do not burn sculptural candles for more than 3 hours at a time.",
    category: "care",
  },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs =
    activeCategory === "all" ? FAQS : FAQS.filter((f) => f.category === activeCategory);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="pt-24 sm:pt-28 pb-24 bg-[#FAF7F2] min-h-screen animate-page-enter">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 border-b border-[#E7E2DA] pb-10">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#C86446] font-bold">
            <HelpCircle className="w-4 h-4" /> Frequently Asked Questions
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1C1917] tracking-tight">
            Care, Ordering & Guidance
          </h1>
          <p className="text-sm sm:text-base text-[#57534E] max-w-xl mx-auto">
            Everything you need to know regarding our handcrafted candles, bespoke commissions, and enquiry showroom process.
          </p>

          {/* Category Tabs with large click targets */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-4">
            {[
              { id: "all", label: "All Questions" },
              { id: "ordering", label: "Ordering & Enquiries" },
              { id: "craft", label: "Wax & Ingredients" },
              { id: "custom", label: "Bespoke & Gifting" },
              { id: "care", label: "Candle Care & Safety" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-5 py-3 rounded-sm text-xs sm:text-sm uppercase tracking-wider font-bold transition-all min-h-[44px] cursor-pointer ${
                  activeCategory === tab.id
                    ? "bg-[#1C1917] text-[#FAF7F2] shadow-md"
                    : "bg-white text-[#44403C] border border-[#E7E2DA] hover:bg-[#FAF7F2]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List with larger touch headers */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-[#E7E2DA] rounded-sm overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-5 font-serif text-xl sm:text-2xl font-bold text-[#1C1917] hover:text-[#C86446] transition-colors cursor-pointer min-h-[64px]"
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#8C857B] flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[#C86446]" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-[#44403C] leading-relaxed border-t border-[#E7E2DA]">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Banner */}
        <div className="p-8 sm:p-12 bg-[#F3EFEA] border border-[#E7E2DA] rounded-sm flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917]">Still have questions?</h3>
            <p className="text-sm text-[#57534E]">
              Our concierge team is available on WhatsApp to answer any custom order or material questions.
            </p>
          </div>
          <a
            href="https://wa.me/919876543210?text=Hi%20Viiaura%2C%20I%20have%20a%20question%20about%20your%20candles."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#1C1917] hover:bg-[#C86446] text-[#FAF7F2] text-xs uppercase tracking-widest font-extrabold rounded-sm transition-all flex-shrink-0 min-h-[48px] shadow-md"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            Ask on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
