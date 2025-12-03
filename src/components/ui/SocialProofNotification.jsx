import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, Clock } from 'lucide-react'
import { drones } from '../../data/drones'

// ========================================
// Social Proof Notification Component
// Shows recent purchases to create FOMO
// ========================================

// Fake names for social proof
const fakeNames = [
  'Thomas P.', 'Marie L.', 'Pierre D.', 'Sophie M.', 'Lucas B.',
  'Emma R.', 'Hugo G.', 'Léa V.', 'Nathan C.', 'Chloé F.',
  'Maxime T.', 'Camille H.', 'Alexandre S.', 'Julie N.', 'Antoine W.',
]

// Fake cities
const fakeCities = [
  'Paris', 'Lyon', 'Marseille', 'Bordeaux', 'Toulouse',
  'Nantes', 'Nice', 'Strasbourg', 'Montpellier', 'Lille',
]

// Time ago options
const timeAgo = [
  'il y a 2 minutes',
  'il y a 5 minutes',
  'il y a 8 minutes',
  'il y a 12 minutes',
  'il y a 15 minutes',
]

export default function SocialProofNotification() {
  const [notification, setNotification] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show first notification after 10 seconds
    const initialTimeout = setTimeout(() => {
      showRandomNotification()
    }, 10000)

    // Then show every 30-60 seconds
    const interval = setInterval(() => {
      showRandomNotification()
    }, Math.random() * 30000 + 30000)

    return () => {
      clearTimeout(initialTimeout)
      clearInterval(interval)
    }
  }, [])

  const showRandomNotification = () => {
    const randomProduct = drones[Math.floor(Math.random() * drones.length)]
    const randomName = fakeNames[Math.floor(Math.random() * fakeNames.length)]
    const randomCity = fakeCities[Math.floor(Math.random() * fakeCities.length)]
    const randomTime = timeAgo[Math.floor(Math.random() * timeAgo.length)]

    setNotification({
      name: randomName,
      city: randomCity,
      product: randomProduct,
      time: randomTime,
    })
    setIsVisible(true)

    // Hide after 5 seconds
    setTimeout(() => {
      setIsVisible(false)
    }, 5000)
  }

  const handleClose = () => {
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && notification && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: 0 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 50, x: -20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="social-proof"
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 p-1 text-white/40 hover:text-white transition-colors"
          >
            <X size={14} />
          </button>

          <div className="flex gap-3">
            {/* Product image */}
            <div className="w-14 h-14 rounded-lg overflow-hidden bg-dark-700 flex-shrink-0">
              <img 
                src={notification.product.image} 
                alt={notification.product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 pr-4">
              <p className="text-white text-sm font-medium">
                {notification.name}
                <span className="text-white/50 font-normal"> de </span>
                {notification.city}
              </p>
              <p className="text-white/70 text-xs mt-0.5">
                a acheté <span className="text-accent font-medium">{notification.product.name}</span>
              </p>
              <div className="flex items-center gap-1 mt-1.5 text-white/40 text-xs">
                <Clock size={10} />
                {notification.time}
              </div>
            </div>
          </div>

          {/* Verified badge */}
          <div className="flex items-center gap-1 mt-2 pt-2 border-t border-white/5 text-xs text-white/40">
            <ShoppingBag size={10} />
            Achat vérifié
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
