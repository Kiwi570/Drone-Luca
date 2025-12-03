import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'

// ========================================
// FAQ Accordion Component
// Interactive FAQ section
// ========================================

const faqs = [
  {
    question: "Quels sont les délais de livraison ?",
    answer: "Nous livrons en 24-48h en France métropolitaine avec notre option Express. La livraison Standard prend 3-5 jours ouvrés. Pour l'international, comptez 5-10 jours selon la destination."
  },
  {
    question: "Faut-il une licence pour piloter un drone ?",
    answer: "Pour les drones de moins de 250g (comme le DJI Mini 4 Pro), aucune formation n'est requise. Pour les drones plus lourds, une formation en ligne gratuite est disponible sur le site de la DGAC. Nous vous accompagnons dans toutes les démarches."
  },
  {
    question: "Quelle est la politique de retour ?",
    answer: "Vous disposez de 30 jours pour retourner votre drone s'il ne vous convient pas. Le produit doit être en parfait état et dans son emballage d'origine. Les frais de retour sont gratuits en France métropolitaine."
  },
  {
    question: "Comment fonctionne la garantie ?",
    answer: "Tous nos drones sont garantis 2 ans pièces et main d'œuvre. Cette garantie couvre les défauts de fabrication mais pas les dommages liés aux crashes. Une extension de garantie est disponible pour une couverture complète."
  },
  {
    question: "Peut-on payer en plusieurs fois ?",
    answer: "Oui ! Nous proposons le paiement en 3x ou 4x sans frais avec Alma pour les achats de plus de 100€. Vous pouvez également financer votre achat en 10x ou 12x avec des frais réduits."
  },
  {
    question: "Les accessoires sont-ils compatibles entre les marques ?",
    answer: "Les accessoires sont généralement spécifiques à chaque marque et modèle. DJI, Parrot et Autel ont leurs propres gammes d'accessoires. Contactez-nous pour vérifier la compatibilité."
  },
  {
    question: "Proposez-vous des formations au pilotage ?",
    answer: "Oui ! Nous proposons des formations en ligne gratuites pour tous nos clients, ainsi que des stages en présentiel à Paris, Lyon et Bordeaux."
  },
  {
    question: "Comment contacter le support technique ?",
    answer: "Notre équipe support est disponible 24/7 par chat sur le site, par email à support@luca-drone.com ou par téléphone au 01 23 45 67 89. Le délai de réponse moyen est de 2 heures."
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-accent font-mono text-sm tracking-widest uppercase mb-4 block">
            FAQ
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Questions fréquentes
          </h2>
          <p className="text-white/50">
            Trouvez rapidement les réponses à vos questions
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={`accordion-item ${openIndex === index ? 'open' : ''}`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
              >
                <div className="flex items-start gap-3">
                  <HelpCircle 
                    size={20} 
                    className={`flex-shrink-0 mt-0.5 transition-colors ${
                      openIndex === index ? 'text-accent' : 'text-white/40'
                    }`}
                  />
                  <span className={`font-medium transition-colors ${
                    openIndex === index ? 'text-white' : 'text-white/80'
                  }`}>
                    {faq.question}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown 
                    size={20} 
                    className={`transition-colors ${
                      openIndex === index ? 'text-accent' : 'text-white/40'
                    }`}
                  />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pl-12">
                      <p className="text-white/60 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <p className="text-white/40 text-sm mb-3">
            Vous n'avez pas trouvé votre réponse ?
          </p>
          <a 
            href="mailto:support@aero-drones.com"
            className="inline-flex items-center gap-2 text-accent hover:text-accent-400 transition-colors"
          >
            Contactez notre support
            <span>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
