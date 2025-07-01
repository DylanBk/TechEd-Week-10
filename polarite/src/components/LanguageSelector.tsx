'use client';

import { useLanguage } from '@/context/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  const alternateLanguage = language === 'en' ? 'ja' : 'en';
  const alternateLanguageText = language === 'en' ? '日本語' : 'English';

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="relative group">
        <button
          className="flex items-center justify-center bg-gray-800 text-white px-4 py-2 rounded-lg transition-all group-hover:rounded-b-lg group-hover:rounded-t-none w-[140px]"
        >
          <div className="flex items-center space-x-2">
            <Globe size={20} />
            <span>{language === 'en' ? 'English' : '日本語'}</span>
          </div>
        </button>
        
        <div className="absolute bottom-full right-0 hidden group-hover:block w-[140px]">
          <div className="bg-gray-800 rounded-t-lg shadow-lg overflow-hidden">
            <button
              onClick={() => setLanguage(alternateLanguage)}
              className="flex items-center justify-center px-4 py-2 hover:bg-gray-700 w-full"
            >
              <span>{alternateLanguageText}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 