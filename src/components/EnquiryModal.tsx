"use client";

import React, { useState, useEffect } from "react";
import { useEnquiry } from "@/context/EnquiryContext";
import { PRODUCTS } from "@/data/products";
import { X, CheckCircle2, MessageCircle, Phone, ArrowRight, Loader2 } from "lucide-react";

export const EnquiryModal: React.FC = () => {
  const { isOpen, selectedProduct, closeEnquiry } = useEnquiry();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("1 - 5 pieces");
  const [contactMethod, setContactMethod] = useState<"whatsapp" | "call" | "email">("whatsapp");
  const [message, setMessage] = useState("");
  const [customization, setCustomization] = useState("");
  const [consent, setConsent] = useState(true);

  // States: 'idle' | 'submitting' | 'success'
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [refId, setRefId] = useState("");

  useEffect(() => {
    if (selectedProduct) {
      setProductId(selectedProduct.id);
      setMessage(
        `Hi Viiaura, I am interested in ${selectedProduct.name} (${selectedProduct.sku}). Please share details regarding pricing, custom tint options, and availability.`
      );
    } else {
      setProductId("");
      setMessage("Hi Viiaura, I would like to enquire about your handcrafted candle collection.");
    }
    setFormStatus("idle");
    setErrors({});
  }, [selectedProduct, isOpen]);

  if (!isOpen) return null;

  const currentProduct = PRODUCTS.find((p) => p.id === productId) || selectedProduct;

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!fullName.trim()) errs.fullName = "Please provide your full name.";
    if (!phone.trim() || phone.replace(/\D/g, "").length < 10) {
      errs.phone = "Please enter a valid 10-digit mobile / WhatsApp number.";
    }
    if (!message.trim()) errs.message = "Please enter your requirement or question.";
    if (!consent) errs.consent = "Please confirm your consent to be contacted.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setFormStatus("submitting");

    setTimeout(() => {
      const generatedRef = `VII-ENQ-${Math.floor(1000 + Math.random() * 9000)}`;
      setRefId(generatedRef);
      setFormStatus("success");
    }, 900);
  };

  const generateWhatsAppUrl = () => {
    const targetProduct = currentProduct;
    const text = targetProduct
      ? `Hi Viiaura, I am interested in ${targetProduct.name} (SKU: ${targetProduct.sku}). Please share details regarding price, availability and customization options.`
      : `Hi Viiaura, I would like to enquire regarding your candle collection and bespoke creations.`;
    return `https://wa.me/919876543210?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#FAF7F2] border border-[#E7E2DA] rounded-sm shadow-2xl p-6 sm:p-8"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={closeEnquiry}
          className="absolute top-5 right-5 p-2 text-[#57534E] hover:text-[#1C1917] hover:bg-[#F3EFEA] rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {formStatus === "success" ? (
          <div className="py-8 text-center space-y-5 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F7EDE8] text-[#C86446]">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <div className="space-y-2">
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1917]">
                Thank You, {fullName || "Kind Patron"}
              </h2>
              <p className="text-sm uppercase tracking-widest text-[#C86446] font-medium">
                Enquiry Received · Ref: #{refId}
              </p>
            </div>
            <p className="max-w-md mx-auto text-sm text-[#57534E] leading-relaxed">
              We have received your enquiry for{" "}
              <strong className="text-[#1C1917]">
                {currentProduct ? currentProduct.name : "Viiaura Candle Art"}
              </strong>
              . Our studio concierge will contact you via {contactMethod.toUpperCase()} within 24 hours.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#1F261E] hover:bg-[#2B352A] text-[#FAF7F2] text-xs uppercase tracking-widest font-medium rounded-sm transition-all"
              >
                <MessageCircle className="w-4 h-4 text-[#D4AF7A]" />
                Open in WhatsApp Now
              </a>
              <button
                onClick={closeEnquiry}
                className="w-full sm:w-auto px-6 py-3 border border-[#E7E2DA] hover:bg-[#F3EFEA] text-[#1C1917] text-xs uppercase tracking-widest font-medium rounded-sm transition-all"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-1.5 border-b border-[#E7E2DA] pb-4">
              <span className="text-[11px] uppercase tracking-widest text-[#C86446] font-semibold">
                Studio Concierge
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#1C1917]">
                Direct Catalogue Enquiry
              </h2>
              <p className="text-xs text-[#57534E]">
                Enquire about pricing, custom wax tints, made-to-order timelines, and gifting hampers.
              </p>
            </div>

            {/* Quick WhatsApp Bypass Banner */}
            <div className="flex items-center justify-between p-3.5 bg-[#F3EFEA] border border-[#E7E2DA] rounded-sm">
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#C86446]" />
                <span className="text-xs font-medium text-[#1C1917]">
                  Prefer instant chat with our studio?
                </span>
              </div>
              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#C86446] hover:text-[#B25338] transition-colors"
              >
                WhatsApp Direct <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="block text-[11px] uppercase tracking-wider text-[#57534E] font-medium">
                    Full Name <span className="text-[#C86446]">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Priya Sharma"
                    className={`w-full px-3.5 py-2.5 bg-white border text-sm text-[#1C1917] rounded-sm placeholder:text-[#8C857B] focus:outline-none focus:ring-1 focus:ring-[#C86446] ${
                      errors.fullName ? "border-red-500" : "border-[#E7E2DA]"
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-red-600 font-medium">{errors.fullName}</p>
                  )}
                </div>

                {/* Mobile / WhatsApp */}
                <div className="space-y-1">
                  <label className="block text-[11px] uppercase tracking-wider text-[#57534E] font-medium">
                    Mobile / WhatsApp <span className="text-[#C86446]">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className={`w-full px-3.5 py-2.5 bg-white border text-sm text-[#1C1917] rounded-sm placeholder:text-[#8C857B] focus:outline-none focus:ring-1 focus:ring-[#C86446] ${
                      errors.phone ? "border-red-500" : "border-[#E7E2DA]"
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-[11px] text-red-600 font-medium">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Email Address */}
                <div className="space-y-1">
                  <label className="block text-[11px] uppercase tracking-wider text-[#57534E] font-medium">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="priya@example.com"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E7E2DA] text-sm text-[#1C1917] rounded-sm placeholder:text-[#8C857B] focus:outline-none focus:ring-1 focus:ring-[#C86446]"
                  />
                </div>

                {/* Product Select */}
                <div className="space-y-1">
                  <label className="block text-[11px] uppercase tracking-wider text-[#57534E] font-medium">
                    Candle Design of Interest
                  </label>
                  <select
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E7E2DA] text-sm text-[#1C1917] rounded-sm focus:outline-none focus:ring-1 focus:ring-[#C86446]"
                  >
                    <option value="">General Studio Enquiry (No Specific Piece)</option>
                    {PRODUCTS.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.sku})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Quantity */}
                <div className="space-y-1">
                  <label className="block text-[11px] uppercase tracking-wider text-[#57534E] font-medium">
                    Estimated Quantity
                  </label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E7E2DA] text-sm text-[#1C1917] rounded-sm focus:outline-none focus:ring-1 focus:ring-[#C86446]"
                  >
                    <option value="1 - 2 pieces">1 – 2 pieces (Personal order)</option>
                    <option value="3 - 10 pieces">3 – 10 pieces (Curated set)</option>
                    <option value="10 - 50 pieces">10 – 50 pieces (Event / Festive favors)</option>
                    <option value="50+ pieces">50+ pieces (Corporate / Wedding banquet)</option>
                  </select>
                </div>

                {/* Preferred Contact Method */}
                <div className="space-y-1">
                  <label className="block text-[11px] uppercase tracking-wider text-[#57534E] font-medium">
                    Preferred Response Channel
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "whatsapp", label: "WhatsApp", icon: MessageCircle },
                      { id: "call", label: "Call", icon: Phone },
                      { id: "email", label: "Email", icon: ArrowRight },
                    ].map((m) => {
                      const Icon = m.icon;
                      const active = contactMethod === m.id;
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setContactMethod(m.id as any)}
                          className={`flex items-center justify-center gap-1.5 py-2.5 px-2 border text-xs font-medium rounded-sm transition-all ${
                            active
                              ? "bg-[#1C1917] text-[#FAF7F2] border-[#1C1917]"
                              : "bg-white text-[#57534E] border-[#E7E2DA] hover:bg-[#F3EFEA]"
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          {m.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Requirement / Message */}
              <div className="space-y-1">
                <label className="block text-[11px] uppercase tracking-wider text-[#57534E] font-medium">
                  Your Requirement or Query <span className="text-[#C86446]">*</span>
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what you are looking for..."
                  className={`w-full px-3.5 py-2 bg-white border text-sm text-[#1C1917] rounded-sm placeholder:text-[#8C857B] focus:outline-none focus:ring-1 focus:ring-[#C86446] ${
                    errors.message ? "border-red-500" : "border-[#E7E2DA]"
                  }`}
                />
                {errors.message && (
                  <p className="text-[11px] text-red-600 font-medium">{errors.message}</p>
                )}
              </div>

              {/* Customization Details */}
              <div className="space-y-1">
                <label className="block text-[11px] uppercase tracking-wider text-[#57534E] font-medium">
                  Customization Requirements (Optional)
                </label>
                <input
                  type="text"
                  value={customization}
                  onChange={(e) => setCustomization(e.target.value)}
                  placeholder="e.g. Specific color tint, ribbon monogram, or delivery date requirement"
                  className="w-full px-3.5 py-2 bg-white border border-[#E7E2DA] text-sm text-[#1C1917] rounded-sm placeholder:text-[#8C857B] focus:outline-none focus:ring-1 focus:ring-[#C86446]"
                />
              </div>

              {/* Consent Checkbox */}
              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="consent"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 rounded border-[#E7E2DA] text-[#C86446] focus:ring-[#C86446]"
                />
                <label htmlFor="consent" className="text-xs text-[#57534E] leading-tight">
                  I agree to receive a quotation and bespoke order consultation from the Viiaura team.
                </label>
              </div>
              {errors.consent && (
                <p className="text-[11px] text-red-600 font-medium">{errors.consent}</p>
              )}

              {/* Form Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-[#E7E2DA]">
                <button
                  type="button"
                  onClick={closeEnquiry}
                  className="w-full sm:w-auto px-5 py-2.5 text-xs uppercase tracking-wider text-[#57534E] hover:text-[#1C1917] font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formStatus === "submitting"}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 bg-[#1C1917] hover:bg-[#C86446] text-[#FAF7F2] text-xs uppercase tracking-widest font-medium rounded-sm transition-all disabled:opacity-50"
                >
                  {formStatus === "submitting" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting Enquiry...
                    </>
                  ) : (
                    "Send Enquiry to Studio"
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
