// src/app/api/create-payment-intent/route.ts
import { NextRequest } from "next/server";
import Stripe from "stripe";
import { stripe as stripeClient } from '@/lib/stripe';

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
    
    const { amount, type = 'product', productId, productName, currency = 'gbp' } = body;
    
    // Validate inputs
    if (!amount || typeof amount !== 'number' || amount <= 0) {
      console.error('Invalid amount:', amount);
      return Response.json(
        { error: 'Invalid amount provided' },
        { status: 400 }
      );
    }

    if (!currency || (currency !== 'gbp' && currency !== 'jpy')) {
      console.error('Invalid currency:', currency);
      return Response.json(
        { error: 'Invalid currency provided' },
        { status: 400 }
      );
    }

    // For JPY, amount must be a whole number
    const paymentAmount = currency === 'jpy' ? Math.round(amount) : amount;
    
    // Handle different payment types
    let description = '';
    let metadata = {};
    
    if (type === 'subscription') {
      // Subscription payment (existing logic)
      const subscriptionAmount = currency === 'jpy' ? 1438 : 799; // 799 pence = ¥1,438
      if (amount !== subscriptionAmount) {
        console.error('Invalid amount for subscription:', amount);
        return Response.json(
          { error: `Invalid amount. Demo subscription is ${currency === 'jpy' ? '¥1,438' : '£7.99'}.` },
          { status: 400 }
        );
      }
      description = `Demo Monthly Subscription - ${currency === 'jpy' ? '¥1,438' : '£7.99'}`;
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
    const paymentIntent = await stripeClient.paymentIntents.create({
      amount: paymentAmount,
      currency: currency,
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
      currency: currency,
      status: 'ready',
      type: type,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    
    if (error instanceof Stripe.errors.StripeError) {
      return Response.json(
        { error: `Stripe error: ${error.message}` },
        { status: error.statusCode || 500 }
      );
    }
    
    return Response.json(
      { error: 'An error occurred while processing your payment' },
      { status: 500 }
    );
  }
}