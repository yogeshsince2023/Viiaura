'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAdmin } from '@/admin/store';
import { Product } from '@/admin/types';
import {
  Package,
  Plus,
  Search,
  Filter,
  Trash2,
  Copy,
  ExternalLink,
  Edit3,
  SlidersHorizontal,
  ChevronDown,
  Download,
  Flame,
  CheckSquare,
  Square,
  AlertCircle,
} from 'lucide-react';

export default function AdminProductsPage() {
  const { products, categories, productTypes, settings, deleteProduct, duplicateProduct } = useAdmin();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Filtered products
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      // Search
      const matchesSearch =
        search === '' ||
        prod.name.toLowerCase().includes(search.toLowerCase()) ||
        prod.sku.toLowerCase().includes(search.toLowerCase()) ||
        prod.shortDescription.toLowerCase().includes(search.toLowerCase());

      // Category
      const matchesCategory =
        selectedCategory === 'all' || prod.categoryIds.includes(selectedCategory);

      // Product Type
      const matchesType = selectedType === 'all' || prod.productTypeId === selectedType;

      // Status
      const matchesStatus =
        selectedStatus === 'all' || prod.displayStatus === selectedStatus;

      return matchesSearch && matchesCategory && matchesType && matchesStatus;
    });
  }, [products, search, selectedCategory, selectedType, selectedStatus]);

  // Bulk actions
  const toggleSelectAll = () => {
    if (selectedIds.length === filteredProducts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredProducts.map((p) => p.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = () => {
    if (confirm(`Are you sure you want to delete ${selectedIds.length} selected products?`)) {
      selectedIds.forEach((id) => deleteProduct(id));
      setSelectedIds([]);
    }
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'SKU', 'Name', 'Slug', 'Type', 'Price', 'Status', 'PublishState'];
    const rows = filteredProducts.map((p) => [
      p.id,
      p.sku,
      `"${p.name.replace(/"/g, '""')}"`,
      p.slug,
      p.productTypeId,
      p.variants[0]?.mrp || 0,
      p.displayStatus,
      p.publishState,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `viiaura_catalogue_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-5">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-200/80">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
              Products Catalogue
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-stone-100 text-stone-700 border border-stone-300">
              {products.length} Items
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Manage handcrafted designs, dynamic custom attributes, variants and made-to-order statuses.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-700 bg-white hover:bg-stone-50 border border-stone-300 rounded-xl shadow-sm transition-all"
          >
            <Download className="w-3.5 h-3.5 text-stone-500" />
            <span>Export CSV</span>
          </button>
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#C86446] hover:bg-[#B25338] rounded-xl shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </Link>
        </div>
      </div>

      {/* Filter and Bulk Action Toolbar */}
      <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-stone-200/80 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search design, SKU or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#C86446] focus:bg-white transition-all"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full appearance-none px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl text-stone-800 focus:outline-none focus:border-[#C86446] focus:bg-white transition-all"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
          </div>

          {/* Product Type Filter */}
          <div className="relative">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full appearance-none px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl text-stone-800 focus:outline-none focus:border-[#C86446] focus:bg-white transition-all"
            >
              <option value="all">All Product Types</option>
              {productTypes.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
          </div>

          {/* Display Status */}
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full appearance-none px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl text-stone-800 focus:outline-none focus:border-[#C86446] focus:bg-white transition-all"
            >
              <option value="all">All Statuses</option>
              <option value="available">Available</option>
              <option value="made_to_order">Made to Order</option>
              <option value="limited">Limited Edition</option>
              <option value="enquire">Enquire Only</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
          </div>
        </div>

        {/* Selected Batch Actions Bar */}
        {selectedIds.length > 0 && (
          <div className="flex items-center justify-between p-2.5 bg-stone-900 text-white rounded-xl text-xs">
            <span className="font-semibold">
              {selectedIds.length} {selectedIds.length === 1 ? 'product' : 'products'} selected
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleBulkDelete}
                className="inline-flex items-center gap-1 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete Selected
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Data Table */}
      <div className="bg-white rounded-2xl border border-stone-200/80 shadow-sm overflow-hidden">
        {filteredProducts.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
              <Package className="w-6 h-6" />
            </div>
            <h2 className="text-base font-semibold text-stone-800">No products match your filters</h2>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Try adjusting your search query, or clear filters to view the full catalogue.
            </p>
            <button
              onClick={() => {
                setSearch('');
                setSelectedCategory('all');
                setSelectedType('all');
                setSelectedStatus('all');
              }}
              className="px-4 py-1.5 text-xs font-medium text-[#C86446] bg-[#C86446]/10 rounded-lg hover:bg-[#C86446]/20 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50/80 text-stone-500 font-semibold border-b border-stone-200/60 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4 w-10">
                    <button
                      onClick={toggleSelectAll}
                      className="text-stone-400 hover:text-stone-700"
                    >
                      {selectedIds.length === filteredProducts.length ? (
                        <CheckSquare className="w-4 h-4 text-[#C86446]" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </button>
                  </th>
                  <th className="py-3 px-3">Design & SKU</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Type</th>
                  <th className="py-3 px-3">Attributes Preview</th>
                  <th className="py-3 px-3">Price</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {filteredProducts.map((prod) => {
                  const isSelected = selectedIds.includes(prod.id);
                  const type = productTypes.find((t) => t.id === prod.productTypeId);
                  const cat = categories.find((c) => prod.categoryIds.includes(c.id));

                  return (
                    <tr
                      key={prod.id}
                      className={`hover:bg-stone-50/70 transition-colors ${
                        isSelected ? 'bg-amber-50/30' : ''
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => toggleSelectOne(prod.id)}
                          className="text-stone-400 hover:text-stone-700"
                        >
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-[#C86446]" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </button>
                      </td>

                      {/* Thumbnail, Name & SKU */}
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-stone-100 border border-stone-200/80 shrink-0">
                            {prod.media[0] ? (
                              <Image
                                src={prod.media[0].url}
                                alt={prod.name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-stone-400">
                                <Flame className="w-5 h-5" />
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <Link
                                href={`/admin/products/${prod.id}`}
                                className="font-semibold text-stone-900 hover:text-[#C86446] transition-colors"
                              >
                                {prod.name}
                              </Link>
                              {prod.isDemo && (
                                <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-100 text-amber-800">
                                  DEMO
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-stone-400 font-mono mt-0.5">
                              {prod.sku}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-stone-100 text-stone-700">
                          {cat?.name || 'Uncategorized'}
                        </span>
                      </td>

                      {/* Type */}
                      <td className="py-3.5 px-3 text-stone-600 font-medium">
                        {type?.name || 'Standard'}
                      </td>

                      {/* Dynamic Attributes Preview */}
                      <td className="py-3.5 px-3">
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {Object.entries(prod.attributeValues)
                            .slice(0, 2)
                            .map(([key, val]) => (
                              <span
                                key={key}
                                className="text-[10px] px-1.5 py-0.5 rounded bg-stone-100 text-stone-600 border border-stone-200"
                              >
                                {key.replace('_', ' ')}: <b className="text-stone-900">{String(val)}</b>
                              </span>
                            ))}
                        </div>
                      </td>

                      {/* Price */}
                      <td className="py-3.5 px-3">
                        <div className="font-bold text-stone-900">
                          {settings.currencySymbol}
                          {prod.variants[0]?.mrp?.toLocaleString('en-IN') || '—'}
                        </div>
                        {prod.variants[0]?.salePrice && (
                          <div className="text-[10px] text-emerald-600 font-medium">
                            Sale: {settings.currencySymbol}
                            {prod.variants[0].salePrice.toLocaleString('en-IN')}
                          </div>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                            prod.displayStatus === 'available'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : prod.displayStatus === 'made_to_order'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : prod.displayStatus === 'limited'
                              ? 'bg-purple-50 text-purple-700 border-purple-200'
                              : 'bg-stone-100 text-stone-700 border-stone-200'
                          }`}
                        >
                          {prod.displayStatus.replace('_', ' ')}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/products/${prod.slug}`}
                            target="_blank"
                            title="Storefront Preview"
                            className="p-1.5 text-stone-400 hover:text-stone-800 hover:bg-stone-100 rounded-lg transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => duplicateProduct(prod.id)}
                            title="Duplicate Product"
                            className="p-1.5 text-stone-400 hover:text-stone-800 hover:bg-stone-100 rounded-lg transition-colors"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <Link
                            href={`/admin/products/${prod.id}`}
                            className="p-1.5 text-[#C86446] hover:bg-[#C86446]/10 rounded-lg transition-colors"
                            title="Edit Product"
                          >
                            <Edit3 className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => {
                              if (confirm(`Delete "${prod.name}"?`)) deleteProduct(prod.id);
                            }}
                            title="Delete"
                            className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
