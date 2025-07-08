"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, TrendingDown, DollarSign, Users, CreditCard, RefreshCw, Calendar } from "lucide-react"

export function AnalyticsDemo() {
  const metrics = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Active Subscriptions",
      value: "2,350",
      change: "+15.3%",
      trend: "up",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Payment Success Rate",
      value: "98.5%",
      change: "+2.1%",
      trend: "up",
      icon: CreditCard,
      color: "text-purple-600",
    },
    {
      title: "Churn Rate",
      value: "3.2%",
      change: "-0.8%",
      trend: "down",
      icon: RefreshCw,
      color: "text-red-600",
    },
  ]

  const revenueData = [
    { month: "Jan", revenue: 12000, subscriptions: 450 },
    { month: "Feb", revenue: 15000, subscriptions: 520 },
    { month: "Mar", revenue: 18000, subscriptions: 680 },
    { month: "Apr", revenue: 22000, subscriptions: 750 },
    { month: "May", revenue: 28000, subscriptions: 890 },
    { month: "Jun", revenue: 35000, subscriptions: 1200 },
  ]

  const topPlans = [
    { name: "Professional", subscribers: 1250, revenue: "$36,250", growth: "+12%" },
    { name: "Starter", subscribers: 850, revenue: "$7,650", growth: "+8%" },
    { name: "Enterprise", subscribers: 250, revenue: "$24,750", growth: "+25%" },
  ]

  const paymentMethods = [
    { method: "Credit Card", percentage: 65, color: "bg-blue-500" },
    { method: "Digital Wallet", percentage: 25, color: "bg-green-500" },
    { method: "Bank Transfer", percentage: 8, color: "bg-purple-500" },
    { method: "Other", percentage: 2, color: "bg-gray-500" },
  ]

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon
          const TrendIcon = metric.trend === "up" ? TrendingUp : TrendingDown

          return (
            <Card key={metric.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gray-100`}>
                    <Icon className={`w-5 h-5 ${metric.color}`} />
                  </div>
                  <Badge
                    variant="secondary"
                    className={`${metric.trend === "up" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                  >
                    <TrendIcon className="w-3 h-3 mr-1" />
                    {metric.change}
                  </Badge>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <p className="text-sm text-gray-500">{metric.title}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Revenue Trend
            </CardTitle>
            <CardDescription>Monthly revenue and subscription growth over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {revenueData.map((data, index) => (
                <div key={data.month} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium w-8">{data.month}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all"
                            style={{ width: `${(data.revenue / 35000) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold">${(data.revenue / 1000).toFixed(0)}k</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-1">
                          <div
                            className="bg-green-500 h-1 rounded-full transition-all"
                            style={{ width: `${(data.subscriptions / 1200) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500">{data.subscriptions} subs</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Plans */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Plans</CardTitle>
            <CardDescription>Revenue and subscriber metrics by plan type</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topPlans.map((plan, index) => (
              <div key={plan.name} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                      index === 0 ? "bg-blue-500" : index === 1 ? "bg-green-500" : "bg-purple-500"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-semibold">{plan.name}</p>
                    <p className="text-sm text-gray-500">{plan.subscribers} subscribers</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{plan.revenue}</p>
                  <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                    {plan.growth}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Methods Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Distribution of payment methods used by customers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {paymentMethods.map((method) => (
              <div key={method.method} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{method.method}</span>
                  <span className="font-semibold">{method.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${method.color} h-2 rounded-full transition-all`}
                    style={{ width: `${method.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest payment and subscription events</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-2 border-l-4 border-green-500 bg-green-50">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New subscription: Professional Plan</p>
                  <p className="text-xs text-gray-500">john.doe@example.com • 2 minutes ago</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2 border-l-4 border-blue-500 bg-blue-50">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Payment successful: $29.00</p>
                  <p className="text-xs text-gray-500">sarah.smith@company.com • 5 minutes ago</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2 border-l-4 border-purple-500 bg-purple-50">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Plan upgraded: Starter → Professional</p>
                  <p className="text-xs text-gray-500">mike.johnson@startup.io • 12 minutes ago</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2 border-l-4 border-yellow-500 bg-yellow-50">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Payment retry scheduled</p>
                  <p className="text-xs text-gray-500">failed.payment@email.com • 18 minutes ago</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2 border-l-4 border-red-500 bg-red-50">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Subscription cancelled</p>
                  <p className="text-xs text-gray-500">former.customer@domain.com • 25 minutes ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
