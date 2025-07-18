import { type NextRequest, NextResponse } from "next/server"
import { getStripe } from "@/lib/get-stripe"

export async function POST(req: NextRequest) {
  try {
    const { amount, currency = "usd", metadata = {} } = await req.json()

    const stripe = getStripe()

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      metadata,
      automatic_payment_methods: {
        enabled: true,
      },
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    })
  } catch (error) {
    console.error("Error creating payment intent:", error)
    return NextResponse.json({ error: "Failed to create payment intent" }, { status: 500 })
  }
}
