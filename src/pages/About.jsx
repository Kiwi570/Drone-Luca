import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Target, Heart, Zap, Users } from 'lucide-react'
import { pageTransition, useScrollAnimation, staggerContainer, staggerItem } from '../hooks/useScrollAnimation'
import SectionTitle from '../components/ui/SectionTitle'
import { stats } from '../data/drones'
import AnimatedNumber from '../components/ui/AnimatedNumber'

// ========================================
// About Page
// ========================================

const values = [
  {
    icon: Target,
    title: 'Précision',
    description: 'Chaque détail compte. Nous obsédons sur la qualité à chaque étape de conception.',
  },
  {
    icon: Heart,
    title: 'Passion',
    description: 'Nous sommes des créateurs avant tout. Notre passion guide chaque innovation.',
  },
  {
    icon: Zap,
    title: 'Innovation',
    description: 'Repousser les limites de ce qui est possible, une technologie à la fois.',
  },
  {
    icon: Users,
    title: 'Communauté',
    description: 'Construire avec et pour notre communauté de pilotes passionnés.',
  },
]

const timeline = [
  { year: '2020', title: 'La naissance', description: 'Luca Drone est fondé à Paris par trois ingénieurs passionnés d\'aéronautique.' },
  { year: '2021', title: 'Premier vol', description: 'Lancement de l\'Explorer, notre premier drone grand public.' },
  { year: '2022', title: 'L\'expansion', description: 'Ouverture à l\'international et lancement du Pro.' },
  { year: '2023', title: 'La référence', description: 'L\'Ultra révolutionne la vidéo aérienne professionnelle.' },
  { year: '2024', title: '50 000 pilotes', description: 'Une communauté mondiale de créateurs passionnés.' },
]

export default function About() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <motion.main
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
    >
      {/* ===== HERO ===== */}
      <section className="relative min-h-[70vh] flex items-center pt-20">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            background: 'radial-gradient(circle at 30% 50%, #00D4FF40 0%, transparent 50%)',
          }}
        />

        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block text-accent font-mono text-sm tracking-widest uppercase mb-6"
          >
            Notre histoire
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-display-lg font-bold text-white mb-6"
          >
            Nous rendons le ciel
            <br />
            <span className="text-gradient">accessible à tous</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-white/60 max-w-2xl mx-auto"
          >
            Depuis 2020, Luca Drone conçoit les drones les plus avancés pour permettre à chacun de capturer le monde sous un nouvel angle.
          </motion.p>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="py-20 bg-dark-900/50">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="font-display text-4xl md:text-5xl font-bold text-white mb-2">
                  <AnimatedNumber value={stat.value} />
                </div>
                <p className="text-white/50">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VALUES ===== */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <SectionTitle
            eyebrow="Nos valeurs"
            title="Ce qui nous guide"
            description="Quatre piliers fondamentaux qui définissent notre approche et notre culture."
            className="mb-16"
          />

          <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-6"
          >
            {values.map((value) => (
              <motion.div
                key={value.title}
                variants={staggerItem}
                className="card-feature flex gap-5"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <value.icon size={24} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-white/50 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== TIMELINE ===== */}
      <section className="py-24 bg-dark-900/30">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <SectionTitle
            eyebrow="Notre parcours"
            title="Une histoire de passion"
            className="mb-16"
          />

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent/50 to-transparent" />

            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-center gap-8 mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 -ml-2 rounded-full bg-accent shadow-lg shadow-accent/50" />
                
                {/* Content */}
                <div className={`ml-20 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                  <span className="text-accent font-mono font-bold">{item.year}</span>
                  <h3 className="font-display text-xl font-semibold text-white mt-1">
                    {item.title}
                  </h3>
                  <p className="text-white/50 mt-2">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-display-md font-bold text-white mb-6">
              Rejoignez l'aventure
            </h2>
            <p className="text-xl text-white/60 mb-8">
              Découvrez nos drones et commencez à capturer le monde autrement.
            </p>
            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-lg"
              >
                Voir les drones
                <ArrowRight size={20} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.main>
  )
}
