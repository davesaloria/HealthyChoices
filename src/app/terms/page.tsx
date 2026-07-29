export const metadata = {
  title: 'Terms of Service | Healthy Choices',
  description: 'The terms governing orders and use of the Healthy Choices website.',
}

export default function TermsPage() {
  return (
    <main className="py-16">
      <div className="container mx-auto px-4 max-w-3xl prose prose-charcoal">
        <h1 className="text-4xl font-display font-bold text-charcoal-900 mb-8">
          Terms of Service
        </h1>
        <p className="text-charcoal-600 mb-6">Last updated: {new Date().getFullYear()}</p>

        <h2 className="text-2xl font-bold text-charcoal-900 mt-8 mb-3">Orders</h2>
        <p className="text-charcoal-600 leading-relaxed mb-4">
          All orders are subject to product availability. Because our Greek
          yogurt and oats are made fresh in small batches, order quantities and
          delivery windows may be limited on a given day.
        </p>

        <h2 className="text-2xl font-bold text-charcoal-900 mt-8 mb-3">
          Pricing &amp; Payment
        </h2>
        <p className="text-charcoal-600 leading-relaxed mb-4">
          Prices are listed in Philippine Peso (₱) and are inclusive of VAT
          unless otherwise stated. We accept GCash, card, and cash on delivery
          or pickup.
        </p>

        <h2 className="text-2xl font-bold text-charcoal-900 mt-8 mb-3">
          Delivery &amp; Pickup
        </h2>
        <p className="text-charcoal-600 leading-relaxed mb-4">
          Delivery is currently available within Naga, Cebu. Daily pickup is
          available at Casa Mira South, Langtad, City of Naga, Cebu, 7:00 AM –
          11:00 AM.
        </p>

        <h2 className="text-2xl font-bold text-charcoal-900 mt-8 mb-3">
          Product Storage
        </h2>
        <p className="text-charcoal-600 leading-relaxed">
          Our products are perishable and should be refrigerated immediately
          upon receipt. See individual product pages for storage and shelf-life
          details.
        </p>
      </div>
    </main>
  )
}
