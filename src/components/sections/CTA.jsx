import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Truck, Shield, Headphones } from 'lucide-react'

// ========================================
// CTA Section
// ========================================

const benefits = [
  { icon: Truck, text: 'Livraison gratuite en 48h' },
  { icon: Shield, text: 'Garantie 2 ans' },
  { icon: Headphones, text: 'Support 24/7' },
]

export default function CTA() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-800 via-dark-900 to-dark-950" />
      
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0,212,255,0.2) 0%, transparent 60%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-display-md font-bold text-white mb-6">
            Prêt à prendre votre envol ?
          </h2>
          
          <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto">
            Rejoignez les milliers de créateurs qui ont choisi Luca Drone pour capturer leurs plus beaux moments.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-lg"
              >
                Voir les drones
                <ArrowRight size={20} />
              </motion.button>
            </Link>
            
            <Link to="/about">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary"
              >
                Notre histoire
              </motion.button>
            </Link>
          </div>

          {/* Benefits */}
          <div className="flex flex-wrap items-center justify-center gap-8">
            {benefits.map((benefit) => (
              <div 
                key={benefit.text}
                className="flex items-center gap-2 text-white/60"
              >
                <benefit.icon size={18} className="text-accent" />
                <span className="text-sm">{benefit.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
