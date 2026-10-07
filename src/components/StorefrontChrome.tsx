'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { EnquiryModal } from '@/components/EnquiryModal';
import { MobileBottomBar } from '@/components/MobileBottomBar';
import { ScrollProgress } from '@/components/ScrollProgress';
import { BackToTop } from '@/components/BackToTop';

export const StorefrontChrome: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <ScrollProgress />
      <Header />
      <main className="min-h-screen pb-20 lg:pb-0">{children}</main>
      <Footer />
      <EnquiryModal />
      <MobileBottomBar />
      <BackToTop />
    </>
  );
};
