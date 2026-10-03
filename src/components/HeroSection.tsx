"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, ArrowDown, Sparkles } from "lucide-react";

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollableDistance = containerRef.current.offsetHeight - windowHeight;

      if (totalScrollableDistance <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.min(Math.max(currentScroll / totalScrollableDistance, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      mediaQuery.removeEventListener("change", listener);
    };
  }, []);

  const effectiveProgress = prefersReducedMotion ? 0.9 : scrollProgress;
  const litOpacity = Math.min(Math.max((effectiveProgress - 0.15) / 0.55, 0), 1);
  const glowScale = 0.8 + effectiveProgress * 1.8;
  const glowOpacity = Math.min(effectiveProgress * 1.2, 0.75);

  return (
    <div ref={containerRef} className="relative w-full h-[180vh] sm:h-[200vh]">
      {/* Sticky Fullscreen Presentation Viewport */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-between px-4 sm:px-6 lg:px-8 bg-[#161413] transition-colors duration-700">
        {/* Dynamic Warm Ambient Glow Layer */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at 50% 38%, rgba(212, 175, 122, ${
              glowOpacity * 0.45
            }) 0%, rgba(200, 100, 70, ${glowOpacity * 0.3}) 40%, rgba(22, 20, 19, ${
              1 - effectiveProgress * 0.35
            }) 80%)`,
            transform: `scale(${glowScale})`,
          }}
        />

        {/* Center Candle Showcase */}
        <div className="relative z-10 flex-1 w-full max-w-4xl mx-auto flex flex-col items-center justify-center pt-24 sm:pt-28">
          <div className="relative w-72 h-72 sm:w-88 sm:h-88 md:w-[420px] md:h-[420px]">
            {/* Unlit Candle (Base Layer) */}
            <div className="absolute inset-0 transition-opacity duration-500">
              <Image
                src="/images/hero-unlit.jpg"
                alt="Viiaura unlit handcrafted candle"
                fill
                priority
                className="object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.7)]"
                sizes="(max-width: 768px) 288px, 420px"
              />
            </div>

            {/* Lit Candle (Cross-fade Layer triggered by scroll) */}
            <div
              className="absolute inset-0 transition-opacity duration-300"
              style={{ opacity: litOpacity }}
            >
              <Image
                src="/images/hero-lit.jpg"
                alt="Viiaura candle glowing with living flame"
                fill
                priority
                className="object-contain drop-shadow-[0_25px_50px_rgba(212,175,122,0.45)]"
                sizes="(max-width: 768px) 288px, 420px"
              />
            </div>

            {/* Micro Flame Light Halo */}
            <div
              className="absolute top-[8%] left-[48%] -translate-x-1/2 w-20 h-20 rounded-full blur-xl pointer-events-none transition-opacity duration-300"
              style={{
                backgroundColor: "rgba(255, 200, 120, 0.8)",
                opacity: litOpacity,
                transform: `scale(${1 + effectiveProgress * 0.6})`,
              }}
            />
          </div>

          {/* Headline & Editorial Copy */}
          <div className="text-center space-y-5 max-w-2xl px-4 mt-1 sm:mt-2 z-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-[#D4AF7A]/30 backdrop-blur-md shadow-sm">
              <Sparkles className="w-4 h-4 text-[#D4AF7A]" />
              <span className="font-display text-xs sm:text-sm uppercase tracking-[0.25em] text-[#D4AF7A] font-bold">
                Atelier Handcrafted Candles
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#FAF7F2] font-black tracking-tight leading-[1.12]">
              Sculpted Light. <br className="hidden sm:inline" />
              <span className="italic font-bold text-[#D4AF7A]">Handcrafted Form.</span>
            </h1>

            <p className="text-sm sm:text-base text-[#D8D1C7] max-w-lg mx-auto leading-relaxed font-normal">
              Where wax becomes sculptural art. Hand-poured in small batches with pure natural waxes for thoughtful living spaces and memorable gifts.
            </p>

            {/* CTAs with generous touch targets */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/products"
                className="w-full sm:w-auto px-8 py-4 bg-[#FAF7F2] hover:bg-[#D4AF7A] text-[#161413] text-sm uppercase tracking-[0.2em] font-extrabold rounded-sm transition-all shadow-xl hover:scale-105 min-h-[48px] flex items-center justify-center"
              >
                Explore Collection
              </Link>
              <a
                href="https://wa.me/919876543210?text=Hi%20Viiaura%2C%20I%20would%20like%20to%20enquire%20about%20your%20handcrafted%20candle%20collection."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 border-2 border-[#D4AF7A] hover:bg-[#D4AF7A] hover:text-[#161413] text-[#FAF7F2] text-sm uppercase tracking-[0.2em] font-bold rounded-sm backdrop-blur-sm transition-all min-h-[48px] shadow-sm"
              >
                <MessageCircle className="w-5 h-5 text-[#25D366]" />
                Enquire on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator Prompt */}
        <div className="z-20 pb-8 flex flex-col items-center gap-2 text-[#D8D1C7] transition-opacity duration-300">
          <span className="font-display text-xs uppercase tracking-[0.3em] font-bold">
            {effectiveProgress < 0.25 ? "Scroll to light the flame" : "Scroll to explore"}
          </span>
          <ArrowDown
            className={`w-5 h-5 transition-transform duration-300 ${
              effectiveProgress < 0.8 ? "animate-bounce text-[#D4AF7A]" : "rotate-180"
            }`}
          />
        </div>
      </div>
    </div>
  );
};
