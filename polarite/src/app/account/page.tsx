'use client';

import { Settings, Crown, Shield, Check, Calendar, Mail } from "lucide-react";
import { useState } from "react";
import { useLanguage } from '@/context/LanguageContext';
import { formatCurrency } from '@/lib/convertToSubCurrency';

import Link from "next/link";
import Navbar from "@/components/Navbar";

interface Order {
  id: string;
  date: string;
  items: {
    name: string;
    quantity: number;
    price: number;
    productId: string;
  }[];
  total: number;
}

// Mock order data (prices in pence for GBP)
const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    date: '2024-03-15',
    items: [
      { name: 'Monster Nitro', quantity: 2, price: 199, productId: 'monster_nitro' },
      { name: 'Monster Ultra', quantity: 1, price: 175, productId: 'monster_ultra' }
    ],
    total: 573 // £5.73
  },
  {
    id: 'ORD-002',
    date: '2024-03-10',
    items: [
      { name: 'Polar Plus', quantity: 1, price: 399, productId: 'polar_plus' },
      { name: 'Monster Juiced', quantity: 2, price: 175, productId: 'monster_juiced' }
    ],
    total: 749 // £7.49
  }
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const { translations, language } = useLanguage();
  const currency = language === 'ja' ? 'jpy' : 'gbp';
  const [orders] = useState<Order[]>(mockOrders);

  const tabs = [
    { id: 'overview', label: translations.pages?.account?.tabs?.overview || 'Overview' },
    { id: 'orders', label: translations.pages?.account?.tabs?.orders || 'Orders' },
    { id: 'subscriptions', label: translations.pages?.account?.tabs?.subscriptions || 'Subscriptions' },
    { id: 'settings', label: translations.pages?.account?.tabs?.settings || 'Settings' }
  ];

  // Calculate total spent
  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="bg-bg w-screen h-screen flex overflow-hidden">
      <div className="w-1/5 h-screen bg-bg p-6 flex flex-col">
        <div className="mb-12">
          <p className="text-white text-5xl font-extrabold">{translations.brand?.name}</p>
        </div>

        <Navbar />
      </div>
      
      <div className="w-4/5 h-screen bg-bg p-8 overflow-hidden">
        <div className="h-full bg-veryblack rounded-2xl border border-gray-700 flex flex-col overflow-hidden">
          
          {/* Header */}
          <div className="p-8 border-b border-gray-700 flex-shrink-0">
            <h1 className="text-white text-3xl font-bold mb-2">{translations.pages?.account?.title}</h1>
            <div className="flex items-center text-gray-400">
              <Shield size={18} className="mr-2 text-emerald-500" />
              <span>{translations.pages?.account?.subtitle}</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="p-8 border-b border-gray-700">
            <div className="flex space-x-1 bg-gray-800 p-1 rounded-xl w-fit border border-gray-600">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-bg text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-8 overflow-y-auto">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-600">
                    <h3 className="text-white text-xl font-bold mb-4">{translations.pages?.account?.account_details?.title}</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Mail size={18} className="text-gray-400" />
                        <div>
                          <p className="text-gray-400 text-sm">{translations.pages?.account?.account_details?.email}</p>
                          <p className="text-white font-medium">user@example.com</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Calendar size={18} className="text-gray-400" />
                        <div>
                          <p className="text-gray-400 text-sm">{translations.pages?.account?.account_details?.member_since}</p>
                          <p className="text-white font-medium">January 2024</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <div>
                          <p className="text-gray-400 text-sm">{translations.pages?.account?.account_details?.account_status}</p>
                          <p className="text-emerald-400 font-medium">{translations.pages?.account?.account_details?.status?.active}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-600">
                    <h3 className="text-white text-xl font-bold mb-4">{translations.pages?.account?.account_summary?.title}</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">{translations.pages?.account?.account_summary?.total_orders}</span>
                        <span className="text-white font-bold text-lg">{orders.length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">{translations.pages?.account?.account_summary?.active_subscriptions}</span>
                        <span className="text-white font-bold text-lg">1</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">{translations.pages?.account?.account_summary?.total_spent}</span>
                        <span className="text-white font-bold text-lg">{formatCurrency(totalSpent / 100, currency)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h3 className="text-white text-2xl font-bold">Order History</h3>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-600">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-white text-lg font-bold">Order #{order.id}</h4>
                          <p className="text-gray-400">{new Date(order.date).toLocaleDateString(language === 'ja' ? 'ja-JP' : 'en-GB')}</p>
                        </div>
                        <div className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-sm font-medium border border-emerald-500/30">
                          {translations.pages?.account?.completed || 'Completed'}
                        </div>
                      </div>
                      <div className="space-y-3">
                        {order.items.map((item) => (
                          <div key={item.name} className="flex items-center justify-between py-2 border-b border-gray-700">
                            <div className="flex items-center space-x-3">
                              <div className="text-2xl">{item.name}</div>
                              <div>
                                <p className="text-white font-medium">{item.quantity} x {formatCurrency(item.price / 100, currency, item.productId)}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-600">
                        <span className="text-gray-400 font-medium">Total</span>
                        <span className="text-white font-bold text-lg">{formatCurrency(order.total / 100, currency)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'subscriptions' && (
              <div className="space-y-6">
                <h3 className="text-white text-2xl font-bold">{translations.shop?.subscriptions?.title}</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* Active Subscription */}
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border-2 border-emerald-500/50">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-white text-xl font-bold">{translations.shop?.subscriptions?.polar_plus?.name}</h4>
                      <div className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-sm font-medium border border-emerald-500/30">
                        {translations.pages?.account?.account_details?.status?.active}
                      </div>
                    </div>
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-400">{translations.shop?.subscriptions?.polar_plus?.price}</span>
                        <span className="text-white font-bold">{translations.shop?.subscriptions?.polar_plus?.period}</span>
                      </div>
                      <div className="space-y-2">
                        {translations.shop?.subscriptions?.polar_plus?.features.map((feature: string, index: number) => (
                          <div key={index} className="flex items-center space-x-3">
                            <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                              <Check size={10} className="text-white" />
                            </div>
                            <span className="text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="text-sm text-gray-400">
                      {translations.shop?.subscriptions?.polar_plus?.note}
                    </div>
                  </div>

                  {/* Upgrade Option */}
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-600">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-white text-xl font-bold">{translations.shop?.subscriptions?.polar_premium?.name}</h4>
                      <Crown size={24} className="text-yellow-500" />
                    </div>
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-400">{translations.shop?.subscriptions?.polar_premium?.price}</span>
                        <span className="text-white font-bold">{translations.shop?.subscriptions?.polar_premium?.period}</span>
                      </div>
                      <div className="space-y-2">
                        {translations.shop?.subscriptions?.polar_premium?.features.map((feature: string, index: number) => (
                          <div key={index} className="flex items-center space-x-3">
                            <div className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                              <Check size={10} className="text-white" />
                            </div>
                            <span className="text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="text-sm text-gray-400 mb-6">
                      {translations.shop?.subscriptions?.polar_premium?.note}
                    </div>
                    <button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105">
                      {translations.shop?.subscriptions?.polar_premium?.upgrade}
                    </button>
                    <p className="text-center text-sm text-gray-400 mt-4">
                      {translations.shop?.subscriptions?.polar_premium?.upgrade_description}
                    </p>
                  </div>

                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-600">
                  <h3 className="text-white text-xl font-bold mb-4">{translations.pages?.account?.security?.title}</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-white font-semibold mb-2">{translations.pages?.account?.security?.change_password?.title}</h4>
                      <p className="text-gray-400 text-sm">{translations.pages?.account?.security?.change_password?.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}