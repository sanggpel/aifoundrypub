"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Check, Crown, Zap, Users, BarChart3 } from "lucide-react"
import { useState } from "react"

export function SubscriptionDemo() {
  const [isAnnual, setIsAnnual] = useState(false)

  const plans = [
    {
      id: "starter",
      name: "Starter",
      description: "Perfect for individuals and small projects",
      monthlyPrice: 9,
      annualPrice: 90,
      features: ["Up to 5 projects", "Basic analytics", "Email support", "1GB storage"],
      icon: Zap,
      popular: false,
    },
    {
      id: "professional",
      name: "Professional",
      description: "Ideal for growing teams and businesses",
      monthlyPrice: 29,
      annualPrice: 290,
      features: [
        "Unlimited projects",
        "Advanced analytics",
        "Priority support",
        "10GB storage",
        "Team collaboration",
        "API access",
      ],
      icon: Users,
      popular: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "For large organizations with advanced needs",
      monthlyPrice: 99,
      annualPrice: 990,
      features: [
        "Everything in Professional",
        "Custom integrations",
        "Dedicated support",
        "Unlimited storage",
        "Advanced security",
        "SLA guarantee",
      ],
      icon: Crown,
      popular: false,
    },
  ]

  return (
    <div className="space-y-8">
      {/* Pricing Toggle */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className={!isAnnual ? "font-semibold" : "text-gray-500"}>Monthly</span>
          <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
          <span className={isAnnual ? "font-semibold" : "text-gray-500"}>
            Annual
            <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800">
              Save 17%
            </Badge>
          </span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const Icon = plan.icon
          const price = isAnnual ? plan.annualPrice : plan.monthlyPrice
          const period = isAnnual ? "year" : "month"

          return (
            <Card
              key={plan.id}
              className={`relative ${plan.popular ? "border-2 border-blue-500 shadow-lg" : "border hover:border-gray-300"} transition-all`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500">Most Popular</Badge>
              )}

              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      plan.popular ? "bg-blue-100" : "bg-gray-100"
                    }`}
                  >
                    <Icon className={`w-6 h-6 ${plan.popular ? "text-blue-600" : "text-gray-600"}`} />
                  </div>
                </div>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription className="text-sm">{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">${price}</span>
                  <span className="text-gray-500">/{period}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <Button
                  className={`w-full ${plan.popular ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  Get Started
                </Button>

                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-sm">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Usage-Based Billing Example */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Usage-Based Billing
          </CardTitle>
          <CardDescription>Perfect for SaaS platforms with variable usage patterns</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>API Calls</span>
                <span>7,500 / 10,000</span>
              </div>
              <Progress value={75} className="h-2" />
              <p className="text-xs text-gray-500">$0.001 per additional call</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Storage Used</span>
                <span>4.2GB / 10GB</span>
              </div>
              <Progress value={42} className="h-2" />
              <p className="text-xs text-gray-500">$0.10 per additional GB</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Bandwidth</span>
                <span>156GB / 500GB</span>
              </div>
              <Progress value={31} className="h-2" />
              <p className="text-xs text-gray-500">$0.05 per additional GB</p>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Current Month Estimate</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Base subscription</span>
                <span>$29.00</span>
              </div>
              <div className="flex justify-between">
                <span>Usage charges</span>
                <span>$12.50</span>
              </div>
              <div className="flex justify-between font-semibold text-blue-900">
                <span>Total estimate</span>
                <span>$41.50</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
