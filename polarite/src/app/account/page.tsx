'use client';

import { Settings, Crown, Shield, Check, Calendar, Mail } from "lucide-react";
import { useState } from "react";
import { useLanguage } from '@/context/LanguageContext';

import Link from "next/link";
import Navbar from "@/components/Navbar";


export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const { translations } = useLanguage();

  const tabs = [
    { id: 'overview', label: translations.pages?.account?.tabs?.overview || 'Overview' },
    { id: 'orders', label: translations.pages?.account?.tabs?.orders || 'Orders' },
    { id: 'subscriptions', label: translations.pages?.account?.tabs?.subscriptions || 'Subscriptions' },
    { id: 'settings', label: translations.pages?.account?.tabs?.settings || 'Settings' }
  ];

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
                        <span className="text-white font-bold text-lg">8</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">{translations.pages?.account?.account_summary?.active_subscriptions}</span>
                        <span className="text-white font-bold text-lg">1</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">{translations.pages?.account?.account_summary?.total_spent}</span>
                        <span className="text-white font-bold text-lg">£60.42</span>
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
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-600">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-white text-lg font-bold">Order #PL-1001</h4>
                        <p className="text-gray-400">December 16, 2024</p>
                      </div>
                      <div className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-sm font-medium border border-emerald-500/30">
                        Delivered
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between py-2 border-b border-gray-700">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">RB</div>
                          <div>
                            <p className="text-white font-medium">Red Bull Energy Drink (4-pack)</p>
                            <p className="text-gray-400 text-sm">Quantity: 2</p>
                          </div>
                        </div>
                        <p className="text-white font-medium">£7.98</p>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-gray-700">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">MNU</div>
                          <div>
                            <p className="text-white font-medium">Monster Energy Ultra (6-pack)</p>
                            <p className="text-gray-400 text-sm">Quantity: 1</p>
                          </div>
                        </div>
                        <p className="text-white font-medium">£8.99</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-600">
                      <span className="text-gray-400 font-medium">Total</span>
                      <span className="text-white font-bold text-lg">£16.97</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-600">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-white text-lg font-bold">Order #PL-1002</h4>
                        <p className="text-gray-400">December 10, 2024</p>
                      </div>
                      <div className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-sm font-medium border border-emerald-500/30">
                        Delivered
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between py-2 border-b border-gray-700">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">RBSF</div>
                          <div>
                            <p className="text-white font-medium">Red Bull Sugarfree (12-pack)</p>
                            <p className="text-gray-400 text-sm">Quantity: 1</p>
                          </div>
                        </div>
                        <p className="text-white font-medium">£18.99</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-600">
                      <span className="text-gray-400 font-medium">Total</span>
                      <span className="text-white font-bold text-lg">£18.99</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-600">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-white text-lg font-bold">Order #PL-1003</h4>
                        <p className="text-gray-400">November 28, 2024</p>
                      </div>
                      <div className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-sm font-medium border border-emerald-500/30">
                        Delivered
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between py-2 border-b border-gray-700">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">MNE</div>
                          <div>
                            <p className="text-white font-medium">Monster Energy Original (4-pack)</p>
                            <p className="text-gray-400 text-sm">Quantity: 3</p>
                          </div>
                        </div>
                        <p className="text-white font-medium">£17.97</p>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-gray-700">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">RBT</div>
                          <div>
                            <p className="text-white font-medium">Red Bull Tropical (4-pack)</p>
                            <p className="text-gray-400 text-sm">Quantity: 1</p>
                          </div>
                        </div>
                        <p className="text-white font-medium">£6.49</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-600">
                      <span className="text-gray-400 font-medium">Total</span>
                      <span className="text-white font-bold text-lg">£24.46</span>
                    </div>
                  </div>
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
                            <span className="text-gray-300 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Premium Upgrade */}
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-600 relative overflow-hidden">
                    <div className="absolute top-4 right-4">
                      <Crown className="text-emerald-500" size={24} />
                    </div>
                    <div className="mb-4">
                      <h4 className="text-white text-xl font-bold mb-1">
                        {translations.shop?.subscriptions?.polar_premium?.name}
                      </h4>
                      <p className="text-gray-400 text-sm">{translations.shop?.subscriptions?.polar_premium?.upgrade_description}</p>
                    </div>
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-400">{translations.shop?.subscriptions?.polar_premium?.price}</span>
                        <span className="text-white font-bold">{translations.shop?.subscriptions?.polar_premium?.period}</span>
                      </div>
                      <div className="space-y-2">
                        {translations.shop?.subscriptions?.polar_premium?.features.map((feature: string, index: number) => (
                          <div key={index} className="flex items-center space-x-3">
                            <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                              <Check size={10} className="text-white" />
                            </div>
                            <span className="text-gray-300 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Link href="/test" className="w-full bg-white hover:bg-gray-100 text-black py-3 px-6 rounded-xl font-bold transition-all">
                      {translations.shop?.subscriptions?.polar_premium?.upgrade}
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h3 className="text-white text-2xl font-bold">Account Settings</h3>
                
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-600">
                    <h4 className="text-white text-lg font-bold mb-4">Profile Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-400 text-sm font-medium mb-2">Email Address</label>
                        <input
                          type="email"
                          className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                          defaultValue="user@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 text-sm font-medium mb-2">Phone Number</label>
                        <input
                          type="tel"
                          className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                          placeholder="Enter phone number"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-600">
                    <h4 className="text-white text-lg font-bold mb-4">{translations.pages?.account?.security?.title}</h4>
                    <div className="space-y-4">
                      <button className="flex items-center justify-between w-full text-left p-4 bg-gray-700 rounded-xl hover:bg-gray-600 transition-colors border border-gray-600">
                        <div className="flex items-center space-x-3">
                          <Shield className="text-gray-400" size={20} />
                          <div>
                            <p className="text-white font-medium">{translations.pages?.account?.security?.change_password?.title}</p>
                            <p className="text-gray-400 text-sm">{translations.pages?.account?.security?.change_password?.description}</p>
                          </div>
                        </div>
                        <Settings className="text-gray-400" size={20} />
                      </button>
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