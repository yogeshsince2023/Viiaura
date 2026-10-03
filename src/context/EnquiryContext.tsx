"use client";

import React, { createContext, useContext, useState } from "react";
import { Product } from "@/data/types";

interface EnquiryContextType {
  isOpen: boolean;
  selectedProduct: Product | null;
  openEnquiry: (product?: Product | null) => void;
  closeEnquiry: () => void;
}

const EnquiryContext = createContext<EnquiryContextType>({
  isOpen: false,
  selectedProduct: null,
  openEnquiry: () => {},
  closeEnquiry: () => {},
});

export const EnquiryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const openEnquiry = (product?: Product | null) => {
    setSelectedProduct(product || null);
    setIsOpen(true);
  };

  const closeEnquiry = () => {
    setIsOpen(false);
    setSelectedProduct(null);
  };

  return (
    <EnquiryContext.Provider value={{ isOpen, selectedProduct, openEnquiry, closeEnquiry }}>
      {children}
    </EnquiryContext.Provider>
  );
};

export const useEnquiry = () => useContext(EnquiryContext);
