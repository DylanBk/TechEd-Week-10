'use client';

import React, { useEffect, useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import convertToSubCurrency, { formatCurrency } from "@/lib/convertToSubCurrency";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from 'next/navigation';

interface CheckoutProps {
    amount: number;
    productId?: string;
}

export default function Checkout({ amount, productId }: CheckoutProps) {
    const stripe = useStripe();
    const elements = useElements();
    const { language } = useLanguage();
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const currency = language === 'ja' ? 'jpy' : 'gbp';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);
        setError(null);

        try {
            // First, trigger form validation and collection
            const { error: submitError } = await elements.submit();
            if (submitError) {
                throw new Error(submitError.message || 'Form validation failed');
            }

            // Convert amount to the correct currency and format
            const paymentAmount = convertToSubCurrency(amount, currency, productId);

            // Create payment intent
            const response = await fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: paymentAmount,
                    currency: currency,
                    productId: productId
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create payment intent');
            }

            const { clientSecret } = await response.json();

            // Confirm the payment
            const { error: confirmError } = await stripe.confirmPayment({
                elements,
                clientSecret,
                confirmParams: {
                    return_url: `${window.location.origin}/payment-success`,
                },
            });

            if (confirmError) {
                throw new Error(confirmError.message || 'Payment confirmation failed');
            }
        } catch (err) {
            console.error('Payment error:', err);
            setError(err instanceof Error ? err.message : 'An error occurred while processing your payment');
        } finally {
            setIsProcessing(false);
        }
    };

    // Format display amount
    const displayAmount = formatCurrency(amount, currency);

    return (
        <div>
            <form
                className="h-full w-1/3 flex flex-col gap-4 items-center p-4 rounded-xl mx-auto mt-44 bg-white/10"
                onSubmit={handleSubmit}>
                <PaymentElement 
                    className="mb-8"
                    options={{
                        layout: 'tabs'
                    }}
                />

                {error && (
                    <div className="mb-4 p-4 bg-red-900/50 border border-red-500 rounded-xl text-red-200">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={!stripe || isProcessing}
                    className={`
                        w-full py-4 px-6 rounded-xl text-white font-semibold
                        ${isProcessing 
                            ? 'bg-emerald-600 cursor-not-allowed opacity-50' 
                            : 'bg-emerald-500 hover:bg-emerald-600 transition-colors'}
                    `}>
                    {isProcessing ? 'Processing...' : 'Pay Now'}
                </button>
            </form>
        </div>
    );
}