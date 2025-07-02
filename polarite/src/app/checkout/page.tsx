'use client';

import { Shield, Check, ArrowLeft } from "lucide-react";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import convertToSubCurrency from '@/lib/convertToSubCurrency';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import Navbar from "@/components/Navbar";
import Checkout from '@/components/Checkout';
import { useLanguage } from '@/context/LanguageContext';

if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
    throw new Error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined');
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutPage() {
  const { translations } = useLanguage();
  const searchParams = useSearchParams();
  const productId = searchParams.get('product');
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (productId && translations.shop?.products) {
      const product = translations.shop.products[productId];
      if (product) {
        setSelectedProduct({
          id: productId,
          ...product,
          image: `/${productId.replace('_', '-')}.png`
        });
      }
    }
  }, [productId, translations]);

  // Extract price number from string (assuming format like "£2.49")
  const getPrice = (priceString) => {
    if (!priceString) return 0;
    return parseFloat(priceString.replace(/[£$€]/g, ''));
  };

  const amount = selectedProduct ? getPrice(selectedProduct.price) : 0;

  if (!selectedProduct) {
    return (
      <div className="bg-bg w-screen h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-bg w-screen h-screen flex overflow-hidden">
      <div className="w-1/5 h-screen bg-bg p-6 flex flex-col">
        <div className="mb-12">
          <p className="text-white text-5xl font-extrabold">{translations.brand?.name}</p>
        </div>

        <Navbar />
      </div>
      
      <div className="w-4/5 h-screen bg-bg p-8 overflow-hidden">
        <div className="h-full bg-veryblack rounded-2xl border border-gray-700 flex overflow-hidden">
          
          <div className="w-2/5 p-8 flex flex-col justify-center overflow-y-auto">
            
            <Link 
              href="/shop" 
              className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Shop
            </Link>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border-2 border-gray-600 mb-8">
              <div className="text-center">
                <div className="w-32 h-40 relative mx-auto mb-6">
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                
                <h2 className="text-white text-3xl font-bold mb-2">
                  {selectedProduct.name}
                </h2>
                <div className="text-white text-4xl font-semibold mb-4">{selectedProduct.price}</div>
                
                <p className="text-gray-300 text-sm mb-6">
                  {selectedProduct.description}
                </p>
                
                <div className="mt-6 pt-6 border-t border-gray-600">
                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center">
                      <Check size={16} className="mr-1 text-emerald-500" />
                      <span>Fresh & Cold</span>
                    </div>
                    <div className="flex items-center">
                      <Check size={16} className="mr-1 text-emerald-500" />
                      <span>Fast Delivery</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-white text-xl font-semibold mb-4">Order Summary</h3>
              <div className="bg-gray-800 rounded-xl p-4 border border-gray-600">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">Subtotal</span>
                  <span className="text-white">{selectedProduct.price}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">Delivery</span>
                  <span className="text-white">Free</span>
                </div>
                <div className="border-t border-gray-600 pt-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-semibold">Total</span>
                    <span className="text-white font-bold text-lg">{selectedProduct.price}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
          
          <div className="w-3/5 p-8 flex flex-col min-h-0">
            
            <div className="mb-6 flex-shrink-0">
              <h1 className="text-white text-3xl font-bold mb-2">Complete Your Purchase</h1>
              <div className="flex items-center text-gray-400">
                <Shield size={18} className="mr-2 text-emerald-500" />
                <span>Secure payment powered by Stripe</span>
              </div>
            </div>
            
            <div className="flex-1 bg-gray-800 rounded-2xl border border-gray-600 overflow-hidden flex flex-col min-h-0">
              <div className="flex-1 overflow-y-auto">
                <Elements
                  stripe={stripePromise}
                  options={{
                    mode: 'payment',
                    amount: convertToSubCurrency(amount),
                    currency: 'gbp',
                    appearance: {
                      theme: 'night',
                      variables: {
                        colorPrimary: '#10b981',
                        colorBackground: '#1f2937',
                        colorText: '#ffffff',
                        colorDanger: '#ef4444',
                        fontFamily: 'system-ui, sans-serif',
                        spacingUnit: '4px',
                        borderRadius: '12px'
                      }
                    }
                  }}
                >
                  <div className="w-full">
                    <Checkout amount={amount} />
                  </div>
                </Elements>
              </div>
            </div>
            
            <div className="mt-6 flex items-center justify-center space-x-8 text-gray-400 text-sm flex-shrink-0">
              <div className="flex items-center">
                <Shield size={16} className="mr-2 text-emerald-500" />
                <span>256-bit SSL</span>
              </div>
              <div className="flex items-center">
                <Check size={16} className="mr-2 text-emerald-500" />
                <span>30-day refund</span>
              </div>
              <div className="flex items-center">
                <Shield size={16} className="mr-2 text-emerald-500" />
                <span>PCI Compliant</span>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}