'use client';

import React, { useEffect, useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import convertToSubCurrency from "@/lib/convertToSubCurrency";


const Checkout = ({amount}: {amount: number}) => {
    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState<string>('');
    const [clientSecret, setClientSecret] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    amount: convertToSubCurrency(amount)
                })
            })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }, [amount]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        if (!stripe || !elements || !clientSecret) {
            return;
        };

        const {error: submitError} = await elements.submit();

        if (submitError) {
            setError(submitError.message as string);
            setLoading(false);

            return;
        };

        const {error} = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: `http://localhost:3000/payment-success?amount=${amount}`
            }
        });

        if (error && error.message) {
            setError(error.message);
        };

        setLoading(false);
    };

    return (
        <div>
            <form
                className="h-full w-1/3 flex flex-col gap-4 items-center p-4 rounded-xl mx-auto mt-44 bg-white/10"
                onSubmit={handleSubmit}>
                {clientSecret && <PaymentElement />}

                {error && <p>{error}</p>}

                <button
                    className="w-full px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 cursor-pointer transition disabled:opacity-70 disabled:cursor-not-allowed disabled:animate-pulse"
                    type='submit'
                    disabled={!stripe || loading}>
                    {!loading ? `Pay £${amount}` : 'Processing'}
                </button>
            </form>
        </div>
    );
};

export default Checkout;