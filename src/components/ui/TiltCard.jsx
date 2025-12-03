import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

// ========================================
// Tilt Card Component
// 3D tilt effect on hover
// ========================================

export default function TiltCard({ 
  children, 
  className = '', 
  intensity = 15,
  perspective = 1000,
  scale = 1.02,
  speed = 500,
  glare = true,
  glareOpacity = 0.1,
}) {
  const cardRef = useRef(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY
    
    // Calculate rotation (inverted for natural feel)
    const rotationX = (mouseY / (rect.height / 2)) * -intensity
    const rotationY = (mouseX / (rect.width / 2)) * intensity
    
    setRotateX(rotationX)
    setRotateY(rotationY)

    // Calculate glare position
    const glareX = ((e.clientX - rect.left) / rect.width) * 100
    const glareY = ((e.clientY - rect.top) / rect.height) * 100
    setGlarePosition({ x: glareX, y: glareY })
  }

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    setRotateX(0)
    setRotateY(0)
    setGlarePosition({ x: 50, y: 50 })
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      style={{ 
        perspective: `${perspective}px`,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        animate={{
          rotateX: rotateX,
          rotateY: rotateY,
          scale: isHovering ? scale : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: speed,
          damping: 30,
        }}
        style={{ transformStyle: 'preserve-3d' }}
        className="w-full h-full"
      >
        {children}

        {/* Glare effect */}
        {glare && (
          <motion.div
            className="absolute inset-0 rounded-[inherit] pointer-events-none overflow-hidden"
            style={{ transform: 'translateZ(1px)' }}
            animate={{
              opacity: isHovering ? glareOpacity : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.3) 0%, transparent 60%)`,
              }}
            />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

// ========================================
// Simple Hover Lift Effect
// ========================================

export function HoverLift({ children, className = '', lift = 8 }) {
  return (
    <motion.div
      className={className}
      whileHover={{ 
        y: -lift,
        transition: { duration: 0.3, ease: 'easeOut' }
      }}
    >
      {children}
    </motion.div>
  )
}

// ========================================
// Magnetic Button Effect
// ========================================

export function MagneticButton({ children, className = '', strength = 0.3 }) {
  const buttonRef = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const deltaX = (e.clientX - centerX) * strength
    const deltaY = (e.clientY - centerY) * strength

    setPosition({ x: deltaX, y: deltaY })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={buttonRef}
      className={className}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  )
}
