'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAdmin } from '@/admin/store';
import { ProductType, ProductAttributeDefinition, AttributeDataType } from '@/admin/types';
import {
  SlidersHorizontal,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  HelpCircle,
  Sparkles,
  Layers,
  ArrowRight,
} from 'lucide-react';

export default function AdminProductTypesPage() {
  const {
    productTypes,
    categories,
    addProductType,
    updateProductType,
    deleteProductType,
    addAttributeToType,
    deleteAttributeFromType,
  } = useAdmin();

  const [selectedType, setSelectedType] = useState<ProductType | null>(productTypes[0] || null);
  const [isAddingType, setIsAddingType] = useState(false);
  const [newTypeName, setNewTypeName] = useState('');
  const [newTypeSlug, setNewTypeSlug] = useState('');
  const [newTypeDescription, setNewTypeDescription] = useState('');

  // Add Attribute Modal / Form state
  const [isAddingAttr, setIsAddingAttr] = useState(false);
  const [attrName, setAttrName] = useState('');
  const [attrSlug, setAttrSlug] = useState('');
  const [attrDataType, setAttrDataType] = useState<AttributeDataType>('single_select');
  const [attrUnit, setAttrUnit] = useState('');
  const [attrOptionsRaw, setAttrOptionsRaw] = useState('');
  const [attrIsRequired, setAttrIsRequired] = useState(false);
  const [attrIsFilterable, setAttrIsFilterable] = useState(true);
  const [attrShowOnCard, setAttrShowOnCard] = useState(false);
  const [attrShowOnPdp, setAttrShowOnPdp] = useState(true);
  const [attrHelpText, setAttrHelpText] = useState('');

  const handleCreateType = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTypeName.trim()) return;

    const slug = newTypeSlug.trim() || newTypeName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    addProductType({
      name: newTypeName.trim(),
      slug,
      description: newTypeDescription.trim(),
      attributes: [],
      categoryIds: [],
    });

    setNewTypeName('');
    setNewTypeSlug('');
    setNewTypeDescription('');
    setIsAddingType(false);
  };

  const handleAddAttribute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedType || !attrName.trim()) return;

    const slug = attrSlug.trim() || attrName.toLowerCase().replace(/[^a-z0-9]+/g, '_');

    // Parse options for select types
    let options: Array<{ label: string; value: string }> | undefined;
    if (attrDataType === 'single_select' || attrDataType === 'multi_select' || attrDataType === 'color_swatch') {
      options = attrOptionsRaw
        .split('\n')
        .map((opt) => opt.trim())
        .filter(Boolean)
        .map((opt) => ({
          label: opt,
          value: opt.toLowerCase().replace(/[^a-z0-9]+/g, '_'),
        }));
    }

    addAttributeToType(selectedType.id, {
      name: attrName.trim(),
      slug,
      dataType: attrDataType,
      unit: attrUnit.trim() || undefined,
      options,
      isRequired: attrIsRequired,
      isFilterable: attrIsFilterable,
      showOnCard: attrShowOnCard,
      showOnPdp: attrShowOnPdp,
      isSearchable: false,
      sortOrder: (selectedType.attributes.length || 0) + 1,
      helpText: attrHelpText.trim() || undefined,
    });

    // Reset
    setAttrName('');
    setAttrSlug('');
    setAttrOptionsRaw('');
    setAttrUnit('');
    setAttrHelpText('');
    setIsAddingAttr(false);
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-200/80">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
              Product Types & Custom Fields Engine
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-stone-100 text-stone-700 border border-stone-300">
              Zero-Code Schema
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Create field templates for candles, home scents, or lifestyle crafts. Added fields immediately reflect in storefront filters and forms.
          </p>
        </div>

        <button
          onClick={() => setIsAddingType(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#C86446] hover:bg-[#B25338] rounded-xl shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Product Type</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (4-Cols): Product Types List */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-stone-200/80 shadow-sm p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-stone-100 pb-2">
            <h2 className="text-sm font-semibold text-stone-900">Defined Types</h2>
            <span className="text-[11px] text-stone-400">{productTypes.length} templates</span>
          </div>

          {isAddingType && (
            <form onSubmit={handleCreateType} className="p-3.5 bg-stone-50 rounded-xl border border-stone-300 space-y-3">
              <span className="text-xs font-bold text-stone-800">New Product Type</span>
              <input
                type="text"
                required
                value={newTypeName}
                onChange={(e) => {
                  setNewTypeName(e.target.value);
                  setNewTypeSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                }}
                placeholder="Type name (e.g. Ceramic Incense Burner)..."
                className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg text-stone-900"
              />
              <textarea
                rows={2}
                value={newTypeDescription}
                onChange={(e) => setNewTypeDescription(e.target.value)}
                placeholder="Template description..."
                className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg text-stone-900"
              />
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddingType(false)}
                  className="px-2.5 py-1 text-xs text-stone-500 hover:text-stone-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 text-xs font-semibold bg-[#C86446] text-white rounded-lg hover:bg-[#B25338]"
                >
                  Create
                </button>
              </div>
            </form>
          )}

          <div className="space-y-2">
            {productTypes.map((type) => {
              const isSelected = selectedType?.id === type.id;
              return (
                <div
                  key={type.id}
                  onClick={() => setSelectedType(type)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-amber-50/50 border-[#C86446] shadow-sm'
                      : 'bg-stone-50/70 border-stone-200/70 hover:bg-stone-100'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-xs text-stone-900">{type.name}</span>
                      <span className="text-[10px] font-mono text-stone-400">/{type.slug}</span>
                    </div>
                    <p className="text-[11px] text-stone-500 line-clamp-1">{type.description}</p>
                    <div className="text-[10px] text-stone-400">
                      {type.attributes.length} custom attributes
                    </div>
                  </div>

                  <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => {
                        if (confirm(`Delete product type "${type.name}"?`)) {
                          deleteProductType(type.id);
                          if (selectedType?.id === type.id) setSelectedType(null);
                        }
                      }}
                      className="p-1.5 text-stone-400 hover:text-red-600 rounded"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (8-Cols): Attributes Builder */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-stone-200/80 shadow-sm p-5 sm:p-6 space-y-5">
          {selectedType ? (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
                <div>
                  <h2 className="text-base font-bold text-stone-900">
                    Fields for: {selectedType.name}
                  </h2>
                  <p className="text-xs text-stone-500">
                    Define custom specifications. Checked "Filterable" fields automatically populate storefront filters.
                  </p>
                </div>
                <button
                  onClick={() => setIsAddingAttr(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#C86446] hover:bg-[#B25338] rounded-xl shadow-sm transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Custom Field</span>
                </button>
              </div>

              {/* Add Attribute Modal / Inset Form */}
              {isAddingAttr && (
                <form
                  onSubmit={handleAddAttribute}
                  className="p-4 bg-stone-50 rounded-2xl border border-[#C86446]/40 space-y-4 shadow-sm"
                >
                  <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                    <span className="text-xs font-bold text-stone-900">Add New Attribute Field</span>
                    <button
                      type="button"
                      onClick={() => setIsAddingAttr(false)}
                      className="text-xs text-stone-500 hover:text-stone-800"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Field Label <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={attrName}
                        onChange={(e) => {
                          setAttrName(e.target.value);
                          setAttrSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '_'));
                        }}
                        placeholder="e.g. Wick Material"
                        className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:border-[#C86446]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Database Key / Slug
                      </label>
                      <input
                        type="text"
                        value={attrSlug}
                        onChange={(e) => setAttrSlug(e.target.value)}
                        placeholder="wick_material"
                        className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-xl text-stone-900 font-mono focus:outline-none focus:border-[#C86446]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Data Type
                      </label>
                      <select
                        value={attrDataType}
                        onChange={(e) => setAttrDataType(e.target.value as AttributeDataType)}
                        className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:border-[#C86446]"
                      >
                        <option value="single_select">Single Select Dropdown</option>
                        <option value="multi_select">Multi-Select Tags</option>
                        <option value="number_with_unit">Number with Unit (e.g. hrs, cm)</option>
                        <option value="text_short">Short Text Input</option>
                        <option value="text_long">Long Text / Paragraph</option>
                        <option value="boolean">Boolean Yes / No Toggle</option>
                        <option value="color_swatch">Color Swatch</option>
                      </select>
                    </div>

                    {attrDataType === 'number_with_unit' && (
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Unit Suffix
                        </label>
                        <input
                          type="text"
                          value={attrUnit}
                          onChange={(e) => setAttrUnit(e.target.value)}
                          placeholder="e.g. hrs, ml, cm, grams"
                          className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-xl text-stone-900 font-mono"
                        />
                      </div>
                    )}
                  </div>

                  {(attrDataType === 'single_select' ||
                    attrDataType === 'multi_select' ||
                    attrDataType === 'color_swatch') && (
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Options (One per line)
                      </label>
                      <textarea
                        rows={3}
                        value={attrOptionsRaw}
                        onChange={(e) => setAttrOptionsRaw(e.target.value)}
                        placeholder={`Smoked Vanilla\nWhite Tea & Thyme\nUnscented Pure Wax`}
                        className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-xl text-stone-900 font-mono"
                      />
                    </div>
                  )}

                  {/* Storefront Feature Flags */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-stone-100/70 rounded-xl border border-stone-200">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-800">
                      <input
                        type="checkbox"
                        checked={attrIsFilterable}
                        onChange={(e) => setAttrIsFilterable(e.target.checked)}
                        className="w-4 h-4 text-[#C86446] rounded"
                      />
                      <span className="font-semibold text-emerald-800">Filterable Pill</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-800">
                      <input
                        type="checkbox"
                        checked={attrShowOnCard}
                        onChange={(e) => setAttrShowOnCard(e.target.checked)}
                        className="w-4 h-4 text-[#C86446] rounded"
                      />
                      <span>Show on Card</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-800">
                      <input
                        type="checkbox"
                        checked={attrShowOnPdp}
                        onChange={(e) => setAttrShowOnPdp(e.target.checked)}
                        className="w-4 h-4 text-[#C86446] rounded"
                      />
                      <span>Show on PDP</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-800">
                      <input
                        type="checkbox"
                        checked={attrIsRequired}
                        onChange={(e) => setAttrIsRequired(e.target.checked)}
                        className="w-4 h-4 text-[#C86446] rounded"
                      />
                      <span>Required</span>
                    </label>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingAttr(false)}
                      className="px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-xs font-semibold text-white bg-[#C86446] hover:bg-[#B25338] rounded-xl shadow-sm"
                    >
                      Save Field Definition
                    </button>
                  </div>
                </form>
              )}

              {/* Attributes List */}
              <div className="space-y-3">
                {selectedType.attributes.length === 0 ? (
                  <div className="p-8 text-center text-stone-400 bg-stone-50 rounded-xl border border-stone-200">
                    <SlidersHorizontal className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-xs">No attributes defined yet. Click "+ Add Custom Field" above.</p>
                  </div>
                ) : (
                  selectedType.attributes.map((attr, idx) => (
                    <div
                      key={attr.id}
                      className="p-3.5 bg-stone-50 rounded-xl border border-stone-200/80 flex items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-stone-900">{attr.name}</span>
                          <span className="text-[10px] font-mono text-stone-400 bg-stone-200/70 px-1.5 py-0.2 rounded">
                            {attr.slug}
                          </span>
                          <span className="text-[10px] text-stone-500">({attr.dataType})</span>
                        </div>

                        {/* Options preview */}
                        {attr.options && attr.options.length > 0 && (
                          <div className="flex flex-wrap gap-1 text-[10px] text-stone-500">
                            {attr.options.map((opt) => (
                              <span key={opt.value} className="bg-white border px-1.5 py-0.2 rounded">
                                {opt.label}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Feature Badges */}
                        <div className="flex items-center gap-2 pt-1 text-[10px]">
                          {attr.isFilterable && (
                            <span className="font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded">
                              ✓ Filterable on Storefront
                            </span>
                          )}
                          {attr.showOnCard && (
                            <span className="font-medium text-blue-700 bg-blue-50 border border-blue-200 px-1.5 py-0.2 rounded">
                              Card Spec
                            </span>
                          )}
                          {attr.showOnPdp && (
                            <span className="font-medium text-stone-700 bg-stone-200/60 px-1.5 py-0.2 rounded">
                              PDP Accordion
                            </span>
                          )}
                          {attr.isRequired && (
                            <span className="font-semibold text-red-700 bg-red-50 border border-red-200 px-1.5 py-0.2 rounded">
                              Required
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => deleteAttributeFromType(selectedType.id, attr.id)}
                        className="p-2 text-stone-400 hover:text-red-600 rounded-lg hover:bg-stone-200/60"
                        title="Delete attribute"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </>
          ) : (
            <div className="p-12 text-center text-stone-400">
              <p className="text-xs">Select a product type template on the left to configure fields.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
