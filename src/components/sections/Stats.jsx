import { motion } from 'framer-motion'
import { stats } from '../../data/drones'
import AnimatedNumber from '../ui/AnimatedNumber'
import { useScrollAnimation, staggerContainer, staggerItem } from '../../hooks/useScrollAnimation'

// ========================================
// Stats Section
// ========================================

export default function Stats() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section className="py-20 md:py-28 bg-dark-900/50 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      {/* Gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="max-w-6xl mx-auto px-6 md:px-12"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={staggerItem}
              className="text-center"
            >
              <div className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
                <AnimatedNumber value={stat.value} />
              </div>
              <p className="text-white/50 text-sm md:text-base">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
