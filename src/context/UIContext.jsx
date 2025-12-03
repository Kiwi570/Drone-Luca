import { createContext, useContext, useState, useCallback } from 'react'

// ========================================
// UI Context
// Manage modals, notifications, quick view
// ========================================

const UIContext = createContext(null)

export function UIProvider({ children }) {
  // Quick View state
  const [quickViewProduct, setQuickViewProduct] = useState(null)
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)

  // Notification state
  const [notification, setNotification] = useState(null)

  // Social proof state
  const [socialProof, setSocialProof] = useState(null)

  // Quick View functions
  const openQuickView = useCallback((product) => {
    setQuickViewProduct(product)
    setIsQuickViewOpen(true)
  }, [])

  const closeQuickView = useCallback(() => {
    setIsQuickViewOpen(false)
    setTimeout(() => setQuickViewProduct(null), 300)
  }, [])

  // Notification functions
  const showNotification = useCallback((message, type = 'success', duration = 3000) => {
    setNotification({ message, type, id: Date.now() })
    setTimeout(() => setNotification(null), duration)
  }, [])

  const hideNotification = useCallback(() => {
    setNotification(null)
  }, [])

  // Social proof functions
  const showSocialProof = useCallback((data) => {
    setSocialProof(data)
    setTimeout(() => setSocialProof(null), 5000)
  }, [])

  const hideSocialProof = useCallback(() => {
    setSocialProof(null)
  }, [])

  const value = {
    // Quick View
    quickViewProduct,
    isQuickViewOpen,
    openQuickView,
    closeQuickView,
    // Notifications
    notification,
    showNotification,
    hideNotification,
    // Social Proof
    socialProof,
    showSocialProof,
    hideSocialProof,
  }

  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  )
}

export function useUI() {
  const context = useContext(UIContext)
  if (!context) {
    throw new Error('useUI must be used within a UIProvider')
  }
  return context
}

export default UIContext
