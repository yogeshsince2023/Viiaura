'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAdmin } from '@/admin/store';
import { Product, ProductVariant } from '@/admin/types';
import {
  Save,
  ArrowLeft,
  ExternalLink,
  Layers,
  Sparkles,
  SlidersHorizontal,
  DollarSign,
  Image as ImageIcon,
  Search,
  CheckCircle,
  Plus,
  Trash2,
  AlertCircle,
} from 'lucide-react';

interface ProductEditorProps {
  initialProduct?: Product;
}

export const ProductEditor: React.FC<ProductEditorProps> = ({ initialProduct }) => {
  const router = useRouter();
  const { products, productTypes, categories, collections, settings, addProduct, updateProduct } = useAdmin();

  const isEditing = Boolean(initialProduct);

  // Form State
  const [activeTab, setActiveTab] = useState<'general' | 'attributes' | 'variants' | 'media' | 'seo'>('general');
  const [name, setName] = useState(initialProduct?.name || '');
  const [slug, setSlug] = useState(initialProduct?.slug || '');
  const [sku, setSku] = useState(initialProduct?.sku || '');
  const [shortDescription, setShortDescription] = useState(initialProduct?.shortDescription || '');
  const [fullDescription, setFullDescription] = useState(initialProduct?.fullDescription || '');
  const [productTypeId, setProductTypeId] = useState(initialProduct?.productTypeId || productTypes[0]?.id || '');
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>(initialProduct?.categoryIds || []);
  const [selectedCollectionIds, setSelectedCollectionIds] = useState<string[]>(initialProduct?.collectionIds || []);
  const [badges, setBadges] = useState<string[]>(initialProduct?.badges || ['New']);
  const [newBadgeInput, setNewBadgeInput] = useState('');
  const [displayStatus, setDisplayStatus] = useState<Product['displayStatus']>(initialProduct?.displayStatus || 'available');
  const [publishState, setPublishState] = useState<Product['publishState']>(initialProduct?.publishState || 'published');
  const [customizationEnabled, setCustomizationEnabled] = useState(initialProduct?.customizationEnabled || false);
  const [customizationPrompt, setCustomizationPrompt] = useState(initialProduct?.customizationPrompt || '');

  // Dynamic Attribute Values (Map of slug -> value)
  const [attributeValues, setAttributeValues] = useState<Record<string, any>>(initialProduct?.attributeValues || {});

  // Pricing & Default Variant
  const defaultVar = initialProduct?.variants[0] || {
    id: `var-${Date.now()}`,
    productId: initialProduct?.id || '',
    sku: initialProduct?.sku ? `${initialProduct.sku}-STD` : 'VII-NEW-STD',
    title: 'Standard',
    options: { size: 'Standard' },
    mrp: 1450,
    salePrice: undefined,
    stockQuantity: 15,
    trackInventory: true,
    isMadeToOrder: false,
    isDefault: true,
  };

  const [mrp, setMrp] = useState<number>(defaultVar.mrp || 1200);
  const [salePrice, setSalePrice] = useState<number | undefined>(defaultVar.salePrice);
  const [stockQuantity, setStockQuantity] = useState<number>(defaultVar.stockQuantity || 10);
  const [isMadeToOrder, setIsMadeToOrder] = useState<boolean>(defaultVar.isMadeToOrder || false);
  const [hsnCode, setHsnCode] = useState<string>(defaultVar.hsnCode || '34060010');

  // Media
  const [media, setMedia] = useState(
    initialProduct?.media || [
      { id: 'm-def', url: '/images/sculptural-candle.jpg', isCover: true, sortOrder: 1, altText: 'Default Candle' },
    ]
  );
  const [newImageUrl, setNewImageUrl] = useState('');

  // SEO
  const [seoTitle, setSeoTitle] = useState(initialProduct?.seoTitle || '');
  const [seoDescription, setSeoDescription] = useState(initialProduct?.seoDescription || '');

  // Auto-generate slug and SKU from title
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    if (!isEditing) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setSlug(generatedSlug);

      const generatedSku = `VII-${val
        .split(' ')
        .map((w) => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 4)}-${Math.floor(100 + Math.random() * 900)}`;
      setSku(generatedSku);
    }
  };

  // Currently active product type definition
  const currentType = productTypes.find((t) => t.id === productTypeId);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !sku.trim()) {
      alert('Please provide a product title and SKU.');
      return;
    }

    const variantData: ProductVariant = {
      ...defaultVar,
      sku: `${sku}-STD`,
      mrp: Number(mrp),
      salePrice: salePrice ? Number(salePrice) : undefined,
      stockQuantity: Number(stockQuantity),
      isMadeToOrder,
      hsnCode,
    };

    const productPayload = {
      productTypeId,
      categoryIds: selectedCategoryIds,
      collectionIds: selectedCollectionIds,
      name,
      slug: slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      sku,
      shortDescription,
      fullDescription,
      badges,
      displayStatus,
      publishState,
      customizationEnabled,
      customizationPrompt,
      attributeValues,
      variants: [variantData],
      media,
      seoTitle: seoTitle || name,
      seoDescription: seoDescription || shortDescription,
      isDemo: false,
    };

    if (isEditing && initialProduct) {
      updateProduct(initialProduct.id, productPayload);
      alert(`Product "${name}" updated successfully!`);
    } else {
      addProduct(productPayload);
      alert(`Product "${name}" published to catalogue!`);
    }

    router.push('/admin/products');
  };

  const addBadge = () => {
    if (newBadgeInput.trim() && !badges.includes(newBadgeInput.trim())) {
      setBadges([...badges, newBadgeInput.trim()]);
      setNewBadgeInput('');
    }
  };

  const removeBadge = (badgeToRemove: string) => {
    setBadges(badges.filter((b) => b !== badgeToRemove));
  };

  return (
    <form onSubmit={handleSave} className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
      {/* Top Breadcrumb & Action Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-200/80">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="p-2 text-stone-500 hover:text-stone-900 bg-white hover:bg-stone-50 border border-stone-300 rounded-xl transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                {isEditing ? `Edit: ${name || initialProduct?.name}` : 'Create New Design'}
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#C86446]/10 text-[#C86446]">
                {publishState.toUpperCase()}
              </span>
            </div>
            <p className="text-xs text-stone-500">
              Configure atelier specifications, dynamic attributes, variants and media.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {slug && (
            <Link
              href={`/products/${slug}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-700 bg-white hover:bg-stone-50 border border-stone-300 rounded-xl transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#C86446]" />
              <span>Preview Storefront</span>
            </Link>
          )}
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#C86446] hover:bg-[#B25338] rounded-xl shadow-sm transition-all"
          >
            <Save className="w-4 h-4" />
            <span>{isEditing ? 'Save Changes' : 'Publish Product'}</span>
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8-Cols): Tabbed Editors */}
        <div className="lg:col-span-8 space-y-4">
          {/* Editor Tabs Navigation */}
          <div className="flex items-center gap-1 p-1.5 bg-stone-100 rounded-2xl border border-stone-200/80 text-xs overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab('general')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-semibold transition-all shrink-0 ${
                activeTab === 'general' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C86446]" />
              General Info
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('attributes')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-semibold transition-all shrink-0 ${
                activeTab === 'attributes' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#C86446]" />
              Dynamic Attributes
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('variants')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-semibold transition-all shrink-0 ${
                activeTab === 'variants' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5 text-[#C86446]" />
              Pricing & Stock
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('media')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-semibold transition-all shrink-0 ${
                activeTab === 'media' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5 text-[#C86446]" />
              Media Gallery ({media.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('seo')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-semibold transition-all shrink-0 ${
                activeTab === 'seo' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Search className="w-3.5 h-3.5 text-[#C86446]" />
              SEO
            </button>
          </div>

          {/* TAB 1: GENERAL INFO */}
          {activeTab === 'general' && (
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200/80 shadow-sm space-y-4">
              <h2 className="text-sm font-semibold text-stone-900 border-b border-stone-100 pb-2">
                Atelier Design Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Design Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={handleNameChange}
                    placeholder="e.g. Solstice Swirl Pillar"
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:border-[#C86446] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Root SKU <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    placeholder="e.g. VII-SCU-001"
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl text-stone-900 font-mono focus:outline-none focus:border-[#C86446] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  URL Slug <span className="text-stone-400 font-normal">(/products/[slug])</span>
                </label>
                <div className="flex items-center">
                  <span className="px-3 py-2 text-xs bg-stone-100 border border-r-0 border-stone-300 rounded-l-xl text-stone-500">
                    /products/
                  </span>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-r-xl text-stone-900 font-mono focus:outline-none focus:border-[#C86446] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Short Descriptor (Shown on Catalogue Card)
                </label>
                <input
                  type="text"
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="e.g. Spiral column casting gentle helical cast shadows."
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:border-[#C86446] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Full Story & Design Description (PDP)
                </label>
                <textarea
                  rows={6}
                  value={fullDescription}
                  onChange={(e) => setFullDescription(e.target.value)}
                  placeholder="Write the craftsmanship story, inspiration, and aesthetic placement notes..."
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:border-[#C86446] focus:bg-white leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* TAB 2: DYNAMIC CUSTOM ATTRIBUTES (Zero-Code Custom Fields Engine) */}
          {activeTab === 'attributes' && (
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200/80 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                <div>
                  <h2 className="text-sm font-semibold text-stone-900">
                    Dynamic Attributes for "{currentType?.name || 'Selected Type'}"
                  </h2>
                  <p className="text-xs text-stone-500">
                    These fields are dynamically defined in Product Types and automatically power storefront filters and PDP specs.
                  </p>
                </div>
                <Link
                  href="/admin/product-types"
                  className="text-xs font-medium text-[#C86446] hover:underline"
                >
                  Manage Fields →
                </Link>
              </div>

              {(!currentType || currentType.attributes.length === 0) ? (
                <div className="p-8 text-center text-stone-400">
                  <SlidersHorizontal className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-xs">No custom attributes defined for this product type yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {currentType.attributes.map((attr) => {
                    const value = attributeValues[attr.slug] ?? '';

                    return (
                      <div key={attr.id} className="p-3.5 bg-stone-50/70 rounded-xl border border-stone-200/70 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label className="block text-xs font-semibold text-stone-800">
                            {attr.name} {attr.isRequired && <span className="text-red-500">*</span>}
                          </label>
                          <div className="flex items-center gap-2">
                            {attr.isFilterable && (
                              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-medium">
                                Filterable Pill
                              </span>
                            )}
                            {attr.showOnCard && (
                              <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded font-medium">
                                Card Spec
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Render Input Based on Dynamic Attribute Type */}
                        {attr.dataType === 'single_select' && (
                          <select
                            value={value}
                            onChange={(e) =>
                              setAttributeValues({ ...attributeValues, [attr.slug]: e.target.value })
                            }
                            className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-[#C86446]"
                          >
                            <option value="">Select option...</option>
                            {attr.options?.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        )}

                        {attr.dataType === 'number_with_unit' && (
                          <div className="flex items-center">
                            <input
                              type="number"
                              value={value}
                              onChange={(e) =>
                                setAttributeValues({
                                  ...attributeValues,
                                  [attr.slug]: Number(e.target.value),
                                })
                              }
                              placeholder="e.g. 45"
                              className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-l-lg text-stone-900 focus:outline-none focus:border-[#C86446]"
                            />
                            <span className="px-3 py-2 text-xs bg-stone-200 border border-l-0 border-stone-300 rounded-r-lg font-mono text-stone-700">
                              {attr.unit || 'units'}
                            </span>
                          </div>
                        )}

                        {(attr.dataType === 'text_short' || attr.dataType === 'text_long') && (
                          <input
                            type="text"
                            value={value}
                            onChange={(e) =>
                              setAttributeValues({ ...attributeValues, [attr.slug]: e.target.value })
                            }
                            placeholder={attr.helpText || `Enter ${attr.name}...`}
                            className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-[#C86446]"
                          />
                        )}

                        {attr.dataType === 'boolean' && (
                          <label className="flex items-center gap-2 cursor-pointer mt-1">
                            <input
                              type="checkbox"
                              checked={Boolean(value)}
                              onChange={(e) =>
                                setAttributeValues({
                                  ...attributeValues,
                                  [attr.slug]: e.target.checked,
                                })
                              }
                              className="w-4 h-4 text-[#C86446] rounded"
                            />
                            <span className="text-xs text-stone-700">Included with design</span>
                          </label>
                        )}

                        {attr.helpText && (
                          <p className="text-[10px] text-stone-400">{attr.helpText}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PRICING & STOCK */}
          {activeTab === 'variants' && (
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200/80 shadow-sm space-y-4">
              <h2 className="text-sm font-semibold text-stone-900 border-b border-stone-100 pb-2">
                Pricing, Inventory & Tax
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    MRP Price ({settings.currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={mrp}
                    onChange={(e) => setMrp(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl text-stone-900 font-bold focus:outline-none focus:border-[#C86446] focus:bg-white"
                  />
                  <p className="text-[10px] text-stone-400 mt-1">
                    If "Price on Request" is enabled in settings, this is hidden from public.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Sale Price (Optional, {settings.currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={salePrice || ''}
                    onChange={(e) => setSalePrice(e.target.value ? Number(e.target.value) : undefined)}
                    placeholder="Leave empty if regular price"
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:border-[#C86446] focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    value={stockQuantity}
                    onChange={(e) => setStockQuantity(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:border-[#C86446] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    India GST HSN Code
                  </label>
                  <input
                    type="text"
                    value={hsnCode}
                    onChange={(e) => setHsnCode(e.target.value)}
                    placeholder="34060010"
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl text-stone-900 font-mono focus:outline-none focus:border-[#C86446] focus:bg-white"
                  />
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isMadeToOrder}
                      onChange={(e) => setIsMadeToOrder(e.target.checked)}
                      className="w-4 h-4 text-[#C86446] rounded"
                    />
                    <span className="text-xs font-medium text-stone-800">
                      Made to Order (Fresh Pour)
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: MEDIA GALLERY */}
          {activeTab === 'media' && (
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200/80 shadow-sm space-y-4">
              <h2 className="text-sm font-semibold text-stone-900 border-b border-stone-100 pb-2">
                Photography & Image Assets
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {media.map((img, idx) => (
                  <div
                    key={img.id}
                    className="relative group rounded-xl overflow-hidden border border-stone-200 bg-stone-100 aspect-square"
                  >
                    <Image src={img.url} alt={img.altText || ''} fill className="object-cover" />
                    <div className="absolute inset-0 bg-stone-900/60 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-between">
                      <div className="flex items-center justify-between text-white text-[10px]">
                        {img.isCover ? (
                          <span className="bg-[#C86446] px-1.5 py-0.5 rounded font-bold">Cover</span>
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              setMedia(media.map((m) => ({ ...m, isCover: m.id === img.id })))
                            }
                            className="bg-stone-800/80 hover:bg-stone-700 px-1.5 py-0.5 rounded"
                          >
                            Set Cover
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => setMedia(media.filter((m) => m.id !== img.id))}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[10px] text-stone-200 truncate">{img.altText}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add image URL input */}
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Paste studio image URL (e.g. /images/bloom-candle.webp)..."
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg text-stone-900"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newImageUrl.trim()) {
                      setMedia([
                        ...media,
                        {
                          id: `m-${Date.now()}`,
                          url: newImageUrl.trim(),
                          isCover: media.length === 0,
                          sortOrder: media.length + 1,
                          altText: name,
                        },
                      ]);
                      setNewImageUrl('');
                    }
                  }}
                  className="px-3 py-1.5 text-xs font-semibold bg-[#C86446] text-white rounded-lg hover:bg-[#B25338]"
                >
                  + Add Asset
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: SEO */}
          {activeTab === 'seo' && (
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200/80 shadow-sm space-y-4">
              <h2 className="text-sm font-semibold text-stone-900 border-b border-stone-100 pb-2">
                Search Engine Optimization
              </h2>

              {/* Google Preview Snippet */}
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                <span className="text-[10px] text-stone-400 uppercase tracking-widest font-semibold">
                  Google Preview
                </span>
                <div className="text-sm font-medium text-blue-700 hover:underline cursor-pointer">
                  {seoTitle || name || 'Product Title'} — VIIAURA Candle Art
                </div>
                <div className="text-[11px] text-emerald-800">
                  https://viiaura.com/products/{slug || 'product-slug'}
                </div>
                <div className="text-xs text-stone-600 line-clamp-2">
                  {seoDescription || shortDescription || 'Discover handcrafted sculptural candles and atelier art by Viiaura.'}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  placeholder="e.g. Solstice Swirl Sculptural Candle | Viiaura Atelier"
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:border-[#C86446]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Meta Description
                </label>
                <textarea
                  rows={3}
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  placeholder="Compelling meta description for search results (recommended: 140–160 chars)..."
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:border-[#C86446]"
                />
              </div>
            </div>
          )}
        </div>

        {/* Right Sticky Column (4-Cols): Publish Status, Categories, Badges */}
        <div className="lg:col-span-4 space-y-5">
          {/* Status & Visibility Card */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-sm space-y-4">
            <h2 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
              Publishing State
            </h2>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Visibility Status
              </label>
              <select
                value={publishState}
                onChange={(e) => setPublishState(e.target.value as any)}
                className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl text-stone-900 font-semibold focus:outline-none focus:border-[#C86446]"
              >
                <option value="published">🟢 Published (Live on Showroom)</option>
                <option value="draft">⚪ Draft (Hidden)</option>
                <option value="archived">📦 Archived</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Showroom Display Badge
              </label>
              <select
                value={displayStatus}
                onChange={(e) => setDisplayStatus(e.target.value as any)}
                className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:border-[#C86446]"
              >
                <option value="available">Available</option>
                <option value="made_to_order">Made to Order</option>
                <option value="limited">Limited Edition</option>
                <option value="enquire">Enquire Only</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Product Type Template
              </label>
              <select
                value={productTypeId}
                onChange={(e) => setProductTypeId(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl text-stone-900 font-medium focus:outline-none focus:border-[#C86446]"
              >
                {productTypes.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
              <p className="text-[10px] text-stone-400 mt-1">
                Determines which dynamic custom attributes are rendered.
              </p>
            </div>
          </div>

          {/* Category Tree Selector */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-sm space-y-3">
            <h2 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
              Category Mapping
            </h2>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {categories.map((cat) => {
                const isChecked = selectedCategoryIds.includes(cat.id);
                return (
                  <label
                    key={cat.id}
                    className="flex items-center gap-2 text-xs text-stone-700 cursor-pointer hover:text-stone-900"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCategoryIds([...selectedCategoryIds, cat.id]);
                        } else {
                          setSelectedCategoryIds(selectedCategoryIds.filter((id) => id !== cat.id));
                        }
                      }}
                      className="w-3.5 h-3.5 text-[#C86446] rounded"
                    />
                    <span className={cat.parentId ? 'pl-3 text-stone-600' : 'font-semibold'}>
                      {cat.name}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Badges & Tags */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-sm space-y-3">
            <h2 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
              Showcase Badges
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {badges.map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#C86446]/10 text-[#C86446] border border-[#C86446]/20"
                >
                  {b}
                  <button type="button" onClick={() => removeBadge(b)} className="hover:text-red-600">
                    ×
                  </button>
                </span>
              ))}
            </div>

            <div className="flex items-center gap-1.5 pt-1">
              <input
                type="text"
                value={newBadgeInput}
                onChange={(e) => setNewBadgeInput(e.target.value)}
                placeholder="Add badge (e.g. Bestseller)..."
                className="flex-1 px-2.5 py-1 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addBadge();
                  }
                }}
              />
              <button
                type="button"
                onClick={addBadge}
                className="px-2.5 py-1 text-xs font-semibold bg-stone-800 text-white rounded-lg hover:bg-stone-900"
              >
                +
              </button>
            </div>
          </div>

          {/* Customization Options */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                Customization Concierge
              </h2>
              <input
                type="checkbox"
                checked={customizationEnabled}
                onChange={(e) => setCustomizationEnabled(e.target.checked)}
                className="w-4 h-4 text-[#C86446] rounded"
              />
            </div>

            {customizationEnabled && (
              <div className="space-y-1.5 pt-1">
                <label className="block text-[11px] font-semibold text-stone-700">
                  Customization Instructions / Prompt
                </label>
                <textarea
                  rows={2}
                  value={customizationPrompt}
                  onChange={(e) => setCustomizationPrompt(e.target.value)}
                  placeholder="e.g. Monogram engraving or custom ribbon available."
                  className="w-full px-2.5 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};
