import { type NextRequest, NextResponse } from "next/server"
import { getStripe } from "@/lib/get-stripe"

export async function POST(req: NextRequest) {
  try {
    const { customerId, returnUrl } = await req.json()

    const stripe = getStripe()

    // Create a customer portal session
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl || `${req.nextUrl.origin}/dashboard`,
    })

    return NextResponse.json({
      url: portalSession.url,
    })
  } catch (error) {
    console.error("Error creating customer portal session:", error)
    return NextResponse.json({ error: "Failed to create customer portal session" }, { status: 500 })
  }
}
