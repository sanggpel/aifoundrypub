"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckoutDemo } from "@/components/stripe-demos/checkout-demo"
import { SubscriptionDemo } from "@/components/stripe-demos/subscription-demo"
import { CustomerPortalDemo } from "@/components/stripe-demos/customer-portal-demo"
import { InvoiceDemo } from "@/components/stripe-demos/invoice-demo"
import { AnalyticsDemo } from "@/components/stripe-demos/analytics-demo"
import { CreditCard, Repeat, Users, FileText, BarChart3, Zap, Shield, Globe } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Rocket } from "lucide-react"

export default function StripeDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Stripe Integration Template</h1>
                <p className="text-sm text-gray-500">Universal payment solution for any business</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/deploy">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Rocket className="w-4 h-4 mr-2" />
                  Deploy Now
                </Button>
              </Link>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Production Ready
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Complete Stripe Integration Template</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            A comprehensive, production-ready template that works for SaaS, e-commerce, service-based businesses, and
            in-house systems. Built with Next.js, TypeScript, and Tailwind CSS.
          </p>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardContent className="p-6 text-center">
                <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Secure & Compliant</h3>
                <p className="text-sm text-gray-600">PCI DSS compliant with built-in security best practices</p>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-purple-200 transition-colors">
              <CardContent className="p-6 text-center">
                <Globe className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Global Ready</h3>
                <p className="text-sm text-gray-600">
                  Multi-currency, multi-language, and international payment methods
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-green-200 transition-colors">
              <CardContent className="p-6 text-center">
                <Zap className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Easy Integration</h3>
                <p className="text-sm text-gray-600">Drop-in components with minimal configuration required</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Demo Tabs */}
        <Tabs defaultValue="checkout" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="checkout" className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Checkout
            </TabsTrigger>
            <TabsTrigger value="subscriptions" className="flex items-center gap-2">
              <Repeat className="w-4 h-4" />
              Subscriptions
            </TabsTrigger>
            <TabsTrigger value="portal" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Customer Portal
            </TabsTrigger>
            <TabsTrigger value="invoices" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Invoices
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="checkout">
            <CheckoutDemo />
          </TabsContent>

          <TabsContent value="subscriptions">
            <SubscriptionDemo />
          </TabsContent>

          <TabsContent value="portal">
            <CustomerPortalDemo />
          </TabsContent>

          <TabsContent value="invoices">
            <InvoiceDemo />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsDemo />
          </TabsContent>
        </Tabs>

        {/* Business Model Examples */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8">Perfect for Any Business Model</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">SaaS Platforms</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2 text-gray-600">
                  <li>• Subscription tiers</li>
                  <li>• Usage-based billing</li>
                  <li>• Free trials</li>
                  <li>• Team management</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">E-commerce</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2 text-gray-600">
                  <li>• Product catalog</li>
                  <li>• Inventory tracking</li>
                  <li>• Shipping integration</li>
                  <li>• Discount codes</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Service Business</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2 text-gray-600">
                  <li>• Custom invoicing</li>
                  <li>• Project billing</li>
                  <li>• Recurring services</li>
                  <li>• Client portals</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Marketplace</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2 text-gray-600">
                  <li>• Multi-party payments</li>
                  <li>• Platform fees</li>
                  <li>• Vendor payouts</li>
                  <li>• Escrow services</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
