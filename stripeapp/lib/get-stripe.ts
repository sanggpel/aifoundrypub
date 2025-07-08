import Stripe from "stripe"

/**
 * Lazily-initialised, singleton Stripe client.
 * Ensures we don’t access process.env at build time.
 */
let stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (!stripe) {
    const secretKey = process.env.STRIPE_SECRET_KEY
    if (!secretKey) {
      throw new Error("STRIPE_SECRET_KEY is not set. Add it to your deployment platform’s environment variables.")
    }
    stripe = new Stripe(secretKey, { apiVersion: "2024-06-20" })
  }
  return stripe
}
