'use client'

import { Card, CardContent } from '@/components/ui/Card'
import { motion } from 'framer-motion'

export default function FAQPage() {
  const faqs = [
    {
      question: 'How is Healthy Choices Greek yogurt made?',
      answer:
        'Our yogurt is made using traditional techniques with premium milk strained to remove whey, resulting in a thick, creamy texture rich in protein and probiotics.',
    },
    {
      question: 'What are the nutritional benefits?',
      answer:
        'Healthy Choices yogurt is high in protein (20g per 100g), contains live probiotic cultures for digestive health, and is low in sugar.',
    },
    {
      question: 'How long does it stay fresh?',
      answer:
        'Our yogurt stays fresh for up to 10 days when refrigerated at 2-4°C. Once opened, consume within 5 days.',
    },
    {
      question: 'Do you deliver outside Naga?',
      answer:
        "Currently, we deliver within Naga. We're expanding soon! Contact us for delivery inquiries to other locations.",
    },
    {
      question: 'Are your products suitable for dietary restrictions?',
      answer:
        "Yes! Our plain Greek yogurt is suitable for most diets. We're expanding our range with dairy-free and sugar-free options.",
    },
    {
      question: 'Can I place bulk orders?',
      answer:
        'Absolutely! We offer special pricing for bulk and corporate orders. Email us at hello@healthychoices.com for details.',
    },
  ]

  return (
    <main>
      {/* Header */}
      <section className="bg-gradient-to-b from-sage-50 to-white py-16 border-b border-charcoal-100">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-charcoal-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-charcoal-600">
            Find answers to common questions about our products and service
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                viewport={{ once: true }}
              >
                <Card className="hover:shadow-md transition-shadow cursor-pointer group">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-bold text-charcoal-900 mb-3 group-hover:text-primary-500 transition-colors">
                      {faq.question}
                    </h3>
                    <p className="text-charcoal-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
