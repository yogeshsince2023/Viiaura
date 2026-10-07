'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAdmin } from '@/admin/store';
import { Order, OrderStatus } from '@/admin/types';
import {
  ShoppingBag,
  Search,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';

export default function AdminOrdersPage() {
  const { orders, settings, updateOrderStatus, updateSettings } = useAdmin();
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(orders[0] || null);

  const isCommerceEnabled = settings.mode === 'commerce_enabled';

  const filteredOrders = orders.filter(
    (o) =>
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.customerPhone.includes(search)
  );

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
      {/* Informational Mode Banner if in enquiry_only mode */}
      {!isCommerceEnabled && (
        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-amber-900">
                Store is currently in "Enquiry-Only Showcase" Mode
              </h2>
              <p className="text-xs text-amber-700">
                Cart, checkout, and direct payments are hidden from public visitors. Enable Commerce to open direct purchases.
              </p>
            </div>
          </div>
          <button
            onClick={() => updateSettings({ mode: 'commerce_enabled' })}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold shrink-0 transition-colors shadow-sm"
          >
            Enable Commerce Mode
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-200/80">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
              Customer Orders
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
              Commerce Module
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Fulfill orders, generate GST invoices, and track courier dispatch numbers.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7-Cols): Orders Table */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200/80 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-stone-100 flex items-center justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Search order #, customer, phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-xl"
              />
            </div>
            <span className="text-xs text-stone-400 font-mono">{filteredOrders.length} orders</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-200/70 uppercase text-[10px]">
                <tr>
                  <th className="py-2.5 px-4">Order</th>
                  <th className="py-2.5 px-3">Customer</th>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Total</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-4 text-right">View</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {filteredOrders.map((ord) => (
                  <tr
                    key={ord.id}
                    onClick={() => setSelectedOrder(ord)}
                    className={`cursor-pointer hover:bg-stone-50 transition-colors ${
                      selectedOrder?.id === ord.id ? 'bg-amber-50/40' : ''
                    }`}
                  >
                    <td className="py-3 px-4 font-mono font-bold text-stone-900">{ord.orderNumber}</td>
                    <td className="py-3 px-3 font-medium">{ord.customerName}</td>
                    <td className="py-3 px-3 text-stone-400 text-[11px]">
                      {new Date(ord.createdAt).toLocaleDateString('en-IN', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="py-3 px-3 font-bold text-stone-900">
                      ₹{ord.grandTotal.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          ord.status === 'paid'
                            ? 'bg-blue-100 text-blue-700'
                            : ord.status === 'shipped'
                            ? 'bg-amber-100 text-amber-700'
                            : ord.status === 'delivered'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-stone-100 text-stone-700'
                        }`}
                      >
                        {ord.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <ChevronRight className="w-4 h-4 text-stone-400 inline" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column (5-Cols): Order Detail Card */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200/80 shadow-sm p-5 space-y-4">
          {selectedOrder ? (
            <>
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <div>
                  <h2 className="text-base font-bold text-stone-900">{selectedOrder.orderNumber}</h2>
                  <span className="text-xs text-stone-400">
                    Placed on {new Date(selectedOrder.createdAt).toLocaleString('en-IN')}
                  </span>
                </div>

                <select
                  value={selectedOrder.status}
                  onChange={(e) => {
                    const st = e.target.value as OrderStatus;
                    updateOrderStatus(selectedOrder.id, st);
                    setSelectedOrder({ ...selectedOrder, status: st });
                  }}
                  className="px-2.5 py-1 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 font-semibold"
                >
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="packed">Packed</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>

              {/* Items List */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                  Ordered Line Items
                </span>
                <div className="divide-y divide-stone-100 bg-stone-50 rounded-xl p-3 border border-stone-200">
                  {selectedOrder.items.map((it, idx) => (
                    <div key={idx} className="py-2 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-semibold text-stone-900">{it.productName}</div>
                        <div className="text-[10px] text-stone-400">
                          {it.variantTitle} × {it.quantity}
                        </div>
                      </div>
                      <div className="font-mono font-bold text-stone-900">
                        ₹{it.totalPrice.toLocaleString('en-IN')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 p-3 bg-stone-50 rounded-xl border border-stone-200">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono">₹{selectedOrder.subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-mono">₹{selectedOrder.shippingTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST Tax</span>
                  <span className="font-mono">₹{selectedOrder.taxTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between font-bold text-stone-900 pt-1 border-t border-stone-200">
                  <span>Grand Total</span>
                  <span className="font-mono">₹{selectedOrder.grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Courier Tracking */}
              {selectedOrder.shippingCourier && (
                <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-xs text-blue-900 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold">
                    <Truck className="w-3.5 h-3.5" />
                    <span>Dispatched via {selectedOrder.shippingCourier}</span>
                  </div>
                  <div className="font-mono text-[11px]">
                    Tracking: <b>{selectedOrder.trackingNumber}</b>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="p-12 text-center text-stone-400">
              <p className="text-xs">Select an order on the left to inspect.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
