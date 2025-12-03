import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Play, ChevronDown, Sparkles } from 'lucide-react'

// ========================================
// Hero Section Component - Premium Version
// Cinematic hero with parallax and animations
// ========================================

export default function Hero() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])

  // Text animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    },
  }

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[100vh] flex items-center justify-center overflow-hidden"
    >
      {/* Video/Image Background */}
      <div className="absolute inset-0 z-0">
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-950/80 to-dark-950 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-950 via-transparent to-dark-950 z-10" />
        
        {/* Animated mesh background */}
        <div className="absolute inset-0">
          {/* Primary orb */}
          <motion.div
            className="absolute w-[800px] h-[800px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, transparent 70%)',
              filter: 'blur(60px)',
              top: '10%',
              left: '20%',
            }}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          
          {/* Secondary orb */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, transparent 70%)',
              filter: 'blur(60px)',
              bottom: '20%',
              right: '15%',
            }}
            animate={{
              scale: [1.2, 1, 1.2],
              x: [0, -40, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          
          {/* Accent orb */}
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%)',
              filter: 'blur(60px)',
              top: '50%',
              left: '60%',
            }}
            animate={{
              scale: [1, 1.3, 1],
              x: [0, 30, 0],
              y: [0, -40, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      </div>

      {/* Content */}
      <motion.div 
        style={{ y, opacity, scale }}
        className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-32"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left: Text Content */}
          <motion.div 
            className="text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Eyebrow */}
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent/10 to-purple/10 border border-accent/20 text-sm text-white/80">
                <Sparkles size={14} className="text-accent" />
                Nouvelle collection 2025
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              variants={itemVariants}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1]"
            >
              Voyez le monde
              <br />
              <span className="text-gradient">autrement</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-white/60 max-w-xl mx-auto lg:mx-0 mb-8"
            >
              Des drones conçus pour capturer l'impossible. 
              Performance, précision, liberté créative.
            </motion.p>

            {/* Stats mini */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap justify-center lg:justify-start gap-6 mb-10"
            >
              <div className="text-center">
                <span className="block font-display text-2xl font-bold text-accent">50K+</span>
                <span className="text-xs text-white/40">Pilotes satisfaits</span>
              </div>
              <div className="w-px h-12 bg-white/10 hidden sm:block" />
              <div className="text-center">
                <span className="block font-display text-2xl font-bold text-purple">4.9/5</span>
                <span className="text-xs text-white/40">Note moyenne</span>
              </div>
              <div className="w-px h-12 bg-white/10 hidden sm:block" />
              <div className="text-center">
                <span className="block font-display text-2xl font-bold text-magenta">24/7</span>
                <span className="text-xs text-white/40">Support expert</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Link to="/products">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(0, 212, 255, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary text-base group"
                >
                  Découvrir les drones
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary group"
              >
                <Play size={18} className="group-hover:scale-110 transition-transform" />
                Voir la vidéo
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right: Drone Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative order-first lg:order-last"
          >
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              {/* Glow effects */}
              <div 
                className="absolute inset-0 opacity-60"
                style={{
                  background: 'radial-gradient(circle at center, rgba(0, 212, 255, 0.3) 0%, transparent 70%)',
                  filter: 'blur(80px)',
                }}
              />
              
              {/* Ring decoration */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              >
                <div 
                  className="w-[90%] h-[90%] rounded-full border border-accent/20"
                  style={{
                    borderStyle: 'dashed',
                    borderWidth: '1px',
                  }}
                />
              </motion.div>
              
              {/* Drone Image */}
              <img 
                src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80"
                alt="Drone en vol"
                className="relative z-10 w-full max-w-xs sm:max-w-sm lg:max-w-lg mx-auto rounded-2xl shadow-2xl"
              />

              {/* Floating specs cards */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute -left-4 top-1/4 hidden lg:block"
              >
                <div className="card-glass px-4 py-3 rounded-xl">
                  <p className="text-accent font-bold text-lg">4K 60fps</p>
                  <p className="text-white/50 text-xs">Caméra HDR</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4, duration: 0.5 }}
                className="absolute -right-4 top-1/2 hidden lg:block"
              >
                <div className="card-glass px-4 py-3 rounded-xl">
                  <p className="text-purple font-bold text-lg">45 min</p>
                  <p className="text-white/50 text-xs">Autonomie</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.5 }}
                className="absolute left-1/4 -bottom-4 hidden lg:block"
              >
                <div className="card-glass px-4 py-3 rounded-xl">
                  <p className="text-magenta font-bold text-lg">12 km</p>
                  <p className="text-white/50 text-xs">Portée</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest text-white/30">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown size={20} className="text-accent/60" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
