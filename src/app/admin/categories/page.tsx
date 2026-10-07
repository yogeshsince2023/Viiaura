'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAdmin } from '@/admin/store';
import { Category } from '@/admin/types';
import {
  Layers,
  Plus,
  Trash2,
  Edit3,
  ChevronRight,
  ChevronDown,
  Folder,
  FolderOpen,
  Eye,
  EyeOff,
  MoveUp,
  MoveDown,
  Save,
  Flame,
  ArrowRight,
} from 'lucide-react';

export default function AdminCategoriesPage() {
  const { categories, products, addCategory, updateCategory, deleteCategory } = useAdmin();

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(categories[0] || null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // New Category Form state
  const [newName, setNewName] = useState('');
  const [newSlug, setNewSlug] = useState('');
  const [newParentId, setNewParentId] = useState<string | null>(null);
  const [newDescription, setNewDescription] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('/images/sculptural-candle.jpg');

  // Hierarchy grouping: Root nodes vs children
  const rootCategories = categories.filter((c) => !c.parentId);
  const getSubcategories = (parentId: string) => categories.filter((c) => c.parentId === parentId);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const slug = newSlug.trim() || newName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const parent = categories.find((c) => c.id === newParentId);
    const path = parent ? `${parent.path}.${slug}` : slug;

    addCategory({
      name: newName.trim(),
      slug,
      parentId: newParentId || null,
      path,
      description: newDescription.trim(),
      imageUrl: newImageUrl.trim(),
      sortOrder: categories.length + 1,
      isVisible: true,
    });

    setNewName('');
    setNewSlug('');
    setNewDescription('');
    setIsAddingNew(false);
  };

  const getProductCount = (catId: string) => {
    return products.filter((p) => p.categoryIds.includes(catId)).length;
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-200/80">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
              Category Hierarchy Tree
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-stone-100 text-stone-700 border border-stone-300">
              {categories.length} Nodes
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Create unlimited nested category trees with zero code. Reorder and assign to storefront navigation.
          </p>
        </div>

        <button
          onClick={() => {
            setIsAddingNew(true);
            setNewParentId(null);
          }}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#C86446] hover:bg-[#B25338] rounded-xl shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Root Category</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (6-Cols): Interactive Tree View */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-stone-200/80 shadow-sm p-4 sm:p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-2">
            <h2 className="text-sm font-semibold text-stone-900">Catalogue Architecture</h2>
            <span className="text-[11px] text-stone-400">Click a node to inspect / edit</span>
          </div>

          <div className="space-y-2">
            {rootCategories.map((root) => {
              const children = getSubcategories(root.id);
              const isSelected = selectedCategory?.id === root.id;

              return (
                <div key={root.id} className="space-y-1">
                  {/* Root Node */}
                  <div
                    onClick={() => {
                      setSelectedCategory(root);
                      setIsAddingNew(false);
                    }}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-amber-50/50 border-[#C86446] shadow-sm'
                        : 'bg-stone-50/70 border-stone-200/70 hover:bg-stone-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-stone-200/70 flex items-center justify-center text-stone-700">
                        <FolderOpen className="w-4 h-4 text-[#C86446]" />
                      </div>
                      <div>
                        <div className="font-semibold text-xs text-stone-900 flex items-center gap-2">
                          {root.name}
                          <span className="text-[10px] font-mono text-stone-400">/{root.slug}</span>
                        </div>
                        <span className="text-[10px] text-stone-500">
                          {getProductCount(root.id)} direct products
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                      <button
                        title="Add child subcategory"
                        onClick={() => {
                          setNewParentId(root.id);
                          setIsAddingNew(true);
                        }}
                        className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-200 rounded-lg text-xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                      <button
                        title="Delete node"
                        onClick={() => {
                          if (confirm(`Delete category "${root.name}"?`)) deleteCategory(root.id);
                        }}
                        className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Child Subcategories (Indent Level 1) */}
                  {children.length > 0 && (
                    <div className="pl-6 space-y-1 border-l-2 border-stone-200 ml-4 py-1">
                      {children.map((child) => {
                        const isChildSelected = selectedCategory?.id === child.id;
                        return (
                          <div
                            key={child.id}
                            onClick={() => {
                              setSelectedCategory(child);
                              setIsAddingNew(false);
                            }}
                            className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all ${
                              isChildSelected
                                ? 'bg-amber-50/50 border-[#C86446] shadow-sm'
                                : 'bg-white border-stone-200/60 hover:bg-stone-50'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#C86446]" />
                              <div>
                                <div className="font-medium text-xs text-stone-800">
                                  {child.name}
                                </div>
                                <span className="text-[10px] text-stone-400 font-mono">
                                  {child.path}
                                </span>
                              </div>
                            </div>

                            <div
                              className="flex items-center gap-1"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-stone-100 text-stone-600 font-medium">
                                {getProductCount(child.id)}
                              </span>
                              <button
                                onClick={() => {
                                  if (confirm(`Delete subcategory "${child.name}"?`))
                                    deleteCategory(child.id);
                                }}
                                className="p-1 text-stone-400 hover:text-red-600 rounded"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (6-Cols): Node Detail / Creation Form */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-stone-200/80 shadow-sm p-5 sm:p-6 space-y-5">
          {isAddingNew ? (
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                <h2 className="text-sm font-semibold text-stone-900">
                  {newParentId ? 'Add Subcategory' : 'Add Root Category'}
                </h2>
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="text-xs text-stone-500 hover:text-stone-800"
                >
                  Cancel
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => {
                    setNewName(e.target.value);
                    setNewSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                  }}
                  placeholder="e.g. Sculptural Floral"
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:border-[#C86446]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={newSlug}
                  onChange={(e) => setNewSlug(e.target.value)}
                  placeholder="sculptural-floral"
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl text-stone-900 font-mono focus:outline-none focus:border-[#C86446]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Parent Category
                </label>
                <select
                  value={newParentId || ''}
                  onChange={(e) => setNewParentId(e.target.value || null)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:border-[#C86446]"
                >
                  <option value="">None (Top-Level Root Category)</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.path})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Story and positioning for this category..."
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:border-[#C86446]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Banner Image URL
                </label>
                <input
                  type="text"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl text-stone-900 font-mono"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#C86446] hover:bg-[#B25338] rounded-xl shadow-sm transition-all"
              >
                Create Category Node
              </button>
            </form>
          ) : selectedCategory ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                <div>
                  <h2 className="text-sm font-semibold text-stone-900">
                    Edit: {selectedCategory.name}
                  </h2>
                  <span className="text-[10px] text-stone-400 font-mono">
                    ID: {selectedCategory.id}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      updateCategory(selectedCategory.id, {
                        isVisible: !selectedCategory.isVisible,
                      });
                      setSelectedCategory({
                        ...selectedCategory,
                        isVisible: !selectedCategory.isVisible,
                      });
                    }}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg border font-medium ${
                      selectedCategory.isVisible
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-stone-100 text-stone-600 border-stone-200'
                    }`}
                  >
                    {selectedCategory.isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    {selectedCategory.isVisible ? 'Visible' : 'Hidden'}
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={selectedCategory.name}
                    onChange={(e) => {
                      const updated = { ...selectedCategory, name: e.target.value };
                      setSelectedCategory(updated);
                      updateCategory(selectedCategory.id, { name: e.target.value });
                    }}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:border-[#C86446]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    value={selectedCategory.slug}
                    onChange={(e) => {
                      const updated = { ...selectedCategory, slug: e.target.value };
                      setSelectedCategory(updated);
                      updateCategory(selectedCategory.id, { slug: e.target.value });
                    }}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl text-stone-900 font-mono focus:outline-none focus:border-[#C86446]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={selectedCategory.description || ''}
                    onChange={(e) => {
                      const updated = { ...selectedCategory, description: e.target.value };
                      setSelectedCategory(updated);
                      updateCategory(selectedCategory.id, { description: e.target.value });
                    }}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:border-[#C86446]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Banner Preview
                  </label>
                  {selectedCategory.imageUrl && (
                    <div className="relative w-full h-32 rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                      <Image
                        src={selectedCategory.imageUrl}
                        alt={selectedCategory.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-stone-500">
                  <span>Linked Products: {getProductCount(selectedCategory.id)}</span>
                  <Link
                    href={`/admin/products`}
                    className="text-[#C86446] font-semibold hover:underline"
                  >
                    View in Catalogue →
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-stone-400">
              <Layers className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-xs">Select a category on the left to edit its details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
