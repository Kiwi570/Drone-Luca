import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, AlertCircle, Info, ShoppingCart } from 'lucide-react'

// ========================================
// Toast Notification Component
// Shows feedback notifications
// ========================================

const icons = {
  success: Check,
  error: AlertCircle,
  info: Info,
  cart: ShoppingCart,
}

const colors = {
  success: {
    bg: 'from-green-500/20 to-green-600/10',
    border: 'border-green-500/30',
    icon: 'text-green-400',
  },
  error: {
    bg: 'from-red-500/20 to-red-600/10',
    border: 'border-red-500/30',
    icon: 'text-red-400',
  },
  info: {
    bg: 'from-accent/20 to-accent/10',
    border: 'border-accent/30',
    icon: 'text-accent',
  },
  cart: {
    bg: 'from-accent/20 to-purple-500/10',
    border: 'border-accent/30',
    icon: 'text-accent',
  },
}

export default function ToastNotification({ 
  notification, 
  onClose 
}) {
  if (!notification) return null

  const { message, type = 'success' } = notification
  const Icon = icons[type] || Check
  const colorScheme = colors[type] || colors.success

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: -50, x: '-50%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className={`
            fixed top-24 left-1/2 z-50
            flex items-center gap-3 px-5 py-3
            bg-gradient-to-r ${colorScheme.bg}
            backdrop-blur-xl rounded-full
            border ${colorScheme.border}
            shadow-lg
          `}
        >
          <div className={`p-1 rounded-full bg-dark-900/50 ${colorScheme.icon}`}>
            <Icon size={16} />
          </div>
          <span className="text-white font-medium text-sm pr-2">
            {message}
          </span>
          <button
            onClick={onClose}
            className="p-1 text-white/40 hover:text-white transition-colors"
          >
            <X size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ========================================
// Confetti Effect on Success
// ========================================

export function ConfettiEffect({ trigger }) {
  if (!trigger) return null

  const confetti = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * window.innerWidth,
    delay: Math.random() * 0.5,
    color: ['#00D4FF', '#A855F7', '#EC4899', '#10B981', '#FBBF24'][
      Math.floor(Math.random() * 5)
    ],
  }))

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {confetti.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: particle.x,
            top: -10,
            backgroundColor: particle.color,
          }}
          initial={{ y: 0, opacity: 1, rotate: 0 }}
          animate={{
            y: window.innerHeight + 100,
            opacity: [1, 1, 0],
            rotate: Math.random() * 720,
            x: (Math.random() - 0.5) * 200,
          }}
          transition={{
            duration: 2 + Math.random(),
            delay: particle.delay,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  )
}
