"use client";

import React, { useState, useEffect } from "react";
import { Flame, ArrowUp } from "lucide-react";

export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-20 sm:bottom-8 right-5 sm:right-8 z-40 p-3 sm:p-3.5 bg-[#1C1917] hover:bg-[#C86446] text-[#FAF7F2] rounded-full shadow-2xl border border-[#D4AF7A]/40 flex items-center justify-center gap-1 group transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
      aria-label="Scroll back to top"
      title="Return to top"
    >
      <Flame className="w-4 h-4 text-[#D4AF7A] group-hover:text-white transition-colors" />
      <ArrowUp className="w-3.5 h-3.5 text-white/80 group-hover:text-white" />
    </button>
  );
};
