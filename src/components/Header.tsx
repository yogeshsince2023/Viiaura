"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEnquiry } from "@/context/EnquiryContext";
import { Search, MessageCircle, Menu, X, ArrowRight } from "lucide-react";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { openEnquiry } = useEnquiry();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/products", label: "Catalogue" },
    { href: "/collections", label: "Collections" },
    { href: "/about", label: "About" },
    { href: "/gallery", label: "Inspiration" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#FAF7F2]/95 glass-nav border-b border-[#E7E2DA] shadow-md py-3.5"
            : isHome
            ? "bg-transparent py-5"
            : "bg-[#FAF7F2] border-b border-[#E7E2DA] py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile Menu Button (Large 48px touch target) */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className={`p-3 rounded-md transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${
                !isScrolled && isHome ? "text-[#FAF7F2] hover:bg-white/10" : "text-[#1C1917] hover:bg-[#F3EFEA]"
              }`}
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className={`p-3 rounded-md transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${
                !isScrolled && isHome ? "text-[#FAF7F2] hover:bg-white/10" : "text-[#1C1917] hover:bg-[#F3EFEA]"
              }`}
              aria-label="Open search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Logo with Cinzel Royal Serif */}
          <Link href="/" className="flex items-center gap-3 group py-1">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#D4AF7A] shadow-md flex-shrink-0">
              <Image
                src="/logo.jpeg"
                alt="Viiaura Emblem"
                fill
                className="object-cover group-hover:scale-105 transition-transform"
                sizes="40px"
              />
            </div>
            <div className="flex flex-col">
              <span
                className={`font-display text-2xl sm:text-3xl tracking-[0.2em] font-extrabold uppercase transition-colors leading-none ${
                  !isScrolled && isHome ? "text-[#FAF7F2]" : "text-[#1C1917]"
                }`}
              >
                Viiaura
              </span>
              <span
                className={`font-sans text-[11px] tracking-[0.3em] uppercase font-bold transition-colors pt-1 ${
                  !isScrolled && isHome ? "text-[#D4AF7A]" : "text-[#8C857B]"
                }`}
              >
                Candle Art
              </span>
            </div>
          </Link>

          {/* Desktop Nav: Bold, high legibility, generous tap targets */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm uppercase tracking-[0.18em] font-bold transition-all relative py-2 px-1 ${
                    !isScrolled && isHome
                      ? active
                        ? "text-[#FAF7F2] font-extrabold"
                        : "text-[#FAF7F2]/85 hover:text-[#FAF7F2]"
                      : active
                      ? "text-[#C86446] font-extrabold"
                      : "text-[#292524] hover:text-[#C86446]"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-[2px] ${
                        !isScrolled && isHome ? "bg-[#D4AF7A]" : "bg-[#C86446]"
                      }`}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions: Search, Direct Enquire & WhatsApp */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className={`hidden sm:flex items-center gap-2 px-3.5 py-2.5 rounded-sm text-sm font-semibold transition-colors min-h-[44px] ${
                !isScrolled && isHome
                  ? "text-[#FAF7F2]/90 hover:text-[#FAF7F2] hover:bg-white/10"
                  : "text-[#292524] hover:text-[#1C1917] hover:bg-[#F3EFEA]"
              }`}
            >
              <Search className="w-4 h-4" />
              <span className="hidden xl:inline">Search</span>
            </button>

            <button
              onClick={() => openEnquiry(null)}
              className={`hidden md:inline-flex items-center justify-center px-6 py-2.5 border-2 text-xs uppercase tracking-[0.18em] font-bold rounded-sm transition-all min-h-[44px] ${
                !isScrolled && isHome
                  ? "border-[#FAF7F2] text-[#FAF7F2] hover:bg-[#FAF7F2] hover:text-[#161413]"
                  : "border-[#1C1917] text-[#1C1917] hover:bg-[#1C1917] hover:text-[#FAF7F2]"
              }`}
            >
              Enquire
            </button>

            <a
              href="https://wa.me/919876543210?text=Hi%20Viiaura%2C%20I%20would%20like%20to%20enquire%20about%20your%20handcrafted%20candle%20collection."
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs uppercase tracking-[0.15em] font-bold rounded-sm transition-all min-h-[44px] shadow-sm ${
                !isScrolled && isHome
                  ? "bg-[#D4AF7A] hover:bg-[#e4be88] text-[#161413]"
                  : "bg-[#1F261E] hover:bg-[#2B352A] text-[#FAF7F2]"
              }`}
              title="Chat directly on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Expandable Search Bar */}
        {searchOpen && (
          <div className="border-t border-[#E7E2DA] bg-[#FAF7F2] px-4 py-4 animate-fade-in shadow-lg">
            <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto flex items-center gap-3">
              <Search className="w-5 h-5 text-[#8C857B]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search candle designs (e.g. spiral, arch, pillar, festive)..."
                className="w-full bg-transparent border-none text-base text-[#1C1917] font-medium placeholder:text-[#8C857B] focus:outline-none py-1"
                autoFocus
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#1C1917] text-[#FAF7F2] text-xs uppercase tracking-wider font-bold rounded-sm hover:bg-[#C86446]"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-2 text-[#57534E] hover:text-[#1C1917]"
              >
                <X className="w-5 h-5" />
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Mobile Slide-Out Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative ml-auto w-4/5 max-w-sm h-full bg-[#FAF7F2] p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#E7E2DA] pb-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-[#D4AF7A]">
                    <Image src="/logo.jpeg" alt="Viiaura" fill className="object-cover" />
                  </div>
                  <span className="font-display text-2xl font-bold tracking-wider text-[#1C1917] uppercase">
                    Viiaura
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-[#57534E] hover:text-[#1C1917] min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Search */}
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search catalogue..."
                  className="w-full px-4 py-3 pl-10 bg-white border border-[#E7E2DA] rounded-sm text-sm font-medium"
                />
                <Search className="w-4 h-4 text-[#8C857B] absolute left-3.5 top-3.5" />
              </form>

              {/* Links with bold touch targets */}
              <nav className="flex flex-col space-y-1 pt-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-3.5 px-2 text-sm uppercase tracking-widest font-bold text-[#1C1917] hover:text-[#C86446] border-b border-[#E7E2DA]/50"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 text-[#C86446]" />
                  </Link>
                ))}
              </nav>
            </div>

            {/* Mobile Footer CTAs */}
            <div className="space-y-3 pt-6 border-t border-[#E7E2DA]">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openEnquiry(null);
                }}
                className="w-full py-4 bg-[#1C1917] text-[#FAF7F2] text-xs uppercase tracking-widest font-bold rounded-sm shadow-md"
              >
                Send Studio Enquiry
              </button>
              <a
                href="https://wa.me/919876543210?text=Hi%20Viiaura%2C%20I%20would%20like%20to%20enquire%20about%20your%20handcrafted%20candles."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-[#1F261E] text-[#FAF7F2] text-xs uppercase tracking-widest font-bold rounded-sm flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                WhatsApp Concierge
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
