"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { FileText, Send, Eye, Download, Plus, Trash2, DollarSign } from "lucide-react"
import { useState } from "react"

export function InvoiceDemo() {
  const [invoiceItems, setInvoiceItems] = useState([
    { id: 1, description: "Web Development Services", quantity: 40, rate: 75, amount: 3000 },
    { id: 2, description: "UI/UX Design", quantity: 20, rate: 85, amount: 1700 },
  ])

  const subtotal = invoiceItems.reduce((sum, item) => sum + item.amount, 0)
  const tax = subtotal * 0.08
  const total = subtotal + tax

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      description: "",
      quantity: 1,
      rate: 0,
      amount: 0,
    }
    setInvoiceItems([...invoiceItems, newItem])
  }

  const removeItem = (id: number) => {
    setInvoiceItems(invoiceItems.filter((item) => item.id !== id))
  }

  const recentInvoices = [
    { id: "INV-001", client: "Acme Corp", amount: "$4,736.00", status: "paid", date: "2024-01-15" },
    { id: "INV-002", client: "TechStart Inc", amount: "$2,450.00", status: "pending", date: "2024-01-10" },
    { id: "INV-003", client: "Design Co", amount: "$1,200.00", status: "overdue", date: "2023-12-28" },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Invoice Creation Form */}
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Create Invoice
            </CardTitle>
            <CardDescription>Generate professional invoices for your clients</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Client Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="client-name">Client Name</Label>
                <Input id="client-name" placeholder="Acme Corporation" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client-email">Client Email</Label>
                <Input id="client-email" type="email" placeholder="billing@acme.com" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="client-address">Client Address</Label>
              <Textarea id="client-address" placeholder="123 Business St, City, State 12345" />
            </div>

            {/* Invoice Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="invoice-number">Invoice Number</Label>
                <Input id="invoice-number" placeholder="INV-004" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="issue-date">Issue Date</Label>
                <Input id="issue-date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="due-date">Due Date</Label>
                <Input id="due-date" type="date" />
              </div>
            </div>

            {/* Invoice Items */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Invoice Items</h3>
                <Button onClick={addItem} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </Button>
              </div>

              <div className="space-y-3">
                {invoiceItems.map((item, index) => (
                  <div key={item.id} className="grid grid-cols-12 gap-2 items-center p-3 border rounded-lg">
                    <div className="col-span-5">
                      <Input
                        placeholder="Description"
                        defaultValue={item.description}
                        className="border-0 p-0 h-auto"
                      />
                    </div>
                    <div className="col-span-2">
                      <Input
                        type="number"
                        placeholder="Qty"
                        defaultValue={item.quantity}
                        className="border-0 p-0 h-auto text-center"
                      />
                    </div>
                    <div className="col-span-2">
                      <Input
                        type="number"
                        placeholder="Rate"
                        defaultValue={item.rate}
                        className="border-0 p-0 h-auto text-center"
                      />
                    </div>
                    <div className="col-span-2 text-center font-semibold">${item.amount.toFixed(2)}</div>
                    <div className="col-span-1 text-center">
                      <Button variant="ghost" size="sm" onClick={() => removeItem(item.id)}>
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Invoice Totals */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (8%):</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button className="flex-1">
                <Send className="w-4 h-4 mr-2" />
                Send Invoice
              </Button>
              <Button variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Invoices */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Invoices</CardTitle>
            <CardDescription>Track your invoice status and payments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentInvoices.map((invoice) => (
              <div key={invoice.id} className="p-3 border rounded-lg space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{invoice.id}</p>
                    <p className="text-sm text-gray-500">{invoice.client}</p>
                  </div>
                  <Badge
                    variant="secondary"
                    className={
                      invoice.status === "paid"
                        ? "bg-green-100 text-green-800"
                        : invoice.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }
                  >
                    {invoice.status}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{invoice.amount}</span>
                  <span className="text-sm text-gray-500">{invoice.date}</span>
                </div>
              </div>
            ))}

            <Button variant="outline" className="w-full bg-transparent">
              View All Invoices
            </Button>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Invoice Statistics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">$12,450</p>
                <p className="text-sm text-green-700">Paid This Month</p>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <p className="text-2xl font-bold text-yellow-600">$3,200</p>
                <p className="text-sm text-yellow-700">Pending</p>
              </div>
            </div>

            <div className="text-center p-3 bg-red-50 rounded-lg">
              <p className="text-2xl font-bold text-red-600">$1,200</p>
              <p className="text-sm text-red-700">Overdue</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
