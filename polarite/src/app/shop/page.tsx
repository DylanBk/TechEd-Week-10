'use client';

import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';
import { Menu, X } from "lucide-react";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Navbar from '@/components/Navbar';

export default function ShopPage() {
  const { translations } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleBuyClick = (productId: string) => {
    router.push(`/checkout?product=${productId}`);
  };

  return (
    <div className="bg-black min-h-screen flex relative">
      <button 
        className="lg:hidden fixed top-4 right-4 z-50 text-white p-2"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className={`${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 fixed lg:static w-64 min-h-screen bg-black p-6 transition-transform duration-300 ease-in-out z-40`}>
        <div className="mb-12">
          <p className="text-white text-3xl lg:text-5xl font-extrabold">{translations.brand?.name}</p>
        </div>

        <Navbar />
      </div>

      <div className="flex-1 p-4 lg:p-8">
        <div className="bg-gray-900 rounded-2xl border border-gray-700 p-4 lg:p-8">
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">{translations.shop?.title}</h1>
            <h2 className="text-xl lg:text-2xl text-gray-400">{translations.shop?.subtitle}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8 lg:mb-12">
            <div className="bg-gray-800 rounded-xl p-4 lg:p-6 flex flex-col items-center">
              <div className="w-24 lg:w-32 h-36 lg:h-48 relative mb-4">
                <Image
                  src="/monster-nitro.png"
                  alt="Monster Nitro"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <h3 className="text-lg lg:text-xl font-bold text-white mb-2">
                {translations.shop?.products.monster_nitro.name}
              </h3>
              <p className="text-gray-400 text-sm text-center mb-4">
                {translations.shop?.products.monster_nitro.description}
              </p>
              <p className="text-xl lg:text-2xl font-bold text-white mb-4">
                {translations.shop?.products.monster_nitro.price}
              </p>
              <button
                onClick={() => handleBuyClick('monster_nitro')}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Buy Now
              </button>
            </div>

            <div className="bg-gray-800 rounded-xl p-4 lg:p-6 flex flex-col items-center">
              <div className="w-24 lg:w-32 h-36 lg:h-48 relative mb-4">
                <Image
                  src="/monster-ultra.png"
                  alt="Monster Ultra"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <h3 className="text-lg lg:text-xl font-bold text-white mb-2">
                {translations.shop?.products.monster_ultra.name}
              </h3>
              <p className="text-gray-400 text-sm text-center mb-4">
                {translations.shop?.products.monster_ultra.description}
              </p>
              <p className="text-xl lg:text-2xl font-bold text-white mb-4">
                {translations.shop?.products.monster_ultra.price}
              </p>
              <button
                onClick={() => handleBuyClick('monster_ultra')}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Buy Now
              </button>
            </div>

            <div className="bg-gray-800 rounded-xl p-4 lg:p-6 flex flex-col items-center">
              <div className="w-24 lg:w-32 h-36 lg:h-48 relative mb-4">
                <Image
                  src="/monster-juiced.png"
                  alt="Monster Juiced"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <h3 className="text-lg lg:text-xl font-bold text-white mb-2">
                {translations.shop?.products.monster_juiced.name}
              </h3>
              <p className="text-gray-400 text-sm text-center mb-4">
                {translations.shop?.products.monster_juiced.description}
              </p>
              <p className="text-xl lg:text-2xl font-bold text-white mb-4">
                {translations.shop?.products.monster_juiced.price}
              </p>
              <button
                onClick={() => handleBuyClick('monster_juiced')}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Buy Now
              </button>
            </div>
          </div>

          <div className="mt-8 lg:mt-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-6 lg:mb-8">{translations.shop?.subscriptions.title}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <div className="bg-gray-800 rounded-xl p-6 lg:p-8 border border-gray-700">
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-4">
                  {translations.shop?.subscriptions.polar_plus.name}
                </h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-2xl lg:text-3xl font-bold text-white">
                    {translations.shop?.subscriptions.polar_plus.price}
                  </span>
                  <span className="text-gray-400 ml-1">
                    {translations.shop?.subscriptions.polar_plus.period}
                  </span>
                </div>
                <ul className="space-y-3 mb-6">
                  {translations.shop?.subscriptions.polar_plus.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start text-gray-300">
                      <span className="mr-2">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-gray-400">
                  {translations.shop?.subscriptions.polar_plus.note}
                </p>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 lg:p-8 border border-gray-700">
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-4">
                  {translations.shop?.subscriptions.polar_premium.name}
                </h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-2xl lg:text-3xl font-bold text-white">
                    {translations.shop?.subscriptions.polar_premium.price}
                  </span>
                  <span className="text-gray-400 ml-1">
                    {translations.shop?.subscriptions.polar_premium.period}
                  </span>
                </div>
                <ul className="space-y-3 mb-6">
                  {translations.shop?.subscriptions.polar_premium.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start text-gray-300">
                      <span className="mr-2">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-gray-400">
                  {translations.shop?.subscriptions.polar_premium.note}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}