import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Truck, Tag } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { formatPrice } from '../../utils/helpers'

// ========================================
// Cart Sidebar Component
// Opens from the right side
// ========================================

export default function CartSidebar() {
  const { 
    items, 
    itemCount, 
    subtotal, 
    shipping, 
    total, 
    isOpen, 
    closeCart, 
    updateQuantity, 
    removeItem 
  } = useCart()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={closeCart}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-dark-900 z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <ShoppingBag size={24} className="text-accent" />
                <h2 className="font-display text-xl font-semibold text-white">
                  Panier
                </h2>
                {itemCount > 0 && (
                  <span className="px-2 py-0.5 bg-accent text-dark-900 text-sm font-bold rounded-full">
                    {itemCount}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={24} className="text-white/60" />
              </button>
            </div>

            {/* Cart Content */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                /* Empty State */
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <div className="w-20 h-20 mb-4 rounded-full bg-dark-800 flex items-center justify-center">
                    <ShoppingBag size={32} className="text-white/30" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-white mb-2">
                    Votre panier est vide
                  </h3>
                  <p className="text-white/50 text-sm mb-6">
                    Découvrez nos drones et ajoutez-les à votre panier.
                  </p>
                  <Link
                    to="/products"
                    onClick={closeCart}
                    className="btn-primary text-sm"
                  >
                    Voir les produits
                    <ArrowRight size={16} />
                  </Link>
                </div>
              ) : (
                /* Cart Items */
                <div className="p-4 space-y-4">
                  <AnimatePresence mode="popLayout">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        className="flex gap-4 p-3 bg-dark-800/50 rounded-xl border border-white/5"
                      >
                        {/* Image */}
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-dark-700 flex-shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start gap-2">
                            <div>
                              <h4 className="font-semibold text-white text-sm truncate">
                                {item.name}
                              </h4>
                              <p className="text-white/50 text-xs mt-0.5">
                                {item.tagline || item.description}
                              </p>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-1.5 text-white/40 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            {/* Quantity */}
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-7 h-7 rounded bg-dark-700 flex items-center justify-center text-white/60 hover:text-white hover:bg-dark-600 transition-colors"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="font-medium text-white text-sm w-8 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-7 h-7 rounded bg-dark-700 flex items-center justify-center text-white/60 hover:text-white hover:bg-dark-600 transition-colors"
                              >
                                <Plus size={12} />
                              </button>
                            </div>

                            {/* Price */}
                            <span className="font-display font-bold text-white">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Free shipping progress */}
                  {subtotal < 500 && (
                    <div className="p-4 bg-accent/10 rounded-xl border border-accent/20">
                      <div className="flex items-center gap-2 text-accent text-sm mb-2">
                        <Truck size={16} />
                        <span>
                          Plus que <strong>{formatPrice(500 - subtotal)}</strong> pour la livraison gratuite
                        </span>
                      </div>
                      <div className="w-full h-2 bg-dark-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min((subtotal / 500) * 100, 100)}%` }}
                          className="h-full bg-accent rounded-full"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-white/10 p-6 space-y-4 bg-dark-900">
                {/* Summary */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-white/60">
                    <span>Sous-total</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Livraison</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-green-400">Gratuite</span>
                      ) : (
                        formatPrice(shipping)
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-baseline border-t border-white/10 pt-4">
                  <span className="font-semibold text-white">Total</span>
                  <span className="font-display text-2xl font-bold text-white">
                    {formatPrice(total)}
                  </span>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <Link
                    to="/checkout"
                    onClick={closeCart}
                    className="btn-primary w-full justify-center"
                  >
                    Commander
                    <ArrowRight size={18} />
                  </Link>
                  <Link
                    to="/cart"
                    onClick={closeCart}
                    className="block text-center text-sm text-white/60 hover:text-white transition-colors"
                  >
                    Voir le panier complet
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
