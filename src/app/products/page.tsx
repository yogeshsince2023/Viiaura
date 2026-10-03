"use client";

import React, { useState, useMemo, Suspense } from "react";
import { PRODUCTS } from "@/data/products";
import { COLLECTIONS } from "@/data/collections";
import { ProductCard } from "@/components/ProductCard";
import { Search, SlidersHorizontal, X, ArrowUpDown, Sparkles, RotateCcw } from "lucide-react";
import { useSearchParams } from "next/navigation";

function CatalogueContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const initialCollection = searchParams.get("collection") || "all";

  // Filter States
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCollection, setSelectedCollection] = useState<string>(initialCollection);
  const [selectedStyle, setSelectedStyle] = useState<string>("all");
  const [selectedOccasion, setSelectedOccasion] = useState<string>("all");
  const [selectedScent, setSelectedScent] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"featured" | "name-asc" | "price-asc" | "price-desc">("featured");
  const [showPrice, setShowPrice] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Styles list from data
  const styles = useMemo(() => {
    const s = new Set<string>();
    PRODUCTS.forEach((p) => s.add(p.style));
    return Array.from(s);
  }, []);

  // Occasions list from data
  const occasions = useMemo(() => {
    const o = new Set<string>();
    PRODUCTS.forEach((p) => p.occasion.forEach((occ) => o.add(occ)));
    return Array.from(o);
  }, []);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesDesc = product.shortDescription.toLowerCase().includes(q);
        const matchesCol = product.collection.toLowerCase().includes(q);
        const matchesStyle = product.style.toLowerCase().includes(q);
        const matchesSku = product.sku.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesCol && !matchesStyle && !matchesSku) {
          return false;
        }
      }

      // Collection
      if (selectedCollection !== "all" && product.collection !== selectedCollection) {
        return false;
      }

      // Style
      if (selectedStyle !== "all" && product.style !== selectedStyle) {
        return false;
      }

      // Occasion
      if (selectedOccasion !== "all" && !product.occasion.includes(selectedOccasion)) {
        return false;
      }

      // Scent
      if (selectedScent === "scented" && product.scent?.toLowerCase().includes("unscented")) {
        return false;
      }
      if (selectedScent === "unscented" && !product.scent?.toLowerCase().includes("unscented")) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "name-asc") {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === "price-asc") {
        return (a.price || 0) - (b.price || 0);
      }
      if (sortBy === "price-desc") {
        return (b.price || 0) - (a.price || 0);
      }
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [searchQuery, selectedCollection, selectedStyle, selectedOccasion, selectedScent, sortBy]);

  const activeFilterCount =
    (selectedCollection !== "all" ? 1 : 0) +
    (selectedStyle !== "all" ? 1 : 0) +
    (selectedOccasion !== "all" ? 1 : 0) +
    (selectedScent !== "all" ? 1 : 0) +
    (searchQuery ? 1 : 0);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCollection("all");
    setSelectedStyle("all");
    setSelectedOccasion("all");
    setSelectedScent("all");
    setSortBy("featured");
  };

  return (
    <div className="pt-24 sm:pt-28 pb-24 bg-[#FAF7F2] min-h-screen animate-page-enter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Header */}
        <div className="border-b border-[#E7E2DA] pb-8 space-y-3">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#78716C] font-bold">
            <span>Showroom</span>
            <span>/</span>
            <span className="text-[#C86446]">Catalogue</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
            <div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1C1917] tracking-tight">
                The Candle Catalogue
              </h1>
              <p className="text-sm sm:text-base text-[#57534E] max-w-xl pt-2 font-normal">
                Explore our full spectrum of handcrafted architectural columns, neoclassical arches, and minimalist vessel candles.
              </p>
            </div>

            {/* Price Visibility Toggle & Mobile Filter Trigger */}
            <div className="flex items-center gap-3">
              <label className="hidden sm:flex items-center gap-2.5 text-xs uppercase tracking-wider font-bold text-[#1C1917] cursor-pointer select-none bg-white px-4 py-3 border border-[#E7E2DA] rounded-sm shadow-sm min-h-[44px]">
                <input
                  type="checkbox"
                  checked={showPrice}
                  onChange={(e) => setShowPrice(e.target.checked)}
                  className="rounded border-[#E7E2DA] text-[#C86446] focus:ring-[#C86446] w-4 h-4 cursor-pointer"
                />
                <span>Show Estimated Price</span>
              </label>

              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2.5 px-5 py-3 bg-[#1C1917] text-[#FAF7F2] rounded-sm text-xs uppercase tracking-wider font-bold shadow-md min-h-[44px]"
              >
                <SlidersHorizontal className="w-4 h-4 text-[#D4AF7A]" />
                Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
              </button>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar (Desktop & Tablet) */}
        <div className="bg-white border border-[#E7E2DA] rounded-sm p-5 shadow-sm space-y-5">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-[#8C857B] absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by design name, collection, wax or style..."
                className="w-full pl-11 pr-5 py-3 bg-[#FAF7F2] border border-[#E7E2DA] rounded-sm text-sm sm:text-base text-[#1C1917] font-medium focus:outline-none focus:ring-2 focus:ring-[#C86446]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-3.5 text-[#8C857B] hover:text-[#1C1917]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Select */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <ArrowUpDown className="w-4 h-4 text-[#8C857B]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full md:w-auto px-4 py-3 bg-[#FAF7F2] border border-[#E7E2DA] rounded-sm text-xs sm:text-sm font-bold text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#C86446] min-h-[44px] cursor-pointer"
              >
                <option value="featured">Sort: Featured Atelier Pieces</option>
                <option value="name-asc">Sort: Name (A to Z)</option>
                {showPrice && <option value="price-asc">Sort: Price (Low to High)</option>}
                {showPrice && <option value="price-desc">Sort: Price (High to Low)</option>}
              </select>
            </div>
          </div>

          {/* Quick Collection Pills with generous touch padding */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2 border-t border-[#E7E2DA]">
            <span className="font-display text-xs uppercase tracking-wider text-[#78716C] font-bold mr-1">
              Collection:
            </span>
            <button
              onClick={() => setSelectedCollection("all")}
              className={`px-4 py-2 rounded-sm text-xs uppercase tracking-wider font-bold transition-all min-h-[38px] cursor-pointer ${
                selectedCollection === "all"
                  ? "bg-[#1C1917] text-[#FAF7F2] shadow-sm"
                  : "bg-[#FAF7F2] text-[#44403C] hover:bg-[#F3EFEA]"
              }`}
            >
              All Series
            </button>
            {COLLECTIONS.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCollection(c.name)}
                className={`px-4 py-2 rounded-sm text-xs uppercase tracking-wider font-bold transition-all min-h-[38px] cursor-pointer ${
                  selectedCollection === c.name
                    ? "bg-[#1C1917] text-[#FAF7F2] shadow-sm"
                    : "bg-[#FAF7F2] text-[#44403C] hover:bg-[#F3EFEA]"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Layout: Sidebar Filter on Desktop + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block space-y-6 bg-white border border-[#E7E2DA] rounded-sm p-6 sticky top-24 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#E7E2DA] pb-4">
              <h3 className="font-serif text-xl font-bold text-[#1C1917]">Refine Showroom</h3>
              {activeFilterCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1 text-xs uppercase tracking-wider font-bold text-[#C86446] hover:text-[#B25338] cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reset
                </button>
              )}
            </div>

            {/* Style Filter */}
            <div className="space-y-3">
              <span className="font-display text-xs uppercase tracking-wider text-[#78716C] font-bold block">
                Design Style
              </span>
              <div className="space-y-1.5">
                <label className="flex items-center gap-2.5 text-sm font-medium text-[#44403C] cursor-pointer py-1 hover:text-[#1C1917]">
                  <input
                    type="radio"
                    name="style"
                    checked={selectedStyle === "all"}
                    onChange={() => setSelectedStyle("all")}
                    className="text-[#C86446] focus:ring-[#C86446] w-4 h-4"
                  />
                  <span>All Styles</span>
                </label>
                {styles.map((st) => (
                  <label key={st} className="flex items-center gap-2.5 text-sm font-medium text-[#44403C] cursor-pointer py-1 hover:text-[#1C1917]">
                    <input
                      type="radio"
                      name="style"
                      checked={selectedStyle === st}
                      onChange={() => setSelectedStyle(st)}
                      className="text-[#C86446] focus:ring-[#C86446] w-4 h-4"
                    />
                    <span>{st}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Occasion Filter */}
            <div className="space-y-3 border-t border-[#E7E2DA] pt-5">
              <span className="font-display text-xs uppercase tracking-wider text-[#78716C] font-bold block">
                Occasion / Use Case
              </span>
              <div className="space-y-1.5">
                <label className="flex items-center gap-2.5 text-sm font-medium text-[#44403C] cursor-pointer py-1 hover:text-[#1C1917]">
                  <input
                    type="radio"
                    name="occasion"
                    checked={selectedOccasion === "all"}
                    onChange={() => setSelectedOccasion("all")}
                    className="text-[#C86446] focus:ring-[#C86446] w-4 h-4"
                  />
                  <span>All Occasions</span>
                </label>
                {occasions.map((occ) => (
                  <label key={occ} className="flex items-center gap-2.5 text-sm font-medium text-[#44403C] cursor-pointer py-1 hover:text-[#1C1917]">
                    <input
                      type="radio"
                      name="occasion"
                      checked={selectedOccasion === occ}
                      onChange={() => setSelectedOccasion(occ)}
                      className="text-[#C86446] focus:ring-[#C86446] w-4 h-4"
                    />
                    <span>{occ}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Scent Profile Filter */}
            <div className="space-y-3 border-t border-[#E7E2DA] pt-5">
              <span className="font-display text-xs uppercase tracking-wider text-[#78716C] font-bold block">
                Scent Profile
              </span>
              <div className="space-y-1.5">
                {[
                  { id: "all", label: "All Profiles" },
                  { id: "unscented", label: "Pure Natural Unscented" },
                  { id: "scented", label: "Botanical Essential Oils" },
                ].map((sc) => (
                  <label key={sc.id} className="flex items-center gap-2.5 text-sm font-medium text-[#44403C] cursor-pointer py-1 hover:text-[#1C1917]">
                    <input
                      type="radio"
                      name="scent"
                      checked={selectedScent === sc.id}
                      onChange={() => setSelectedScent(sc.id)}
                      className="text-[#C86446] focus:ring-[#C86446] w-4 h-4"
                    />
                    <span>{sc.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Bespoke Quote Callout */}
            <div className="border-t border-[#E7E2DA] pt-5 p-4 bg-[#FAF7F2] rounded-sm space-y-2">
              <div className="flex items-center gap-2 text-[#C86446] font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4" /> Bespoke Orders
              </div>
              <p className="text-xs text-[#57534E] leading-relaxed">
                Need a specific wax pantone tint or volume gift favors?
              </p>
              <a
                href="https://wa.me/919876543210?text=Hi%20Viiaura%2C%20I%20am%20looking%20for%20a%20bespoke%20candle%20creation."
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#1C1917] hover:text-[#C86446] underline block pt-1"
              >
                Consult Studio Concierge →
              </a>
            </div>
          </aside>

          {/* Product Grid Area (3 Columns on Desktop) */}
          <div className="lg:col-span-3 space-y-6">
            {/* Result Count and Active Tags */}
            <div className="flex items-center justify-between text-sm text-[#57534E] font-medium">
              <span>
                Showing <strong>{filteredProducts.length}</strong> of {PRODUCTS.length} designs
              </span>
              {activeFilterCount > 0 && (
                <button onClick={resetFilters} className="text-[#C86446] font-bold hover:underline cursor-pointer">
                  Clear all filters
                </button>
              )}
            </div>

            {filteredProducts.length === 0 ? (
              /* Empty State */
              <div className="bg-white border border-[#E7E2DA] rounded-sm p-14 text-center space-y-5">
                <div className="w-14 h-14 rounded-full bg-[#FAF7F2] text-[#8C857B] flex items-center justify-center mx-auto">
                  <Search className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-3xl font-bold text-[#1C1917]">No candle designs matched</h3>
                <p className="text-sm text-[#57534E] max-w-md mx-auto">
                  We could not find designs matching your active filter criteria. Try adjusting your search term or clearing filters.
                </p>
                <div className="pt-3 flex items-center justify-center gap-3">
                  <button
                    onClick={resetFilters}
                    className="px-8 py-3.5 bg-[#1C1917] text-[#FAF7F2] text-xs uppercase tracking-widest font-extrabold rounded-sm hover:bg-[#C86446] shadow-md"
                  >
                    Reset All Filters
                  </button>
                </div>
              </div>
            ) : (
              /* Grid of Cards */
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5 sm:gap-7">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} showPrice={showPrice} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer (Slide-Over Sheet) */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative ml-auto w-4/5 max-w-sm h-full bg-[#FAF7F2] p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#E7E2DA] pb-4">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-[#C86446]" />
                  <h3 className="font-serif text-2xl font-bold text-[#1C1917]">Refine Showroom</h3>
                </div>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-2 text-[#57534E] hover:text-[#1C1917] min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Price Toggle on Mobile */}
              <label className="flex items-center gap-3 text-sm font-bold text-[#1C1917] cursor-pointer py-2">
                <input
                  type="checkbox"
                  checked={showPrice}
                  onChange={(e) => setShowPrice(e.target.checked)}
                  className="rounded border-[#E7E2DA] text-[#C86446] focus:ring-[#C86446] w-4 h-4"
                />
                <span>Display Estimated Price</span>
              </label>

              {/* Collection */}
              <div className="space-y-2">
                <span className="font-display text-xs uppercase tracking-wider text-[#78716C] font-bold block">
                  Collection
                </span>
                <select
                  value={selectedCollection}
                  onChange={(e) => setSelectedCollection(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-[#E7E2DA] rounded-sm text-sm font-semibold text-[#1C1917] min-h-[44px]"
                >
                  <option value="all">All Collections</option>
                  {COLLECTIONS.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Style */}
              <div className="space-y-2">
                <span className="font-display text-xs uppercase tracking-wider text-[#78716C] font-bold block">
                  Style
                </span>
                <select
                  value={selectedStyle}
                  onChange={(e) => setSelectedStyle(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-[#E7E2DA] rounded-sm text-sm font-semibold text-[#1C1917] min-h-[44px]"
                >
                  <option value="all">All Styles</option>
                  {styles.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Occasion */}
              <div className="space-y-2">
                <span className="font-display text-xs uppercase tracking-wider text-[#78716C] font-bold block">
                  Occasion
                </span>
                <select
                  value={selectedOccasion}
                  onChange={(e) => setSelectedOccasion(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-[#E7E2DA] rounded-sm text-sm font-semibold text-[#1C1917] min-h-[44px]"
                >
                  <option value="all">All Occasions</option>
                  {occasions.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Mobile Apply Actions with large touch targets */}
            <div className="space-y-3 pt-6 border-t border-[#E7E2DA]">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-4 bg-[#1C1917] text-[#FAF7F2] text-xs uppercase tracking-widest font-extrabold rounded-sm shadow-md min-h-[48px]"
              >
                Apply Filters ({filteredProducts.length} Results)
              </button>
              <button
                onClick={() => {
                  resetFilters();
                  setMobileFilterOpen(false);
                }}
                className="w-full py-3.5 border border-[#E7E2DA] text-[#57534E] text-xs uppercase tracking-wider font-bold rounded-sm min-h-[44px]"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CataloguePage() {
  return (
    <Suspense
      fallback={
        <div className="pt-32 pb-20 text-center text-xs uppercase tracking-widest text-[#78716C] font-bold">
          Loading Viiaura Catalogue...
        </div>
      }
    >
      <CatalogueContent />
    </Suspense>
  );
}
