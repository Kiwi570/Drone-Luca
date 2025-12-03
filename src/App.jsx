import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

// Contexts
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import { UIProvider } from './context/UIContext'

// Layout Components
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/layout/ScrollToTop'
import CartSidebar from './components/layout/CartSidebar'

// UI Components
import PageLoader from './components/ui/PageLoader'
import ParticleBackground, { OrbsBackground } from './components/ui/ParticleBackground'
import BenefitBar from './components/ui/BenefitBar'
import SocialProofNotification from './components/ui/SocialProofNotification'
import QuickViewModal from './components/product/QuickViewModal'

// Pages
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import About from './pages/About'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <Router>
      <CartProvider>
        <WishlistProvider>
          <UIProvider>
            {/* Page Loader */}
            <PageLoader onComplete={() => setIsLoading(false)} />

            {/* Main Content */}
            <AnimatePresence>
              {!isLoading && (
                <>
                  <ScrollToTop />
                  
                  <div className="min-h-screen bg-dark-950 text-white relative overflow-hidden">
                    {/* Background Effects */}
                    <OrbsBackground />
                    <ParticleBackground count={20} />
                    <div className="fixed inset-0 bg-grid opacity-30 pointer-events-none" />
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <Navbar />
                      
                      {/* Benefit Bar - shows under navbar */}
                      <div className="pt-20">
                        <BenefitBar />
                      </div>
                      
                      <AnimatePresence mode="wait">
                        <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="/products" element={<Products />} />
                          <Route path="/product/:id" element={<ProductDetail />} />
                          <Route path="/about" element={<About />} />
                          <Route path="/cart" element={<Cart />} />
                          <Route path="/checkout" element={<Checkout />} />
                        </Routes>
                      </AnimatePresence>
                      
                      <Footer />
                    </div>

                    {/* Overlays */}
                    <CartSidebar />
                    <QuickViewModal />
                    <SocialProofNotification />
                  </div>
                </>
              )}
            </AnimatePresence>
          </UIProvider>
        </WishlistProvider>
      </CartProvider>
    </Router>
  )
}

export default App
