import { Router } from "express";
import Stripe from 'stripe'
import config from "../../config";


const stripe = new Stripe(config.stripe.apiKey, {
  apiVersion: '2024-04-10',
  typescript:true
})
const router = Router()

//api/payment
router.post('/', async (req, res, next) =>{
  try {
    const amount = req.body.amount;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'USD'
    })

    res.json({
      msg:"payment intent created",
      clientSecret: paymentIntent.client_secret
    })
  } catch (error) {
    next(error)
  }
})

export default router;