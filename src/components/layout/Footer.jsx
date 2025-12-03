import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Instagram, 
  Youtube, 
  Twitter,
  Linkedin,
  ArrowRight,
  Send
} from 'lucide-react'

// ========================================
// Footer Component - Premium Version
// ========================================

const footerLinks = {
  products: [
    { name: 'Tous les drones', path: '/products' },
    { name: 'Drones Pro', path: '/products?category=pro' },
    { name: 'Drones FPV', path: '/products?category=fpv' },
    { name: 'Accessoires', path: '/products' },
    { name: 'Packs', path: '/products' },
  ],
  support: [
    { name: 'Centre d\'aide', path: '/about' },
    { name: 'Tutoriels', path: '/about' },
    { name: 'Réglementation', path: '/about' },
    { name: 'Garantie', path: '/about' },
    { name: 'Contact', path: '/about' },
  ],
  company: [
    { name: 'À propos', path: '/about' },
    { name: 'Carrières', path: '/about' },
    { name: 'Presse', path: '/about' },
    { name: 'Blog', path: '/about' },
    { name: 'Partenaires', path: '/about' },
  ],
}

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
]

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-white/5">
      {/* Gradient decoration */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      
      {/* Newsletter Section */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-2xl md:text-3xl font-bold text-white mb-3"
              >
                Restez informé des nouveautés
              </motion.h3>
              <p className="text-white/50">
                Recevez en avant-première nos nouveaux produits, conseils et offres exclusives.
              </p>
            </div>
            
            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex gap-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                <input
                  type="email"
                  placeholder="Votre email"
                  className="w-full pl-11 pr-4 py-3.5 bg-dark-800/50 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-accent/50 transition-colors"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="px-6 py-3.5 bg-accent text-dark-950 font-semibold rounded-xl hover:shadow-glow transition-all flex items-center gap-2"
              >
                <span className="hidden sm:inline">S'inscrire</span>
                <Send size={18} />
              </motion.button>
            </motion.form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
          
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-6 lg:mb-0">
            <Link to="/" className="inline-flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-purple flex items-center justify-center font-display font-bold text-dark-950 text-lg">
                L
              </div>
              <span className="font-display text-xl font-bold text-white">Luca Drone</span>
            </Link>
            <p className="text-white/40 text-sm mb-6 max-w-xs">
              Des drones conçus pour capturer l'impossible. Performance, précision, liberté créative.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-accent/20 border border-white/5 hover:border-accent/30 flex items-center justify-center text-white/50 hover:text-accent transition-all"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-white mb-4">Produits</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-sm text-white/40 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-sm text-white/40 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-4">Entreprise</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-sm text-white/40 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a 
                  href="mailto:contact@aero-drones.com"
                  className="flex items-start gap-3 text-sm text-white/40 hover:text-accent transition-colors group"
                >
                  <Mail size={16} className="mt-0.5 flex-shrink-0 group-hover:text-accent" />
                  contact@aero-drones.com
                </a>
              </li>
              <li>
                <a 
                  href="tel:+33123456789"
                  className="flex items-start gap-3 text-sm text-white/40 hover:text-accent transition-colors group"
                >
                  <Phone size={16} className="mt-0.5 flex-shrink-0 group-hover:text-accent" />
                  01 23 45 67 89
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm text-white/40">
                  <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                  <span>
                    42 Avenue des Champs-Élysées<br />
                    75008 Paris, France
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-sm text-center md:text-left">
              © 2025 Luca Drone. Tous droits réservés.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/30">
              <Link to="/about" className="hover:text-white transition-colors">
                Conditions d'utilisation
              </Link>
              <Link to="/about" className="hover:text-white transition-colors">
                Politique de confidentialité
              </Link>
              <Link to="/about" className="hover:text-white transition-colors">
                Mentions légales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
