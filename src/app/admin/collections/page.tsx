'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAdmin } from '@/admin/store';
import { Collection } from '@/admin/types';
import {
  Sparkles,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  Layers,
  CheckCircle,
  Eye,
  EyeOff,
  Flame,
} from 'lucide-react';

export default function AdminCollectionsPage() {
  const { collections, products, addCollection, updateCollection, deleteCollection } = useAdmin();

  const [selectedCol, setSelectedCol] = useState<Collection | null>(collections[0] || null);
  const [isAdding, setIsAdding] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [story, setStory] = useState('');
  const [bannerImageUrl, setBannerImageUrl] = useState('/images/sculptural-candle.jpg');
  const [mode, setMode] = useState<'manual' | 'automatic'>('manual');
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addCollection({
      name: name.trim(),
      slug: slug.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      story: story.trim(),
      bannerImageUrl: bannerImageUrl.trim(),
      mode,
      productIds: selectedProductIds,
      isVisible: true,
      sortOrder: collections.length + 1,
    });

    setName('');
    setSlug('');
    setStory('');
    setSelectedProductIds([]);
    setIsAdding(false);
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-200/80">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
              Collections Showroom
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-stone-100 text-stone-700 border border-stone-300">
              {collections.length} Curated Series
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Curate thematic product series (Sculptural, Signature, Vessels, Festive) with editorial storytelling.
          </p>
        </div>

        <button
          onClick={() => {
            setIsAdding(true);
            setSelectedCol(null);
          }}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#C86446] hover:bg-[#B25338] rounded-xl shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Collection</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Collections Cards (5-Cols) */}
        <div className="lg:col-span-5 space-y-3">
          {collections.map((col) => {
            const isSelected = selectedCol?.id === col.id;
            return (
              <div
                key={col.id}
                onClick={() => {
                  setSelectedCol(col);
                  setIsAdding(false);
                }}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-4 ${
                  isSelected
                    ? 'bg-amber-50/50 border-[#C86446] shadow-sm'
                    : 'bg-white border-stone-200/80 hover:bg-stone-50'
                }`}
              >
                {col.bannerImageUrl && (
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                    <Image src={col.bannerImageUrl} alt={col.name} fill className="object-cover" />
                  </div>
                )}
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-xs text-stone-900">{col.name}</h3>
                    <span className="text-[10px] font-mono text-stone-400">/{col.slug}</span>
                  </div>
                  <p className="text-xs text-stone-500 line-clamp-1">{col.story}</p>
                  <div className="flex items-center justify-between pt-1 text-[11px] text-stone-400">
                    <span>{col.productIds.length} designs included</span>
                    <Link
                      href={`/collections/${col.slug}`}
                      target="_blank"
                      onClick={(e) => e.stopPropagation()}
                      className="text-[#C86446] hover:underline inline-flex items-center gap-0.5"
                    >
                      Storefront ↗
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Form / Detail Inspector (7-Cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200/80 shadow-sm p-5 sm:p-6 space-y-5">
          {isAdding ? (
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                <h2 className="text-sm font-semibold text-stone-900">Create Curated Collection</h2>
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="text-xs text-stone-500 hover:text-stone-800"
                >
                  Cancel
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Collection Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                  }}
                  placeholder="e.g. Autumn Equinox Series"
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:border-[#C86446]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl text-stone-900 font-mono focus:outline-none focus:border-[#C86446]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Curatorial Story / Narrative
                </label>
                <textarea
                  rows={3}
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  placeholder="Editorial copy explaining the theme and inspiration behind this collection..."
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:border-[#C86446]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Hero Banner Image URL
                </label>
                <input
                  type="text"
                  value={bannerImageUrl}
                  onChange={(e) => setBannerImageUrl(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl text-stone-900 font-mono"
                />
              </div>

              {/* Product Checklist */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Select Products to Include ({selectedProductIds.length})
                </label>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-2 bg-stone-50 rounded-xl border border-stone-200">
                  {products.map((p) => {
                    const isChecked = selectedProductIds.includes(p.id);
                    return (
                      <label
                        key={p.id}
                        className="flex items-center gap-2 p-2 rounded-lg bg-white border border-stone-200 text-xs cursor-pointer hover:bg-stone-50"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedProductIds([...selectedProductIds, p.id]);
                            } else {
                              setSelectedProductIds(selectedProductIds.filter((id) => id !== p.id));
                            }
                          }}
                          className="w-3.5 h-3.5 text-[#C86446] rounded"
                        />
                        <span className="truncate font-medium text-stone-800">{p.name}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#C86446] hover:bg-[#B25338] rounded-xl shadow-sm transition-all"
              >
                Create Collection
              </button>
            </form>
          ) : selectedCol ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                <div>
                  <h2 className="text-base font-bold text-stone-900">{selectedCol.name}</h2>
                  <span className="text-[10px] text-stone-400 font-mono">
                    ID: {selectedCol.id}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/collections/${selectedCol.slug}`}
                    target="_blank"
                    className="inline-flex items-center gap-1 px-3 py-1 text-xs text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#C86446]" />
                    <span>View Live</span>
                  </Link>
                  <button
                    onClick={() => {
                      if (confirm(`Delete collection "${selectedCol.name}"?`)) {
                        deleteCollection(selectedCol.id);
                        setSelectedCol(null);
                      }
                    }}
                    className="p-1.5 text-stone-400 hover:text-red-600 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Editorial Story
                  </label>
                  <p className="text-xs text-stone-600 leading-relaxed p-3 bg-stone-50 rounded-xl border border-stone-200">
                    {selectedCol.story}
                  </p>
                </div>

                {selectedCol.bannerImageUrl && (
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Banner Image
                    </label>
                    <div className="relative w-full h-36 rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                      <Image
                        src={selectedCol.bannerImageUrl}
                        alt=""
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Included Products ({selectedCol.productIds.length})
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {products
                      .filter((p) => selectedCol.productIds.includes(p.id))
                      .map((p) => (
                        <div
                          key={p.id}
                          className="flex items-center gap-2.5 p-2 bg-stone-50 rounded-xl border border-stone-200 text-xs"
                        >
                          <div className="w-8 h-8 rounded-lg bg-stone-200 relative overflow-hidden shrink-0">
                            {p.media[0] && (
                              <Image src={p.media[0].url} alt="" fill className="object-cover" />
                            )}
                          </div>
                          <span className="truncate font-semibold text-stone-800">{p.name}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-stone-400">
              <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-xs">Select a collection on the left or create a new one.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
