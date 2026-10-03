import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { COLLECTIONS } from "@/data/collections";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { ArrowLeft, MessageCircle } from "lucide-react";

export default async function SingleCollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const col = COLLECTIONS.find((c) => c.slug === resolvedParams.slug);

  if (!col) {
    return notFound();
  }

  const collectionProducts = PRODUCTS.filter((p) => p.collection === col.name);

  return (
    <div className="pt-24 sm:pt-28 pb-24 bg-[#FAF7F2] min-h-screen animate-page-enter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumbs */}
        <div className="flex items-center justify-between border-b border-[#E7E2DA] pb-4">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#57534E] hover:text-[#1C1917] font-extrabold"
          >
            <ArrowLeft className="w-4 h-4" /> All Collections
          </Link>
          <span className="font-display text-xs uppercase tracking-widest text-[#C86446] font-bold">
            {collectionProducts.length} Designs in Collection
          </span>
        </div>

        {/* Collection Hero Banner */}
        <div className="relative aspect-[21/9] sm:aspect-[24/8] w-full rounded-sm overflow-hidden bg-[#161413] shadow-xl border-2 border-[#E7E2DA]">
          <Image
            src={col.coverImage}
            alt={col.name}
            fill
            priority
            className="object-cover opacity-60"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
          <div className="absolute inset-0 p-6 sm:p-14 flex flex-col justify-center max-w-2xl text-white space-y-3">
            <span className="font-display text-xs uppercase tracking-[0.25em] text-[#D4AF7A] font-bold">
              Curated Series
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              {col.name}
            </h1>
            <p className="text-sm sm:text-base text-[#D8D1C7] leading-relaxed font-normal">
              {col.description}
            </p>
          </div>
        </div>

        {/* Product Grid */}
        <div className="space-y-7">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-3xl font-extrabold text-[#1C1917]">
              Designs in this Collection
            </h2>
            <Link
              href="/products"
              className="text-xs uppercase tracking-wider font-extrabold text-[#57534E] hover:text-[#C86446]"
            >
              Browse All Products →
            </Link>
          </div>

          {collectionProducts.length === 0 ? (
            <div className="bg-white border border-[#E7E2DA] rounded-sm p-14 text-center space-y-4">
              <p className="font-serif text-2xl font-bold text-[#1C1917]">New designs currently being cast in studio</p>
              <p className="text-sm text-[#57534E]">
                We are actively hand-pouring additions to this series. Enquire with our concierge for advance previews.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-7">
              {collectionProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>

        {/* Custom Enquiry Bar */}
        <div className="p-8 sm:p-10 bg-[#F3EFEA] border border-[#E7E2DA] rounded-sm flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1.5 text-center sm:text-left">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917]">
              Interested in bespoke colorways for {col.name}?
            </h3>
            <p className="text-sm text-[#57534E]">
              We offer custom wax pantone tinting and bespoke gift packaging for weddings and private events.
            </p>
          </div>
          <a
            href={`https://wa.me/919876543210?text=Hi%20Viiaura%2C%20I%20am%20interested%20in%20custom%20pieces%20from%20the%20${encodeURIComponent(
              col.name
            )}.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#1C1917] hover:bg-[#C86446] text-[#FAF7F2] text-xs uppercase tracking-widest font-extrabold rounded-sm transition-all flex-shrink-0 min-h-[48px] shadow-md"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            Enquire for this Series
          </a>
        </div>
      </div>
    </div>
  );
}
