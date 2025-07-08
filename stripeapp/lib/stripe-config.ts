export interface StripeConfig {
  // Basic Configuration
  publishableKey: string
  secretKey: string
  webhookSecret: string

  // Business Model Settings
  businessModel: "saas" | "ecommerce" | "service" | "marketplace"

  // Currency and Localization
  defaultCurrency: string
  supportedCurrencies: string[]
  locale: string

  // Payment Methods
  paymentMethods: {
    cards: boolean
    digitalWallets: boolean
    bankTransfers: boolean
    buyNowPayLater: boolean
  }

  // Subscription Settings (for SaaS)
  subscriptions?: {
    trialPeriodDays: number
    allowPlanChanges: boolean
    prorateUpgrades: boolean
    cancelAtPeriodEnd: boolean
  }

  // E-commerce Settings
  ecommerce?: {
    shippingRates: boolean
    taxCalculation: boolean
    inventoryTracking: boolean
    discountCodes: boolean
  }

  // Service Business Settings
  services?: {
    customInvoicing: boolean
    projectBilling: boolean
    timeTracking: boolean
    milestonePayments: boolean
  }

  // Marketplace Settings
  marketplace?: {
    connectAccounts: boolean
    platformFeePercent: number
    instantPayouts: boolean
    escrowServices: boolean
  }
}

// Example configurations for different business models
export const saasConfig: StripeConfig = {
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
  secretKey: process.env.STRIPE_SECRET_KEY!,
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
  businessModel: "saas",
  defaultCurrency: "usd",
  supportedCurrencies: ["usd", "eur", "gbp"],
  locale: "en-US",
  paymentMethods: {
    cards: true,
    digitalWallets: true,
    bankTransfers: false,
    buyNowPayLater: false,
  },
  subscriptions: {
    trialPeriodDays: 14,
    allowPlanChanges: true,
    prorateUpgrades: true,
    cancelAtPeriodEnd: false,
  },
}

export const ecommerceConfig: StripeConfig = {
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
  secretKey: process.env.STRIPE_SECRET_KEY!,
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
  businessModel: "ecommerce",
  defaultCurrency: "usd",
  supportedCurrencies: ["usd", "eur", "gbp", "cad"],
  locale: "en-US",
  paymentMethods: {
    cards: true,
    digitalWallets: true,
    bankTransfers: true,
    buyNowPayLater: true,
  },
  ecommerce: {
    shippingRates: true,
    taxCalculation: true,
    inventoryTracking: true,
    discountCodes: true,
  },
}

export const serviceConfig: StripeConfig = {
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
  secretKey: process.env.STRIPE_SECRET_KEY!,
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
  businessModel: "service",
  defaultCurrency: "usd",
  supportedCurrencies: ["usd", "eur"],
  locale: "en-US",
  paymentMethods: {
    cards: true,
    digitalWallets: false,
    bankTransfers: true,
    buyNowPayLater: false,
  },
  services: {
    customInvoicing: true,
    projectBilling: true,
    timeTracking: true,
    milestonePayments: true,
  },
}

export const marketplaceConfig: StripeConfig = {
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
  secretKey: process.env.STRIPE_SECRET_KEY!,
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
  businessModel: "marketplace",
  defaultCurrency: "usd",
  supportedCurrencies: ["usd", "eur", "gbp"],
  locale: "en-US",
  paymentMethods: {
    cards: true,
    digitalWallets: true,
    bankTransfers: true,
    buyNowPayLater: false,
  },
  marketplace: {
    connectAccounts: true,
    platformFeePercent: 2.9,
    instantPayouts: true,
    escrowServices: true,
  },
}

// Helper function to get config based on business model
export function getStripeConfig(businessModel: StripeConfig["businessModel"]): StripeConfig {
  switch (businessModel) {
    case "saas":
      return saasConfig
    case "ecommerce":
      return ecommerceConfig
    case "service":
      return serviceConfig
    case "marketplace":
      return marketplaceConfig
    default:
      return saasConfig
  }
}
