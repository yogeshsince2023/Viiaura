export type ProductStatus = "published" | "draft" | "hidden";
export type EnquiryStatus = "available" | "madeToOrder" | "limited" | "enquire";

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  collection: string;
  productType: "sculptural" | "pillar" | "jar" | "floral" | "set" | "vessel";
  style: string;
  occasion: string[];
  shortDescription: string;
  fullDescription: string;
  scent?: string;
  waxMaterial: string;
  colours?: string[];
  dimensions: string;
  weight: string;
  burnTime?: string;
  customization?: string;
  status: ProductStatus;
  enquiryStatus: EnquiryStatus;
  images: string[];
  price?: number; // Optional estimated price in INR
  featured?: boolean;
  placeholder: boolean;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  coverImage: string;
  featuredDesignsCount: number;
}
