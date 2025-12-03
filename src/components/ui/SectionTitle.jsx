import { motion } from 'framer-motion'
import { useScrollAnimation, fadeInUp } from '../../hooks/useScrollAnimation'

// ========================================
// Section Title Component
// ========================================

export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = 'center',
  className = '',
}) {
  const { ref, isInView } = useScrollAnimation()
  
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.1 }
        }
      }}
      className={`max-w-3xl ${alignmentClasses[align]} ${className}`}
    >
      {eyebrow && (
        <motion.span
          variants={fadeInUp}
          className="inline-block text-accent font-mono text-sm tracking-widest uppercase mb-4"
        >
          {eyebrow}
        </motion.span>
      )}
      
      <motion.h2
        variants={fadeInUp}
        className="font-display text-display-md font-bold text-white mb-6"
      >
        {title}
      </motion.h2>
      
      {description && (
        <motion.p
          variants={fadeInUp}
          className="text-lg text-white/60 leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  )
}
