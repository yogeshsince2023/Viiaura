'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAdmin } from '@/admin/store';
import {
  LayoutDashboard,
  Package,
  Layers,
  Sparkles,
  Inbox,
  ShoppingBag,
  SlidersHorizontal,
  FolderOpen,
  Settings,
  Bell,
  Search,
  ExternalLink,
  ChevronDown,
  Menu,
  X,
  Store,
  Plus,
} from 'lucide-react';

export const AdminTopBar: React.FC = () => {
  const pathname = usePathname();
  const { settings, enquiries, products } = useAdmin();
  const [catalogueMenuOpen, setCatalogueMenuOpen] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const newEnquiriesCount = enquiries.filter((e) => e.status === 'new').length;

  const isActive = (path: string) => {
    if (path === '/admin') return pathname === '/admin';
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#161413] text-[#FAF7F2] border-b border-stone-800/80 shadow-md">
      {/* Primary Top Bar (Exact Reference Alignment) */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Emblem & Title */}
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/admin" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-[#C86446]/20 border border-[#C86446]/40 flex items-center justify-center text-[#C86446] group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif tracking-wider font-semibold text-base text-stone-100 group-hover:text-white transition-colors">
                VIIAURA
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#C86446] font-sans -mt-1 font-medium">
                Atelier Admin
              </span>
            </div>
          </Link>

          {/* Mode Pill Badge */}
          <div className="hidden md:flex items-center ml-2">
            {settings.mode === 'enquiry_only' ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-950/80 border border-amber-600/40 text-amber-300">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                Enquiry Showcase
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-950/80 border border-emerald-600/40 text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Commerce Live
              </span>
            )}
          </div>
        </div>

        {/* Global Search Bar (From Reference Screenshot) */}
        <div className="hidden lg:flex flex-1 max-w-md mx-2">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search products, enquiries, categories... (⌘K)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-900/90 border border-stone-700/60 rounded-xl pl-9 pr-12 py-1.5 text-xs text-stone-200 placeholder-stone-400 focus:outline-none focus:border-[#C86446] focus:ring-1 focus:ring-[#C86446] transition-all"
            />
            <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] bg-stone-800 text-stone-400 px-1.5 py-0.5 rounded border border-stone-700">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Center / Right: Desktop Navigation Links (Pill Style) */}
        <nav className="hidden xl:flex items-center gap-1">
          {/* Dashboard */}
          <Link
            href="/admin"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              isActive('/admin') && pathname === '/admin'
                ? 'bg-stone-800 text-white font-semibold'
                : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            Dashboard
          </Link>

          {/* Catalogue Dropdown */}
          <div className="relative">
            <button
              onClick={() => setCatalogueMenuOpen(!catalogueMenuOpen)}
              onBlur={() => setTimeout(() => setCatalogueMenuOpen(false), 200)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                pathname.startsWith('/admin/products') ||
                pathname.startsWith('/admin/categories') ||
                pathname.startsWith('/admin/product-types') ||
                pathname.startsWith('/admin/collections')
                  ? 'bg-stone-800 text-white font-semibold'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              Catalogue
              <ChevronDown className="w-3 h-3 ml-0.5 opacity-70" />
            </button>

            {catalogueMenuOpen && (
              <div className="absolute top-full left-0 mt-1.5 w-48 bg-[#1C1917] border border-stone-800 rounded-xl shadow-xl py-1.5 z-50 text-xs">
                <Link
                  href="/admin/products"
                  className="flex items-center gap-2 px-3 py-2 text-stone-300 hover:text-white hover:bg-stone-800/80 transition-colors"
                >
                  <Package className="w-3.5 h-3.5 text-[#C86446]" />
                  <span>All Products</span>
                  <span className="ml-auto text-[10px] bg-stone-800 px-1.5 py-0.5 rounded text-stone-400">
                    {products.length}
                  </span>
                </Link>
                <Link
                  href="/admin/categories"
                  className="flex items-center gap-2 px-3 py-2 text-stone-300 hover:text-white hover:bg-stone-800/80 transition-colors"
                >
                  <Layers className="w-3.5 h-3.5 text-[#C86446]" />
                  <span>Category Tree</span>
                </Link>
                <Link
                  href="/admin/product-types"
                  className="flex items-center gap-2 px-3 py-2 text-stone-300 hover:text-white hover:bg-stone-800/80 transition-colors"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#C86446]" />
                  <span>Product Types & Fields</span>
                </Link>
                <Link
                  href="/admin/collections"
                  className="flex items-center gap-2 px-3 py-2 text-stone-300 hover:text-white hover:bg-stone-800/80 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#C86446]" />
                  <span>Collections</span>
                </Link>
              </div>
            )}
          </div>

          {/* Enquiries (Lightweight CRM) */}
          <Link
            href="/admin/enquiries"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              isActive('/admin/enquiries')
                ? 'bg-stone-800 text-white font-semibold'
                : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
            }`}
          >
            <Inbox className="w-3.5 h-3.5" />
            Enquiries
            {newEnquiriesCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[#C86446] text-white">
                {newEnquiriesCount}
              </span>
            )}
          </Link>

          {/* Orders (Only visible when commerce_enabled) */}
          {settings.mode === 'commerce_enabled' && (
            <Link
              href="/admin/orders"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                isActive('/admin/orders')
                  ? 'bg-stone-800 text-white font-semibold'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />
              Orders
            </Link>
          )}

          {/* Media Library */}
          <Link
            href="/admin/media"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              isActive('/admin/media')
                ? 'bg-stone-800 text-white font-semibold'
                : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
            }`}
          >
            <FolderOpen className="w-3.5 h-3.5" />
            Media
          </Link>

          {/* Settings */}
          <Link
            href="/admin/settings"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              isActive('/admin/settings')
                ? 'bg-stone-800 text-white font-semibold'
                : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            Settings
          </Link>
        </nav>

        {/* Far Right: Storefront Link, Notification, User Chip */}
        <div className="flex items-center gap-2.5">
          {/* Public Storefront Quick View Link */}
          <Link
            href="/"
            target="_blank"
            title="Open Public Showroom"
            className="hidden sm:flex items-center gap-1 px-2.5 py-1 text-xs text-stone-300 hover:text-white bg-stone-800/50 hover:bg-stone-800 rounded-lg border border-stone-700/60 transition-colors"
          >
            <ExternalLink className="w-3 h-3 text-[#C86446]" />
            <span>Storefront</span>
          </Link>

          {/* Notification Bell */}
          <button
            aria-label="Notifications"
            className="relative p-2 text-stone-300 hover:text-white hover:bg-stone-800/60 rounded-lg transition-colors"
          >
            <Bell className="w-4 h-4" />
            {newEnquiriesCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#C86446] rounded-full ring-2 ring-[#161413]" />
            )}
          </button>

          {/* User Profile Chip (Direct Reference Match: "Albert Flores") */}
          <div className="flex items-center gap-2 pl-2 border-l border-stone-800">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#C86446] to-amber-600 flex items-center justify-center text-white text-xs font-semibold shadow-inner">
              AF
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-medium text-stone-200 leading-tight">Albert Flores</span>
              <span className="text-[10px] text-stone-400 leading-tight">Studio Director</span>
            </div>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
            className="xl:hidden p-2 text-stone-300 hover:text-white hover:bg-stone-800 rounded-lg"
          >
            {mobileDrawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide Drawer Menu */}
      {mobileDrawerOpen && (
        <div className="xl:hidden bg-[#1C1917] border-b border-stone-800 px-4 py-4 space-y-2">
          <div className="flex items-center justify-between pb-3 border-b border-stone-800">
            <span className="text-xs font-medium text-stone-400 uppercase tracking-wider">Navigation</span>
            <div className="flex items-center gap-2">
              <Link
                href="/admin/products/new"
                onClick={() => setMobileDrawerOpen(false)}
                className="inline-flex items-center gap-1 px-3 py-1 bg-[#C86446] text-white rounded-lg text-xs font-medium"
              >
                <Plus className="w-3 h-3" />
                Add Product
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <Link
              href="/admin"
              onClick={() => setMobileDrawerOpen(false)}
              className="flex items-center gap-2 p-2.5 rounded-lg text-xs bg-stone-900 text-stone-200"
            >
              <LayoutDashboard className="w-4 h-4 text-[#C86446]" />
              Dashboard
            </Link>
            <Link
              href="/admin/products"
              onClick={() => setMobileDrawerOpen(false)}
              className="flex items-center gap-2 p-2.5 rounded-lg text-xs bg-stone-900 text-stone-200"
            >
              <Package className="w-4 h-4 text-[#C86446]" />
              Products ({products.length})
            </Link>
            <Link
              href="/admin/categories"
              onClick={() => setMobileDrawerOpen(false)}
              className="flex items-center gap-2 p-2.5 rounded-lg text-xs bg-stone-900 text-stone-200"
            >
              <Layers className="w-4 h-4 text-[#C86446]" />
              Categories
            </Link>
            <Link
              href="/admin/product-types"
              onClick={() => setMobileDrawerOpen(false)}
              className="flex items-center gap-2 p-2.5 rounded-lg text-xs bg-stone-900 text-stone-200"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#C86446]" />
              Product Types
            </Link>
            <Link
              href="/admin/enquiries"
              onClick={() => setMobileDrawerOpen(false)}
              className="flex items-center gap-2 p-2.5 rounded-lg text-xs bg-stone-900 text-stone-200"
            >
              <Inbox className="w-4 h-4 text-[#C86446]" />
              Enquiries ({newEnquiriesCount})
            </Link>
            <Link
              href="/admin/media"
              onClick={() => setMobileDrawerOpen(false)}
              className="flex items-center gap-2 p-2.5 rounded-lg text-xs bg-stone-900 text-stone-200"
            >
              <FolderOpen className="w-4 h-4 text-[#C86446]" />
              Media
            </Link>
            <Link
              href="/admin/settings"
              onClick={() => setMobileDrawerOpen(false)}
              className="flex items-center gap-2 p-2.5 rounded-lg text-xs bg-stone-900 text-stone-200"
            >
              <Settings className="w-4 h-4 text-[#C86446]" />
              Settings
            </Link>
            <Link
              href="/"
              target="_blank"
              onClick={() => setMobileDrawerOpen(false)}
              className="flex items-center gap-2 p-2.5 rounded-lg text-xs bg-stone-900 text-stone-200"
            >
              <ExternalLink className="w-4 h-4 text-[#C86446]" />
              Storefront ↗
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
