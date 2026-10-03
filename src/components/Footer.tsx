import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Mail, Phone, MapPin } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#161413] text-[#FAF7F2] border-t border-[#2A2522] pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-14 border-b border-[#2A2522]">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#D4AF7A]">
                <Image src="/logo.jpeg" alt="Viiaura" fill className="object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-3xl tracking-[0.2em] font-extrabold uppercase text-[#FAF7F2]">
                  Viiaura
                </span>
                <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#D4AF7A] font-bold">
                  Candle Art
                </span>
              </div>
            </Link>
            <p className="font-serif italic text-base text-[#D4AF7A] font-bold">
              “Inspired by Light, Crafted by Hand”
            </p>
            <p className="text-sm text-[#A8A29E] leading-relaxed max-w-sm font-normal">
              A digital catalogue and enquiry showroom for handcrafted sculptural candles and future artisanal craft pieces. Every creation is individually cast and finished by hand.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-3 bg-[#201C1A] hover:bg-[#2F2926] border border-[#3A332E] text-xs uppercase tracking-wider font-bold text-[#FAF7F2] rounded-sm transition-all"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                WhatsApp Concierge
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display text-xs uppercase tracking-[0.2em] text-[#D4AF7A] font-bold">
              Explore
            </h4>
            <ul className="space-y-3 text-sm text-[#A8A29E] font-medium">
              <li>
                <Link href="/products" className="hover:text-[#FAF7F2] transition-colors">
                  Complete Catalogue
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-[#FAF7F2] transition-colors">
                  Curated Collections
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#FAF7F2] transition-colors">
                  Inspiration Gallery
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#FAF7F2] transition-colors">
                  Atelier Philosophy
                </Link>
              </li>
            </ul>
          </div>

          {/* Collections */}
          <div className="space-y-4">
            <h4 className="font-display text-xs uppercase tracking-[0.2em] text-[#D4AF7A] font-bold">
              Collections
            </h4>
            <ul className="space-y-3 text-sm text-[#A8A29E] font-medium">
              <li>
                <Link href="/collections/sculptural" className="hover:text-[#FAF7F2] transition-colors">
                  Sculptural Candles
                </Link>
              </li>
              <li>
                <Link href="/collections/signature" className="hover:text-[#FAF7F2] transition-colors">
                  Signature Forms
                </Link>
              </li>
              <li>
                <Link href="/collections/minimalist-vessels" className="hover:text-[#FAF7F2] transition-colors">
                  Minimalist Vessels
                </Link>
              </li>
              <li>
                <Link href="/collections/festive" className="hover:text-[#FAF7F2] transition-colors">
                  Festive & Celebrations
                </Link>
              </li>
              <li>
                <Link href="/collections/curated-gifting" className="hover:text-[#FAF7F2] transition-colors">
                  Bespoke Hampers
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-4">
            <h4 className="font-display text-xs uppercase tracking-[0.2em] text-[#D4AF7A] font-bold">
              Connect
            </h4>
            <div className="space-y-3 text-sm text-[#A8A29E]">
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#C86446] mt-0.5 flex-shrink-0" />
                <span className="font-medium">concierge@viiaura.com</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#C86446] mt-0.5 flex-shrink-0" />
                <span className="font-medium">+91 98765 43210</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C86446] mt-0.5 flex-shrink-0" />
                <span className="font-medium">Atelier Studio, New Delhi, India</span>
              </div>
              <p className="text-xs text-[#78716C] pt-1 font-semibold">
                Mon – Sat: 10:00 AM – 7:00 PM IST
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-[#78716C]">
          <p>© {new Date().getFullYear()} VIIAURA Candle Art. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-terms" className="hover:text-[#FAF7F2] transition-colors">
              Privacy & Enquiry Terms
            </Link>
            <Link href="/faq" className="hover:text-[#FAF7F2] transition-colors">
              Care & Safety Guidelines
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
