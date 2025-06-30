import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const POST = async (req: NextRequest) => {
    try {
        const {amount} = await req.json();

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'gbp',
            automatic_payment_methods: {
                enabled: true,
            },
        });

        return NextResponse.json({
            clientSecret: paymentIntent.client_secret
        });
    } catch (e) {
        console.error('Error creating payment intent:', e);

        return NextResponse.json({
            error: `Internal Server Error: ${e}`,
            status: 500
        });
    };
};