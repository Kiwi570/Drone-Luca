import { motion } from 'framer-motion'
import { Truck, Shield, RotateCcw, CreditCard, Headphones } from 'lucide-react'

// ========================================
// Benefit Bar Component
// Shows key benefits/trust signals
// ========================================

const benefits = [
  {
    icon: Truck,
    text: 'Livraison gratuite dès 300€',
    highlight: 'Gratuit',
  },
  {
    icon: Shield,
    text: 'Garantie 2 ans',
    highlight: '2 ans',
  },
  {
    icon: RotateCcw,
    text: 'Retour sous 30 jours',
    highlight: '30 jours',
  },
  {
    icon: CreditCard,
    text: 'Paiement en 3x sans frais',
    highlight: '3x',
  },
  {
    icon: Headphones,
    text: 'Support 24/7',
    highlight: '24/7',
  },
]

export default function BenefitBar() {
  return (
    <div className="benefit-bar py-3 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Desktop: Grid */}
        <div className="hidden md:flex items-center justify-between gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-2"
            >
              <benefit.icon size={16} className="text-accent" />
              <span className="text-white/60 text-sm">{benefit.text}</span>
            </motion.div>
          ))}
        </div>

        {/* Mobile: Scrolling marquee */}
        <div className="md:hidden relative">
          <motion.div
            className="flex gap-8 whitespace-nowrap"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {/* Duplicate for seamless loop */}
            {[...benefits, ...benefits].map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 flex-shrink-0">
                <benefit.icon size={14} className="text-accent" />
                <span className="text-white/60 text-xs">{benefit.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// ========================================
// Compact Benefit Strip (for product pages)
// ========================================

export function BenefitStrip() {
  const compactBenefits = [
    { icon: Truck, text: 'Livraison gratuite' },
    { icon: Shield, text: 'Garantie 2 ans' },
    { icon: RotateCcw, text: 'Retour 30j' },
  ]

  return (
    <div className="flex flex-wrap items-center gap-4 text-sm">
      {compactBenefits.map((benefit, index) => (
        <div key={index} className="flex items-center gap-1.5 text-white/50">
          <benefit.icon size={14} className="text-accent" />
          <span>{benefit.text}</span>
        </div>
      ))}
    </div>
  )
}
