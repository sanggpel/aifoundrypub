"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import {
  Rocket,
  Key,
  Globe,
  CheckCircle,
  AlertCircle,
  Copy,
  ExternalLink,
  ArrowLeft,
  Shield,
  Zap,
  Settings,
  Database,
  Mail,
  TestTube,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function DeployPage() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const copyToClipboard = (text: string, keyType: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(keyType)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const platforms = [
    {
      id: "vercel",
      name: "Vercel",
      description: "Recommended for Next.js apps",
      logo: "▲",
      color: "bg-black text-white",
      popular: true,
      deployUrl: "https://vercel.com/new",
      docs: "https://vercel.com/docs",
    },
    {
      id: "netlify",
      name: "Netlify",
      description: "Great for static sites and serverless",
      logo: "N",
      color: "bg-teal-600 text-white",
      popular: false,
      deployUrl: "https://app.netlify.com/start",
      docs: "https://docs.netlify.com",
    },
    {
      id: "railway",
      name: "Railway",
      description: "Simple deployment with databases",
      logo: "🚂",
      color: "bg-purple-600 text-white",
      popular: false,
      deployUrl: "https://railway.app/new",
      docs: "https://docs.railway.app",
    },
  ]

  const envVars = [
    {
      name: "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
      description: "Your Stripe publishable key (starts with pk_)",
      example: "pk_test_51234567890abcdef...",
      required: true,
      public: true,
    },
    {
      name: "STRIPE_SECRET_KEY",
      description: "Your Stripe secret key (starts with sk_)",
      example: "sk_test_51234567890abcdef...",
      required: true,
      public: false,
    },
    {
      name: "STRIPE_WEBHOOK_SECRET",
      description: "Your webhook signing secret (starts with whsec_)",
      example: "whsec_1234567890abcdef...",
      required: true,
      public: false,
    },
  ]

  const webhookEvents = [
    "payment_intent.succeeded",
    "payment_intent.payment_failed",
    "customer.subscription.created",
    "customer.subscription.updated",
    "customer.subscription.deleted",
    "invoice.payment_succeeded",
    "invoice.payment_failed",
    "customer.created",
    "customer.updated",
  ]

  const testCards = [
    { number: "4242 4242 4242 4242", description: "Visa - Success" },
    { number: "4000 0000 0000 0002", description: "Visa - Decline" },
    { number: "4000 0000 0000 9995", description: "Visa - Insufficient funds" },
    { number: "4000 0025 0000 3155", description: "Visa - Requires authentication" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Demo
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Rocket className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Deploy Your Stripe Integration</h1>
                  <p className="text-sm text-gray-500">Get your payment system live in minutes</p>
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <Rocket className="w-3 h-3 mr-1" />
              Ready to Deploy
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Start Alert */}
        <Alert className="mb-8 border-blue-200 bg-blue-50">
          <Zap className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>Quick Start:</strong> Get your Stripe keys → Choose a platform → Deploy → Configure webhooks → Start
            accepting payments!
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="setup" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="setup" className="flex items-center gap-2">
              <Key className="w-4 h-4" />
              Setup
            </TabsTrigger>
            <TabsTrigger value="deploy" className="flex items-center gap-2">
              <Rocket className="w-4 h-4" />
              Deploy
            </TabsTrigger>
            <TabsTrigger value="configure" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Configure
            </TabsTrigger>
            <TabsTrigger value="test" className="flex items-center gap-2">
              <TestTube className="w-4 h-4" />
              Test
            </TabsTrigger>
          </TabsList>

          {/* Step 1: Setup */}
          <TabsContent value="setup">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="w-5 h-5" />
                    Step 1: Get Your Stripe API Keys
                  </CardTitle>
                  <CardDescription>
                    You'll need these keys from your Stripe Dashboard to configure the integration
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">How to Get Your Keys:</h3>
                      <ol className="space-y-3 text-sm">
                        <li className="flex items-start gap-3">
                          <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                            1
                          </span>
                          <div>
                            <p className="font-medium">Log in to Stripe Dashboard</p>
                            <p className="text-gray-600">
                              Go to{" "}
                              <a
                                href="https://dashboard.stripe.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                dashboard.stripe.com
                              </a>
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                            2
                          </span>
                          <div>
                            <p className="font-medium">Navigate to API Keys</p>
                            <p className="text-gray-600">Developers → API keys</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                            3
                          </span>
                          <div>
                            <p className="font-medium">Copy Your Keys</p>
                            <p className="text-gray-600">Copy both publishable and secret keys</p>
                          </div>
                        </li>
                      </ol>

                      <Button asChild className="w-full">
                        <a href="https://dashboard.stripe.com/apikeys" target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Open Stripe Dashboard
                        </a>
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Required Environment Variables:</h3>
                      <div className="space-y-3">
                        {envVars.map((envVar) => (
                          <Card key={envVar.name} className="border-l-4 border-l-blue-500">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{envVar.name}</code>
                                  {envVar.public && (
                                    <Badge variant="secondary" className="text-xs">
                                      Public
                                    </Badge>
                                  )}
                                  {!envVar.public && (
                                    <Badge variant="secondary" className="text-xs bg-red-100 text-red-800">
                                      Secret
                                    </Badge>
                                  )}
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => copyToClipboard(envVar.name, envVar.name)}
                                >
                                  {copiedKey === envVar.name ? (
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                  ) : (
                                    <Copy className="w-4 h-4" />
                                  )}
                                </Button>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{envVar.description}</p>
                              <code className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded block">
                                {envVar.example}
                              </code>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Step 2: Deploy */}
          <TabsContent value="deploy">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Rocket className="w-5 h-5" />
                    Step 2: Choose Your Deployment Platform
                  </CardTitle>
                  <CardDescription>
                    Select a platform to deploy your Stripe integration. All platforms support the required features.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {platforms.map((platform) => (
                      <Card
                        key={platform.id}
                        className={`relative hover:shadow-lg transition-shadow ${platform.popular ? "border-2 border-blue-500" : "border hover:border-gray-300"}`}
                      >
                        {platform.popular && (
                          <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500">
                            Recommended
                          </Badge>
                        )}

                        <CardHeader className="text-center pb-4">
                          <div className="flex justify-center mb-4">
                            <div
                              className={`w-16 h-16 rounded-lg flex items-center justify-center text-2xl font-bold ${platform.color}`}
                            >
                              {platform.logo}
                            </div>
                          </div>
                          <CardTitle className="text-xl">{platform.name}</CardTitle>
                          <CardDescription>{platform.description}</CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Button asChild className="w-full">
                              <a href={platform.deployUrl} target="_blank" rel="noopener noreferrer">
                                <Rocket className="w-4 h-4 mr-2" />
                                Deploy to {platform.name}
                              </a>
                            </Button>
                            <Button variant="outline" asChild className="w-full bg-transparent">
                              <a href={platform.docs} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-4 h-4 mr-2" />
                                View Docs
                              </a>
                            </Button>
                          </div>

                          <div className="text-sm space-y-2">
                            <p className="font-medium">Quick Steps:</p>
                            <ol className="text-xs space-y-1 text-gray-600">
                              <li>1. Connect your Git repository</li>
                              <li>2. Add environment variables</li>
                              <li>3. Deploy automatically</li>
                            </ol>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Alert className="mt-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Important:</strong> After deployment, you'll need to add your environment variables in
                      your platform's dashboard, then redeploy the application.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              {/* Environment Variables Setup */}
              <Card>
                <CardHeader>
                  <CardTitle>Adding Environment Variables</CardTitle>
                  <CardDescription>
                    After deploying, add these environment variables in your platform's settings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-3">Copy these variables to your deployment platform:</h4>
                    <div className="space-y-2 font-mono text-sm">
                      {envVars.map((envVar) => (
                        <div
                          key={envVar.name}
                          className="flex items-center justify-between bg-white p-2 rounded border"
                        >
                          <span>{envVar.name}=your_key_here</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(`${envVar.name}=your_key_here`, envVar.name)}
                          >
                            {copiedKey === envVar.name ? (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Step 3: Configure */}
          <TabsContent value="configure">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Step 3: Configure Webhooks
                  </CardTitle>
                  <CardDescription>
                    Set up webhooks to receive real-time notifications about payment events
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Webhook Setup Steps:</h3>
                      <ol className="space-y-3 text-sm">
                        <li className="flex items-start gap-3">
                          <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                            1
                          </span>
                          <div>
                            <p className="font-medium">Go to Webhooks</p>
                            <p className="text-gray-600">In Stripe Dashboard: Developers → Webhooks</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                            2
                          </span>
                          <div>
                            <p className="font-medium">Add Endpoint</p>
                            <p className="text-gray-600">Click "Add endpoint"</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                            3
                          </span>
                          <div>
                            <p className="font-medium">Enter URL</p>
                            <div className="bg-gray-100 p-2 rounded mt-1">
                              <code className="text-xs">https://your-domain.com/api/webhooks/stripe</code>
                            </div>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                            4
                          </span>
                          <div>
                            <p className="font-medium">Select Events</p>
                            <p className="text-gray-600">Choose the events listed on the right</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                            5
                          </span>
                          <div>
                            <p className="font-medium">Copy Signing Secret</p>
                            <p className="text-gray-600">Add it as STRIPE_WEBHOOK_SECRET</p>
                          </div>
                        </li>
                      </ol>

                      <Button asChild className="w-full">
                        <a href="https://dashboard.stripe.com/webhooks" target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Open Stripe Webhooks
                        </a>
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Required Webhook Events:</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="space-y-2">
                          {webhookEvents.map((event) => (
                            <div key={event} className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                              <code className="text-sm font-mono">{event}</code>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Alert>
                        <Shield className="h-4 w-4" />
                        <AlertDescription>
                          <strong>Security:</strong> Webhooks are automatically verified using your signing secret to
                          ensure they come from Stripe.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Business Configuration */}
              <Card>
                <CardHeader>
                  <CardTitle>Business Model Configuration</CardTitle>
                  <CardDescription>Customize the template for your specific business needs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">Configuration Options:</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-3 p-3 border rounded-lg">
                          <Database className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="font-medium">SaaS Platform</p>
                            <p className="text-gray-600">Subscriptions, trials, usage billing</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 border rounded-lg">
                          <Globe className="w-5 h-5 text-green-600" />
                          <div>
                            <p className="font-medium">E-commerce</p>
                            <p className="text-gray-600">Products, inventory, shipping</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 border rounded-lg">
                          <Mail className="w-5 h-5 text-purple-600" />
                          <div>
                            <p className="font-medium">Service Business</p>
                            <p className="text-gray-600">Custom invoicing, project billing</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">Edit Configuration:</h4>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm mb-2">
                          In <code>lib/stripe-config.ts</code>:
                        </p>
                        <pre className="text-xs bg-white p-3 rounded border overflow-x-auto">
                          {`// Choose your business model
const config = getStripeConfig('saas')
// Options: 'saas' | 'ecommerce' | 'service' | 'marketplace'`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Step 4: Test */}
          <TabsContent value="test">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TestTube className="w-5 h-5" />
                    Step 4: Test Your Integration
                  </CardTitle>
                  <CardDescription>
                    Use Stripe's test cards to verify your payment integration is working correctly
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Test Card Numbers:</h3>
                      <div className="space-y-3">
                        {testCards.map((card, index) => (
                          <Card key={index} className="border-l-4 border-l-green-500">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-2">
                                <code className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{card.number}</code>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => copyToClipboard(card.number.replace(/\s/g, ""), `card-${index}`)}
                                >
                                  {copiedKey === `card-${index}` ? (
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                  ) : (
                                    <Copy className="w-4 h-4" />
                                  )}
                                </Button>
                              </div>
                              <p className="text-sm text-gray-600">{card.description}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          <strong>Test Details:</strong> Use any future expiry date (e.g., 12/25) and any 3-digit CVC
                          (e.g., 123).
                        </AlertDescription>
                      </Alert>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Testing Checklist:</h3>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">Successful Payment</p>
                            <p className="text-sm text-gray-600">Use 4242 4242 4242 4242 to test successful payments</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">Failed Payment</p>
                            <p className="text-sm text-gray-600">Use 4000 0000 0000 0002 to test payment failures</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">Webhook Events</p>
                            <p className="text-sm text-gray-600">Check your Stripe Dashboard for webhook deliveries</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">Customer Portal</p>
                            <p className="text-sm text-gray-600">Test subscription management and billing history</p>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-3">
                        <h4 className="font-medium">Next Steps:</h4>
                        <ul className="text-sm space-y-2 text-gray-600">
                          <li>• Customize the UI to match your brand</li>
                          <li>• Add your actual products/services</li>
                          <li>• Set up production keys when ready</li>
                          <li>• Configure tax settings if needed</li>
                          <li>• Add user authentication</li>
                          <li>• Integrate with your database</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Success Message */}
              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-900">Congratulations! 🎉</h3>
                      <p className="text-green-800">
                        Your Stripe integration is now live and ready to accept payments. Start customizing it for your
                        specific business needs.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
