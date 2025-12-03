import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Heart, ShoppingCart, Check, Star, Minus, Plus, Truck, Shield, RotateCcw, ChevronRight, Package, Zap } from 'lucide-react'
import { drones } from '../data/drones'
import { formatPrice, calculateDiscount } from '../utils/helpers'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import ProductCard from '../components/product/ProductCard'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()

  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [justAdded, setJustAdded] = useState(false)
  const [activeTab, setActiveTab] = useState('specs')

  const product = drones.find(d => d.id === id)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-white mb-4">Produit non trouvé</h1>
          <Link to="/products" className="btn-primary">Voir tous les drones</Link>
        </div>
      </div>
    )
  }

  const discount = calculateDiscount(product.originalPrice, product.price)
  const inWishlist = isInWishlist(product.id)
  const images = [product.image, product.hoverImage].filter(Boolean)
  const relatedProducts = drones.filter(d => d.category === product.category && d.id !== product.id).slice(0, 3)

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
    setTimeout(() => setJustAdded(false), 2000)
  }

  return (
    <main className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Breadcrumb */}
        <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-sm mb-8">
          <Link to="/" className="text-white/50 hover:text-white">Accueil</Link>
          <ChevronRight size={14} className="text-white/30" />
          <Link to="/products" className="text-white/50 hover:text-white">Drones</Link>
          <ChevronRight size={14} className="text-white/30" />
          <span className="text-accent">{product.name}</span>
        </motion.nav>

        {/* Product Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          
          {/* Images */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-dark-800 mb-4">
              <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${product.color}20 0%, transparent 50%)` }} />
              <img src={images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                {product.badge && <span className="badge" style={{ backgroundColor: product.color, color: '#050816' }}>{product.badge}</span>}
                {discount > 0 && <span className="badge bg-red-500 text-white">-{discount}%</span>}
              </div>

              {/* Stock warning */}
              {product.stockCount && product.stockCount < 10 && (
                <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-2 bg-warm/90 backdrop-blur-sm rounded-lg text-white text-sm font-medium">
                  <Zap size={14} /> Plus que {product.stockCount} en stock !
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === i ? 'border-accent' : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col">
            
            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={i < Math.floor(product.rating) ? 'star-filled fill-current' : 'star-empty'} />
                  ))}
                </div>
                <span className="text-white/60 text-sm">{product.rating} ({product.reviewCount} avis)</span>
              </div>
            )}

            {/* Title */}
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">{product.name}</h1>
            <p className="text-white/60 text-lg mb-4">{product.tagline}</p>
            <p className="text-white/50 mb-6">{product.longDescription || product.description}</p>

            {/* Highlights */}
            {product.highlights && (
              <ul className="space-y-2 mb-6">
                {product.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                    <Check size={16} className="text-accent mt-0.5 flex-shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-display text-4xl font-bold text-white">{formatPrice(product.price)}</span>
              {product.originalPrice && <span className="text-xl text-white/40 line-through">{formatPrice(product.originalPrice)}</span>}
            </div>

            {/* Benefits */}
            <div className="flex flex-wrap gap-4 mb-6 pb-6 border-b border-white/10">
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Truck size={16} className="text-accent" /> Livraison gratuite
              </div>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Shield size={16} className="text-accent" /> Garantie 2 ans
              </div>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <RotateCcw size={16} className="text-accent" /> Retour 30 jours
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              {/* Quantity */}
              <div className="flex items-center gap-2 bg-dark-800 rounded-xl p-1">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-dark-700">
                  <Minus size={18} />
                </button>
                <span className="w-10 text-center font-semibold text-white">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-dark-700">
                  <Plus size={18} />
                </button>
              </div>

              {/* Add to Cart */}
              <motion.button
                onClick={handleAddToCart}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold transition-all ${
                  justAdded ? 'bg-green-500 text-white' : 'bg-accent text-dark-900 hover:shadow-glow'
                }`}
              >
                {justAdded ? <><Check size={20} /> Ajouté !</> : <><ShoppingCart size={20} /> Ajouter au panier</>}
              </motion.button>

              {/* Wishlist */}
              <motion.button
                onClick={() => toggleWishlist(product)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-14 h-14 rounded-xl flex items-center justify-center border transition-all ${
                  inWishlist ? 'bg-magenta/20 border-magenta text-magenta' : 'bg-dark-800 border-white/10 text-white/60 hover:text-white'
                }`}
              >
                <Heart size={22} className={inWishlist ? 'fill-current' : ''} />
              </motion.button>
            </div>

            {/* Stock status */}
            <div className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400">En stock</span>
              {product.stockCount && <span className="text-white/40">({product.stockCount} disponibles)</span>}
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
          <div className="flex gap-1 mb-6 border-b border-white/10">
            {[
              { id: 'specs', name: 'Caractéristiques' },
              { id: 'features', name: 'Fonctionnalités' },
              { id: 'includes', name: 'Contenu du pack' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 text-sm font-medium transition-colors relative ${
                  activeTab === tab.id ? 'text-accent' : 'text-white/50 hover:text-white'
                }`}
              >
                {tab.name}
                {activeTab === tab.id && (
                  <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
                )}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'specs' && product.specs && (
              <motion.div key="specs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="card-feature">
                    <span className="text-white/40 text-xs uppercase tracking-wider">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <span className="block text-white font-semibold mt-1">{value}</span>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'features' && product.features && (
              <motion.div key="features" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid sm:grid-cols-2 gap-4">
                {product.features.map((f, i) => (
                  <div key={i} className="card-feature flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                      <Zap size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{f.name}</h4>
                      <p className="text-white/50 text-sm">{f.description}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'includes' && product.includes && (
              <motion.div key="includes" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="card-glass p-6">
                <ul className="grid sm:grid-cols-2 gap-3">
                  {product.includes.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-white/70">
                      <Package size={16} className="text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-2xl font-bold text-white mb-6">Produits similaires</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </motion.section>
        )}
      </div>

      {/* Sticky Mobile CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-dark-950/95 backdrop-blur-xl border-t border-white/10 safe-area-inset-bottom z-40">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <span className="text-white/50 text-sm">{product.name}</span>
            <span className="block font-display text-xl font-bold text-white whitespace-nowrap">{formatPrice(product.price)}</span>
          </div>
          <motion.button
            onClick={handleAddToCart}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold whitespace-nowrap ${
              justAdded ? 'bg-green-500 text-white' : 'bg-accent text-dark-900'
            }`}
          >
            {justAdded ? <Check size={18} /> : <ShoppingCart size={18} />}
            <span>Ajouter</span>
          </motion.button>
        </div>
      </div>
    </main>
  )
}
