import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export const metadata = {
  title: "Privacy & Terms | VIIAURA Candle Art",
  description: "Privacy policy, catalogue enquiry terms, and bespoke commission terms for Viiaura.",
};

export default function PrivacyTermsPage() {
  return (
    <div className="pt-24 sm:pt-28 pb-24 bg-[#FAF7F2] min-h-screen animate-page-enter">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#57534E] hover:text-[#1C1917] font-extrabold"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="space-y-3 border-b border-[#E7E2DA] pb-6">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#C86446] font-bold">
            <Shield className="w-4 h-4" /> Legal & Policies
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-[#1C1917]">
            Privacy & Catalogue Terms
          </h1>
          <p className="text-xs text-[#78716C] font-semibold">Last updated: October 2026</p>
        </div>

        <div className="space-y-8 text-sm sm:text-base text-[#44403C] leading-relaxed bg-white border border-[#E7E2DA] rounded-sm p-8 sm:p-10 shadow-sm">
          <section className="space-y-2.5">
            <h2 className="font-serif text-2xl font-bold text-[#1C1917]">1. Nature of the Website</h2>
            <p>
              Viiaura is a digital presentation catalogue and enquiry showroom. This platform does not process automated credit card transactions, host consumer e-commerce shopping carts, or store customer account passwords. All orders and bespoke commissions are negotiated and confirmed directly through WhatsApp and official studio communication channels.
            </p>
          </section>

          <section className="space-y-2.5">
            <h2 className="font-serif text-2xl font-bold text-[#1C1917]">2. Enquiry Data & Privacy</h2>
            <p>
              When you submit your name, phone number, email address, or bespoke requirements via our website forms or WhatsApp links, we use this information exclusively to respond to your inquiry, provide quotations, and coordinate artisanal production. We do not sell, rent, or distribute personal information to third-party marketing services.
            </p>
          </section>

          <section className="space-y-2.5">
            <h2 className="font-serif text-2xl font-bold text-[#1C1917]">3. Handcrafted Product Variations</h2>
            <p>
              Because every candle is hand-poured in artisanal studio batches using natural botanical wax blends, minor natural variations in texture, shade, and wax frosting are organic characteristics of authentic candle craft and are not defects.
            </p>
          </section>

          <section className="space-y-2.5">
            <h2 className="font-serif text-2xl font-bold text-[#1C1917]">4. Bespoke & Made-to-Order Policies</h2>
            <p>
              Custom orders (including custom wax pantone tinting, monogram gift packaging, and bulk event favors) require upfront confirmation following quotation. Production timelines are mutually agreed upon in writing prior to casting.
            </p>
          </section>

          <section className="space-y-2.5">
            <h2 className="font-serif text-2xl font-bold text-[#1C1917]">5. Contact Regarding Policies</h2>
            <p>
              If you have any questions regarding our terms or privacy practices, please contact our studio at{" "}
              <a href="mailto:concierge@viiaura.com" className="text-[#C86446] font-bold underline">
                concierge@viiaura.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
