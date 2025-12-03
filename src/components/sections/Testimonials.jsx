import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

// ========================================
// Testimonials Component
// Customer reviews with photos
// ========================================

const testimonials = [
  {
    id: 1,
    name: 'Thomas Durand',
    role: 'Photographe professionnel',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    rating: 5,
    text: 'Le Mavic 3 Pro a révolutionné mon travail. La qualité d\'image est exceptionnelle et le mode ActiveTrack suit mes sujets à la perfection. Meilleur investissement de ma carrière.',
    product: 'DJI Mavic 3 Pro',
    verified: true,
  },
  {
    id: 2,
    name: 'Marie Lefevre',
    role: 'Réalisatrice',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    rating: 5,
    text: 'L\'Autel EVO II Pro est une vraie bête. Le capteur full frame combiné au ProRes permet des images cinématographiques dignes des plus grandes productions. Un must-have.',
    product: 'Autel EVO II Pro',
    verified: true,
  },
  {
    id: 3,
    name: 'Lucas Bernard',
    role: 'Content Creator',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    rating: 5,
    text: 'J\'ai commencé avec le Mini 4 Pro et c\'était parfait pour débuter. Simple, efficace, et des résultats impressionnants dès le premier vol. Je recommande à 100% !',
    product: 'DJI Mini 4 Pro',
    verified: true,
  },
  {
    id: 4,
    name: 'Sophie Martin',
    role: 'Pilote FPV',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    rating: 5,
    text: 'Le DJI Avata 2 offre des sensations incroyables. 140 km/h avec une latence quasi nulle, c\'est le pied total. Le casque inclus est aussi de très bonne qualité.',
    product: 'DJI Avata 2',
    verified: true,
  },
  {
    id: 5,
    name: 'Antoine Rousseau',
    role: 'Inspecteur thermique',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    rating: 5,
    text: 'Le Matrice 30T a divisé par trois le temps de nos inspections. La précision de la caméra thermique est remarquable. Un outil professionnel indispensable.',
    product: 'DJI Matrice 30T',
    verified: true,
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const paginate = (newDirection) => {
    setDirection(newDirection)
    setCurrentIndex((prev) => {
      if (newDirection === 1) {
        return (prev + 1) % testimonials.length
      }
      return prev === 0 ? testimonials.length - 1 : prev - 1
    })
  }

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  }

  const current = testimonials[currentIndex]

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900/50 via-dark-950 to-dark-900/50" />
      
      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-accent font-mono text-sm tracking-widest uppercase mb-4 block">
            Témoignages
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
            Ce que nos clients disent
          </h2>
        </motion.div>

        {/* Testimonial Card */}
        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="card-glass p-8 md:p-10"
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 text-accent/20">
                <Quote size={48} />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={18} 
                    className={i < current.rating ? 'star-filled fill-current' : 'star-empty'}
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-white/80 text-lg md:text-xl leading-relaxed mb-8">
                "{current.text}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img 
                    src={current.avatar} 
                    alt={current.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-accent/30"
                  />
                  <div>
                    <p className="font-semibold text-white">{current.name}</p>
                    <p className="text-white/50 text-sm">{current.role}</p>
                  </div>
                </div>

                <div className="hidden sm:block text-right">
                  <p className="text-accent text-sm font-medium">{current.product}</p>
                  {current.verified && (
                    <p className="text-white/40 text-xs mt-0.5">✓ Achat vérifié</p>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => paginate(-1)}
              className="p-3 rounded-full bg-dark-800/50 border border-white/10 text-white/60 hover:text-white hover:border-accent/30 transition-all"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1)
                    setCurrentIndex(index)
                  }}
                  className={`
                    w-2 h-2 rounded-full transition-all
                    ${index === currentIndex 
                      ? 'w-6 bg-accent' 
                      : 'bg-white/20 hover:bg-white/40'
                    }
                  `}
                />
              ))}
            </div>

            <button
              onClick={() => paginate(1)}
              className="p-3 rounded-full bg-dark-800/50 border border-white/10 text-white/60 hover:text-white hover:border-accent/30 transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
