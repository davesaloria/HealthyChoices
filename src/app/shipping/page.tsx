export const metadata = {
  title: 'Shipping & Delivery | Healthy Choices',
  description: 'Delivery, pickup, and storage information for Healthy Choices orders.',
}

export default function ShippingPage() {
  return (
    <main className="py-16">
      <div className="container mx-auto px-4 max-w-3xl prose prose-charcoal">
        <h1 className="text-4xl font-display font-bold text-charcoal-900 mb-8">
          Shipping &amp; Delivery
        </h1>

        <h2 className="text-2xl font-bold text-charcoal-900 mt-8 mb-3">Delivery</h2>
        <p className="text-charcoal-600 leading-relaxed mb-4">
          We currently deliver within Naga, Cebu. Choose a delivery window at
          checkout — we do our best to accommodate same-day requests, and yes,
          sometimes that means a delivery after dark.
        </p>

        <h2 className="text-2xl font-bold text-charcoal-900 mt-8 mb-3">
          Pickup
        </h2>
        <p className="text-charcoal-600 leading-relaxed mb-4">
          Daily pickup is available at Casa Mira South, Langtad, City of Naga,
          Cebu, from 7:00 AM to 11:00 AM.
        </p>

        <h2 className="text-2xl font-bold text-charcoal-900 mt-8 mb-3">
          Keeping It Fresh
        </h2>
        <p className="text-charcoal-600 leading-relaxed mb-4">
          Our yogurt and oats are perishable and best refrigerated
          immediately. Most products stay fresh for up to 10 days
          refrigerated; once opened, consume within 5 days.
        </p>

        <h2 className="text-2xl font-bold text-charcoal-900 mt-8 mb-3">
          Expanding Soon
        </h2>
        <p className="text-charcoal-600 leading-relaxed">
          We&apos;re working on delivery to more areas outside Naga — reach out
          through our{' '}
          <a href="/contact" className="text-primary-500 hover:underline">
            contact page
          </a>{' '}
          if you&apos;d like to be notified.
        </p>
      </div>
    </main>
  )
}
