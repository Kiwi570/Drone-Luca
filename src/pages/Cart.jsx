import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ShoppingBag, Trash2, Plus, Minus, ArrowRight, ArrowLeft, 
  Truck, Shield, CreditCard, Tag, X, Check, ChevronRight 
} from 'lucide-react'
import { pageTransition } from '../hooks/useScrollAnimation'
import { accessories, shippingOptions } from '../data/drones'
import { formatPrice } from '../utils/helpers'
import { useCart } from '../context/CartContext'
import Button from '../components/ui/Button'

// ========================================
// Cart Page
// ========================================

export default function Cart() {
  const { items, subtotal, updateQuantity, removeItem, addItem } = useCart()
  
  const [promoCode, setPromoCode] = useState('')
  const [appliedPromo, setAppliedPromo] = useState(null)
  const [selectedShipping, setSelectedShipping] = useState('standard')

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === 'LUCA10') {
      setAppliedPromo({ code: 'LUCA10', discount: 10, type: 'percent' })
    } else if (promoCode.toUpperCase() === 'DRONE50') {
      setAppliedPromo({ code: 'DRONE50', discount: 50, type: 'fixed' })
    }
  }

  const shippingCost = shippingOptions.find(s => s.id === selectedShipping)?.price || 0
  const promoDiscount = appliedPromo 
    ? (appliedPromo.type === 'percent' ? subtotal * (appliedPromo.discount / 100) : appliedPromo.discount)
    : 0
  const total = subtotal + shippingCost - promoDiscount

  const isEmpty = items.length === 0

  return (
    <motion.main
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      className="pt-28 pb-20 min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/products"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft size={18} />
            Continuer mes achats
          </Link>
          
          <div className="flex items-center justify-between">
            <h1 className="font-display text-4xl font-bold text-white">
              Votre panier
              {!isEmpty && (
                <span className="text-white/40 text-2xl ml-3">
                  ({items.reduce((sum, item) => sum + item.quantity, 0)} articles)
                </span>
              )}
            </h1>
          </div>
        </div>

        {isEmpty ? (
          /* Empty Cart State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-dark-800 flex items-center justify-center">
              <ShoppingBag size={40} className="text-white/30" />
            </div>
            <h2 className="font-display text-2xl font-semibold text-white mb-3">
              Votre panier est vide
            </h2>
            <p className="text-white/50 mb-8 max-w-md mx-auto">
              Découvrez nos drones et accessoires pour commencer votre aventure aérienne.
            </p>
            <Link to="/products">
              <Button variant="primary" icon={ArrowRight}>
                Découvrir nos drones
              </Button>
            </Link>
          </motion.div>
        ) : (
          /* Cart Content */
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-3 md:space-y-4">
              <AnimatePresence mode="popLayout">
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-dark-800/50 rounded-xl md:rounded-2xl p-4 md:p-5 border border-white/5 hover:border-white/10 transition-colors"
                  >
                    <div className="flex gap-3 md:gap-5">
                      {/* Product Image */}
                      <div className="w-20 h-20 md:w-28 md:h-28 rounded-lg md:rounded-xl overflow-hidden flex-shrink-0 bg-dark-700">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2 md:gap-4">
                          <div className="min-w-0">
                            <h3 className="font-display text-base md:text-xl font-semibold text-white truncate">
                              {item.name}
                            </h3>
                            <p className="text-white/50 text-xs md:text-sm mt-0.5 md:mt-1 line-clamp-1">
                              {item.tagline}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-1.5 md:p-2 text-white/40 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors flex-shrink-0"
                          >
                            <Trash2 size={16} className="md:w-[18px] md:h-[18px]" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-3 md:mt-4">
                          {/* Quantity */}
                          <div className="flex items-center gap-0.5 md:gap-1">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-dark-700 flex items-center justify-center text-white/60 hover:text-white hover:bg-dark-600 transition-colors"
                            >
                              <Minus size={14} className="md:w-4 md:h-4" />
                            </button>
                            <span className="font-semibold text-white w-8 md:w-12 text-center text-sm md:text-base">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-dark-700 flex items-center justify-center text-white/60 hover:text-white hover:bg-dark-600 transition-colors"
                            >
                              <Plus size={14} className="md:w-4 md:h-4" />
                            </button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <span className="font-display text-lg md:text-xl font-bold text-white">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                            {item.quantity > 1 && (
                              <p className="text-xs md:text-sm text-white/40">
                                {formatPrice(item.price)} / unité
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Promo Code */}
              <div className="bg-dark-800/30 rounded-2xl p-5 border border-white/5">
                <div className="flex items-center gap-2 mb-3">
                  <Tag size={18} className="text-accent" />
                  <span className="font-semibold text-white">Code promo</span>
                </div>
                
                {appliedPromo ? (
                  <div className="flex items-center justify-between bg-accent/10 border border-accent/30 rounded-xl px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Check size={18} className="text-accent" />
                      <span className="text-accent font-semibold">{appliedPromo.code}</span>
                      <span className="text-white/60">
                        (-{appliedPromo.type === 'percent' ? `${appliedPromo.discount}%` : formatPrice(appliedPromo.discount)})
                      </span>
                    </div>
                    <button 
                      onClick={() => setAppliedPromo(null)}
                      className="text-white/40 hover:text-white"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Entrez votre code"
                      className="flex-1 bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-accent/50 transition-colors"
                    />
                    <button
                      onClick={applyPromoCode}
                      className="px-5 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-semibold transition-colors"
                    >
                      Appliquer
                    </button>
                  </div>
                )}
                <p className="text-xs text-white/40 mt-2">
                  Essayez : LUCA10 ou DRONE50
                </p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-dark-800/50 rounded-2xl border border-white/5 sticky top-28 overflow-hidden">
                <div className="p-6">
                  <h2 className="font-display text-xl font-semibold text-white mb-6">
                    Récapitulatif
                  </h2>

                  {/* Shipping Options */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-white/70 mb-3">Livraison</h3>
                    <div className="space-y-2">
                      {shippingOptions.map((option) => (
                        <label
                          key={option.id}
                          className={`
                            flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all
                            ${selectedShipping === option.id 
                              ? 'border-accent bg-accent/10' 
                              : 'border-white/10 hover:border-white/20'
                            }
                          `}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="shipping"
                              value={option.id}
                              checked={selectedShipping === option.id}
                              onChange={() => setSelectedShipping(option.id)}
                              className="sr-only"
                            />
                            <div className={`
                              w-4 h-4 rounded-full border-2 flex items-center justify-center
                              ${selectedShipping === option.id ? 'border-accent' : 'border-white/30'}
                            `}>
                              {selectedShipping === option.id && (
                                <div className="w-2 h-2 rounded-full bg-accent" />
                              )}
                            </div>
                            <div>
                              <p className="text-white font-medium text-sm">{option.name}</p>
                              <p className="text-white/50 text-xs">{option.description}</p>
                            </div>
                          </div>
                          <span className="text-white font-semibold text-sm">
                            {option.price === 0 ? 'Gratuit' : formatPrice(option.price)}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Summary Lines */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-white/60">
                      <span>Sous-total</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-white/60">
                      <span>Livraison</span>
                      <span>
                        {shippingCost === 0 ? (
                          <span className="text-green-400">Gratuite</span>
                        ) : (
                          formatPrice(shippingCost)
                        )}
                      </span>
                    </div>
                    {appliedPromo && (
                      <div className="flex justify-between text-accent">
                        <span>Réduction ({appliedPromo.code})</span>
                        <span>-{formatPrice(promoDiscount)}</span>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-white/10 pt-4 mb-6">
                    <div className="flex justify-between items-baseline">
                      <span className="font-display font-semibold text-white">Total</span>
                      <div className="text-right">
                        <span className="font-display text-3xl font-bold text-white">
                          {formatPrice(total)}
                        </span>
                        <p className="text-xs text-white/40 mt-1">TVA incluse</p>
                      </div>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <Link to="/checkout">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full btn-primary justify-center text-base"
                    >
                      Passer commande
                      <ChevronRight size={18} />
                    </motion.button>
                  </Link>

                  {/* Payment methods */}
                  <div className="flex items-center justify-center gap-2 text-white/40 text-sm mt-4">
                    <CreditCard size={16} />
                    Paiement 100% sécurisé
                  </div>
                </div>

                {/* Benefits */}
                <div className="bg-dark-900/50 px-6 py-4 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-white/60">
                    <Truck size={16} className="text-accent flex-shrink-0" />
                    <span>Livraison gratuite dès 500€</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white/60">
                    <Shield size={16} className="text-accent flex-shrink-0" />
                    <span>Garantie 2 ans incluse</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white/60">
                    <ArrowLeft size={16} className="text-accent flex-shrink-0" />
                    <span>Retour gratuit sous 30 jours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recommendations */}
        {!isEmpty && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <h2 className="font-display text-2xl font-bold text-white mb-6">
              Complétez votre commande
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {accessories.slice(0, 6).map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    addItem({
                      id: item.id,
                      name: item.name,
                      tagline: item.description,
                      price: item.price,
                      image: item.image,
                    })
                  }}
                  className="bg-dark-800/30 rounded-xl p-4 border border-white/5 hover:border-accent/30 transition-all text-left"
                >
                  <div className="aspect-square rounded-lg overflow-hidden mb-3 bg-dark-700">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-white text-sm mb-1 line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-accent font-bold">
                    {formatPrice(item.price)}
                  </p>
                </motion.button>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </motion.main>
  )
}
