import { motion } from 'framer-motion'
import { Camera, Zap, Shield, Smartphone } from 'lucide-react'
import SectionTitle from '../ui/SectionTitle'
import { useScrollAnimation, staggerContainer, staggerItem } from '../../hooks/useScrollAnimation'

// ========================================
// Features Section
// ========================================

const features = [
  {
    icon: Camera,
    title: 'Qualité Cinéma',
    description: 'Capteurs professionnels et stabilisation avancée pour des images à couper le souffle.',
    color: '#00D4FF',
  },
  {
    icon: Zap,
    title: 'Autonomie Record',
    description: 'Jusqu\'à 55 minutes de vol pour ne jamais manquer le moment parfait.',
    color: '#FF6B35',
  },
  {
    icon: Shield,
    title: 'Vol Sécurisé',
    description: 'Détection d\'obstacles 360° et retour automatique en cas de perte de signal.',
    color: '#A855F7',
  },
  {
    icon: Smartphone,
    title: 'Contrôle Intuitif',
    description: 'Application iOS & Android simple et puissante. Pilotez en quelques minutes.',
    color: '#10B981',
  },
]

export default function Features() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section className="section-padding bg-dark-950 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-warm/5 blur-3xl" />

      <div className="container-wide relative z-10">
        <SectionTitle
          eyebrow="Technologie"
          title="L'excellence à chaque détail"
          description="Chaque composant est pensé pour repousser les limites du possible."
          className="mb-16"
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={staggerItem}
              className="group"
            >
              <div className="card-feature h-full flex gap-6">
                {/* Icon */}
                <div 
                  className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${feature.color}15` }}
                >
                  <feature.icon 
                    size={28} 
                    style={{ color: feature.color }}
                  />
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-display text-xl font-semibold text-white mb-2 group-hover:text-accent transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-white/50 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
