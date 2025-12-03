import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, CreditCard, Truck, Shield, Check, Lock,
  User, Mail, Phone, MapPin, Building, ChevronRight,
  Package, CheckCircle2
} from 'lucide-react'
import { pageTransition } from '../hooks/useScrollAnimation'
import { drones, accessories } from '../data/drones'
import { formatPrice } from '../utils/helpers'

// ========================================
// Checkout Page - E-commerce Visual
// ========================================

const steps = [
  { id: 1, name: 'Informations', icon: User },
  { id: 2, name: 'Livraison', icon: Truck },
  { id: 3, name: 'Paiement', icon: CreditCard },
  { id: 4, name: 'Confirmation', icon: Check },
]

export default function Checkout() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'France',
    shippingMethod: 'express',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    cardName: '',
  })
  const [isProcessing, setIsProcessing] = useState(false)

  // Demo order items
  const orderItems = [
    { ...drones[1], quantity: 1 },
    { ...accessories[2], quantity: 2 },
  ]

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = formData.shippingMethod === 'express' ? 9.90 : 0
  const total = subtotal + shipping

  const updateForm = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const processPayment = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setCurrentStep(4)
    }, 2000)
  }

  return (
    <motion.main
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      className="pt-28 pb-20 min-h-screen"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/cart"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft size={18} />
            Retour au panier
          </Link>
          
          <h1 className="font-display text-4xl font-bold text-white">
            Checkout
          </h1>
        </div>

        {/* Progress Steps */}
        <div className="mb-8 md:mb-12 overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0 scrollbar-hide">
          <div className="flex items-center justify-between min-w-[400px] md:min-w-0 max-w-2xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div 
                    className={`
                      w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all
                      ${currentStep > step.id 
                        ? 'bg-accent text-dark-900' 
                        : currentStep === step.id 
                          ? 'bg-accent/20 border-2 border-accent text-accent'
                          : 'bg-dark-800 text-white/40'
                      }
                    `}
                  >
                    {currentStep > step.id ? (
                      <Check size={18} />
                    ) : (
                      <step.icon size={18} />
                    )}
                  </div>
                  <span className={`
                    text-[10px] md:text-xs mt-1.5 md:mt-2 font-medium whitespace-nowrap
                    ${currentStep >= step.id ? 'text-white' : 'text-white/40'}
                  `}>
                    {step.name}
                  </span>
                </div>
                
                {index < steps.length - 1 && (
                  <div 
                    className={`
                      w-8 sm:w-12 md:w-24 h-0.5 mx-1 md:mx-2 transition-all
                      ${currentStep > step.id ? 'bg-accent' : 'bg-dark-700'}
                    `}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* Step 1: Informations */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-dark-800/50 rounded-2xl p-6 border border-white/5"
                >
                  <h2 className="font-display text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <User size={20} className="text-accent" />
                    Vos informations
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Email *</label>
                      <div className="relative">
                        <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateForm('email', e.target.value)}
                          placeholder="votre@email.com"
                          className="w-full bg-dark-700 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-accent/50"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-white/60 mb-2">Prénom *</label>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => updateForm('firstName', e.target.value)}
                          placeholder="Jean"
                          className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-accent/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-white/60 mb-2">Nom *</label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => updateForm('lastName', e.target.value)}
                          placeholder="Dupont"
                          className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-accent/50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-white/60 mb-2">Téléphone *</label>
                      <div className="relative">
                        <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => updateForm('phone', e.target.value)}
                          placeholder="+33 6 12 34 56 78"
                          className="w-full bg-dark-700 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-accent/50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-white/60 mb-2">Adresse *</label>
                      <div className="relative">
                        <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                        <input
                          type="text"
                          value={formData.address}
                          onChange={(e) => updateForm('address', e.target.value)}
                          placeholder="123 Rue de la Paix"
                          className="w-full bg-dark-700 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-accent/50"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-white/60 mb-2">Ville *</label>
                        <div className="relative">
                          <Building size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                          <input
                            type="text"
                            value={formData.city}
                            onChange={(e) => updateForm('city', e.target.value)}
                            placeholder="Paris"
                            className="w-full bg-dark-700 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-accent/50"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-white/60 mb-2">Code postal *</label>
                        <input
                          type="text"
                          value={formData.postalCode}
                          onChange={(e) => updateForm('postalCode', e.target.value)}
                          placeholder="75001"
                          className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-accent/50"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={nextStep}
                    className="w-full btn-primary justify-center mt-6"
                  >
                    Continuer vers la livraison
                    <ChevronRight size={18} />
                  </button>
                </motion.div>
              )}

              {/* Step 2: Shipping */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-dark-800/50 rounded-2xl p-6 border border-white/5"
                >
                  <h2 className="font-display text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <Truck size={20} className="text-accent" />
                    Mode de livraison
                  </h2>

                  <div className="space-y-3">
                    <label
                      className={`
                        flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all
                        ${formData.shippingMethod === 'standard' 
                          ? 'border-accent bg-accent/10' 
                          : 'border-white/10 hover:border-white/20'
                        }
                      `}
                    >
                      <div className="flex items-center gap-4">
                        <input
                          type="radio"
                          name="shipping"
                          value="standard"
                          checked={formData.shippingMethod === 'standard'}
                          onChange={() => updateForm('shippingMethod', 'standard')}
                          className="sr-only"
                        />
                        <div className={`
                          w-5 h-5 rounded-full border-2 flex items-center justify-center
                          ${formData.shippingMethod === 'standard' ? 'border-accent' : 'border-white/30'}
                        `}>
                          {formData.shippingMethod === 'standard' && (
                            <div className="w-2.5 h-2.5 rounded-full bg-accent" />
                          )}
                        </div>
                        <div>
                          <p className="text-white font-semibold">Livraison Standard</p>
                          <p className="text-white/50 text-sm">3-5 jours ouvrés</p>
                        </div>
                      </div>
                      <span className="text-green-400 font-semibold">Gratuit</span>
                    </label>

                    <label
                      className={`
                        flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all
                        ${formData.shippingMethod === 'express' 
                          ? 'border-accent bg-accent/10' 
                          : 'border-white/10 hover:border-white/20'
                        }
                      `}
                    >
                      <div className="flex items-center gap-4">
                        <input
                          type="radio"
                          name="shipping"
                          value="express"
                          checked={formData.shippingMethod === 'express'}
                          onChange={() => updateForm('shippingMethod', 'express')}
                          className="sr-only"
                        />
                        <div className={`
                          w-5 h-5 rounded-full border-2 flex items-center justify-center
                          ${formData.shippingMethod === 'express' ? 'border-accent' : 'border-white/30'}
                        `}>
                          {formData.shippingMethod === 'express' && (
                            <div className="w-2.5 h-2.5 rounded-full bg-accent" />
                          )}
                        </div>
                        <div>
                          <p className="text-white font-semibold">Livraison Express</p>
                          <p className="text-white/50 text-sm">24-48h</p>
                        </div>
                      </div>
                      <span className="text-white font-semibold">{formatPrice(9.90)}</span>
                    </label>

                    <label
                      className={`
                        flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all
                        ${formData.shippingMethod === 'priority' 
                          ? 'border-accent bg-accent/10' 
                          : 'border-white/10 hover:border-white/20'
                        }
                      `}
                    >
                      <div className="flex items-center gap-4">
                        <input
                          type="radio"
                          name="shipping"
                          value="priority"
                          checked={formData.shippingMethod === 'priority'}
                          onChange={() => updateForm('shippingMethod', 'priority')}
                          className="sr-only"
                        />
                        <div className={`
                          w-5 h-5 rounded-full border-2 flex items-center justify-center
                          ${formData.shippingMethod === 'priority' ? 'border-accent' : 'border-white/30'}
                        `}>
                          {formData.shippingMethod === 'priority' && (
                            <div className="w-2.5 h-2.5 rounded-full bg-accent" />
                          )}
                        </div>
                        <div>
                          <p className="text-white font-semibold">Livraison Prioritaire</p>
                          <p className="text-white/50 text-sm">Demain avant 13h</p>
                        </div>
                      </div>
                      <span className="text-white font-semibold">{formatPrice(19.90)}</span>
                    </label>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={prevStep}
                      className="btn-secondary flex-1 justify-center"
                    >
                      <ArrowLeft size={18} />
                      Retour
                    </button>
                    <button
                      onClick={nextStep}
                      className="btn-primary flex-1 justify-center"
                    >
                      Continuer
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Payment */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-dark-800/50 rounded-2xl p-6 border border-white/5"
                >
                  <h2 className="font-display text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <CreditCard size={20} className="text-accent" />
                    Paiement sécurisé
                  </h2>

                  {/* Payment Methods */}
                  <div className="flex gap-3 mb-6">
                    <div className="flex-1 p-3 bg-white/10 rounded-xl border-2 border-accent flex items-center justify-center gap-2">
                      <CreditCard size={20} className="text-white" />
                      <span className="text-white font-medium text-sm">Carte bancaire</span>
                    </div>
                    <div className="flex-1 p-3 bg-dark-700 rounded-xl border border-white/10 flex items-center justify-center gap-2 opacity-50">
                      <span className="text-white font-medium text-sm">PayPal</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Numéro de carte *</label>
                      <div className="relative">
                        <CreditCard size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                        <input
                          type="text"
                          value={formData.cardNumber}
                          onChange={(e) => updateForm('cardNumber', e.target.value)}
                          placeholder="1234 5678 9012 3456"
                          className="w-full bg-dark-700 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-accent/50"
                        />
                        <Lock size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-accent" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-white/60 mb-2">Nom sur la carte *</label>
                      <input
                        type="text"
                        value={formData.cardName}
                        onChange={(e) => updateForm('cardName', e.target.value)}
                        placeholder="JEAN DUPONT"
                        className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-accent/50 uppercase"
                      />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-white/60 mb-2">Expiration *</label>
                        <input
                          type="text"
                          value={formData.cardExpiry}
                          onChange={(e) => updateForm('cardExpiry', e.target.value)}
                          placeholder="MM/AA"
                          className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-accent/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-white/60 mb-2">CVC *</label>
                        <input
                          type="text"
                          value={formData.cardCvc}
                          onChange={(e) => updateForm('cardCvc', e.target.value)}
                          placeholder="123"
                          className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-accent/50"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Security badges */}
                  <div className="flex items-center justify-center gap-4 mt-6 py-4 border-t border-white/10">
                    <div className="flex items-center gap-1 text-white/40 text-xs">
                      <Lock size={14} />
                      SSL 256-bit
                    </div>
                    <div className="flex items-center gap-1 text-white/40 text-xs">
                      <Shield size={14} />
                      3D Secure
                    </div>
                  </div>

                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={prevStep}
                      className="btn-secondary flex-1 justify-center"
                    >
                      <ArrowLeft size={18} />
                      Retour
                    </button>
                    <button
                      onClick={processPayment}
                      disabled={isProcessing}
                      className="btn-primary flex-1 justify-center"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-5 h-5 border-2 border-dark-900/30 border-t-dark-900 rounded-full animate-spin" />
                          Traitement...
                        </>
                      ) : (
                        <>
                          Payer {formatPrice(total)}
                          <Lock size={16} />
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Confirmation */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-dark-800/50 rounded-2xl p-8 border border-white/5 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center"
                  >
                    <CheckCircle2 size={40} className="text-green-500" />
                  </motion.div>

                  <h2 className="font-display text-3xl font-bold text-white mb-2">
                    Commande confirmée !
                  </h2>
                  <p className="text-white/60 mb-6">
                    Merci pour votre achat. Votre commande #AERO-2025-{Math.random().toString(36).substr(2, 6).toUpperCase()} a été confirmée.
                  </p>

                  <div className="bg-dark-900/50 rounded-xl p-4 mb-6 text-left">
                    <div className="flex items-center gap-3 text-white/60 text-sm">
                      <Package size={18} className="text-accent" />
                      <span>Livraison estimée : <strong className="text-white">3-5 jours ouvrés</strong></span>
                    </div>
                  </div>

                  <p className="text-sm text-white/50 mb-6">
                    Un email de confirmation a été envoyé à <strong className="text-white">{formData.email || 'votre@email.com'}</strong>
                  </p>

                  <div className="flex gap-3">
                    <Link to="/products" className="btn-secondary flex-1 justify-center">
                      Continuer mes achats
                    </Link>
                    <Link to="/" className="btn-primary flex-1 justify-center">
                      Retour à l'accueil
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          {currentStep < 4 && (
            <div className="lg:col-span-1">
              <div className="bg-dark-800/50 rounded-2xl border border-white/5 sticky top-28 overflow-hidden">
                <div className="p-6">
                  <h3 className="font-display text-lg font-semibold text-white mb-4">
                    Votre commande
                  </h3>

                  <div className="space-y-4 mb-6">
                    {orderItems.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-dark-700 flex-shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium text-sm truncate">{item.name}</p>
                          <p className="text-white/50 text-xs">Qté: {item.quantity}</p>
                          <p className="text-accent font-semibold text-sm mt-1">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 text-sm border-t border-white/10 pt-4">
                    <div className="flex justify-between text-white/60">
                      <span>Sous-total</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-white/60">
                      <span>Livraison</span>
                      <span>{shipping === 0 ? 'Gratuit' : formatPrice(shipping)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-baseline border-t border-white/10 pt-4 mt-4">
                    <span className="font-semibold text-white">Total</span>
                    <span className="font-display text-2xl font-bold text-white">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                <div className="bg-dark-900/50 px-6 py-4">
                  <div className="flex items-center gap-2 text-xs text-white/50">
                    <Lock size={14} className="text-accent" />
                    Paiement 100% sécurisé
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.main>
  )
}
