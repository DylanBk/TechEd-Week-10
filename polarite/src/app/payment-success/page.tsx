'use client'

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Link from 'next/link';
import { Check } from 'lucide-react';

if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
  throw new Error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined');
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function PaymentStatusCheck() {
  const [paymentStatus, setPaymentStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const searchParams = useSearchParams();
  const paymentIntentClientSecret = searchParams.get('payment_intent_client_secret');
  const { translations } = useLanguage();

  useEffect(() => {
    if (!paymentIntentClientSecret) {
      setPaymentStatus('error');
      return;
    }

    stripePromise.then(stripe => {
      if (!stripe) {
        setPaymentStatus('error');
        return;
      }

      stripe.retrievePaymentIntent(paymentIntentClientSecret)
        .then(({ paymentIntent }) => {
          if (paymentIntent && paymentIntent.status === 'succeeded') {
            setPaymentStatus('success');
          } else {
            setPaymentStatus('error');
          }
        })
        .catch(() => {
          setPaymentStatus('error');
        });
    });
  }, [paymentIntentClientSecret]);

  if (paymentStatus === 'loading') {
    return (
      <div className="bg-bg w-screen h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (paymentStatus === 'error') {
    return (
      <div className="bg-bg w-screen h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white text-3xl font-bold mb-4">Payment Failed</h1>
          <p className="text-gray-400 mb-8">Something went wrong with your payment.</p>
          <Link 
            href="/shop"
            className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bg w-screen h-screen flex items-center justify-center">
      <div className="text-center max-w-lg">
        <div className="mb-8">
          <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={32} className="text-white" />
          </div>
          <h1 className="text-white text-4xl font-bold mb-4">
            {translations.payment?.success_title || 'Payment Successful!'}
          </h1>
          <p className="text-gray-400 mb-8">
            {translations.payment?.success_message || 'Thank you for your purchase. Your order has been confirmed.'}
          </p>
        </div>

        <div className="space-y-4">
          <Link 
            href="/shop"
            className="block w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            {translations.payment?.return_to_shop || 'Return to Shop'}
          </Link>
          <Link 
            href="/account"
            className="block w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            {translations.payment?.view_order || 'View Order'}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentStatusCheck />
    </Elements>
  );
}