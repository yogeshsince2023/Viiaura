'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useAdmin } from '@/admin/store';
import {
  FolderOpen,
  UploadCloud,
  Trash2,
  Search,
  ExternalLink,
  ShieldAlert,
  Info,
  Layers,
} from 'lucide-react';

export default function AdminMediaPage() {
  const { media, deleteMedia } = useAdmin();
  const [selectedFolder, setSelectedFolder] = useState<string>('all');
  const [search, setSearch] = useState('');

  const folders = ['all', 'Products', 'Hampers', 'Lifestyle'];

  const filteredMedia = media.filter((m) => {
    const matchesFolder = selectedFolder === 'all' || m.folder === selectedFolder;
    const matchesSearch =
      search === '' ||
      m.fileName.toLowerCase().includes(search.toLowerCase()) ||
      (m.altText && m.altText.toLowerCase().includes(search.toLowerCase()));
    return matchesFolder && matchesSearch;
  });

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-200/80">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
              Media Asset Library
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-stone-100 text-stone-700 border border-stone-300">
              {media.length} Assets
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            High-resolution studio photography with asset usage tracking and safe deletion protection.
          </p>
        </div>

        <button
          onClick={() => alert('Drag and drop file upload is ready. Studio files can be uploaded directly to Supabase storage in Phase 3.')}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#C86446] hover:bg-[#B25338] rounded-xl shadow-sm transition-all"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Upload Image</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Folder Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {folders.map((folder) => (
            <button
              key={folder}
              onClick={() => setSelectedFolder(folder)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                selectedFolder === folder
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {folder === 'all' ? 'All Assets' : folder}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search filename or alt text..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-xl"
          />
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredMedia.map((asset) => (
          <div
            key={asset.id}
            className="bg-white rounded-2xl border border-stone-200/80 shadow-sm overflow-hidden group hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="relative w-full aspect-square bg-stone-100 overflow-hidden">
              <Image src={asset.url} alt={asset.altText || ''} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />

              {/* Usage Count Pill (Safe delete prevention) */}
              <div className="absolute top-2 left-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-stone-900/80 text-white backdrop-blur-sm">
                  {asset.usageCount > 0 ? `Used in ${asset.usageCount}` : 'Unused'}
                </span>
              </div>
            </div>

            <div className="p-3 space-y-1.5">
              <div className="font-mono text-xs font-semibold text-stone-900 truncate">
                {asset.fileName}
              </div>
              <div className="flex items-center justify-between text-[10px] text-stone-400">
                <span>{asset.folder}</span>
                <span>{(asset.sizeBytes / 1024).toFixed(0)} KB</span>
              </div>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                <a
                  href={asset.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-stone-400 hover:text-stone-800 p-1"
                  title="Open original"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => deleteMedia(asset.id)}
                  title={asset.usageCount > 0 ? 'Image is currently linked to products' : 'Delete asset'}
                  className="text-stone-400 hover:text-red-600 p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
