'use client';

import { Shield, Check } from "lucide-react";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import convertToSubCurrency from '@/lib/convertToSubCurrency';

import Navbar from "@/components/Navbar";
import Checkout from '@/components/Checkout';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';

if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
    throw new Error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined');
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function PolaritePaymentPage() {
  const amount: number = 7.99;
  const { translations } = useLanguage();

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
            
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border-2 border-gray-600 mb-8">
              <div className="text-center">
                <h2 className="text-white text-4xl font-bold mb-2">
                  Polar <span className="text-emerald-400">Premium</span>
                </h2>
                <div className="text-white text-3xl font-semibold mb-6">£7.99/month</div>
                
                <div className="text-left space-y-3">
                  <div className="flex items-start">
                    <span className="text-gray-300 mr-2">•</span>
                    <span className="text-gray-300">Everything from Polar <span className="text-blue-400">Plus</span>, and...</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-gray-300 mr-2">•</span>
                    <span className="text-gray-300">Free delivery & bigger discounts on products</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-gray-300 mr-2">•</span>
                    <span className="text-gray-300">Become a seller and sell your own products.</span>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-600">
                  <p className="text-gray-400 text-sm">(Monthly subscription, minimum age 16+)</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-white text-xl font-semibold mb-4">Why upgrade?</h3>
              {[
                "Priority customer support",
                "Advanced analytics dashboard for sellers", 
                "Big discounts",
                "Cancel anytime, no commitment"
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check size={12} className="text-white" />
                  </div>
                  <span className="text-gray-300">{benefit}</span>
                </div>
              ))}
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