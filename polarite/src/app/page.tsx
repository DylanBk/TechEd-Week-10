'use client';

import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';

export default function HomePage() {
  const { translations } = useLanguage();

  return (
    <div className="bg-bg w-screen min-h-screen flex">
      <div className="w-1/5 min-h-screen bg-bg p-6">
        <div className="mb-12">
          <p className="text-white text-5xl geistSans font-extrabold">{translations.brand?.name}</p>
        </div>

        <Navbar />
      </div>
      
      <div className="w-4/5 min-h-screen bg-bg flex justify-center items-center p-8">
        <div className="w-full h-5/6 bg-veryblack rounded-lg border border-gray-700 p-6">
          <h1 className="text-4xl text-white font-bold mb-4">{translations.pages?.home?.title}</h1>
        </div>
      </div>
    </div>
  );
}