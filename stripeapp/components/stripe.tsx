"use client"

import type React from "react"

import { useEffect, useState } from "react"

interface StripeProps {
  options: {
    mode: "payment" | "subscription"
    amount?: number
    currency?: string
  }
  className?: string
  children: React.ReactNode
}

export function Stripe({ options, className, children }: StripeProps) {
  const [stripe, setStripe] = useState<any>(null)

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      console.warn("Stripe publishable key not found. Make sure to add it to your .env file.")
      return
    }

    const loadStripe = async () => {
      try {
        const { loadStripe } = await import("@stripe/stripe-js")
        const stripeInstance = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
        setStripe(stripeInstance)
      } catch (error) {
        console.error("Failed to load Stripe:", error)
      }
    }

    loadStripe()
  }, [])

  useEffect(() => {
    if (!stripe) return

    const initialize = async () => {
      if (options.mode === "payment") {
        // Fetch client secret from the server
        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: options.amount,
            currency: options.currency,
          }),
        })

        const { clientSecret, paymentIntentId } = await response.json()

        if (!clientSecret) {
          console.error("Client secret not found.")
          return
        }

        // Initialize Stripe Elements with the client secret
        stripe.elements({ clientSecret, paymentIntentId })
      } else if (options.mode === "subscription") {
        // Handle subscription setup
        console.log("Subscription mode not fully implemented in this component.")
      }
    }

    initialize()
  }, [stripe, options])

  return <div className={className}>{children}</div>
}
