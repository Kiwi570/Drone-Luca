import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  SlidersHorizontal, 
  Grid3X3, 
  List, 
  X,
  ChevronDown,
  Sparkles
} from 'lucide-react'
import ProductCard from '../components/product/ProductCard'
import { drones, categories, priceRanges } from '../data/drones'

// ========================================
// Products Page - Premium Version
// ========================================

export default function Products() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPriceRange, setSelectedPriceRange] = useState('all')
  const [sortBy, setSortBy] = useState('featured')
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...drones]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        drone =>
          drone.name.toLowerCase().includes(query) ||
          drone.tagline.toLowerCase().includes(query) ||
          drone.category.toLowerCase().includes(query)
      )
    }

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(drone => drone.category === selectedCategory)
    }

    // Price range filter
    const priceRange = priceRanges.find(r => r.id === selectedPriceRange)
    if (priceRange && selectedPriceRange !== 'all') {
      result = result.filter(
        drone => drone.price >= priceRange.min && drone.price < priceRange.max
      )
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      case 'newest':
        result.sort((a, b) => (b.badge === 'Nouveau' ? 1 : 0) - (a.badge === 'Nouveau' ? 1 : 0))
        break
      default: // 'featured'
        // Keep original order
        break
    }

    return result
  }, [searchQuery, selectedCategory, selectedPriceRange, sortBy])

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
    setSelectedPriceRange('all')
    setSortBy('featured')
  }

  const hasActiveFilters = searchQuery || selectedCategory !== 'all' || selectedPriceRange !== 'all'

  return (
    <main className="min-h-screen pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <span className="text-accent font-mono text-sm tracking-widest uppercase mb-2 block">
            Collection complète
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Nos drones
          </h1>
          <p className="text-white/50 max-w-2xl">
            Découvrez notre gamme complète de drones, du compact parfait pour débuter 
            au modèle professionnel pour les productions cinématographiques.
          </p>
        </motion.div>

        {/* Search & Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col lg:flex-row gap-4 mb-8"
        >
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un drone..."
              className="w-full pl-11 pr-4 py-3 bg-dark-800/50 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-accent/50 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Filter Toggle (Mobile) */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center justify-center gap-2 px-4 py-3 bg-dark-800/50 border border-white/10 rounded-xl text-white/70 hover:text-white transition-colors"
          >
            <SlidersHorizontal size={18} />
            Filtres
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-accent" />
            )}
          </button>

          {/* Desktop Filters */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Category */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none px-4 py-3 pr-10 bg-dark-800/50 border border-white/10 rounded-xl text-white/70 focus:outline-none focus:border-accent/50 transition-colors cursor-pointer"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id} className="bg-dark-800">
                    {cat.name} ({cat.count})
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" size={16} />
            </div>

            {/* Price Range */}
            <div className="relative">
              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="appearance-none px-4 py-3 pr-10 bg-dark-800/50 border border-white/10 rounded-xl text-white/70 focus:outline-none focus:border-accent/50 transition-colors cursor-pointer"
              >
                {priceRanges.map(range => (
                  <option key={range.id} value={range.id} className="bg-dark-800">
                    {range.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" size={16} />
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none px-4 py-3 pr-10 bg-dark-800/50 border border-white/10 rounded-xl text-white/70 focus:outline-none focus:border-accent/50 transition-colors cursor-pointer"
              >
                <option value="featured" className="bg-dark-800">En vedette</option>
                <option value="price-asc" className="bg-dark-800">Prix croissant</option>
                <option value="price-desc" className="bg-dark-800">Prix décroissant</option>
                <option value="rating" className="bg-dark-800">Meilleures notes</option>
                <option value="newest" className="bg-dark-800">Nouveautés</option>
                <option value="name" className="bg-dark-800">Nom A-Z</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" size={16} />
            </div>

            {/* View Mode */}
            <div className="flex items-center bg-dark-800/50 border border-white/10 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-accent text-dark-950' : 'text-white/50 hover:text-white'
                }`}
              >
                <Grid3X3 size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-accent text-dark-950' : 'text-white/50 hover:text-white'
                }`}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Mobile Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mb-6 overflow-hidden"
            >
              <div className="card-glass p-4 space-y-4">
                {/* Category */}
                <div>
                  <label className="block text-white/50 text-sm mb-2">Catégorie</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-dark-700/50 border border-white/10 rounded-xl text-white focus:outline-none"
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                {/* Price */}
                <div>
                  <label className="block text-white/50 text-sm mb-2">Prix</label>
                  <select
                    value={selectedPriceRange}
                    onChange={(e) => setSelectedPriceRange(e.target.value)}
                    className="w-full px-4 py-3 bg-dark-700/50 border border-white/10 rounded-xl text-white focus:outline-none"
                  >
                    {priceRanges.map(range => (
                      <option key={range.id} value={range.id}>{range.name}</option>
                    ))}
                  </select>
                </div>

                {/* Sort */}
                <div>
                  <label className="block text-white/50 text-sm mb-2">Trier par</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-3 bg-dark-700/50 border border-white/10 rounded-xl text-white focus:outline-none"
                  >
                    <option value="featured">En vedette</option>
                    <option value="price-asc">Prix croissant</option>
                    <option value="price-desc">Prix décroissant</option>
                    <option value="rating">Meilleures notes</option>
                    <option value="newest">Nouveautés</option>
                    <option value="name">Nom A-Z</option>
                  </select>
                </div>

                {/* Clear */}
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="w-full py-2 text-accent text-sm hover:text-accent-400 transition-colors"
                  >
                    Effacer les filtres
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active Filters */}
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-wrap items-center gap-2 mb-6"
          >
            <span className="text-white/40 text-sm">Filtres actifs:</span>
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-sm text-accent">
                "{searchQuery}"
                <button onClick={() => setSearchQuery('')} className="hover:text-white">
                  <X size={14} />
                </button>
              </span>
            )}
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple/10 border border-purple/20 rounded-full text-sm text-purple">
                {categories.find(c => c.id === selectedCategory)?.name}
                <button onClick={() => setSelectedCategory('all')} className="hover:text-white">
                  <X size={14} />
                </button>
              </span>
            )}
            {selectedPriceRange !== 'all' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-magenta/10 border border-magenta/20 rounded-full text-sm text-magenta">
                {priceRanges.find(r => r.id === selectedPriceRange)?.name}
                <button onClick={() => setSelectedPriceRange('all')} className="hover:text-white">
                  <X size={14} />
                </button>
              </span>
            )}
            <button
              onClick={clearFilters}
              className="text-white/40 text-sm hover:text-white transition-colors"
            >
              Tout effacer
            </button>
          </motion.div>
        )}

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-between mb-6"
        >
          <p className="text-white/50 text-sm">
            {filteredProducts.length} drone{filteredProducts.length !== 1 ? 's' : ''} trouvé{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </motion.div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <motion.div
            layout
            className={`
              grid gap-6
              ${viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
              }
            `}
          >
            <AnimatePresence>
              {filteredProducts.map((drone, index) => (
                <ProductCard 
                  key={drone.id} 
                  product={drone} 
                  index={index}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-dark-800/50 flex items-center justify-center">
              <Sparkles className="text-white/30" size={32} />
            </div>
            <h3 className="font-display text-xl font-bold text-white mb-2">
              Aucun résultat
            </h3>
            <p className="text-white/50 mb-6">
              Aucun drone ne correspond à vos critères de recherche.
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-accent/10 text-accent rounded-xl hover:bg-accent/20 transition-colors"
            >
              Réinitialiser les filtres
            </button>
          </motion.div>
        )}
      </div>
    </main>
  )
}
