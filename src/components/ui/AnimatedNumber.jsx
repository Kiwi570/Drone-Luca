import { useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

// ========================================
// Animated Number Component
// Counts up from 0 to target when in view
// ========================================

export default function AnimatedNumber({
  value,
  suffix = '',
  prefix = '',
  duration = 2,
  className = '',
}) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  // Extract numeric value from string (e.g., "45 min" -> 45)
  const numericValue = typeof value === 'string' 
    ? parseFloat(value.replace(/[^0-9.]/g, ''))
    : value
  
  // Extract suffix from string if not provided
  const extractedSuffix = typeof value === 'string'
    ? value.replace(/[0-9.]/g, '').trim()
    : suffix

  useEffect(() => {
    if (!isInView) return

    const startTime = Date.now()
    const endTime = startTime + duration * 1000

    const animate = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / (duration * 1000), 1)
      
      // Easing function (ease-out-expo)
      const eased = 1 - Math.pow(2, -10 * progress)
      
      const current = Math.round(numericValue * eased)
      setDisplayValue(current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setDisplayValue(numericValue)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, numericValue, duration])

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      {prefix}{displayValue}{extractedSuffix || suffix}
    </motion.span>
  )
}
