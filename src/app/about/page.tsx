'use client'

import { motion } from 'framer-motion'

export default function AboutPage() {
  return (
    <main>
      {/* Header */}
      <section className="bg-gradient-to-b from-sage-50 to-white py-16 border-b border-charcoal-100">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-charcoal-900 mb-4">
            Our Story
          </h1>
          <p className="text-lg text-charcoal-600 max-w-2xl mx-auto">
            Crafting wellness, one spoonful at a time
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-sage-100 to-primary-100 rounded-2xl aspect-square flex items-center justify-center">
                <span className="text-8xl">🥣</span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-display font-bold text-charcoal-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-charcoal-600 mb-4 leading-relaxed">
                At Healthy Choices, we believe that wellness should taste incredible. We started
                with a simple mission: to bring premium, homemade Greek yogurt to every table,
                making healthy eating effortless and joyful.
              </p>
              <p className="text-lg text-charcoal-600 leading-relaxed">
                Every batch is crafted with love, using only the finest ingredients and traditional
                techniques. We're not just making yogurt—we're creating a lifestyle choice for
                those who value their health and happiness.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-sage-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-display font-bold text-charcoal-900 mb-12 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Quality First',
                description: 'We never compromise on ingredients or process',
                icon: '⭐',
              },
              {
                title: 'Sustainability',
                description: 'Caring for our planet and communities',
                icon: '🌿',
              },
              {
                title: 'Transparency',
                description: 'You always know what goes into our products',
                icon: '👁️',
              },
            ].map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-2xl font-bold text-charcoal-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-charcoal-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
