// src/app/payment-success/page.tsx
'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const [paymentDetails, setPaymentDetails] = useState<any>(null)
  
  // Get payment intent from URL params if redirected from Stripe
  const payment_intent = searchParams.get('payment_intent')
  const payment_intent_client_secret = searchParams.get('payment_intent_client_secret')
  const redirect_status = searchParams.get('redirect_status')

  useEffect(() => {
    if (payment_intent && redirect_status === 'succeeded') {
      setPaymentDetails({
        id: payment_intent,
        status: 'succeeded'
      })
    }
  }, [payment_intent, redirect_status])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Payment Successful! 🎉
          </h1>
          <p className="text-gray-600">
            Thank you for your purchase. Your payment has been processed successfully.
          </p>
        </div>

        {paymentDetails && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600">
              Payment ID: <span className="font-mono text-xs break-all">{paymentDetails.id}</span>
            </p>
            <p className="text-sm text-green-600 font-medium mt-1">
              Status: {paymentDetails.status}
            </p>
          </div>
        )}

        {!paymentDetails && (
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <p className="text-blue-700 text-sm">
              Payment confirmation details will appear here once processed.
            </p>
          </div>
        )}

        <div className="space-y-3">
          <Link 
            href="/dashboard" 
            className="block w-full bg-blue-600 text-white py-3 px-4 rounded font-semibold hover:bg-blue-700 transition-colors"
          >
            Go to Dashboard
          </Link>
          <Link 
            href="/" 
            className="block w-full bg-gray-200 text-gray-700 py-3 px-4 rounded font-semibold hover:bg-gray-300 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}