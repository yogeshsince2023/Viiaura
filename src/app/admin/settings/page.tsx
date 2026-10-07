'use client';

import React, { useState } from 'react';
import { useAdmin } from '@/admin/store';
import { StoreMode, PriceDisplayPolicy } from '@/admin/types';
import {
  Settings,
  Store,
  DollarSign,
  MessageCircle,
  ShieldAlert,
  Trash2,
  RefreshCw,
  Save,
  CheckCircle,
  FileText,
  Lock,
} from 'lucide-react';

export default function AdminSettingsPage() {
  const { settings, updateSettings, auditLogs, purgeDemoData, resetToDemo } = useAdmin();

  const [mode, setMode] = useState<StoreMode>(settings.mode);
  const [priceDisplay, setPriceDisplay] = useState<PriceDisplayPolicy>(settings.priceDisplay);
  const [storeName, setStoreName] = useState(settings.storeName);
  const [businessEmail, setBusinessEmail] = useState(settings.businessEmail);
  const [businessPhone, setBusinessPhone] = useState(settings.businessPhone);
  const [whatsappNumber, setWhatsappNumber] = useState(settings.whatsappNumber);
  const [whatsappTemplate, setWhatsappTemplate] = useState(settings.whatsappTemplate);
  const [announcementText, setAnnouncementText] = useState(settings.announcementText || '');
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(settings.isMaintenanceMode);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      mode,
      priceDisplay,
      storeName,
      businessEmail,
      businessPhone,
      whatsappNumber,
      whatsappTemplate,
      announcementText,
      isMaintenanceMode,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-200/80">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
              Store & Showroom Settings
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-stone-100 text-stone-700 border border-stone-300">
              Live Configuration
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Switch showroom modes, customize concierge WhatsApp pre-fill templates, and manage studio configurations.
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-semibold">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Settings saved successfully!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8-Cols): Operational Settings */}
        <div className="lg:col-span-8 space-y-6">
          {/* Card 1: Operating Mode Switcher (The Core Switchable Architecture) */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-2">
              <div>
                <h2 className="text-sm sm:text-base font-bold text-stone-900">
                  Store Operating Mode
                </h2>
                <p className="text-xs text-stone-500">
                  Toggle whether Viiaura operates as an Enquiry-Only digital showroom or a direct Commerce store.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Option 1: Enquiry-Only */}
              <div
                onClick={() => setMode('enquiry_only')}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all space-y-2 ${
                  mode === 'enquiry_only'
                    ? 'border-[#C86446] bg-[#C86446]/5 shadow-sm'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs sm:text-sm text-stone-900">
                    Enquiry-Only Showcase
                  </span>
                  {mode === 'enquiry_only' && (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#C86446]" />
                  )}
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Cart & checkout are completely suppressed. Visitors admire designs, view atelier specs, and connect directly via WhatsApp and bespoke forms.
                </p>
                <div className="pt-2 text-[10px] font-semibold text-[#C86446] uppercase tracking-wider">
                  Recommended for Brand Launch
                </div>
              </div>

              {/* Option 2: Commerce Enabled */}
              <div
                onClick={() => setMode('commerce_enabled')}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all space-y-2 ${
                  mode === 'commerce_enabled'
                    ? 'border-emerald-600 bg-emerald-50/40 shadow-sm'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs sm:text-sm text-stone-900">
                    Commerce Enabled
                  </span>
                  {mode === 'commerce_enabled' && (
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                  )}
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Reveals the shopping bag, checkout flow, Razorpay gateway, shipping courier zones, and admin Orders module.
                </p>
                <div className="pt-2 text-[10px] font-semibold text-emerald-700 uppercase tracking-wider">
                  1-Click Switchable Anytime
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Price Visibility Policy */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200/80 shadow-sm space-y-3">
            <h2 className="text-sm font-bold text-stone-900 border-b border-stone-100 pb-2">
              Price Display Policy
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label
                className={`p-3 rounded-xl border cursor-pointer text-xs space-y-1 ${
                  priceDisplay === 'show_all'
                    ? 'border-[#C86446] bg-amber-50/40 font-semibold text-stone-900'
                    : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
              >
                <input
                  type="radio"
                  name="priceDisplay"
                  value="show_all"
                  checked={priceDisplay === 'show_all'}
                  onChange={() => setPriceDisplay('show_all')}
                  className="sr-only"
                />
                <div>Show Estimated Prices</div>
                <p className="text-[10px] font-normal text-stone-500">
                  Displays estimated MRP and sale price on all product cards.
                </p>
              </label>

              <label
                className={`p-3 rounded-xl border cursor-pointer text-xs space-y-1 ${
                  priceDisplay === 'price_on_request'
                    ? 'border-[#C86446] bg-amber-50/40 font-semibold text-stone-900'
                    : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
              >
                <input
                  type="radio"
                  name="priceDisplay"
                  value="price_on_request"
                  checked={priceDisplay === 'price_on_request'}
                  onChange={() => setPriceDisplay('price_on_request')}
                  className="sr-only"
                />
                <div>Price on Request</div>
                <p className="text-[10px] font-normal text-stone-500">
                  Hides numbers and renders "Price on Request" pill on all cards.
                </p>
              </label>

              <label
                className={`p-3 rounded-xl border cursor-pointer text-xs space-y-1 ${
                  priceDisplay === 'hide_all'
                    ? 'border-[#C86446] bg-amber-50/40 font-semibold text-stone-900'
                    : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
              >
                <input
                  type="radio"
                  name="priceDisplay"
                  value="hide_all"
                  checked={priceDisplay === 'hide_all'}
                  onChange={() => setPriceDisplay('hide_all')}
                  className="sr-only"
                />
                <div>Pure Gallery (Hide)</div>
                <p className="text-[10px] font-normal text-stone-500">
                  No pricing elements rendered anywhere on the showroom.
                </p>
              </label>
            </div>
          </div>

          {/* Card 3: WhatsApp Concierge Configuration */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200/80 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-stone-900 border-b border-stone-100 pb-2">
              WhatsApp Concierge Link Generator
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Business WhatsApp Phone Number
                </label>
                <input
                  type="text"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl font-mono text-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Atelier Concierge Email
                </label>
                <input
                  type="email"
                  value={businessEmail}
                  onChange={(e) => setBusinessEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl text-stone-900"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-stone-700">
                  Automated Message Template
                </label>
                <span className="text-[10px] text-stone-400">
                  Variables: <code className="bg-stone-100 px-1 rounded">{"{product_name}"}</code>, <code className="bg-stone-100 px-1 rounded">{"{sku}"}</code>
                </span>
              </div>
              <textarea
                rows={3}
                value={whatsappTemplate}
                onChange={(e) => setWhatsappTemplate(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl text-stone-900 font-mono leading-relaxed"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#C86446] hover:bg-[#B25338] rounded-xl shadow-md transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save Configuration</span>
            </button>
          </div>
        </div>

        {/* Right Column (4-Cols): Demo Data & Audit Log */}
        <div className="lg:col-span-4 space-y-6">
          {/* Demo Data Management Card */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>Demo Data Controls</span>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed">
              All seed data is flagged as demo. When the client is ready for production, purge all sample items in one click.
            </p>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  if (confirm('Purge all demo products, enquiries, and sample orders?')) {
                    purgeDemoData();
                    alert('All demo records removed cleanly!');
                  }
                }}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-xl text-xs font-semibold transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Purge All Demo Data (1-Click)
              </button>

              <button
                type="button"
                onClick={() => {
                  if (confirm('Reset store back to initial sample state?')) {
                    resetToDemo();
                    alert('Store reset to initial demo state!');
                  }
                }}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-medium transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Restore Sample Demo Data
              </button>
            </div>
          </div>

          {/* Audit Log Card */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-stone-100 pb-2">
              <span className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                Recent Audit Trail
              </span>
              <span className="text-[10px] text-stone-400">{auditLogs.length} events</span>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {auditLogs.slice(0, 8).map((log) => (
                <div key={log.id} className="p-2 bg-stone-50 rounded-lg border border-stone-200/70 text-[11px] space-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-stone-800">{log.action}</span>
                    <span className="text-[9px] text-stone-400">
                      {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-stone-500 text-[10px] line-clamp-2">{log.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
