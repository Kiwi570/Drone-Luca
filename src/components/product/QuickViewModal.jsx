import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, ShoppingCart, Check, Star, Minus, Plus, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useUI } from '../../context/UIContext'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { formatPrice, calculateDiscount } from '../../utils/helpers'

// ========================================
// Quick View Modal Component
// Preview product without leaving page
// ========================================

export default function QuickViewModal() {
  const { quickViewProduct: product, isQuickViewOpen, closeQuickView } = useUI()
  const { addItem } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()
  
  const [quantity, setQuantity] = useState(1)
  const [justAdded, setJustAdded] = useState(false)

  if (!product) return null

  const discount = calculateDiscount(product.originalPrice, product.price)
  const inWishlist = isInWishlist(product.id)

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      tagline: product.tagline,
      price: product.price,
      image: product.image,
      color: product.color,
    }, quantity)
    
    setJustAdded(true)
    setTimeout(() => {
      setJustAdded(false)
      closeQuickView()
    }, 1500)
  }

  return (
    <AnimatePresence>
      {isQuickViewOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="modal-backdrop"
            onClick={closeQuickView}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="modal-content w-[95%] max-w-4xl p-0"
          >
            {/* Close button */}
            <button
              onClick={closeQuickView}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-dark-800/80 text-white/60 hover:text-white hover:bg-dark-700 transition-all"
            >
              <X size={20} />
            </button>

            <div className="grid md:grid-cols-2 gap-0">
              {/* Image Section */}
              <div className="relative aspect-square md:aspect-auto">
                <div 
                  className="absolute inset-0 opacity-30"
                  style={{ 
                    background: `linear-gradient(135deg, ${product.color}30 0%, transparent 50%)` 
                  }}
                />
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {product.badge && (
                    <span 
                      className="badge"
                      style={{ backgroundColor: product.color, color: '#050816' }}
                    >
                      {product.badge}
                    </span>
                  )}
                  {discount > 0 && (
                    <span className="badge bg-red-500 text-white">
                      -{discount}%
                    </span>
                  )}
                </div>

                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`absolute top-4 right-4 p-3 rounded-full bg-dark-900/60 backdrop-blur-sm transition-all heart-btn ${inWishlist ? 'active' : ''}`}
                >
                  <Heart 
                    size={20} 
                    className={inWishlist ? 'fill-current' : ''} 
                  />
                </button>
              </div>

              {/* Info Section */}
              <div className="p-6 md:p-8 flex flex-col">
                {/* Rating */}
                {product.rating && (
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          className={i < Math.floor(product.rating) 
                            ? 'star-filled fill-current' 
                            : 'star-empty'
                          }
                        />
                      ))}
                    </div>
                    <span className="text-white/50 text-sm">
                      {product.rating} ({product.reviewCount} avis)
                    </span>
                  </div>
                )}

                {/* Title */}
                <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
                  {product.name}
                </h2>
                <p className="text-white/60 mb-4">{product.tagline}</p>

                {/* Short description */}
                <p className="text-white/50 text-sm mb-4 line-clamp-3">
                  {product.longDescription || product.description}
                </p>

                {/* Key specs */}
                {product.specs && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 bg-dark-700/50 rounded-full text-xs text-white/70">
                      📷 {product.specs.camera}
                    </span>
                    <span className="px-3 py-1 bg-dark-700/50 rounded-full text-xs text-white/70">
                      ⏱️ {product.specs.flightTime}
                    </span>
                    <span className="px-3 py-1 bg-dark-700/50 rounded-full text-xs text-white/70">
                      📡 {product.specs.range}
                    </span>
                  </div>
                )}

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="font-display text-3xl font-bold text-white">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-white/40 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Quantity & Add to Cart */}
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Quantity */}
                  <div className="flex items-center gap-2 bg-dark-700/50 rounded-xl p-1 self-start">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-dark-600 transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center font-semibold text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-dark-600 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  {/* Add to Cart */}
                  <motion.button
                    onClick={handleAddToCart}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all
                      ${justAdded 
                        ? 'bg-green-500 text-white' 
                        : 'bg-accent text-dark-900 hover:shadow-glow'
                      }
                    `}
                  >
                    {justAdded ? (
                      <>
                        <Check size={18} />
                        Ajouté !
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={18} />
                        Ajouter au panier
                      </>
                    )}
                  </motion.button>
                </div>

                {/* View full details link */}
                <Link 
                  to={`/product/${product.id}`}
                  onClick={closeQuickView}
                  className="mt-4 flex items-center justify-center gap-2 text-sm text-white/50 hover:text-accent transition-colors"
                >
                  Voir tous les détails
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
