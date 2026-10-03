"use client";

import React, { useState } from "react";
import { PRODUCTS } from "@/data/products";
import { MessageCircle, Phone, Mail, CheckCircle2, Loader2, Sparkles } from "lucide-react";

export default function EnquirePage() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("1 - 5 pieces");
  const [contactMethod, setContactMethod] = useState<"whatsapp" | "call" | "email">("whatsapp");
  const [message, setMessage] = useState("");
  const [customization, setCustomization] = useState("");
  const [consent, setConsent] = useState(true);

  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [refId, setRefId] = useState("");

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!fullName.trim()) errs.fullName = "Please provide your full name.";
    if (!phone.trim() || phone.replace(/\D/g, "").length < 10) {
      errs.phone = "Please enter a valid 10-digit mobile or WhatsApp number.";
    }
    if (!message.trim()) errs.message = "Please share your requirement or query.";
    if (!consent) errs.consent = "Please confirm consent to be contacted.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setFormStatus("submitting");
    setTimeout(() => {
      setRefId(`VII-ENQ-${Math.floor(1000 + Math.random() * 9000)}`);
      setFormStatus("success");
    }, 800);
  };

  const selectedProduct = PRODUCTS.find((p) => p.id === productId);

  const generateWhatsAppUrl = () => {
    const text = selectedProduct
      ? `Hi Viiaura, I am interested in ${selectedProduct.name} (${selectedProduct.sku}). Please share price, availability and bespoke options.`
      : `Hi Viiaura, I would like to make an enquiry regarding your handcrafted candle collection.`;
    return `https://wa.me/919876543210?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="pt-24 sm:pt-28 pb-24 bg-[#FAF7F2] min-h-screen animate-page-enter">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F7EDE8] text-[#C86446]">
            <Sparkles className="w-4 h-4" />
            <span className="font-display text-xs uppercase tracking-widest font-bold">
              Studio Concierge
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1C1917] tracking-tight">
            Enquire with Viiaura
          </h1>
          <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
            We operate as a digital showroom and atelier. Whether you are enquiring about single sculptural pieces, wedding favor gifts, or custom wax tinting, our concierge will respond promptly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Quick Info & Direct Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-7 bg-white border border-[#E7E2DA] rounded-sm space-y-6 shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-[#1C1917]">Direct Concierge Channels</h2>
              <div className="space-y-5 text-sm text-[#57534E]">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-sm bg-[#1F261E] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    <MessageCircle className="w-5 h-5 text-[#25D366]" />
                  </div>
                  <div>
                    <span className="font-bold text-[#1C1917] text-base block">WhatsApp Priority</span>
                    <a
                      href={generateWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-[#C86446] hover:underline"
                    >
                      +91 98765 43210 (Tap to Chat)
                    </a>
                    <span className="text-xs text-[#78716C] block pt-0.5">Average response: &lt; 2 hours</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-sm bg-[#FAF7F2] border border-[#E7E2DA] text-[#1C1917] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#C86446]" />
                  </div>
                  <div>
                    <span className="font-bold text-[#1C1917] text-base block">Telephone</span>
                    <span className="font-medium">+91 98765 43210</span>
                    <span className="text-xs text-[#78716C] block pt-0.5">10:00 AM – 7:00 PM IST</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-sm bg-[#FAF7F2] border border-[#E7E2DA] text-[#1C1917] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#C86446]" />
                  </div>
                  <div>
                    <span className="font-bold text-[#1C1917] text-base block">Studio Email</span>
                    <span className="font-medium">concierge@viiaura.com</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-7 bg-[#F3EFEA] border border-[#E7E2DA] rounded-sm space-y-3 shadow-sm">
              <h3 className="font-serif text-xl font-bold text-[#1C1917]">Bespoke Order Timeline</h3>
              <p className="text-sm text-[#44403C] leading-relaxed">
                Because every sculptural piece is poured in small batches, please allow 3–5 working days for individual orders and 10–14 days for bespoke bulk favor sets.
              </p>
            </div>
          </div>

          {/* Right Column: Web Enquiry Form */}
          <div className="lg:col-span-7 bg-white border border-[#E7E2DA] rounded-sm p-7 sm:p-9 shadow-md">
            {formStatus === "success" ? (
              <div className="py-12 text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-[#F7EDE8] text-[#C86446] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#1C1917]">Enquiry Confirmed</h3>
                <p className="font-display text-sm uppercase tracking-widest text-[#C86446] font-bold">
                  Reference: #{refId}
                </p>
                <p className="text-sm sm:text-base text-[#44403C] max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{fullName}</strong>. Our team has received your enquiry and will respond via {contactMethod.toUpperCase()} at {phone} within 24 hours.
                </p>
                <div className="pt-5 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={generateWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-[#1F261E] text-white text-xs uppercase tracking-widest font-extrabold rounded-sm inline-flex items-center gap-2.5 shadow-md"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366]" /> Chat on WhatsApp Now
                  </a>
                  <button
                    onClick={() => {
                      setFormStatus("idle");
                      setFullName("");
                      setPhone("");
                      setMessage("");
                    }}
                    className="px-8 py-4 border-2 border-[#E7E2DA] text-xs uppercase tracking-widest font-bold rounded-sm hover:bg-[#F3EFEA]"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] border-b border-[#E7E2DA] pb-4">
                  Send Written Enquiry
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider text-[#44403C] font-bold block">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Ananya Roy"
                      className={`w-full px-4 py-3 bg-[#FAF7F2] border text-sm sm:text-base text-[#1C1917] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#C86446] min-h-[48px] ${
                        errors.fullName ? "border-red-500" : "border-[#E7E2DA]"
                      }`}
                    />
                    {errors.fullName && <p className="text-xs text-red-600 font-bold">{errors.fullName}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider text-[#44403C] font-bold block">
                      Mobile / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className={`w-full px-4 py-3 bg-[#FAF7F2] border text-sm sm:text-base text-[#1C1917] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#C86446] min-h-[48px] ${
                        errors.phone ? "border-red-500" : "border-[#E7E2DA]"
                      }`}
                    />
                    {errors.phone && <p className="text-xs text-red-600 font-bold">{errors.phone}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider text-[#44403C] font-bold block">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ananya@example.com"
                      className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#E7E2DA] text-sm sm:text-base text-[#1C1917] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#C86446] min-h-[48px]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider text-[#44403C] font-bold block">
                      Select Candle Design
                    </label>
                    <select
                      value={productId}
                      onChange={(e) => setProductId(e.target.value)}
                      className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#E7E2DA] text-sm sm:text-base text-[#1C1917] font-semibold rounded-sm focus:outline-none focus:ring-2 focus:ring-[#C86446] min-h-[48px]"
                    >
                      <option value="">General Studio Enquiry</option>
                      {PRODUCTS.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-[#44403C] font-bold block">
                    Your Requirement or Question *
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what pieces, colors, or quantities you need details on..."
                    className={`w-full px-4 py-3 bg-[#FAF7F2] border text-sm sm:text-base text-[#1C1917] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#C86446] ${
                      errors.message ? "border-red-500" : "border-[#E7E2DA]"
                    }`}
                  />
                  {errors.message && <p className="text-xs text-red-600 font-bold">{errors.message}</p>}
                </div>

                <div className="flex items-start gap-2.5 pt-2">
                  <input
                    type="checkbox"
                    id="page-consent"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 rounded border-[#E7E2DA] text-[#C86446] focus:ring-[#C86446] w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="page-consent" className="text-xs sm:text-sm text-[#57534E] leading-normal cursor-pointer font-medium">
                    I agree to be contacted by Viiaura regarding this catalogue enquiry.
                  </label>
                </div>
                {errors.consent && <p className="text-xs text-red-600 font-bold">{errors.consent}</p>}

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className="w-full py-4 bg-[#1C1917] hover:bg-[#C86446] text-[#FAF7F2] text-xs uppercase tracking-widest font-extrabold rounded-sm transition-all flex items-center justify-center gap-2 min-h-[50px] shadow-lg cursor-pointer"
                  >
                    {formStatus === "submitting" ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" /> Submitting Enquiry...
                      </>
                    ) : (
                      "Submit Studio Enquiry"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
