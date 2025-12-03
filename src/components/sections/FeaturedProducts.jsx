import { motion } from 'framer-motion'
import { drones } from '../../data/drones'
import ProductCard from '../product/ProductCard'
import SectionTitle from '../ui/SectionTitle'

// ========================================
// Featured Products Section
// ========================================

export default function FeaturedProducts() {
  return (
    <section className="section-padding bg-dark-950 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full bg-accent/5 blur-3xl pointer-events-none" />
      
      <div className="container-wide relative z-10">
        {/* Section Header */}
        <SectionTitle
          eyebrow="Nos drones"
          title="Choisissez votre compagnon"
          description="Trois drones, trois visions. Du débutant au professionnel, trouvez celui qui vous correspond."
          className="mb-16"
        />

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {drones.map((drone, index) => (
            <ProductCard 
              key={drone.id} 
              product={drone} 
              index={index}
            />
          ))}
        </div>

        {/* Compare CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-white/50 mb-4">Vous hésitez ?</p>
          <button className="btn-ghost text-accent hover:text-accent-400">
            Comparer les modèles →
          </button>
        </motion.div>
      </div>
    </section>
  )
}
