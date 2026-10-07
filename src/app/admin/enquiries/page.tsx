'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAdmin } from '@/admin/store';
import { Enquiry, EnquiryStatus } from '@/admin/types';
import {
  Inbox,
  Search,
  MessageCircle,
  Phone,
  Mail,
  User,
  Clock,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Download,
  Flame,
  ArrowRight,
  Filter,
  Send,
} from 'lucide-react';

export default function AdminEnquiriesPage() {
  const { enquiries, updateEnquiryStatus, addEnquiryNote } = useAdmin();

  const [activeTab, setActiveTab] = useState<'pipeline' | 'table'>('pipeline');
  const [search, setSearch] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(enquiries[0] || null);
  const [newNote, setNewNote] = useState('');

  const filteredEnquiries = enquiries.filter(
    (e) =>
      e.customerName.toLowerCase().includes(search.toLowerCase()) ||
      e.enquiryNumber.toLowerCase().includes(search.toLowerCase()) ||
      (e.linkedProductTitle && e.linkedProductTitle.toLowerCase().includes(search.toLowerCase())) ||
      e.message.toLowerCase().includes(search.toLowerCase())
  );

  const stages: { key: EnquiryStatus; label: string; color: string }[] = [
    { key: 'new', label: 'New Inquiries', color: 'border-blue-500 bg-blue-50/40 text-blue-800' },
    { key: 'contacted', label: 'In Discussion', color: 'border-purple-500 bg-purple-50/40 text-purple-800' },
    { key: 'quoted', label: 'Quoted', color: 'border-amber-500 bg-amber-50/40 text-amber-800' },
    { key: 'won', label: 'Won / Confirmed', color: 'border-emerald-500 bg-emerald-50/40 text-emerald-800' },
    { key: 'lost', label: 'Archived / Lost', color: 'border-stone-400 bg-stone-100 text-stone-600' },
  ];

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnquiry || !newNote.trim()) return;
    addEnquiryNote(selectedEnquiry.id, newNote.trim());
    setSelectedEnquiry({
      ...selectedEnquiry,
      internalNotes: [
        ...(selectedEnquiry.internalNotes || []),
        `${new Date().toLocaleDateString('en-IN')}: ${newNote.trim()}`,
      ],
    });
    setNewNote('');
  };

  const handleExportCSV = () => {
    const headers = ['Enquiry No', 'Date', 'Customer', 'Phone', 'Email', 'Product', 'Quantity', 'Status', 'Estimated Value'];
    const rows = filteredEnquiries.map((e) => [
      e.enquiryNumber,
      new Date(e.createdAt).toISOString().split('T')[0],
      `"${e.customerName}"`,
      e.customerPhone,
      e.customerEmail || '',
      `"${e.linkedProductTitle || ''}"`,
      e.quantity || 1,
      e.status,
      e.estimatedValue || 0,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `viiaura_enquiries_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-200/80">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
              Concierge Enquiries CRM
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-stone-100 text-stone-700 border border-stone-300">
              {enquiries.length} Active Leads
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Bespoke commission pipeline, WhatsApp concierge link generator, and customer consultation threads.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* View Toggle */}
          <div className="flex items-center p-1 bg-stone-200/70 rounded-xl text-xs">
            <button
              onClick={() => setActiveTab('pipeline')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeTab === 'pipeline' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600'
              }`}
            >
              Pipeline Kanban
            </button>
            <button
              onClick={() => setActiveTab('table')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeTab === 'table' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600'
              }`}
            >
              Table View
            </button>
          </div>

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-700 bg-white hover:bg-stone-50 border border-stone-300 rounded-xl shadow-sm transition-all"
          >
            <Download className="w-3.5 h-3.5 text-stone-500" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Search Toolbar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search by customer name, phone, enquiry # or product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-stone-200 rounded-xl text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#C86446]"
          />
        </div>
      </div>

      {/* PIPELINE KANBAN VIEW */}
      {activeTab === 'pipeline' && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
          {stages.map((stage) => {
            const stageEnquiries = filteredEnquiries.filter((e) => e.status === stage.key);

            return (
              <div
                key={stage.key}
                className="bg-stone-100/70 rounded-2xl p-3 flex flex-col min-h-[580px] border border-stone-200/80"
              >
                {/* Stage Header */}
                <div className="flex items-center justify-between pb-2.5 px-1 border-b border-stone-200">
                  <span className="font-bold text-xs text-stone-800">{stage.label}</span>
                  <span className="text-[11px] font-mono bg-white px-2 py-0.5 rounded-full border border-stone-300 font-semibold text-stone-600">
                    {stageEnquiries.length}
                  </span>
                </div>

                {/* Cards List */}
                <div className="space-y-2.5 pt-3 flex-1 overflow-y-auto">
                  {stageEnquiries.map((enq) => (
                    <div
                      key={enq.id}
                      onClick={() => setSelectedEnquiry(enq)}
                      className={`p-3.5 rounded-xl border bg-white shadow-sm cursor-pointer hover:shadow-md transition-all space-y-2 ${
                        selectedEnquiry?.id === enq.id ? 'ring-2 ring-[#C86446]' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-mono text-stone-400">{enq.enquiryNumber}</span>
                        <span className="text-stone-400">
                          {new Date(enq.createdAt).toLocaleDateString('en-IN', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>

                      <div>
                        <h2 className="text-xs font-bold text-stone-900">{enq.customerName}</h2>
                        <div className="text-[11px] text-stone-500 font-medium truncate">
                          {enq.linkedProductTitle || 'General Atelier Inquiry'}
                        </div>
                      </div>

                      {enq.customizationNotes && (
                        <div className="text-[10px] bg-amber-50 text-amber-800 p-1.5 rounded border border-amber-200 line-clamp-2">
                          <b>Custom:</b> {enq.customizationNotes}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-1 text-[10px]">
                        <span className="text-stone-500 font-semibold">Qty: {enq.quantity || 1}</span>
                        {enq.estimatedValue && (
                          <span className="font-mono font-bold text-stone-900">
                            ₹{enq.estimatedValue.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>

                      {/* WhatsApp 1-Click Action */}
                      <a
                        href={`https://wa.me/${enq.customerPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                          `Hi ${enq.customerName}, Viiaura Atelier Concierge here regarding your enquiry (${enq.enquiryNumber}) for ${
                            enq.linkedProductTitle || 'our handcrafted collection'
                          }...`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-full flex items-center justify-center gap-1.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg text-[11px] font-semibold transition-colors mt-2"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        Reply on WhatsApp
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* DETAIL SLIDEOVER / DRAWER FOR SELECTED ENQUIRY */}
      {selectedEnquiry && (
        <div className="bg-white rounded-2xl border border-stone-200/80 shadow-md p-5 sm:p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-serif font-bold text-stone-900">
                  {selectedEnquiry.customerName}
                </h2>
                <span className="text-xs font-mono text-stone-400">
                  {selectedEnquiry.enquiryNumber}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-stone-100 text-stone-700">
                  Source: {selectedEnquiry.source}
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                Received on {new Date(selectedEnquiry.createdAt).toLocaleString('en-IN')}
              </p>
            </div>

            {/* Change Status Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-stone-700">Stage:</span>
              <select
                value={selectedEnquiry.status}
                onChange={(e) => {
                  const newStatus = e.target.value as EnquiryStatus;
                  updateEnquiryStatus(selectedEnquiry.id, newStatus);
                  setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
                }}
                className="px-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-xl text-stone-900 font-semibold focus:outline-none focus:border-[#C86446]"
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="quoted">Quoted</option>
                <option value="won">Won / Confirmed</option>
                <option value="lost">Lost</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Column 1: Customer Details */}
            <div className="space-y-3 p-4 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                Customer Profile
              </span>
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-2 text-stone-800">
                  <Phone className="w-3.5 h-3.5 text-stone-400" />
                  <a href={`tel:${selectedEnquiry.customerPhone}`} className="hover:underline">
                    {selectedEnquiry.customerPhone}
                  </a>
                </div>
                {selectedEnquiry.customerEmail && (
                  <div className="flex items-center gap-2 text-stone-800">
                    <Mail className="w-3.5 h-3.5 text-stone-400" />
                    <a href={`mailto:${selectedEnquiry.customerEmail}`} className="hover:underline">
                      {selectedEnquiry.customerEmail}
                    </a>
                  </div>
                )}
                <div className="text-[11px] text-stone-500 pt-1">
                  Preferred Contact: <b>{selectedEnquiry.preferredContactMethod || 'WhatsApp'}</b>
                </div>
              </div>

              {/* Direct WhatsApp Responder Button */}
              <a
                href={`https://wa.me/${selectedEnquiry.customerPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  `Hi ${selectedEnquiry.customerName}, Viiaura Atelier Concierge here regarding your enquiry for ${
                    selectedEnquiry.linkedProductTitle || 'our bespoke handcrafted collection'
                  }. We would be delighted to assist you with availability and wax customization.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-1.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                Open WhatsApp Web Chat
              </a>
            </div>

            {/* Column 2: Requested Design & Specifications */}
            <div className="space-y-3 p-4 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                Requested Design
              </span>

              {selectedEnquiry.linkedProductTitle ? (
                <div className="flex items-start gap-3">
                  {selectedEnquiry.linkedProductImage && (
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-stone-200 shrink-0">
                      <Image
                        src={selectedEnquiry.linkedProductImage}
                        alt=""
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-xs text-stone-900">
                      {selectedEnquiry.linkedProductTitle}
                    </h3>
                    <div className="text-[10px] text-stone-400 font-mono">
                      {selectedEnquiry.linkedProductSku}
                    </div>
                    <div className="text-xs text-stone-700 mt-1 font-semibold">
                      Quantity: {selectedEnquiry.quantity || 1} units
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-stone-600">General consultation (No specific product linked).</p>
              )}

              {selectedEnquiry.customizationNotes && (
                <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900">
                  <span className="font-bold block text-[11px]">Bespoke Customization Request:</span>
                  {selectedEnquiry.customizationNotes}
                </div>
              )}

              <div className="p-2.5 bg-white rounded-lg border border-stone-200 text-xs text-stone-700">
                <span className="font-bold block text-[11px] text-stone-400 mb-0.5">Message:</span>
                "{selectedEnquiry.message}"
              </div>
            </div>

            {/* Column 3: Internal Atelier Notes */}
            <div className="space-y-3 p-4 bg-stone-50 rounded-xl border border-stone-200 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                  Internal Staff Notes
                </span>

                <div className="space-y-2 mt-2 max-h-36 overflow-y-auto">
                  {(!selectedEnquiry.internalNotes || selectedEnquiry.internalNotes.length === 0) ? (
                    <p className="text-[11px] text-stone-400 italic">No notes logged yet.</p>
                  ) : (
                    selectedEnquiry.internalNotes.map((note, idx) => (
                      <div key={idx} className="p-2 bg-white rounded border border-stone-200 text-[11px] text-stone-700">
                        {note}
                      </div>
                    ))
                  )}
                </div>
              </div>

              <form onSubmit={handleAddNote} className="flex items-center gap-1.5 pt-2">
                <input
                  type="text"
                  placeholder="Add note..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="flex-1 px-2.5 py-1.5 text-xs bg-white border border-stone-300 rounded-lg text-stone-900"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 text-xs font-semibold bg-stone-800 text-white rounded-lg hover:bg-stone-900"
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
