'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAdmin } from '@/admin/store';
import {
  Store,
  Plus,
  TrendingUp,
  TrendingDown,
  Tag,
  Inbox,
  Flame,
  MessageCircle,
  Clock,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  MoreVertical,
  Layers,
  ArrowUpRight,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { settings, enquiries, products, categories } = useAdmin();
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  // Compute metrics
  const newEnquiries = enquiries.filter((e) => e.status === 'new').length;
  const quotedEnquiries = enquiries.filter((e) => e.status === 'quoted').length;
  const wonEnquiries = enquiries.filter((e) => e.status === 'won').length;
  const totalEnquiryValue = enquiries.reduce((sum, e) => sum + (e.estimatedValue || 0), 0);

  // Daily activity bars (Mon - Sun)
  const dailyData = [
    { day: 'Mon', count: 18, height: '45%' },
    { day: 'Tue', count: 32, height: '75%' },
    { day: 'Wed', count: 14, height: '35%' },
    { day: 'Thu', count: 42, height: '95%' },
    { day: 'Fri', count: 26, height: '60%' },
    { day: 'Sat', count: 38, height: '85%' },
    { day: 'Sun', count: 20, height: '50%' },
  ];

  // Collection breakdown (Horizontal bars matching reference)
  const collectionBreakdown = [
    { name: 'Sculptural Art', share: 48, count: '14 Enquiries', color: 'bg-[#C86446]' },
    { name: 'Signature Vessels', share: 28, count: '8 Enquiries', color: 'bg-amber-600' },
    { name: 'Gifting & Hampers', share: 18, count: '5 Enquiries', color: 'bg-emerald-600' },
    { name: 'Textured Pillars', share: 6, count: '2 Enquiries', color: 'bg-stone-500' },
  ];

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
      {/* 1. Subheader Action Row (Exact Reference Alignment) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-200/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Atelier overview, live catalogue metrics & concierge lead flow.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/settings"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium text-stone-700 bg-white hover:bg-stone-50 rounded-xl border border-stone-300 shadow-sm transition-all"
          >
            <Store className="w-4 h-4 text-stone-500" />
            <span>Store Settings</span>
          </Link>
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#C86446] hover:bg-[#B25338] rounded-xl shadow-sm hover:shadow transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Product</span>
          </Link>
        </div>
      </div>

      {/* 2. Top Metric Cards Row (Spotlight Card + 2x3 Metric Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Hero Spotlight Card (Left 4-Cols on Desktop) */}
        <div className="lg:col-span-4 bg-gradient-to-br from-[#1C1917] via-[#2D2420] to-[#C86446] rounded-2xl p-6 text-white shadow-md relative overflow-hidden flex flex-col justify-between min-h-[220px]">
          {/* Subtle glowing radial background */}
          <div className="absolute top-0 right-0 w-56 h-56 bg-[#C86446]/20 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-[#FAF7F2]/80 font-medium">
                Quoted Pipeline Value
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Live Oct 2026
              </span>
            </div>
            <div className="text-3xl sm:text-4xl font-serif font-bold text-white mt-3 tracking-tight">
              {settings.currencySymbol}
              {totalEnquiryValue.toLocaleString('en-IN')}
            </div>
            <p className="text-xs text-stone-300 mt-1">
              Active bespoke enquiries & bespoke wedding/corporate commissions
            </p>
          </div>

          <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs text-stone-300">
            <span>Last Month: {settings.currencySymbol}1,68,000</span>
            <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
              <TrendingUp className="w-3.5 h-3.5" /> +32.4%
            </span>
          </div>
        </div>

        {/* 6 Compact Metric Pills (Right 8-Cols on Desktop: 3x2 Grid) */}
        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {/* Tile 1: Total Offer / Quoted */}
          <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-medium text-stone-500">Active Quotes</span>
              <div className="text-xl sm:text-2xl font-bold text-stone-900">{quotedEnquiries}</div>
              <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                <TrendingUp className="w-3 h-3" /> +12%
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#C86446] flex items-center justify-center shrink-0">
              <Tag className="w-5 h-5" />
            </div>
          </div>

          {/* Tile 2: New Enquiries */}
          <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-medium text-stone-500">New Enquiries</span>
              <div className="text-xl sm:text-2xl font-bold text-stone-900">{newEnquiries}</div>
              <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-md">
                Today
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Inbox className="w-5 h-5" />
            </div>
          </div>

          {/* Tile 3: Total Products */}
          <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-medium text-stone-500">Catalog Designs</span>
              <div className="text-xl sm:text-2xl font-bold text-stone-900">{products.length}</div>
              <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                100% Live
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
              <Flame className="w-5 h-5" />
            </div>
          </div>

          {/* Tile 4: WhatsApp Leads */}
          <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-medium text-stone-500">WhatsApp Directs</span>
              <div className="text-xl sm:text-2xl font-bold text-stone-900">
                {enquiries.filter((e) => e.source === 'whatsapp').length}
              </div>
              <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                <TrendingUp className="w-3 h-3" /> +18%
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
          </div>

          {/* Tile 5: Avg Response Time */}
          <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-medium text-stone-500">Avg Concierge</span>
              <div className="text-xl sm:text-2xl font-bold text-stone-900">1.8h</div>
              <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                -25% faster
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
          </div>

          {/* Tile 6: Won / Conversion */}
          <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-medium text-stone-500">Commission Win</span>
              <div className="text-xl sm:text-2xl font-bold text-stone-900">68%</div>
              <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                <TrendingUp className="w-3 h-3" /> +4.2%
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Visual Analytics Row (Matching Reference Bar & Donut Visuals) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Horizontal Bar: Category & Collection Interest (Left 4-Cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-stone-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-stone-900">Interest by Collection</h2>
              <p className="text-xs text-stone-500">Enquiries and custom commission requests</p>
            </div>
            <span className="text-xs font-medium text-[#C86446]">Top Categories</span>
          </div>

          <div className="space-y-3.5 pt-2">
            {collectionBreakdown.map((item) => (
              <div key={item.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-stone-700">{item.name}</span>
                  <span className="text-stone-500">{item.count}</span>
                </div>
                <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all duration-500`}
                    style={{ width: `${item.share}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
            <span>Based on 30-day enquiry velocity</span>
            <Link href="/admin/collections" className="text-[#C86446] hover:underline font-medium">
              Manage Collections →
            </Link>
          </div>
        </div>

        {/* Vertical Bar Chart: Daily Enquiry Activity (Middle 5-Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-stone-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-stone-900">Daily Enquiry Velocity</h2>
              <p className="text-xs text-stone-500">Incoming leads across WhatsApp and web form</p>
            </div>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              +19% this week
            </span>
          </div>

          {/* Interactive Bar Chart (Matching Reference Screenshot green bars & tooltip) */}
          <div className="h-44 flex items-end justify-between gap-3 pt-6 pb-2 px-2">
            {dailyData.map((d, idx) => (
              <div
                key={d.day}
                className="flex-1 flex flex-col items-center gap-2 group relative cursor-pointer"
                onMouseEnter={() => setHoveredBar(idx)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                {/* Floating tooltip */}
                {hoveredBar === idx && (
                  <div className="absolute -top-8 px-2 py-1 bg-stone-900 text-white text-[11px] rounded-md font-semibold whitespace-nowrap shadow-lg z-10">
                    {d.count} Leads
                  </div>
                )}
                <div className="w-full max-w-[28px] h-32 bg-stone-100 rounded-lg flex items-end overflow-hidden">
                  <div
                    className={`w-full rounded-lg transition-all duration-300 ${
                      hoveredBar === idx ? 'bg-[#B25338]' : 'bg-[#C86446]'
                    }`}
                    style={{ height: d.height }}
                  />
                </div>
                <span className="text-[11px] font-medium text-stone-500 group-hover:text-stone-900 transition-colors">
                  {d.day}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-stone-100 text-xs text-stone-500 flex items-center justify-between">
            <span>Peak lead hour: 7:00 PM – 10:00 PM IST</span>
            <span className="font-medium text-stone-700">Total: 190 weekly interactions</span>
          </div>
        </div>

        {/* Donut Ring: Enquiry Pipeline Status (Right 3-Cols) */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-5 border border-stone-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-semibold text-stone-900">Pipeline Stages</h2>
            <p className="text-xs text-stone-500">Live enquiry funnel</p>
          </div>

          {/* SVG Donut Chart */}
          <div className="relative flex items-center justify-center my-3">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle cx="64" cy="64" r="48" stroke="#E7E2DA" strokeWidth="12" fill="transparent" />
              {/* New: 20% */}
              <circle
                cx="64"
                cy="64"
                r="48"
                stroke="#3B82F6"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray="301.59"
                strokeDashoffset="241.27"
              />
              {/* Quoted: 40% */}
              <circle
                cx="64"
                cy="64"
                r="48"
                stroke="#F59E0B"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray="301.59"
                strokeDashoffset="180.95"
                className="transform rotate-72 origin-center"
              />
              {/* Won: 30% */}
              <circle
                cx="64"
                cy="64"
                r="48"
                stroke="#10B981"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray="301.59"
                strokeDashoffset="211.11"
                className="transform rotate-216 origin-center"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-xl font-bold text-stone-900">{enquiries.length}</span>
              <span className="text-[10px] text-stone-500 uppercase tracking-wider">Total</span>
            </div>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-stone-100">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <span className="text-stone-600">New ({newEnquiries})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="text-stone-600">Quoted ({quotedEnquiries})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-stone-600">Won ({wonEnquiries})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-stone-400" />
              <span className="text-stone-600">Other (1)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. High-Density Data Tables (Top Products & Live Enquiries) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Top Products Table (7-Cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200/80 shadow-sm overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center justify-between">
            <div>
              <h2 className="text-sm sm:text-base font-semibold text-stone-900">Featured Atelier Designs</h2>
              <p className="text-xs text-stone-500">Live catalogue items and bespoke options</p>
            </div>
            <Link
              href="/admin/products"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#C86446] hover:underline"
            >
              View All ({products.length})
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50/80 text-stone-500 font-medium border-b border-stone-200/60">
                <tr>
                  <th className="py-2.5 px-4 w-10">#</th>
                  <th className="py-2.5 px-3">Design</th>
                  <th className="py-2.5 px-3">Type</th>
                  <th className="py-2.5 px-3">Price</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {products.slice(0, 5).map((prod, idx) => (
                  <tr key={prod.id} className="hover:bg-stone-50/60 transition-colors">
                    <td className="py-3 px-4 font-mono text-stone-400">{idx + 1}</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-stone-100 border border-stone-200/60 shrink-0">
                          {prod.media[0] ? (
                            <Image
                              src={prod.media[0].url}
                              alt={prod.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-stone-400">
                              <Flame className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                        <div>
                          <Link
                            href={`/admin/products/${prod.id}`}
                            className="font-medium text-stone-900 hover:text-[#C86446] transition-colors"
                          >
                            {prod.name}
                          </Link>
                          <div className="text-[10px] text-stone-400 font-mono">{prod.sku}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-stone-500">
                      {prod.productTypeId === 'type-candle' ? 'Candle' : 'Hamper'}
                    </td>
                    <td className="py-3 px-3 font-medium text-stone-900">
                      {settings.currencySymbol}
                      {prod.variants[0]?.mrp?.toLocaleString('en-IN') || '—'}
                    </td>
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {prod.displayStatus.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/products/${prod.slug}`}
                          target="_blank"
                          title="Storefront Preview"
                          className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <Link
                          href={`/admin/products/${prod.id}`}
                          className="px-2.5 py-1 text-[11px] font-medium text-[#C86446] bg-[#C86446]/10 hover:bg-[#C86446]/20 rounded-md transition-colors"
                        >
                          Edit
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Recent Concierge Enquiries (5-Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200/80 shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center justify-between">
              <div>
                <h2 className="text-sm sm:text-base font-semibold text-stone-900">Recent Enquiries</h2>
                <p className="text-xs text-stone-500">Direct lead inbox & WhatsApp responses</p>
              </div>
              <Link
                href="/admin/enquiries"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#C86446] hover:underline"
              >
                Inbox ({enquiries.length})
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-stone-100">
              {enquiries.slice(0, 4).map((enq) => (
                <div key={enq.id} className="p-3.5 sm:p-4 hover:bg-stone-50/60 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-stone-900">{enq.customerName}</span>
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                            enq.status === 'new'
                              ? 'bg-blue-100 text-blue-700'
                              : enq.status === 'quoted'
                              ? 'bg-amber-100 text-amber-700'
                              : enq.status === 'won'
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-stone-100 text-stone-600'
                          }`}
                        >
                          {enq.status}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 mt-0.5 line-clamp-1">
                        {enq.linkedProductTitle ? `Re: ${enq.linkedProductTitle}` : enq.message}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[10px] text-stone-400">
                        {new Date(enq.createdAt).toLocaleDateString('en-IN', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-stone-100/80 text-xs">
                    <span className="text-stone-400 text-[11px] font-mono">{enq.enquiryNumber}</span>
                    <div className="flex items-center gap-2">
                      <a
                        href={`https://wa.me/${enq.customerPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                          `Hi ${enq.customerName}, Viiaura Atelier Concierge here regarding your enquiry for ${
                            enq.linkedProductTitle || 'our handcrafted collection'
                          }...`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-md transition-colors"
                      >
                        <MessageCircle className="w-3 h-3" />
                        WhatsApp
                      </a>
                      <Link
                        href={`/admin/enquiries#${enq.id}`}
                        className="px-2.5 py-1 text-[11px] font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-stone-50/80 border-t border-stone-100 text-center">
            <Link
              href="/admin/enquiries"
              className="text-xs font-semibold text-stone-600 hover:text-stone-900 inline-flex items-center gap-1"
            >
              Open Full Concierge Pipeline →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
