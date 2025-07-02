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
    
    const { amount, type = 'product', productId, productName } = body;
    
    // Validate amount
    if (!amount || typeof amount !== 'number' || amount <= 0) {
      console.error('Invalid amount:', amount);
      return Response.json(
        { error: 'Invalid amount provided.' },
        { status: 400 }
      );
    }
    
    // Handle different payment types
    let description = '';
    let metadata = {};
    
    if (type === 'subscription') {
      // Subscription payment (existing logic)
      if (amount !== 799) {
        console.error('Invalid amount for subscription:', amount);
        return Response.json(
          { error: 'Invalid amount. Demo subscription is £7.99 (799 pence).' },
          { status: 400 }
        );
      }
      description = 'Demo Monthly Subscription - £7.99';
      metadata = {
        type: 'demo_subscription',
        created_at: new Date().toISOString(),
      };
    } else if (type === 'product') {
      // Product payment (energy drinks)
      description = productName ? `Energy Drink - ${productName}` : 'Energy Drink Purchase';
      metadata = {
        type: 'product_purchase',
        product_id: productId || 'unknown',
        product_name: productName || 'Energy Drink',
        created_at: new Date().toISOString(),
      };
    } else {
      console.error('Invalid payment type:', type);
      return Response.json(
        { error: 'Invalid payment type. Must be "subscription" or "product".' },
        { status: 400 }
      );
    }
    
    console.log(`Creating payment intent for ${type}...`);
    
    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'gbp',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: metadata,
      description: description,
    });

    console.log('Payment intent created successfully:', paymentIntent.id);

    return Response.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: amount,
      currency: 'gbp',
      status: 'ready',
      type: type,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    
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