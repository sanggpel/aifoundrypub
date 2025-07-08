import { headers } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = headers().get("stripe-signature")!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error("Webhook signature verification failed:", err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  try {
    switch (event.type) {
      // Payment Events
      case "payment_intent.succeeded":
        await handlePaymentSucceeded(event.data.object as Stripe.PaymentIntent)
        break

      case "payment_intent.payment_failed":
        await handlePaymentFailed(event.data.object as Stripe.PaymentIntent)
        break

      // Subscription Events
      case "customer.subscription.created":
        await handleSubscriptionCreated(event.data.object as Stripe.Subscription)
        break

      case "customer.subscription.updated":
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription)
        break

      case "customer.subscription.deleted":
        await handleSubscriptionCancelled(event.data.object as Stripe.Subscription)
        break

      // Invoice Events
      case "invoice.payment_succeeded":
        await handleInvoicePaymentSucceeded(event.data.object as Stripe.Invoice)
        break

      case "invoice.payment_failed":
        await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice)
        break

      // Customer Events
      case "customer.created":
        await handleCustomerCreated(event.data.object as Stripe.Customer)
        break

      case "customer.updated":
        await handleCustomerUpdated(event.data.object as Stripe.Customer)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook handler failed:", error)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }
}

// Payment Event Handlers
async function handlePaymentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  console.log("Payment succeeded:", paymentIntent.id)

  // Update your database
  // Send confirmation email
  // Update user access/permissions
  // Analytics tracking

  // Example database update (replace with your actual database logic)
  // await updatePaymentStatus(paymentIntent.metadata.orderId, 'completed')
  // await sendPaymentConfirmationEmail(paymentIntent.receipt_email)
}

async function handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
  console.log("Payment failed:", paymentIntent.id)

  // Handle failed payment
  // Send notification to customer
  // Update order status
  // Retry payment if applicable

  // Example: Update database and send notification
  // await updatePaymentStatus(paymentIntent.metadata.orderId, 'failed')
  // await sendPaymentFailedNotification(paymentIntent.receipt_email)
}

// Subscription Event Handlers
async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  console.log("Subscription created:", subscription.id)

  // Update user subscription status
  // Grant access to premium features
  // Send welcome email
  // Update analytics

  // Example implementation
  // await createUserSubscription({
  //   userId: subscription.metadata.userId,
  //   subscriptionId: subscription.id,
  //   status: subscription.status,
  //   planId: subscription.items.data[0].price.id
  // })
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  console.log("Subscription updated:", subscription.id)

  // Handle plan changes, quantity updates, etc.
  // Update user permissions
  // Send notification of changes

  // Example: Handle plan upgrade/downgrade
  // await updateUserSubscription(subscription.id, {
  //   status: subscription.status,
  //   planId: subscription.items.data[0].price.id,
  //   quantity: subscription.items.data[0].quantity
  // })
}

async function handleSubscriptionCancelled(subscription: Stripe.Subscription) {
  console.log("Subscription cancelled:", subscription.id)

  // Update user access
  // Send cancellation confirmation
  // Schedule data retention/deletion

  // Example implementation
  // await cancelUserSubscription(subscription.id)
  // await scheduleAccountDowngrade(subscription.metadata.userId)
}

// Invoice Event Handlers
async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  console.log("Invoice payment succeeded:", invoice.id)

  // Update subscription status
  // Send receipt
  // Update usage limits

  // Example: Renew subscription access
  // await renewSubscriptionAccess(invoice.subscription as string)
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  console.log("Invoice payment failed:", invoice.id)

  // Handle dunning management
  // Send payment failure notification
  // Update subscription status

  // Example: Handle failed recurring payment
  // await handleFailedRecurringPayment(invoice.subscription as string)
}

// Customer Event Handlers
async function handleCustomerCreated(customer: Stripe.Customer) {
  console.log("Customer created:", customer.id)

  // Sync customer data with your database
  // Send welcome email
  // Set up customer portal access
}

async function handleCustomerUpdated(customer: Stripe.Customer) {
  console.log("Customer updated:", customer.id)

  // Sync updated customer data
  // Handle email changes, address updates, etc.
}
