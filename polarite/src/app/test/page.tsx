'use client';

import {Elements} from '@stripe/react-stripe';
import { loadStripe } from '@stripe/stripe-js';
import convertToSubCurrency from '@/lib/convertToSubCurrency';

import Checkout from '@/components/Checkout';


if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
    throw new Error('NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined');
};

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);


const Home = () => {
    const amount = 4.99;

    return (
        <main>
            <h1>stripe test</h1>

            <Elements
                stripe={stripePromise}
                options={{
                    mode: 'payment',
                    amount: convertToSubCurrency(amount),
                    current: amount
                }}>

                <Checkout amount={amount} />
            </Elements>
        </main>
    );
};

export default Home;