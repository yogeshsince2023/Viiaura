import React from "react";
import Image from "next/image";
import { MessageCircle, Phone, Mail, MapPin, Clock, Sparkles } from "lucide-react";

export const metadata = {
  title: "Contact & Concierge | VIIAURA Candle Art",
  description: "Connect with the Viiaura studio concierge via WhatsApp, phone, or email for enquiries and bespoke candle orders.",
};

export default function ContactPage() {
  return (
    <div className="pt-24 sm:pt-28 pb-24 bg-[#FAF7F2] min-h-screen animate-page-enter">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F7EDE8] text-[#C86446]">
            <Sparkles className="w-4 h-4" />
            <span className="font-display text-xs uppercase tracking-widest font-bold">
              Studio Concierge
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1C1917] tracking-tight">
            Connect with Viiaura
          </h1>
          <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
            We are here to assist with product enquiries, custom wedding favors, interior styling consultations, and corporate gifting suites.
          </p>
        </div>

        {/* Contact Cards Grid with large touch targets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {/* Card 1: WhatsApp Priority */}
          <div className="p-8 sm:p-9 bg-[#1F261E] text-[#FAF7F2] rounded-sm space-y-5 shadow-xl flex flex-col justify-between border border-[#2F3A2E]">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-sm bg-white/10 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-[#25D366]" />
              </div>
              <span className="font-display text-xs uppercase tracking-widest text-[#D4AF7A] font-bold block">
                Primary Speed Channel
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">WhatsApp Direct</h2>
              <p className="text-sm text-[#A8A29E] leading-relaxed font-normal">
                Connect instantly with our design concierge for catalogue requests, price quotations, and bespoke timelines.
              </p>
            </div>
            <a
              href="https://wa.me/919876543210?text=Hi%20Viiaura%2C%20I%20would%20like%20to%20connect%20with%20your%20studio."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 bg-[#D4AF7A] hover:bg-[#e4be88] text-[#161413] text-xs uppercase tracking-widest font-extrabold text-center rounded-sm transition-all min-h-[48px] flex items-center justify-center shadow-md"
            >
              Start WhatsApp Chat
            </a>
          </div>

          {/* Card 2: Voice & Email */}
          <div className="p-8 sm:p-9 bg-white border border-[#E7E2DA] rounded-sm space-y-5 shadow-sm flex flex-col justify-between">
            <div className="space-y-5">
              <div className="w-12 h-12 rounded-sm bg-[#F7EDE8] text-[#C86446] flex items-center justify-center">
                <Phone className="w-6 h-6" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917]">Direct Contact</h2>
              <div className="space-y-4 text-sm text-[#44403C]">
                <div>
                  <span className="text-[#78716C] uppercase text-xs block font-bold">Phone</span>
                  <a href="tel:+919876543210" className="text-base font-bold text-[#1C1917] hover:text-[#C86446]">
                    +91 98765 43210
                  </a>
                </div>
                <div>
                  <span className="text-[#78716C] uppercase text-xs block font-bold">Email</span>
                  <a href="mailto:concierge@viiaura.com" className="text-base font-bold text-[#1C1917] hover:text-[#C86446]">
                    concierge@viiaura.com
                  </a>
                </div>
              </div>
            </div>
            <div className="pt-3 text-xs text-[#78716C] font-semibold flex items-center gap-2 border-t border-[#E7E2DA]">
              <Clock className="w-4 h-4 text-[#C86446]" /> Mon – Sat: 10:00 AM – 7:00 PM IST
            </div>
          </div>

          {/* Card 3: Atelier Location */}
          <div className="p-8 sm:p-9 bg-white border border-[#E7E2DA] rounded-sm space-y-5 shadow-sm flex flex-col justify-between">
            <div className="space-y-5">
              <div className="w-12 h-12 rounded-sm bg-[#F3EFEA] text-[#1C1917] flex items-center justify-center">
                <MapPin className="w-6 h-6 text-[#C86446]" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917]">Atelier Studio</h2>
              <p className="text-sm text-[#44403C] leading-relaxed">
                Viiaura Workshop & Design Showroom <br />
                New Delhi, National Capital Region, India
              </p>
              <p className="text-xs text-[#78716C] font-medium">
                * In-person studio visits are scheduled exclusively by advance appointment for bespoke event commissions.
              </p>
            </div>
            <a
              href="/enquire"
              className="w-full py-4 border-2 border-[#1C1917] hover:bg-[#1C1917] hover:text-white text-[#1C1917] text-xs uppercase tracking-widest font-extrabold text-center rounded-sm transition-all min-h-[48px] flex items-center justify-center"
            >
              Book Studio Appointment
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
