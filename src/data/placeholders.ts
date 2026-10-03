/**
 * Centralized Placeholder Registry (Section 2 & 9 of design brief)
 * All images live here so the client can swap real brand photography
 * in one single step without hunting through page code.
 */

export const ASSET_REGISTRY = {
  logo: "/logo.jpeg",
  hero: {
    unlit: "/images/hero-unlit.jpg",
    lit: "/images/hero-lit.jpg",
    poster: "/images/hero-lit.jpg",
    alt: "[Placeholder] Viiaura sculptural handcrafted candle silhouette",
  },
  editorial: {
    atelierCollection: "/images/collection-editorial.jpg",
    handcrafting: "/images/hero-unlit.jpg",
    candleArtBanner: "/images/collection-editorial.jpg",
    lifestyleTable: "/images/collection-editorial.jpg",
  },
};
