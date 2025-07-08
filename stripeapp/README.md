# Universal Stripe Integration Template

A comprehensive, production-ready Stripe integration template that works for SaaS, e-commerce, service-based businesses, and in-house systems. Built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

### Core Payment Features
- **Multiple Payment Methods**: Credit cards, digital wallets, bank transfers, BNPL
- **One-time Payments**: Products, services, donations
- **Subscription Management**: Plans, upgrades, downgrades, cancellations
- **Customer Portal**: Self-service billing management
- **Invoice Generation**: Automated and manual invoicing
- **Analytics Dashboard**: Payment insights and metrics

### Business Model Support
- **SaaS**: Subscription tiers, usage-based billing, free trials
- **E-commerce**: Product catalog, inventory management, shipping
- **Service-based**: Custom invoicing, project-based billing
- **Marketplace**: Multi-party payments, platform fees

### Technical Features
- **TypeScript**: Full type safety with Stripe types
- **Webhook Handling**: Robust webhook processing for all Stripe events
- **Security**: PCI DSS compliant with built-in security best practices
- **Responsive Design**: Mobile-first responsive UI components
- **Internationalization**: Multi-currency and multi-language support

## 📦 Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd stripe-integration-template
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   \`\`\`env
   # Stripe Keys
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   
   # Database (optional - for storing customer/subscription data)
   DATABASE_URL=postgresql://...
   
   # App Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   \`\`\`

4. **Configure Stripe Webhooks**
   - Go to your Stripe Dashboard → Webhooks
   - Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
   - Select events to listen for (see webhook configuration below)

5. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

## 🔧 Configuration

### Business Model Configuration

The template includes pre-configured setups for different business models. Edit `lib/stripe-config.ts` to match your needs:

\`\`\`typescript
import { getStripeConfig } from '@/lib/stripe-config'

// Choose your business model
const config = getStripeConfig('saas') // 'saas' | 'ecommerce' | 'service' | 'marketplace'
\`\`\`

### Webhook Events

Configure these webhook events in your Stripe Dashboard:

**Payment Events:**
- `payment_intent.succeeded`
- `payment_intent.payment_failed`

**Subscription Events:**
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`

**Invoice Events:**
- `invoice.payment_succeeded`
- `invoice.payment_failed`

**Customer Events:**
- `customer.created`
- `customer.updated`

## 🏗️ Architecture

### File Structure
\`\`\`
├── app/
│   ├── api/
│   │   ├── webhooks/stripe/          # Webhook handlers
│   │   ├── create-payment-intent/    # Payment creation
│   │   ├── create-subscription/      # Subscription creation
│   │   └── create-customer-portal/   # Customer portal
│   └── page.tsx                      # Main demo page
├── components/
│   ├── stripe-demos/                 # Demo components
│   └── ui/                          # shadcn/ui components
├── lib/
│   └── stripe-config.ts             # Configuration templates
└── README.md
\`\`\`

### Key Components

1. **CheckoutDemo**: Demonstrates payment processing with multiple payment methods
2. **SubscriptionDemo**: Shows subscription plans and usage-based billing
3. **CustomerPortalDemo**: Self-service customer management interface
4. **InvoiceDemo**: Invoice creation and management system
5. **AnalyticsDemo**: Payment analytics and reporting dashboard

## 💳 Usage Examples

### Creating a Payment Intent
\`\`\`typescript
const response = await fetch('/api/create-payment-intent', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    amount: 29.99,
    currency: 'usd',
    metadata: { orderId: 'order_123' }
  })
})
\`\`\`

### Creating a Subscription
\`\`\`typescript
const response = await fetch('/api/create-subscription', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    customerId: 'cus_...',
    priceId: 'price_...',
    trialPeriodDays: 14
  })
})
\`\`\`

### Opening Customer Portal
\`\`\`typescript
const response = await fetch('/api/create-customer-portal', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    customerId: 'cus_...',
    returnUrl: window.location.origin
  })
})
\`\`\`

## 🔒 Security Best Practices

- **Environment Variables**: Never expose secret keys in client-side code
- **Webhook Verification**: Always verify webhook signatures
- **HTTPS**: Use HTTPS in production for all Stripe communications
- **Input Validation**: Validate all inputs before processing
- **Error Handling**: Implement proper error handling and logging

## 🌍 Internationalization

The template supports multiple currencies and locales:

\`\`\`typescript
const config = {
  defaultCurrency: 'usd',
  supportedCurrencies: ['usd', 'eur', 'gbp', 'cad'],
  locale: 'en-US'
}
\`\`\`

## 📊 Analytics & Monitoring

Built-in analytics dashboard tracks:
- Revenue trends
- Subscription metrics
- Payment success rates
- Customer churn
- Popular payment methods

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms
The template works with any Node.js hosting platform:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

- **Documentation**: [Stripe Documentation](https://stripe.com/docs)
- **Community**: [Stripe Discord](https://discord.gg/stripe)
- **Issues**: Create an issue in this repository

## 🔄 Updates

This template is regularly updated to include:
- Latest Stripe API features
- Security improvements
- New payment methods
- Enhanced UI components

---

**Ready to accept payments?** This template provides everything you need to integrate Stripe into your application, regardless of your business model. Customize the components, configure your business logic, and start processing payments securely.
