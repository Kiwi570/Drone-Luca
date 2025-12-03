# 🚁 AERO Drone Store

Un site e-commerce premium pour la vente de drones, inspiré du design Apple. Built with React, Vite, Tailwind CSS, and Framer Motion.

![AERO Preview](preview.png)

## ✨ Features

- 🎨 **Dark Mode Premium** - Design sombre élégant et cinématique
- 🚀 **Animations Fluides** - Powered by Framer Motion
- 📱 **100% Responsive** - Mobile-first approach
- ⚡ **Performance Optimale** - Vite + React 18
- 🛒 **E-commerce Ready** - Pages produit et panier

## 🛠️ Stack Technique

- **Framework:** React 18
- **Build Tool:** Vite 5
- **Styling:** Tailwind CSS 3
- **Animations:** Framer Motion
- **Routing:** React Router DOM
- **Icons:** Lucide React

## 🚀 Quick Start

### Prérequis

- Node.js 18+ 
- npm ou yarn

### Installation

```bash
# Cloner le repo
git clone https://github.com/your-username/aero-drone-store.git
cd aero-drone-store

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Le site sera accessible sur `http://localhost:3000`

### Build Production

```bash
# Créer le build de production
npm run build

# Preview du build
npm run preview
```

## 📁 Structure du Projet

```
src/
├── components/
│   ├── layout/          # Navbar, Footer
│   ├── sections/        # Hero, Features, CTA...
│   ├── product/         # ProductCard, etc.
│   └── ui/              # Button, AnimatedNumber...
├── pages/               # Home, Products, ProductDetail, About, Cart
├── hooks/               # useScrollAnimation, useCart
├── utils/               # formatPrice, helpers
├── data/                # drones.js (product data)
└── assets/              # Images, fonts
```

## 🎨 Personnalisation

### Couleurs

Modifier `tailwind.config.js` pour changer la palette :

```js
colors: {
  accent: {
    DEFAULT: '#00D4FF',  // Couleur principale
    // ...
  },
  dark: {
    950: '#030303',      // Fond le plus sombre
    // ...
  }
}
```

### Produits

Éditer `src/data/drones.js` pour ajouter/modifier les drones.

### Fonts

Les fonts sont importées via Google Fonts dans `index.html` :
- **Display:** Outfit
- **Body:** Plus Jakarta Sans
- **Mono:** JetBrains Mono

## 📱 Pages

| Route | Description |
|-------|-------------|
| `/` | Page d'accueil avec Hero, produits, stats |
| `/products` | Catalogue complet avec comparatif |
| `/product/:id` | Page produit immersive |
| `/about` | Histoire de la marque |
| `/cart` | Panier d'achat |

## 🔧 Scripts

```bash
npm run dev      # Serveur de développement
npm run build    # Build production
npm run preview  # Preview du build
```

## 📦 Ajouter des Images

Pour remplacer les placeholders par de vraies images :

1. Ajouter les images dans `public/`
2. Mettre à jour les paths dans `src/data/drones.js`

Formats recommandés :
- **Produits:** PNG transparent, 1200x1200px
- **Gallery:** JPG optimisé, 1920x1080px

## 🚀 Déploiement

### Vercel (Recommandé)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Autres

Le dossier `dist/` après build peut être déployé sur n'importe quel hébergement statique.

## 📝 TODO

- [ ] Ajouter les vraies images des drones
- [ ] Intégrer Stripe pour le paiement
- [ ] Ajouter l'authentification utilisateur
- [ ] Créer une section FAQ interactive
- [ ] Ajouter un configurateur 3D

## 📄 License

MIT License - Libre d'utilisation pour projets personnels et commerciaux.

---

Créé avec ❤️ pour les passionnés de drones et de beau design.
