export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' })
    }
  
    try {
      const { items, userId } = req.body
  
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: items.map((item: any) => ({
          price_data: {
            currency: 'gbp',
            product_data: {
              name: item.name,
            },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: item.quantity,
        })),
        mode: 'payment',
        success_url: `${req.headers.origin}/order-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/shop`,
        metadata: {
          userId,
        },
      })
  
      res.status(200).json({ sessionId: session.id })
    } catch (error) {
      res.status(500).json({ error: 'Error creating checkout session' })
    }
  }
  
  // pages/api/create-subscription.ts
  export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' })
    }
  
    try {
      const { priceId, userId } = req.body
  
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: `${req.headers.origin}/account?tab=subscriptions`,
        cancel_url: `${req.headers.origin}/account?tab=subscriptions`,
        metadata: {
          userId,
        },
      })
  
      res.status(200).json({ sessionId: session.id })
    } catch (error) {
      res.status(500).json({ error: 'Error creating subscription' })
    }
  }