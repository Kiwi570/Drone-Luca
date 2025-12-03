import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Zap, Shield, Headphones, Award, ChevronRight } from 'lucide-react'
import Hero from '../components/sections/Hero'
import Testimonials from '../components/sections/Testimonials'
import FAQ from '../components/sections/FAQ'
import ProductCard from '../components/product/ProductCard'
import { drones } from '../data/drones'
import { formatPrice } from '../utils/helpers'

// ========================================
// Home Page - Premium Version
// ========================================

// Features data
const features = [
  {
    icon: Zap,
    title: 'Performance extrême',
    description: 'Des moteurs brushless de dernière génération pour des performances inégalées.',
    color: '#00D4FF',
  },
  {
    icon: Shield,
    title: 'Vol sécurisé',
    description: 'Capteurs anticollision et modes de vol assisté pour une sécurité maximale.',
    color: '#A855F7',
  },
  {
    icon: Headphones,
    title: 'Support 24/7',
    description: 'Une équipe d\'experts à votre écoute pour vous accompagner.',
    color: '#EC4899',
  },
  {
    icon: Award,
    title: 'Garantie 2 ans',
    description: 'Tous nos produits sont couverts par une garantie complète de 2 ans.',
    color: '#10B981',
  },
]

// Stats data
const stats = [
  { value: '50K+', label: 'Drones vendus' },
  { value: '4.9/5', label: 'Note moyenne' },
  { value: '24/7', label: 'Support client' },
  { value: '2 ans', label: 'Garantie' },
]

export default function Home() {
  const featuredDrones = drones.slice(0, 4)
  const bestsellerDrones = drones.filter(d => d.badge === 'Bestseller' || d.badge === 'Populaire').slice(0, 3)

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-accent font-mono text-sm tracking-widest uppercase mb-4 block">
              Pourquoi nous choisir
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              L'excellence à chaque vol
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Nous concevons des drones qui repoussent les limites de la technologie 
              pour vous offrir une expérience de vol incomparable.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="card-feature group"
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all group-hover:scale-110"
                  style={{ 
                    backgroundColor: `${feature.color}15`,
                    boxShadow: `0 0 20px ${feature.color}20`
                  }}
                >
                  <feature.icon size={24} style={{ color: feature.color }} />
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/50 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-800/30 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-accent font-mono text-sm tracking-widest uppercase mb-2 block">
                Collection
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
                Nos drones vedettes
              </h2>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Link 
                to="/products"
                className="group inline-flex items-center gap-2 text-accent hover:text-accent-400 transition-colors"
              >
                Voir tous les drones
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDrones.map((drone, index) => (
              <ProductCard key={drone.id} product={drone} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Video/Showcase Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-accent font-mono text-sm tracking-widest uppercase mb-4 block">
                Technologie avancée
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
                Conçu pour les créateurs exigeants
              </h2>
              <p className="text-white/60 mb-6">
                Chaque drone intègre les dernières innovations en matière de stabilisation, 
                de capture d'image et d'autonomie. Notre équipe d'ingénieurs repousse constamment 
                les limites pour vous offrir le meilleur.
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  'Capteurs dernière génération',
                  'Stabilisation 3 axes avancée',
                  'Transmission vidéo ultra-faible latence',
                  'Intelligence artificielle embarquée',
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 text-white/80"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {item}
                  </motion.li>
                ))}
              </ul>

              <Link to="/products">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary"
                >
                  Découvrir la gamme
                  <ChevronRight size={18} />
                </motion.button>
              </Link>
            </motion.div>

            {/* Image/Video */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-purple/20 z-10" />
                <img
                  src="https://images.unsplash.com/photo-1508444845599-5c89863b1c44?w=800&q=80"
                  alt="Drone en action"
                  className="w-full aspect-[4/3] object-cover"
                />
                
                {/* Play button overlay */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center z-20"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors">
                    <div className="w-0 h-0 border-l-[16px] border-l-white border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1" />
                  </div>
                </motion.div>
              </div>

              {/* Floating card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-6 -left-6 card-glass p-4 rounded-xl hidden md:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                    <Award className="text-accent" size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-white">+50 000</p>
                    <p className="text-xs text-white/50">Pilotes satisfaits</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-purple/5 to-magenta/5" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <p className="font-display text-4xl md:text-5xl font-bold text-gradient mb-2">
                  {stat.value}
                </p>
                <p className="text-white/50 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers Section */}
      {bestsellerDrones.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-accent font-mono text-sm tracking-widest uppercase mb-4 block">
                Top ventes
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
                Les plus populaires
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {bestsellerDrones.map((drone, index) => (
                <ProductCard key={drone.id} product={drone} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ */}
      <FAQ />

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-purple/10 to-magenta/10" />
          <div className="absolute inset-0 bg-dark-950/80" />
        </div>
        
        <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">
              Prêt à prendre votre envol ?
            </h2>
            <p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto">
              Rejoignez les milliers de créateurs qui font confiance à Luca Drone 
              pour capturer des images extraordinaires.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/products">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(0, 212, 255, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary text-lg px-8 py-4"
                >
                  Découvrir nos drones
                  <ArrowRight size={20} />
                </motion.button>
              </Link>
              <Link to="/about">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary text-lg px-8 py-4"
                >
                  En savoir plus
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
