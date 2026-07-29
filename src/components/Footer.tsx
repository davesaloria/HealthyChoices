import Image from 'next/image'

export function Footer() {
  return (
    <footer className="border-t border-charcoal-100 bg-charcoal-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Image
              src="/images/logo.jpg"
              alt="Healthy Choices"
              width={56}
              height={56}
              className="rounded-full object-cover mb-4"
            />
            <p className="text-sm text-charcoal-600">
              Premium Greek yogurt and healthy snacks for a better life.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold text-charcoal-900 mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-charcoal-600">
              <li>
                <a href="/shop" className="hover:text-primary-500 transition">
                  All Products
                </a>
              </li>
              <li>
                <a href="/shop?category=yogurt" className="hover:text-primary-500 transition">
                  Greek Yogurt
                </a>
              </li>
              <li>
                <a href="/shop?category=slushies" className="hover:text-primary-500 transition">
                  Slushies
                </a>
              </li>
              <li>
                <a href="/shop?category=toppings" className="hover:text-primary-500 transition">
                  Toppings
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-charcoal-900 mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-charcoal-600">
              <li>
                <a href="/about" className="hover:text-primary-500 transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="/recipes" className="hover:text-primary-500 transition">
                  Recipes
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-primary-500 transition">
                  Contact
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-primary-500 transition">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Visit Us */}
          <div>
            <h4 className="font-semibold text-charcoal-900 mb-4">Visit Us</h4>
            <address className="text-sm text-charcoal-600 not-italic leading-relaxed mb-3">
              Casa Mira South, Langtad
              <br />
              City of Naga, Cebu
            </address>
            <p className="text-sm text-charcoal-600">
              Open daily
              <br />
              7:00 AM – 11:00 AM
            </p>
          </div>
        </div>

        {/* Legal links */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-charcoal-600 border-t border-charcoal-200 pt-8 mb-4">
          <a href="/privacy" className="hover:text-primary-500 transition">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:text-primary-500 transition">
            Terms of Service
          </a>
          <a href="/shipping" className="hover:text-primary-500 transition">
            Shipping Info
          </a>
        </div>

        {/* Bottom */}
        <div className="border-t border-charcoal-200 pt-8">
          <p className="text-sm text-charcoal-600 text-center">
            © {new Date().getFullYear()} Healthy Choices. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
