export type StoreMode = 'enquiry_only' | 'commerce_enabled';

export type PriceDisplayPolicy = 'show_all' | 'price_on_request' | 'hide_all';

export type PublishState = 'draft' | 'scheduled' | 'published' | 'archived';

export type DisplayStatus = 'available' | 'made_to_order' | 'limited' | 'enquire';

export type EnquiryStatus = 'new' | 'contacted' | 'quoted' | 'won' | 'lost';

export type EnquirySource = 'whatsapp' | 'web_form' | 'phone';

export type OrderStatus = 'pending' | 'paid' | 'packed' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';

export type AttributeDataType =
  | 'text_short'
  | 'text_long'
  | 'rich_text'
  | 'number'
  | 'number_with_unit'
  | 'single_select'
  | 'multi_select'
  | 'color_swatch'
  | 'boolean'
  | 'date';

export interface SelectOption {
  label: string;
  value: string;
  color?: string;
}

export interface ProductAttributeDefinition {
  id: string;
  productTypeId: string;
  name: string;
  slug: string;
  dataType: AttributeDataType;
  unit?: string;
  options?: SelectOption[];
  isRequired: boolean;
  isFilterable: boolean;
  showOnCard: boolean;
  showOnPdp: boolean;
  isSearchable: boolean;
  sortOrder: number;
  helpText?: string;
}

export interface ProductType {
  id: string;
  name: string;
  slug: string;
  description?: string;
  attributes: ProductAttributeDefinition[];
  categoryIds: string[];
}

export interface Category {
  id: string;
  parentId: string | null;
  name: string;
  slug: string;
  path: string; // e.g. "candles.sculptural"
  description?: string;
  imageUrl?: string;
  sortOrder: number;
  isVisible: boolean;
  seoTitle?: string;
  seoDescription?: string;
  productCount?: number;
}

export interface ProductVariant {
  id: string;
  productId: string;
  sku: string;
  title: string;
  options: Record<string, string>; // e.g. { size: "250g", scent: "Sandalwood" }
  mrp: number;
  salePrice?: number;
  stockQuantity: number;
  trackInventory: boolean;
  isMadeToOrder: boolean;
  hsnCode?: string;
  isDefault: boolean;
}

export interface ProductMedia {
  id: string;
  url: string;
  altText?: string;
  isCover: boolean;
  sortOrder: number;
}

export interface Product {
  id: string;
  productTypeId: string;
  categoryIds: string[];
  name: string;
  slug: string;
  sku: string;
  shortDescription: string;
  fullDescription: string;
  badges: string[]; // e.g. ["New", "Limited", "Made to Order"]
  displayStatus: DisplayStatus;
  publishState: PublishState;
  customizationEnabled: boolean;
  customizationPrompt?: string;
  attributeValues: Record<string, any>; // slug -> value
  variants: ProductVariant[];
  media: ProductMedia[];
  collectionIds: string[];
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
  isDemo?: boolean;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  story?: string;
  bannerImageUrl?: string;
  mode: 'manual' | 'automatic';
  rulesJson?: {
    operator: 'AND' | 'OR';
    conditions: Array<{ field: string; operator: string; value: string }>;
  };
  productIds: string[];
  isVisible: boolean;
  sortOrder: number;
}

export interface Enquiry {
  id: string;
  enquiryNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  linkedProductId?: string;
  linkedProductTitle?: string;
  linkedProductSku?: string;
  linkedProductImage?: string;
  quantity?: number;
  customizationNotes?: string;
  preferredContactMethod?: string;
  message: string;
  status: EnquiryStatus;
  source: EnquirySource;
  assignedTo?: string;
  internalNotes?: string[];
  estimatedValue?: number;
  createdAt: string;
  updatedAt: string;
  isDemo?: boolean;
}

export interface OrderItem {
  productId: string;
  productName: string;
  variantTitle: string;
  sku: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  discountTotal: number;
  shippingTotal: number;
  taxTotal: number;
  grandTotal: number;
  paymentMethod: string;
  paymentStatus: 'pending' | 'captured' | 'failed' | 'refunded';
  shippingCourier?: string;
  trackingNumber?: string;
  createdAt: string;
  isDemo?: boolean;
}

export interface MediaAsset {
  id: string;
  folder: string;
  fileName: string;
  url: string;
  mimeType: string;
  sizeBytes: number;
  dimensions?: { width: number; height: number };
  altText?: string;
  usageCount: number;
  createdAt: string;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  mode: StoreMode;
  priceDisplay: PriceDisplayPolicy;
  currencySymbol: string;
  currencyCode: string;
  businessEmail: string;
  businessPhone: string;
  whatsappNumber: string;
  whatsappTemplate: string;
  announcementText?: string;
  isMaintenanceMode: boolean;
}

export interface AuditLog {
  id: string;
  userName: string;
  action: string;
  entityType: string;
  entityId: string;
  details: string;
  createdAt: string;
}
