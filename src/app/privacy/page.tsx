export const metadata = {
  title: 'Privacy Policy | Healthy Choices',
  description: 'How Healthy Choices collects, uses, and protects your information.',
}

export default function PrivacyPage() {
  return (
    <main className="py-16">
      <div className="container mx-auto px-4 max-w-3xl prose prose-charcoal">
        <h1 className="text-4xl font-display font-bold text-charcoal-900 mb-8">
          Privacy Policy
        </h1>
        <p className="text-charcoal-600 mb-6">Last updated: {new Date().getFullYear()}</p>

        <h2 className="text-2xl font-bold text-charcoal-900 mt-8 mb-3">
          Information We Collect
        </h2>
        <p className="text-charcoal-600 leading-relaxed mb-4">
          When you place an order, create an account, or contact us, we collect
          information such as your name, email address, phone number, and
          delivery address so we can fulfill and communicate about your order.
        </p>

        <h2 className="text-2xl font-bold text-charcoal-900 mt-8 mb-3">
          How We Use Your Information
        </h2>
        <p className="text-charcoal-600 leading-relaxed mb-4">
          We use your information to process orders, arrange delivery or
          pickup, respond to inquiries, and — only with your consent — send
          updates about new products or promotions.
        </p>

        <h2 className="text-2xl font-bold text-charcoal-900 mt-8 mb-3">
          Data Storage &amp; Security
        </h2>
        <p className="text-charcoal-600 leading-relaxed mb-4">
          Your data is stored securely and is never sold to third parties. We
          only share information with the services needed to fulfill your
          order, such as payment and delivery providers.
        </p>

        <h2 className="text-2xl font-bold text-charcoal-900 mt-8 mb-3">
          Contact Us
        </h2>
        <p className="text-charcoal-600 leading-relaxed">
          Questions about this policy? Reach out through our{' '}
          <a href="/contact" className="text-primary-500 hover:underline">
            contact page
          </a>
          .
        </p>
      </div>
    </main>
  )
}
