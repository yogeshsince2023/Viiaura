'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Category,
  ProductType,
  Product,
  Enquiry,
  Order,
  StoreSettings,
  MediaAsset,
  AuditLog,
  Collection,
  ProductAttributeDefinition,
} from './types';

// ============================================================================
// INITIAL SEED DATA (All demo data clearly tagged with isDemo: true)
// ============================================================================

const INITIAL_SETTINGS: StoreSettings = {
  storeName: 'Viiaura Atelier',
  tagline: 'Handcrafted Sculptural Candles & Living Art',
  mode: 'enquiry_only', // default to enquiry_only as specified in brief
  priceDisplay: 'show_all',
  currencySymbol: '₹',
  currencyCode: 'INR',
  businessEmail: 'concierge@viiaura.com',
  businessPhone: '+91 98765 43210',
  whatsappNumber: '+91 98765 43210',
  whatsappTemplate:
    'Hi Viiaura, I am interested in {product_name} (SKU: {sku}). Please share details regarding bespoke wax options and availability.',
  announcementText: 'Complimentary handwritten gift card with all festive orders.',
  isMaintenanceMode: false,
};

const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-candles',
    parentId: null,
    name: 'Candles',
    slug: 'candles',
    path: 'candles',
    description: 'Bespoke sculptural and vessel candles poured by hand.',
    imageUrl: '/images/sculptural-candle.jpg',
    sortOrder: 1,
    isVisible: true,
  },
  {
    id: 'cat-sculptural',
    parentId: 'cat-candles',
    name: 'Sculptural Art',
    slug: 'sculptural',
    path: 'candles.sculptural',
    description: 'Geometric arches, organic waves, and architectural silhouettes.',
    imageUrl: '/images/sculptural-candle.jpg',
    sortOrder: 1,
    isVisible: true,
  },
  {
    id: 'cat-signature',
    parentId: 'cat-candles',
    name: 'Signature Jars',
    slug: 'signature',
    path: 'candles.signature',
    description: 'Ceramic & frosted vessels with pure essential oils.',
    imageUrl: '/images/signature-candle.jpg',
    sortOrder: 2,
    isVisible: true,
  },
  {
    id: 'cat-pillars',
    parentId: 'cat-candles',
    name: 'Textured Pillars',
    slug: 'pillars',
    path: 'candles.pillars',
    description: 'Ribbed, stepped, and raw-edged pillar candles.',
    imageUrl: '/images/ivory-candles.jpg',
    sortOrder: 3,
    isVisible: true,
  },
  {
    id: 'cat-gifting',
    parentId: null,
    name: 'Gifting & Hampers',
    slug: 'gifting',
    path: 'gifting',
    description: 'Curated artisanal hampers for weddings, celebrations, and corporate gifts.',
    imageUrl: '/images/marigold-candle.webp',
    sortOrder: 2,
    isVisible: true,
  },
];

const INITIAL_PRODUCT_TYPES: ProductType[] = [
  {
    id: 'type-candle',
    name: 'Handcrafted Candle',
    slug: 'candle',
    description: 'Standard sculptural or vessel candle specification template.',
    categoryIds: ['cat-candles', 'cat-sculptural', 'cat-signature', 'cat-pillars'],
    attributes: [
      {
        id: 'attr-scent',
        productTypeId: 'type-candle',
        name: 'Scent Profile',
        slug: 'scent_profile',
        dataType: 'single_select',
        options: [
          { label: 'Smoked Vanilla & Amber', value: 'smoked_vanilla' },
          { label: 'White Tea & Thyme', value: 'white_tea' },
          { label: 'Sandalwood & Vetiver', value: 'sandalwood' },
          { label: 'French Lavender & Sage', value: 'lavender' },
          { label: 'Unscented / Pure Wax', value: 'unscented' },
        ],
        isRequired: true,
        isFilterable: true,
        showOnCard: true,
        showOnPdp: true,
        isSearchable: true,
        sortOrder: 1,
        helpText: 'Select the primary fragrance family or unscented option.',
      },
      {
        id: 'attr-wax',
        productTypeId: 'type-candle',
        name: 'Wax Blend',
        slug: 'wax_blend',
        dataType: 'single_select',
        options: [
          { label: '100% Pure Soy Wax', value: 'pure_soy' },
          { label: 'Coconut & Beeswax Infusion', value: 'coconut_beeswax' },
          { label: 'Natural Rapeseed & Soy', value: 'rapeseed_soy' },
        ],
        isRequired: true,
        isFilterable: true,
        showOnCard: false,
        showOnPdp: true,
        isSearchable: false,
        sortOrder: 2,
      },
      {
        id: 'attr-burn-time',
        productTypeId: 'type-candle',
        name: 'Burn Duration',
        slug: 'burn_duration',
        dataType: 'number_with_unit',
        unit: 'hrs',
        isRequired: false,
        isFilterable: true,
        showOnCard: true,
        showOnPdp: true,
        isSearchable: false,
        sortOrder: 3,
      },
      {
        id: 'attr-dimensions',
        productTypeId: 'type-candle',
        name: 'Object Dimensions',
        slug: 'dimensions',
        dataType: 'text_short',
        isRequired: false,
        isFilterable: false,
        showOnCard: false,
        showOnPdp: true,
        isSearchable: false,
        sortOrder: 4,
        helpText: 'e.g. 14cm (H) x 8cm (W)',
      },
      {
        id: 'attr-wick',
        productTypeId: 'type-candle',
        name: 'Wick Material',
        slug: 'wick_material',
        dataType: 'single_select',
        options: [
          { label: 'Unbleached Organic Cotton', value: 'cotton' },
          { label: 'FSC Certified Crackling Wood', value: 'wood' },
          { label: 'Double Braided Cotton', value: 'double_cotton' },
        ],
        isRequired: false,
        isFilterable: false,
        showOnCard: false,
        showOnPdp: true,
        isSearchable: false,
        sortOrder: 5,
      },
    ],
  },
  {
    id: 'type-hamper',
    name: 'Atelier Gift Box',
    slug: 'hamper',
    description: 'Curated sets and corporate gift packages.',
    categoryIds: ['cat-gifting'],
    attributes: [
      {
        id: 'attr-box-finish',
        productTypeId: 'type-hamper',
        name: 'Packaging Finish',
        slug: 'packaging_finish',
        dataType: 'single_select',
        options: [
          { label: 'Handcrafted Pine Wood Keepsake', value: 'pine_wood' },
          { label: 'Textured Ivory Linen Box with Ribbon', value: 'linen_ivory' },
          { label: 'Recycled Kraft Gift Wrap', value: 'kraft' },
        ],
        isRequired: true,
        isFilterable: true,
        showOnCard: false,
        showOnPdp: true,
        isSearchable: false,
        sortOrder: 1,
      },
      {
        id: 'attr-matches',
        productTypeId: 'type-hamper',
        name: 'Includes Studio Match Vial',
        slug: 'includes_matches',
        dataType: 'boolean',
        isRequired: false,
        isFilterable: false,
        showOnCard: true,
        showOnPdp: true,
        isSearchable: false,
        sortOrder: 2,
      },
    ],
  },
];

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    productTypeId: 'type-candle',
    categoryIds: ['cat-sculptural'],
    name: 'Solstice Swirl Pillar',
    slug: 'solstice-swirl-pillar',
    sku: 'VII-SCU-001',
    shortDescription: 'Spiral column casting gentle helical cast shadows.',
    fullDescription: '<p>The Solstice Swirl is designed as an architectural centerpiece. Poured in small batches using premium soy wax, its twisting ridges create striking shadow play when lit or placed near natural sunlight.</p>',
    badges: ['New', 'Bestseller'],
    displayStatus: 'available',
    publishState: 'published',
    customizationEnabled: true,
    customizationPrompt: 'Custom wax tint (Ivory, Sand, Terracotta) available on request.',
    attributeValues: {
      scent_profile: 'smoked_vanilla',
      wax_blend: 'pure_soy',
      burn_duration: 45,
      dimensions: '15cm x 6cm',
      wick_material: 'cotton',
    },
    variants: [
      {
        id: 'var-1-1',
        productId: 'prod-1',
        sku: 'VII-SCU-001-STD',
        title: 'Standard (320g)',
        options: { size: '320g' },
        mrp: 1450,
        salePrice: 1250,
        stockQuantity: 18,
        trackInventory: true,
        isMadeToOrder: false,
        isDefault: true,
      },
    ],
    media: [
      { id: 'm-1', url: '/images/sculptural-candle.jpg', isCover: true, sortOrder: 1, altText: 'Solstice Swirl Pillar' },
      { id: 'm-2', url: '/images/candle-still-life.jpg', isCover: false, sortOrder: 2, altText: 'Pillar in daylight' },
    ],
    collectionIds: ['col-sculptural'],
    createdAt: '2026-09-28T10:00:00Z',
    updatedAt: '2026-10-02T14:30:00Z',
    isDemo: true,
  },
  {
    id: 'prod-2',
    productTypeId: 'type-candle',
    categoryIds: ['cat-sculptural'],
    name: 'Aurelia Ribbed Pillar',
    slug: 'aurelia-ribbed-pillar',
    sku: 'VII-SCU-002',
    shortDescription: 'Fluted columns inspired by neoclassical stone architecture.',
    fullDescription: '<p>Aurelia features dense vertical fluting that reflects a rhythm of highlights and dark lines. Ideal for mantels and quiet dinner settings.</p>',
    badges: ['Signature'],
    displayStatus: 'available',
    publishState: 'published',
    customizationEnabled: false,
    attributeValues: {
      scent_profile: 'white_tea',
      wax_blend: 'pure_soy',
      burn_duration: 50,
      dimensions: '18cm x 7cm',
      wick_material: 'cotton',
    },
    variants: [
      {
        id: 'var-2-1',
        productId: 'prod-2',
        sku: 'VII-SCU-002-STD',
        title: 'Tall (400g)',
        options: { size: '400g' },
        mrp: 1650,
        stockQuantity: 12,
        trackInventory: true,
        isMadeToOrder: false,
        isDefault: true,
      },
    ],
    media: [
      { id: 'm-3', url: '/images/ivory-candles.jpg', isCover: true, sortOrder: 1, altText: 'Aurelia Ribbed Pillar' },
    ],
    collectionIds: ['col-sculptural'],
    createdAt: '2026-09-29T11:00:00Z',
    updatedAt: '2026-10-01T09:15:00Z',
    isDemo: true,
  },
  {
    id: 'prod-3',
    productTypeId: 'type-candle',
    categoryIds: ['cat-sculptural'],
    name: 'Luna Arc Candle',
    slug: 'luna-arc-candle',
    sku: 'VII-SCU-003',
    shortDescription: 'Dual-wick crescent bridge creating harmonious twin flames.',
    fullDescription: '<p>A sculptural statement piece with two natural wicks positioned across a fluid geometric bridge. Designed as a conversation piece.</p>',
    badges: ['Limited'],
    displayStatus: 'limited',
    publishState: 'published',
    customizationEnabled: true,
    attributeValues: {
      scent_profile: 'sandalwood',
      wax_blend: 'coconut_beeswax',
      burn_duration: 35,
      dimensions: '12cm x 16cm x 4cm',
      wick_material: 'double_cotton',
    },
    variants: [
      {
        id: 'var-3-1',
        productId: 'prod-3',
        sku: 'VII-SCU-003-STD',
        title: 'Duo Wick (350g)',
        options: { size: '350g' },
        mrp: 1850,
        stockQuantity: 5,
        trackInventory: true,
        isMadeToOrder: true,
        isDefault: true,
      },
    ],
    media: [
      { id: 'm-4', url: '/images/handmade-candle.jpg', isCover: true, sortOrder: 1, altText: 'Luna Arc Candle' },
    ],
    collectionIds: ['col-sculptural'],
    createdAt: '2026-10-01T12:00:00Z',
    updatedAt: '2026-10-03T16:00:00Z',
    isDemo: true,
  },
  {
    id: 'prod-4',
    productTypeId: 'type-candle',
    categoryIds: ['cat-signature'],
    name: 'Nocturne Vessel Candle',
    slug: 'nocturne-vessel-candle',
    sku: 'VII-VES-001',
    shortDescription: 'Matte stoneware jar with wooden crackling wick.',
    fullDescription: '<p>Poured in a reusable ceramic stoneware vessel handcrafted by regional potters. The wooden wick crackles gently reminiscent of an open hearth.</p>',
    badges: ['Made to Order'],
    displayStatus: 'made_to_order',
    publishState: 'published',
    customizationEnabled: true,
    attributeValues: {
      scent_profile: 'smoked_vanilla',
      wax_blend: 'pure_soy',
      burn_duration: 60,
      dimensions: '9cm (Dia) x 10cm (H)',
      wick_material: 'wood',
    },
    variants: [
      {
        id: 'var-4-1',
        productId: 'prod-4',
        sku: 'VII-VES-001-STD',
        title: '300g Ceramic Jar',
        options: { size: '300g' },
        mrp: 2100,
        stockQuantity: 20,
        trackInventory: false,
        isMadeToOrder: true,
        isDefault: true,
      },
    ],
    media: [
      { id: 'm-5', url: '/images/signature-candle.jpg', isCover: true, sortOrder: 1, altText: 'Nocturne Vessel' },
    ],
    collectionIds: ['col-signature'],
    createdAt: '2026-10-02T10:00:00Z',
    updatedAt: '2026-10-04T11:20:00Z',
    isDemo: true,
  },
  {
    id: 'prod-5',
    productTypeId: 'type-hamper',
    categoryIds: ['cat-gifting'],
    name: 'Atelier Festive Gift Suite',
    slug: 'atelier-festive-gift-suite',
    sku: 'VII-HAM-001',
    shortDescription: 'Curated 3-piece sculptural candle set in pine keepsake box.',
    fullDescription: '<p>A bespoke gifting ensemble consisting of two sculptural pillars, one ceramic vessel candle, brass snuffer, and apothecary match vial in an engraved pine chest.</p>',
    badges: ['Festive', 'Curated Hamper'],
    displayStatus: 'enquire',
    publishState: 'published',
    customizationEnabled: true,
    customizationPrompt: 'Custom laser engraving on pine lid and personalized foil ribbon included.',
    attributeValues: {
      packaging_finish: 'pine_wood',
      includes_matches: true,
    },
    variants: [
      {
        id: 'var-5-1',
        productId: 'prod-5',
        sku: 'VII-HAM-001-SET',
        title: 'Complete Hamper Box',
        options: { tier: 'Premium Suite' },
        mrp: 4200,
        salePrice: 3850,
        stockQuantity: 10,
        trackInventory: true,
        isMadeToOrder: true,
        isDefault: true,
      },
    ],
    media: [
      { id: 'm-6', url: '/images/marigold-candle.webp', isCover: true, sortOrder: 1, altText: 'Festive Gift Suite' },
    ],
    collectionIds: ['col-festive'],
    createdAt: '2026-10-02T14:00:00Z',
    updatedAt: '2026-10-04T12:00:00Z',
    isDemo: true,
  },
];

const INITIAL_COLLECTIONS: Collection[] = [
  {
    id: 'col-sculptural',
    name: 'Sculptural Forms',
    slug: 'sculptural',
    story: 'Candles as tactile geometry and ambient architectural art.',
    bannerImageUrl: '/images/sculptural-candle.jpg',
    mode: 'manual',
    productIds: ['prod-1', 'prod-2', 'prod-3'],
    isVisible: true,
    sortOrder: 1,
  },
  {
    id: 'col-signature',
    name: 'Signature Vessels',
    slug: 'signature',
    story: 'Re-usable ceramic and matte stoneware vessels with complex fragrances.',
    bannerImageUrl: '/images/signature-candle.jpg',
    mode: 'manual',
    productIds: ['prod-4'],
    isVisible: true,
    sortOrder: 2,
  },
  {
    id: 'col-festive',
    name: 'Festive & Corporate Gifting',
    slug: 'festive',
    story: 'Thoughtful handmade gift packages crafted for intimate celebrations.',
    bannerImageUrl: '/images/marigold-candle.webp',
    mode: 'manual',
    productIds: ['prod-5'],
    isVisible: true,
    sortOrder: 3,
  },
];

const INITIAL_ENQUIRIES: Enquiry[] = [
  {
    id: 'enq-101',
    enquiryNumber: 'ENQ-2026-0084',
    customerName: 'Aarav Singhania',
    customerPhone: '+91 98201 12345',
    customerEmail: 'aarav.s@singhaniagroup.com',
    linkedProductId: 'prod-5',
    linkedProductTitle: 'Atelier Festive Gift Suite',
    linkedProductSku: 'VII-HAM-001',
    linkedProductImage: '/images/marigold-candle.webp',
    quantity: 45,
    customizationNotes: 'Require corporate logo laser-engraved on pine lid + customized Diwali greeting card.',
    preferredContactMethod: 'whatsapp',
    message: 'We are curating executive Diwali gifts for our leadership team. Need delivery by late next month in Mumbai.',
    status: 'quoted',
    source: 'whatsapp',
    assignedTo: 'Studio Concierge',
    internalNotes: ['Sent custom quotation on WhatsApp at ₹3,400/unit for 45 pieces. Awaiting brand logo vectors.'],
    estimatedValue: 153000,
    createdAt: '2026-10-04T09:20:00Z',
    updatedAt: '2026-10-04T15:40:00Z',
    isDemo: true,
  },
  {
    id: 'enq-102',
    enquiryNumber: 'ENQ-2026-0083',
    customerName: 'Meera Nambiar',
    customerPhone: '+91 99450 67890',
    customerEmail: 'meera.design@gmail.com',
    linkedProductId: 'prod-1',
    linkedProductTitle: 'Solstice Swirl Pillar',
    linkedProductSku: 'VII-SCU-001',
    linkedProductImage: '/images/sculptural-candle.jpg',
    quantity: 12,
    customizationNotes: 'Can we get these poured in a custom warm terracotta tinted wax?',
    preferredContactMethod: 'whatsapp',
    message: 'Curating tablescape decor for an intimate autumn wedding dinner in Bangalore.',
    status: 'new',
    source: 'web_form',
    assignedTo: 'Studio Concierge',
    estimatedValue: 16800,
    createdAt: '2026-10-05T08:15:00Z',
    updatedAt: '2026-10-05T08:15:00Z',
    isDemo: true,
  },
  {
    id: 'enq-103',
    enquiryNumber: 'ENQ-2026-0082',
    customerName: 'Rohan Mehta',
    customerPhone: '+91 97112 34567',
    customerEmail: 'rohan.mehta@studioarch.in',
    linkedProductId: 'prod-3',
    linkedProductTitle: 'Luna Arc Candle',
    linkedProductSku: 'VII-SCU-003',
    linkedProductImage: '/images/handmade-candle.jpg',
    quantity: 4,
    customizationNotes: 'Unscented only for client sensitive to fragrance.',
    preferredContactMethod: 'phone',
    message: 'Architectural styling for a luxury penthouse photoshoot.',
    status: 'contacted',
    source: 'phone',
    assignedTo: 'Studio Concierge',
    internalNotes: ['Called customer, confirmed unscented soy blend is ready to ship.'],
    estimatedValue: 7400,
    createdAt: '2026-10-04T14:30:00Z',
    updatedAt: '2026-10-04T17:00:00Z',
    isDemo: true,
  },
  {
    id: 'enq-104',
    enquiryNumber: 'ENQ-2026-0081',
    customerName: 'Ananya Kapoor',
    customerPhone: '+91 98199 87654',
    customerEmail: 'ananya.k@luxuryhomes.in',
    linkedProductId: 'prod-4',
    linkedProductTitle: 'Nocturne Vessel Candle',
    linkedProductSku: 'VII-VES-001',
    linkedProductImage: '/images/signature-candle.jpg',
    quantity: 20,
    customizationNotes: 'Ivory glazed vessel finish instead of matte dark.',
    preferredContactMethod: 'whatsapp',
    message: 'Gifts for boutique hotel VIP guests upon arrival.',
    status: 'won',
    source: 'whatsapp',
    assignedTo: 'Studio Concierge',
    internalNotes: ['Payment advance received via bank transfer. Studio team started pouring batch.'],
    estimatedValue: 42000,
    createdAt: '2026-10-02T11:00:00Z',
    updatedAt: '2026-10-03T18:30:00Z',
    isDemo: true,
  },
  {
    id: 'enq-105',
    enquiryNumber: 'ENQ-2026-0080',
    customerName: 'Devika Pillai',
    customerPhone: '+91 98400 11223',
    linkedProductId: 'prod-2',
    linkedProductTitle: 'Aurelia Ribbed Pillar',
    linkedProductSku: 'VII-SCU-002',
    linkedProductImage: '/images/ivory-candles.jpg',
    quantity: 2,
    message: 'Checking if this can be dispatched urgently for a birthday tomorrow.',
    status: 'lost',
    source: 'whatsapp',
    internalNotes: ['Could not accommodate same-day dispatch outside Delhi NCR.'],
    estimatedValue: 3300,
    createdAt: '2026-10-01T16:00:00Z',
    updatedAt: '2026-10-02T10:00:00Z',
    isDemo: true,
  },
];

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'VII-ORD-1001',
    customerName: 'Natasha Verma',
    customerPhone: '+91 98101 23456',
    customerEmail: 'natasha.verma@gmail.com',
    status: 'shipped',
    items: [
      {
        productId: 'prod-1',
        productName: 'Solstice Swirl Pillar',
        variantTitle: 'Standard (320g)',
        sku: 'VII-SCU-001-STD',
        unitPrice: 1250,
        quantity: 2,
        totalPrice: 2500,
      },
    ],
    subtotal: 2500,
    discountTotal: 0,
    shippingTotal: 0,
    taxTotal: 450,
    grandTotal: 2950,
    paymentMethod: 'Razorpay UPI',
    paymentStatus: 'captured',
    shippingCourier: 'BlueDart Express',
    trackingNumber: 'BLU-88920194',
    createdAt: '2026-10-03T13:45:00Z',
    isDemo: true,
  },
  {
    id: 'ord-1002',
    orderNumber: 'VII-ORD-1002',
    customerName: 'Vikramaditya Roy',
    customerPhone: '+91 98310 99887',
    customerEmail: 'v.roy@royholdings.com',
    status: 'paid',
    items: [
      {
        productId: 'prod-4',
        productName: 'Nocturne Vessel Candle',
        variantTitle: '300g Ceramic Jar',
        sku: 'VII-VES-001-STD',
        unitPrice: 2100,
        quantity: 1,
        totalPrice: 2100,
      },
    ],
    subtotal: 2100,
    discountTotal: 0,
    shippingTotal: 150,
    taxTotal: 378,
    grandTotal: 2628,
    paymentMethod: 'Razorpay Card',
    paymentStatus: 'captured',
    createdAt: '2026-10-04T18:10:00Z',
    isDemo: true,
  },
];

const INITIAL_MEDIA: MediaAsset[] = [
  {
    id: 'med-1',
    folder: 'Products',
    fileName: 'sculptural-candle.jpg',
    url: '/images/sculptural-candle.jpg',
    mimeType: 'image/jpeg',
    sizeBytes: 1261665,
    dimensions: { width: 1200, height: 1600 },
    altText: 'Solstice swirl sculptural candle in warm morning light',
    usageCount: 2,
    createdAt: '2026-09-20T08:00:00Z',
  },
  {
    id: 'med-2',
    folder: 'Products',
    fileName: 'ivory-candles.jpg',
    url: '/images/ivory-candles.jpg',
    mimeType: 'image/jpeg',
    sizeBytes: 885846,
    dimensions: { width: 1200, height: 1600 },
    altText: 'Aurelia fluted pillar candle in studio setting',
    usageCount: 2,
    createdAt: '2026-09-21T09:30:00Z',
  },
  {
    id: 'med-3',
    folder: 'Products',
    fileName: 'signature-candle.jpg',
    url: '/images/signature-candle.jpg',
    mimeType: 'image/jpeg',
    sizeBytes: 106822,
    dimensions: { width: 1200, height: 1500 },
    altText: 'Nocturne ceramic vessel candle',
    usageCount: 2,
    createdAt: '2026-09-22T10:00:00Z',
  },
  {
    id: 'med-4',
    folder: 'Hampers',
    fileName: 'marigold-candle.webp',
    url: '/images/marigold-candle.webp',
    mimeType: 'image/webp',
    sizeBytes: 102118,
    dimensions: { width: 1000, height: 1333 },
    altText: 'Festive hamper presentation with marigold blossoms',
    usageCount: 2,
    createdAt: '2026-09-23T11:00:00Z',
  },
  {
    id: 'med-5',
    folder: 'Lifestyle',
    fileName: 'candle-still-life.jpg',
    url: '/images/candle-still-life.jpg',
    mimeType: 'image/jpeg',
    sizeBytes: 855645,
    dimensions: { width: 1200, height: 1600 },
    altText: 'Editorial lifestyle arrangement with candles and stone trays',
    usageCount: 1,
    createdAt: '2026-09-24T12:00:00Z',
  },
];

const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    userName: 'Albert Flores (Studio Director)',
    action: 'product.publish',
    entityType: 'Product',
    entityId: 'prod-1',
    details: 'Published "Solstice Swirl Pillar" with 5 custom attributes.',
    createdAt: '2026-10-02T14:30:00Z',
  },
  {
    id: 'log-2',
    userName: 'Albert Flores (Studio Director)',
    action: 'enquiry.status_change',
    entityType: 'Enquiry',
    entityId: 'enq-101',
    details: 'Moved ENQ-2026-0084 from "Contacted" to "Quoted" (Value: ₹1,53,000).',
    createdAt: '2026-10-04T15:40:00Z',
  },
];

// ============================================================================
// CONTEXT INTERFACE
// ============================================================================

interface AdminContextType {
  settings: StoreSettings;
  updateSettings: (newSettings: Partial<StoreSettings>) => void;
  categories: Category[];
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  productTypes: ProductType[];
  addProductType: (type: Omit<ProductType, 'id'>) => void;
  updateProductType: (id: string, updates: Partial<ProductType>) => void;
  deleteProductType: (id: string) => void;
  addAttributeToType: (productTypeId: string, attr: Omit<ProductAttributeDefinition, 'id' | 'productTypeId'>) => void;
  deleteAttributeFromType: (productTypeId: string, attributeId: string) => void;
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  duplicateProduct: (id: string) => void;
  collections: Collection[];
  addCollection: (col: Omit<Collection, 'id'>) => void;
  updateCollection: (id: string, updates: Partial<Collection>) => void;
  deleteCollection: (id: string) => void;
  enquiries: Enquiry[];
  updateEnquiryStatus: (id: string, status: Enquiry['status']) => void;
  addEnquiryNote: (id: string, note: string) => void;
  orders: Order[];
  updateOrderStatus: (id: string, status: Order['status']) => void;
  media: MediaAsset[];
  deleteMedia: (id: string) => boolean;
  auditLogs: AuditLog[];
  // Bulk / Demo Actions
  purgeDemoData: () => void;
  resetToDemo: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [settings, setSettings] = useState<StoreSettings>(INITIAL_SETTINGS);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [productTypes, setProductTypes] = useState<ProductType[]>(INITIAL_PRODUCT_TYPES);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [collections, setCollections] = useState<Collection[]>(INITIAL_COLLECTIONS);
  const [enquiries, setEnquiries] = useState<Enquiry[]>(INITIAL_ENQUIRIES);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [media, setMedia] = useState<MediaAsset[]>(INITIAL_MEDIA);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);

  // Load from LocalStorage on client mount
  useEffect(() => {
    try {
      const storedSettings = localStorage.getItem('viiaura_admin_settings');
      if (storedSettings) setSettings(JSON.parse(storedSettings));

      const storedCategories = localStorage.getItem('viiaura_admin_categories');
      if (storedCategories) setCategories(JSON.parse(storedCategories));

      const storedTypes = localStorage.getItem('viiaura_admin_product_types');
      if (storedTypes) setProductTypes(JSON.parse(storedTypes));

      const storedProducts = localStorage.getItem('viiaura_admin_products');
      if (storedProducts) setProducts(JSON.parse(storedProducts));

      const storedCollections = localStorage.getItem('viiaura_admin_collections');
      if (storedCollections) setCollections(JSON.parse(storedCollections));

      const storedEnquiries = localStorage.getItem('viiaura_admin_enquiries');
      if (storedEnquiries) setEnquiries(JSON.parse(storedEnquiries));

      const storedOrders = localStorage.getItem('viiaura_admin_orders');
      if (storedOrders) setOrders(JSON.parse(storedOrders));

      const storedMedia = localStorage.getItem('viiaura_admin_media');
      if (storedMedia) setMedia(JSON.parse(storedMedia));

      const storedLogs = localStorage.getItem('viiaura_admin_audit_logs');
      if (storedLogs) setAuditLogs(JSON.parse(storedLogs));
    } catch (e) {
      console.warn('LocalStorage unavailable, running in-memory', e);
    }
    setIsLoaded(true);
  }, []);

  // Save to LocalStorage whenever state updates
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('viiaura_admin_settings', JSON.stringify(settings));
      localStorage.setItem('viiaura_admin_categories', JSON.stringify(categories));
      localStorage.setItem('viiaura_admin_product_types', JSON.stringify(productTypes));
      localStorage.setItem('viiaura_admin_products', JSON.stringify(products));
      localStorage.setItem('viiaura_admin_collections', JSON.stringify(collections));
      localStorage.setItem('viiaura_admin_enquiries', JSON.stringify(enquiries));
      localStorage.setItem('viiaura_admin_orders', JSON.stringify(orders));
      localStorage.setItem('viiaura_admin_media', JSON.stringify(media));
      localStorage.setItem('viiaura_admin_audit_logs', JSON.stringify(auditLogs));
    } catch (e) {
      console.warn('Failed saving to LocalStorage', e);
    }
  }, [isLoaded, settings, categories, productTypes, products, collections, enquiries, orders, media, auditLogs]);

  const addAuditLog = (action: string, entityType: string, entityId: string, details: string) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      userName: 'Albert Flores (Studio Director)',
      action,
      entityType,
      entityId,
      details,
      createdAt: new Date().toISOString(),
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // Actions
  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      addAuditLog(
        'settings.update',
        'StoreSettings',
        'singleton',
        `Updated settings (mode: ${updated.mode}, priceDisplay: ${updated.priceDisplay})`
      );
      return updated;
    });
  };

  const addCategory = (cat: Omit<Category, 'id'>) => {
    const newCat: Category = { ...cat, id: `cat-${Date.now()}` };
    setCategories((prev) => [...prev, newCat]);
    addAuditLog('category.create', 'Category', newCat.id, `Created category "${newCat.name}"`);
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
    addAuditLog('category.update', 'Category', id, `Updated category properties`);
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    addAuditLog('category.delete', 'Category', id, `Deleted category`);
  };

  const addProductType = (type: Omit<ProductType, 'id'>) => {
    const newType: ProductType = { ...type, id: `type-${Date.now()}` };
    setProductTypes((prev) => [...prev, newType]);
    addAuditLog('product_type.create', 'ProductType', newType.id, `Created product type "${newType.name}"`);
  };

  const updateProductType = (id: string, updates: Partial<ProductType>) => {
    setProductTypes((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
    addAuditLog('product_type.update', 'ProductType', id, `Updated product type`);
  };

  const deleteProductType = (id: string) => {
    setProductTypes((prev) => prev.filter((t) => t.id !== id));
    addAuditLog('product_type.delete', 'ProductType', id, `Deleted product type`);
  };

  const addAttributeToType = (
    productTypeId: string,
    attr: Omit<ProductAttributeDefinition, 'id' | 'productTypeId'>
  ) => {
    const newAttr: ProductAttributeDefinition = {
      ...attr,
      id: `attr-${Date.now()}`,
      productTypeId,
    };
    setProductTypes((prev) =>
      prev.map((t) => (t.id === productTypeId ? { ...t, attributes: [...t.attributes, newAttr] } : t))
    );
    addAuditLog(
      'attribute.add',
      'ProductAttribute',
      newAttr.id,
      `Added custom attribute "${newAttr.name}" (${newAttr.dataType}) to product type`
    );
  };

  const deleteAttributeFromType = (productTypeId: string, attributeId: string) => {
    setProductTypes((prev) =>
      prev.map((t) =>
        t.id === productTypeId ? { ...t, attributes: t.attributes.filter((a) => a.id !== attributeId) } : t
      )
    );
    addAuditLog('attribute.delete', 'ProductAttribute', attributeId, `Removed attribute from product type`);
  };

  const addProduct = (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newProd: Product = {
      ...product,
      id: `prod-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    };
    setProducts((prev) => [newProd, ...prev]);
    addAuditLog('product.create', 'Product', newProd.id, `Created product "${newProd.name}" (SKU: ${newProd.sku})`);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p))
    );
    addAuditLog('product.update', 'Product', id, `Updated product details`);
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    addAuditLog('product.delete', 'Product', id, `Deleted product`);
  };

  const duplicateProduct = (id: string) => {
    const original = products.find((p) => p.id === id);
    if (!original) return;
    const now = new Date().toISOString();
    const dup: Product = {
      ...original,
      id: `prod-${Date.now()}`,
      name: `${original.name} (Copy)`,
      slug: `${original.slug}-copy-${Date.now()}`,
      sku: `${original.sku}-COPY`,
      publishState: 'draft',
      createdAt: now,
      updatedAt: now,
      isDemo: false,
    };
    setProducts((prev) => [dup, ...prev]);
    addAuditLog('product.duplicate', 'Product', dup.id, `Duplicated product "${original.name}"`);
  };

  const addCollection = (col: Omit<Collection, 'id'>) => {
    const newCol: Collection = { ...col, id: `col-${Date.now()}` };
    setCollections((prev) => [...prev, newCol]);
    addAuditLog('collection.create', 'Collection', newCol.id, `Created collection "${newCol.name}"`);
  };

  const updateCollection = (id: string, updates: Partial<Collection>) => {
    setCollections((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
    addAuditLog('collection.update', 'Collection', id, `Updated collection`);
  };

  const deleteCollection = (id: string) => {
    setCollections((prev) => prev.filter((c) => c.id !== id));
    addAuditLog('collection.delete', 'Collection', id, `Deleted collection`);
  };

  const updateEnquiryStatus = (id: string, status: Enquiry['status']) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status, updatedAt: new Date().toISOString() } : e))
    );
    addAuditLog('enquiry.status_change', 'Enquiry', id, `Changed enquiry status to ${status.toUpperCase()}`);
  };

  const addEnquiryNote = (id: string, note: string) => {
    setEnquiries((prev) =>
      prev.map((e) =>
        e.id === id
          ? {
              ...e,
              internalNotes: [...(e.internalNotes || []), `${new Date().toLocaleDateString('en-IN')}: ${note}`],
              updatedAt: new Date().toISOString(),
            }
          : e
      )
    );
    addAuditLog('enquiry.note_add', 'Enquiry', id, `Added staff note`);
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    addAuditLog('order.status_change', 'Order', id, `Updated order status to ${status.toUpperCase()}`);
  };

  const deleteMedia = (id: string): boolean => {
    const asset = media.find((m) => m.id === id);
    if (!asset) return false;
    if (asset.usageCount > 0) {
      alert(`Cannot delete asset "${asset.fileName}" because it is currently linked to ${asset.usageCount} products.`);
      return false;
    }
    setMedia((prev) => prev.filter((m) => m.id !== id));
    addAuditLog('media.delete', 'MediaAsset', id, `Deleted media asset "${asset.fileName}"`);
    return true;
  };

  const purgeDemoData = () => {
    setProducts((prev) => prev.filter((p) => !p.isDemo));
    setEnquiries((prev) => prev.filter((e) => !e.isDemo));
    setOrders((prev) => prev.filter((o) => !o.isDemo));
    addAuditLog('system.purge_demo', 'System', 'all', 'Purged all demo products, enquiries, and orders in one click.');
  };

  const resetToDemo = () => {
    setSettings(INITIAL_SETTINGS);
    setCategories(INITIAL_CATEGORIES);
    setProductTypes(INITIAL_PRODUCT_TYPES);
    setProducts(INITIAL_PRODUCTS);
    setCollections(INITIAL_COLLECTIONS);
    setEnquiries(INITIAL_ENQUIRIES);
    setOrders(INITIAL_ORDERS);
    setMedia(INITIAL_MEDIA);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    localStorage.clear();
    addAuditLog('system.reset', 'System', 'all', 'Reset store to initial demo state.');
  };

  return (
    <AdminContext.Provider
      value={{
        settings,
        updateSettings,
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        productTypes,
        addProductType,
        updateProductType,
        deleteProductType,
        addAttributeToType,
        deleteAttributeFromType,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        duplicateProduct,
        collections,
        addCollection,
        updateCollection,
        deleteCollection,
        enquiries,
        updateEnquiryStatus,
        addEnquiryNote,
        orders,
        updateOrderStatus,
        media,
        deleteMedia,
        auditLogs,
        purgeDemoData,
        resetToDemo,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
