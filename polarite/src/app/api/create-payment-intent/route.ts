// src/app/api/create-payment-intent/route.ts
import { NextRequest } from "next/server";
import Stripe from "stripe";

console.log('Stripe Secret Key configured:', !!process.env.STRIPE_SECRET_KEY);

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-05-28.basil',
});

export async function POST(req: NextRequest) {
  try {
    console.log('Creating payment intent...');
    
    const body = await req.json();
    console.log('Request body:', body);
    
    const { amount } = body;
    
    // Validate amount
    if (!amount || typeof amount !== 'number' || amount < 50) {
      console.error('Invalid amount:', amount);
      return Response.json(
        { error: 'Invalid amount. Minimum is 50 pence.' },
        { status: 400 }
      );
    }
    
    console.log('Creating Stripe payment intent for amount:', amount);
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'gbp',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        created_at: new Date().toISOString(),
      },
    });

    console.log('Payment intent created successfully:', paymentIntent.id);

    return Response.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    
    // Return more specific error information
    if (error instanceof Stripe.errors.StripeError) {
      return Response.json(
        { error: `Stripe error: ${error.message}` },
        { status: 400 }
      );
    }
    
    return Response.json(
      { error: 'Internal server error creating payment intent' },
      { status: 500 }
    );
  }
}