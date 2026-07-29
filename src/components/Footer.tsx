import Image from 'next/image'

export function Footer() {
  return (
    <footer className="bg-primary-900">
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
            <p className="text-sm text-primary-200">
              Premium Greek yogurt and healthy snacks for a better life.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold text-white mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-primary-200">
              <li>
                <a href="/shop" className="hover:text-white transition">
                  All Products
                </a>
              </li>
              <li>
                <a href="/shop?category=yogurt" className="hover:text-white transition">
                  Greek Yogurt
                </a>
              </li>
              <li>
                <a href="/shop?category=slushies" className="hover:text-white transition">
                  Slushies
                </a>
              </li>
              <li>
                <a href="/shop?category=toppings" className="hover:text-white transition">
                  Toppings
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-primary-200">
              <li>
                <a href="/about" className="hover:text-white transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="/recipes" className="hover:text-white transition">
                  Recipes
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition">
                  Contact
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-white transition">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Visit Us */}
          <div>
            <h4 className="font-semibold text-white mb-4">Visit Us</h4>
            <address className="text-sm text-primary-200 not-italic leading-relaxed mb-3">
              Casa Mira South, Langtad
              <br />
              City of Naga, Cebu
            </address>
            <p className="text-sm text-primary-200">
              Open daily
              <br />
              7:00 AM – 11:00 AM
            </p>
          </div>
        </div>

        {/* Legal links */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-primary-200 border-t border-white/10 pt-8 mb-4">
          <a href="/privacy" className="hover:text-white transition">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:text-white transition">
            Terms of Service
          </a>
          <a href="/shipping" className="hover:text-white transition">
            Shipping Info
          </a>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8">
          <p className="text-sm text-primary-200 text-center">
            © {new Date().getFullYear()} Healthy Choices. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
