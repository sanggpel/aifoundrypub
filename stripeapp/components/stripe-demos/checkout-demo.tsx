"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Stripe } from "@/components/stripe"
import { ShoppingCart, CreditCard, Smartphone, Banknote } from "lucide-react"

export function CheckoutDemo() {
  const products = [
    {
      id: "prod_1",
      name: "Premium Plan",
      description: "Full access to all features",
      price: 2999,
      currency: "usd",
      type: "subscription",
    },
    {
      id: "prod_2",
      name: "Professional Services",
      description: "One-time consultation package",
      price: 49999,
      currency: "usd",
      type: "one-time",
    },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Product Selection */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Product Selection
            </CardTitle>
            <CardDescription>Choose from subscription or one-time payment options</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {products.map((product) => (
              <Card key={product.id} className="border-2 hover:border-blue-200 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{product.name}</h3>
                    <Badge variant={product.type === "subscription" ? "default" : "secondary"}>
                      {product.type === "subscription" ? "Monthly" : "One-time"}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">
                      ${(product.price / 100).toFixed(2)}
                      {product.type === "subscription" && (
                        <span className="text-sm font-normal text-gray-500">/month</span>
                      )}
                    </span>
                    <Button size="sm">Select</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle>Supported Payment Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <CreditCard className="w-5 h-5 text-blue-600" />
                <span className="text-sm">Credit Cards</span>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Smartphone className="w-5 h-5 text-green-600" />
                <span className="text-sm">Digital Wallets</span>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Banknote className="w-5 h-5 text-purple-600" />
                <span className="text-sm">Bank Transfer</span>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <span className="text-sm font-bold">BNPL</span>
                <span className="text-sm">Buy Now Pay Later</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stripe Checkout */}
      <Card>
        <CardHeader>
          <CardTitle>Secure Checkout</CardTitle>
          <CardDescription>Complete your purchase using Stripe's secure payment processing</CardDescription>
        </CardHeader>
        <CardContent>
          <Stripe
            options={{
              mode: "payment",
              amount: 2999,
              currency: "usd",
            }}
            className="min-h-[400px]"
          >
            <div className="space-y-4">
              {/* Order Summary */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Order Summary</h4>
                <div className="flex justify-between text-sm mb-1">
                  <span>Premium Plan (Monthly)</span>
                  <span>$29.99</span>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Tax</span>
                  <span>$2.40</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>$32.39</span>
                </div>
              </div>

              {/* Payment Form will be rendered by Stripe */}
              <div className="min-h-[200px] flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                <p className="text-gray-500">Stripe Payment Element will render here</p>
              </div>

              <Button className="w-full" size="lg">
                Complete Payment
              </Button>
            </div>
          </Stripe>
        </CardContent>
      </Card>
    </div>
  )
}
