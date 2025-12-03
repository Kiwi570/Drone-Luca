import { createContext, useContext, useState, useEffect } from 'react'

// ========================================
// Wishlist Context
// Manage user's favorite products
// ========================================

const WishlistContext = createContext(null)

export function WishlistProvider({ children }) {
  const [items, setItems] = useState([])

  // Check if item is in wishlist
  const isInWishlist = (productId) => {
    return items.some(item => item.id === productId)
  }

  // Toggle item in wishlist
  const toggleWishlist = (product) => {
    setItems(currentItems => {
      const exists = currentItems.some(item => item.id === product.id)
      
      if (exists) {
        return currentItems.filter(item => item.id !== product.id)
      }
      
      return [...currentItems, product]
    })
  }

  // Add to wishlist
  const addToWishlist = (product) => {
    if (!isInWishlist(product.id)) {
      setItems(prev => [...prev, product])
    }
  }

  // Remove from wishlist
  const removeFromWishlist = (productId) => {
    setItems(prev => prev.filter(item => item.id !== productId))
  }

  // Clear wishlist
  const clearWishlist = () => {
    setItems([])
  }

  const value = {
    items,
    itemCount: items.length,
    isInWishlist,
    toggleWishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
  }

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}

export default WishlistContext
