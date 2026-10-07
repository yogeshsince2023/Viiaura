import type { Metadata } from 'next';
import { AdminProvider } from '@/admin/store';
import { AdminTopBar } from '@/components/admin/AdminTopBar';

export const metadata: Metadata = {
  title: 'VIIAURA Atelier — Dynamic Catalogue & Showroom Admin',
  description: 'Manage catalogue, dynamic attributes, categories, bespoke enquiries and showroom settings.',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      <div className="min-h-screen bg-[#F8F6F2] text-[#1C1917] flex flex-col font-sans selection:bg-[#F7EDE8] selection:text-[#C86446]">
        <AdminTopBar />
        <main className="flex-1 pb-16">{children}</main>
      </div>
    </AdminProvider>
  );
}
