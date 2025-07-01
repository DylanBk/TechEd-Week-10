'use client'
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const [paymentDetails, setPaymentDetails] = useState<
  | {
    id: string,
    status: string
  }
  | null>(null);
  
  // Get payment intent from URL params if redirected from Stripe
  const payment_intent = searchParams.get('payment_intent');
  const redirect_status = searchParams.get('redirect_status');

  useEffect(() => {
    if (payment_intent && redirect_status === 'succeeded') {
      setPaymentDetails({
        id: payment_intent,
        status: 'succeeded'
      })
    }
  }, [payment_intent, redirect_status])

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg p-8">
      <div className="max-w-md w-full bg-bg border border-white/20 rounded-xl shadow-2xl p-8 text-center backdrop-blur-sm">
        <div className="mb-8">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-6 shadow-lg animate-pulse">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-3 bg-gradient-to-r from-white to-gray-200 bg-clip-text">
            Payment Successful!
          </h1>
          <div className="text-2xl mb-4 animate-bounce">🎉</div>
          <p className="text-gray-300 leading-relaxed">
            Thank you for your purchase. Your payment has been processed successfully and you&apos;ll receive a confirmation email shortly.
          </p>
        </div>

        {paymentDetails && (
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 mb-8 border border-white/10">
            <div className="space-y-2">
              <div className="flex flex-col space-y-1">
                <span className="text-xs text-gray-400 uppercase tracking-wider">Payment ID</span>
                <span className="font-mono text-sm text-gray-200 break-all bg-black/20 px-2 py-1 rounded">
                  {paymentDetails.id}
                </span>
              </div>
              <div className="flex items-center justify-center space-x-2 pt-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-400 font-medium capitalize">
                  {paymentDetails.status}
                </span>
              </div>
            </div>
          </div>
        )}

        {!paymentDetails && (
          <div className="bg-blue-500/10 backdrop-blur-sm rounded-lg p-4 mb-8 border border-blue-500/20">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-blue-300 text-sm font-medium">Processing</span>
            </div>
            <p className="text-blue-200 text-sm">
              Payment confirmation details will appear here once processed.
            </p>
          </div>
        )}

        <div className="space-y-4">
          <Link 
            href="/dashboard" 
            className="block w-full bg-white text-black py-4 px-6 rounded-lg font-semibold border-2 border-transparent hover:bg-gray-100 hover:border-white/20 transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
          >
            Go to Dashboard
          </Link>
          <Link 
            href="/" 
            className="block w-full bg-transparent text-white py-4 px-6 rounded-lg font-semibold border-2 border-white/30 hover:bg-white/10 hover:border-white/50 transition-all duration-200 transform hover:scale-[1.02]"
          >
            Back to Home
          </Link>
        </div>

      </div>
    </div>
  )
}