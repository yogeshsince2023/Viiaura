'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useAdmin } from '@/admin/store';
import { ProductEditor } from '@/components/admin/ProductEditor';
import { AlertCircle, ArrowLeft } from 'lucide-react';

export default function EditProductPage() {
  const params = useParams();
  const id = params?.id as string;
  const { products } = useAdmin();

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-amber-50 text-[#C86446] flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h1 className="text-xl font-serif font-bold text-stone-900">Product Not Found</h1>
        <p className="text-xs text-stone-500">
          The requested product ID "{id}" does not exist or may have been deleted.
        </p>
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#C86446] rounded-xl hover:bg-[#B25338]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Catalogue
        </Link>
      </div>
    );
  }

  return <ProductEditor initialProduct={product} />;
}
