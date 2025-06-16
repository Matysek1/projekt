import { Request, Response } from 'express';
import Stripe from 'stripe';

const stripe = new Stripe('YOUR_SECRET_KEY', { apiVersion: '2024-11-20.acacia' }); 

const createCheckoutSession = async (req: Request, res: Response): Promise<void> => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'czk',
            product_data: {
              name: 'Web',
            },
            unit_amount: 50000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });

    res.json({ id: session.id });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export { createCheckoutSession };
