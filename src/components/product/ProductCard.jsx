import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Star, ShoppingCart, Check, Heart } from 'lucide-react'
import { formatPrice, calculateDiscount } from '../../utils/helpers'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'

// ========================================
// Product Card Component - Simple Version
// ========================================

export default function ProductCard({ product, index = 0 }) {
  const [justAdded, setJustAdded] = useState(false)
  
  const { addItem } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()
  
  const { 
    id, 
    name, 
    tagline, 
    price, 
    originalPrice, 
    badge, 
    image,
    color, 
    specs,
    rating,
    reviewCount,
    inStock,
    stockCount,
  } = product
  
  const discount = calculateDiscount(originalPrice, price)
  const inWishlist = isInWishlist(id)

  const handleAddToCart = () => {
    addItem({
      id,
      name,
      tagline,
      price,
      image,
      color,
    })
    
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 2000)
  }

  const handleWishlist = () => {
    toggleWishlist(product)
  }

  return (
    <article className="bg-dark-800/50 rounded-2xl border border-white/10 overflow-hidden hover:border-accent/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/10">
      {/* Image Section */}
      <div className="relative">
        <Link to={`/product/${id}`}>
          <div className="aspect-[4/3] overflow-hidden bg-dark-700">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </Link>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {badge && (
            <span 
              className="px-2 py-1 rounded-full text-xs font-semibold"
              style={{ backgroundColor: color, color: '#050816' }}
            >
              {badge}
            </span>
          )}
          {discount > 0 && (
            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-500 text-white">
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          type="button"
          onClick={handleWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all ${
            inWishlist 
              ? 'bg-pink-500/20 text-pink-500' 
              : 'bg-black/50 text-white/70 hover:text-white'
          }`}
        >
          <Heart size={18} className={inWishlist ? 'fill-current' : ''} />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Rating */}
        {rating && (
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={12} 
                  className={i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-white/20'}
                />
              ))}
            </div>
            <span className="text-xs text-white/50">
              ({reviewCount})
            </span>
          </div>
        )}

        {/* Name & Tagline */}
        <Link to={`/product/${id}`}>
          <h3 className="font-bold text-lg text-white hover:text-accent transition-colors">
            {name}
          </h3>
        </Link>
        <p className="text-white/50 text-sm mb-3">{tagline}</p>

        {/* Specs */}
        {specs && (
          <div className="flex gap-2 mb-3 text-xs text-white/60">
            <span className="px-2 py-1 bg-white/5 rounded">📷 {specs.camera}</span>
            <span className="px-2 py-1 bg-white/5 rounded">⏱️ {specs.flightTime}</span>
          </div>
        )}

        {/* Stock */}
        <div className="mb-3">
          {inStock !== false ? (
            <span className="text-xs text-green-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
              En stock
            </span>
          ) : (
            <span className="text-xs text-red-400">Rupture de stock</span>
          )}
        </div>

        {/* Price & Button */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <div>
            <span className="text-xl font-bold text-white">
              {formatPrice(price)}
            </span>
            {originalPrice && (
              <span className="ml-2 text-sm text-white/40 line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>
          
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={inStock === false}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm
              transition-all duration-200
              ${inStock !== false 
                ? justAdded 
                  ? 'bg-green-500 text-white'
                  : 'bg-cyan-400 text-gray-900 hover:bg-cyan-300 active:scale-95' 
                : 'bg-white/10 text-white/40 cursor-not-allowed'
              }
            `}
          >
            {justAdded ? (
              <>
                <Check size={16} />
                Ajouté !
              </>
            ) : (
              <>
                <ShoppingCart size={16} />
                Ajouter
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  )
}
