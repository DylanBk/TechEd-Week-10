'use client';

import { useLanguage } from '@/context/LanguageContext';
import { Home, User, ShoppingCart } from "lucide-react";
import Link from 'next/link';

export default function HomePage() {
  const { translations, language } = useLanguage();

  return (
    <div className="bg-bg w-screen min-h-screen flex">
      <div className="w-1/5 min-h-screen bg-bg p-6">
        <div className="mb-12">
          <p className="text-white text-5xl geistSans font-extrabold">{translations.brand?.name}</p>
        </div>
        
        <nav className="space-y-6"/>
          <Link href="/" className="flex items-center text-right justify-between text-3xl space-x-3 p-2 rounded-xl text-white bg-gray-900 cursor-pointer">
            <Home size={48} />
            <span className={language === 'ja' ? 'text-2xl' : ''}>{translations.navigation?.home}</span>
          </Link>
          <div className="flex items-center text-right justify-between text-3xl space-x-3 p-2 rounded-xl text-gray-300 hover:text-white hover:bg-gray-900 cursor-pointer">
            <User size={48} />
            <span className={language === 'ja' ? 'text-2xl' : ''}>{translations.navigation?.account}</span>
          </div>
          <Link href="/shop" className="flex items-center text-right justify-between text-3xl space-x-3 p-2 rounded-xl text-gray-300 hover:text-white hover:bg-gray-900 cursor-pointer">
            <ShoppingCart size={48} />
            <span className={language === 'ja' ? 'text-2xl' : ''}>{translations.navigation?.shop}</span>
          </Link>

        {/* Navigation */}
        <nav className="space-y-2">
          <a href="/" className="flex items-center space-x-4 p-3 text-gray-400 hover:text-white transition-all duration-300 cursor-pointer group relative overflow-hidden rounded-lg">
            <Home size={24} className="group-hover:scale-110 transition-transform duration-300 relative z-10" />
            <span className="text-xl font-medium relative z-10 group-hover:drop-shadow-[0_0_8px_rgba(147,51,234,0.5)] transition-all duration-300">Home</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
          </a>
          <a href="/account" className="flex items-center space-x-4 p-3 text-gray-400 hover:text-white transition-all duration-300 cursor-pointer group relative overflow-hidden rounded-lg">
            <User size={24} className="group-hover:scale-110 transition-transform duration-300 relative z-10" />
            <span className="text-xl font-medium relative z-10 group-hover:drop-shadow-[0_0_8px_rgba(147,51,234,0.5)] transition-all duration-300">Account</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
          </a>
          <a href="/shop" className="flex items-center space-x-4 p-3 text-gray-400 hover:text-white transition-all duration-300 cursor-pointer group relative overflow-hidden rounded-lg">
            <ShoppingCart size={24} className="group-hover:scale-110 transition-transform duration-300 relative z-10" />
            <span className="text-xl font-medium relative z-10 group-hover:drop-shadow-[0_0_8px_rgba(147,51,234,0.5)] transition-all duration-300">Shop</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
          </a>
        </nav>
      </div>
      
      <div className="w-4/5 min-h-screen bg-bg flex justify-center items-center p-8">
        <div className="w-full h-5/6 bg-veryblack rounded-lg border border-gray-700 p-6">
          <h1 className="text-4xl text-white font-bold mb-4">{translations.pages?.home?.title || 'Home'}</h1>
        </div>
      </div>
    </div>
  );
}