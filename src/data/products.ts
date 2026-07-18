export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  category: string;
  image: string;
  images: string[];
  description: string;
  details: string[];
  sizes?: string[];
  badge?: string;
  stock: number;
  rating: number;
  reviews: number;
  color?: string;
  colorHex?: string;
}

export const categories = [
  { id: 'all', name: 'Tous', emoji: '✨' },
  { id: 'vestes', name: 'Vestes', emoji: '🧥' },
  { id: 'bonnets', name: 'Bonnets', emoji: '🧢' },
  { id: 'sacs', name: 'Sacs', emoji: '👜' },
];

export const jacketColors = [
  { id: 'beige', name: 'Beige Sable', hex: '#c8b090', image: '/images/jacket baise.jpeg' },
  { id: 'blanc-jaune', name: 'Blanc Jaune', hex: '#e0d0a0', image: '/images/jacket blanc jaune.jpeg' },
  { id: 'blanc', name: 'Blanc Arctic', hex: '#ffffff', image: '/images/jacket blanc.jpeg' },
  { id: 'bleu', name: 'Bleu Navy', hex: '#2c3e50', image: '/images/jacket bleu.jpeg' },
  { id: 'gris', name: 'Gris Perle', hex: '#c4c0ba', image: '/images/jacket gris.jpeg' },
  { id: 'noir', name: 'Noir Onyx', hex: '#1a1a1a', image: '/images/jacket noire.jpeg' },
];

export const products: Product[] = [
  // ——— VESTES ———
  {
    id: 101, name: "Veste VIPER WORLDS — Beige Sable", price: 20000, oldPrice: 24000, category: 'vestes',
    image: '/images/jacket baise.jpeg', images: ['/images/jacket baise.jpeg', '/images/jacket baise.jpeg'],
    description: "Veste technique premium VIPER WORLDS. Idéale pour affronter les intempéries avec style.",
    details: ['Tissu softshell imperméable', 'Capuche ajustable', 'Logo Viper brodé', 'Fermeture éclair premium'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'], badge: '✨ Nouveau', stock: 20, rating: 4.9, reviews: 87, color: 'Beige Sable', colorHex: '#c8b090'
  },
  {
    id: 102, name: "Veste VIPER WORLDS — Blanc Jaune", price: 20000, category: 'vestes',
    image: '/images/jacket blanc jaune.jpeg', images: ['/images/jacket blanc jaune.jpeg', '/images/jacket blanc jaune.jpeg'],
    description: "Veste bicolore VIPER WORLDS, combinant blanc et jaune pour un style original.",
    details: ['Tissu softshell imperméable', 'Capuche ajustable', 'Logo Viper brodé', 'Fermeture éclair premium'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'], stock: 15, rating: 4.8, reviews: 45, color: 'Blanc Jaune', colorHex: '#e0d0a0'
  },
  {
    id: 103, name: "Veste VIPER WORLDS — Blanc Arctic", price: 20000, category: 'vestes',
    image: '/images/jacket blanc.jpeg', images: ['/images/jacket blanc.jpeg', '/images/jacket blanc.jpeg'],
    description: "Veste VIPER WORLDS couleur Blanc Arctic, épurée et moderne.",
    details: ['Tissu softshell imperméable', 'Capuche ajustable', 'Logo Viper brodé', 'Fermeture éclair premium'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'], stock: 18, rating: 4.7, reviews: 32, color: 'Blanc Arctic', colorHex: '#ffffff'
  },
  {
    id: 104, name: "Veste VIPER WORLDS — Bleu Navy", price: 20000, category: 'vestes',
    image: '/images/jacket bleu.jpeg', images: ['/images/jacket bleu.jpeg', '/images/jacket bleu.jpeg'],
    description: "Veste VIPER WORLDS bleu navy élégante, parfaite pour un look streetwear raffiné.",
    details: ['Tissu softshell imperméable', 'Capuche ajustable', 'Logo Viper brodé', 'Fermeture éclair premium'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'], badge: '🔥 Populaire', stock: 25, rating: 4.9, reviews: 112, color: 'Bleu Navy', colorHex: '#2c3e50'
  },
  {
    id: 105, name: "Veste VIPER WORLDS — Gris Perle", price: 20000, category: 'vestes',
    image: '/images/jacket gris.jpeg', images: ['/images/jacket gris.jpeg', '/images/jacket gris.jpeg'],
    description: "Veste VIPER WORLDS gris perle, sobre et technique.",
    details: ['Tissu softshell imperméable', 'Capuche ajustable', 'Logo Viper brodé', 'Fermeture éclair premium'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'], stock: 10, rating: 4.8, reviews: 65, color: 'Gris Perle', colorHex: '#c4c0ba'
  },
  {
    id: 106, name: "Veste VIPER WORLDS — Noir Onyx", price: 20000, category: 'vestes',
    image: '/images/jacket noire.jpeg', images: ['/images/jacket noire.jpeg', '/images/jacket noire.jpeg'],
    description: "Veste VIPER WORLDS noire onyx. L'incontournable de la collection.",
    details: ['Tissu softshell imperméable', 'Capuche ajustable', 'Logo Viper brodé', 'Fermeture éclair premium'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'], badge: 'Best-seller', stock: 5, rating: 5.0, reviews: 210, color: 'Noir Onyx', colorHex: '#1a1a1a'
  },

  // ——— BONNETS ———
  {
    id: 201, name: "Bonnet VIPER — Blanc et Noir", price: 5000, category: 'bonnets',
    image: '/images/bonnet blanc noir.jpeg', images: ['/images/bonnet blanc noir.jpeg'],
    description: "Bonnet en coton premium avec un style bicolore blanc et noir.",
    details: ['Coton premium 100%', 'Taille unique extensible', 'Lavable en machine'],
    sizes: ['Unique'], stock: 30, rating: 4.8, reviews: 40
  },
  {
    id: 202, name: "Bonnet VIPER — Blanc", price: 5000, category: 'bonnets',
    image: '/images/bonnet blanc.jpeg', images: ['/images/bonnet blanc.jpeg'],
    description: "Bonnet en coton premium blanc avec logo VIPER.",
    details: ['Coton premium 100%', 'Taille unique extensible', 'Lavable en machine'],
    sizes: ['Unique'], badge: '✨ Nouveau', stock: 25, rating: 4.7, reviews: 15
  },
  {
    id: 203, name: "Bonnet VIPER — Bleu", price: 5000, category: 'bonnets',
    image: '/images/bonnet bleu.jpeg', images: ['/images/bonnet bleu.jpeg'],
    description: "Bonnet en coton premium bleu pour un look coloré.",
    details: ['Coton premium 100%', 'Taille unique extensible', 'Lavable en machine'],
    sizes: ['Unique'], stock: 20, rating: 4.9, reviews: 55
  },
  {
    id: 204, name: "Bonnet VIPER — Noir et Bleu", price: 5000, category: 'bonnets',
    image: '/images/bonnet noire bleu.jpeg', images: ['/images/bonnet noire bleu.jpeg'],
    description: "Bonnet bicolore noir et bleu au design audacieux VIPER.",
    details: ['Coton premium 100%', 'Taille unique extensible', 'Lavable en machine'],
    sizes: ['Unique'], stock: 15, rating: 4.6, reviews: 22
  },
  {
    id: 205, name: "Bonnet VIPER — Noir", price: 5000, category: 'bonnets',
    image: '/images/bonnet noire.jpeg', images: ['/images/bonnet noire.jpeg'],
    description: "Le grand classique bonnet VIPER noir. S'accorde avec toutes vos tenues.",
    details: ['Coton premium 100%', 'Taille unique extensible', 'Lavable en machine'],
    sizes: ['Unique'], badge: 'Best-seller', stock: 50, rating: 5.0, reviews: 180
  },

  // ——— SACS ———
  {
    id: 301, name: "Sac VIPER — Noir et Bleu", price: 15000, category: 'sacs',
    image: '/images/sac noir bleu.jpeg', images: ['/images/sac noir bleu.jpeg'],
    description: "Sac VIPER pratique et robuste, design noir avec détails bleus.",
    details: ['Polyester 600D résistant', 'Bretelles réglables', 'Poches multiples'],
    stock: 20, rating: 4.7, reviews: 34
  },
  {
    id: 302, name: "Sac VIPER — Noir et Jaune", price: 15000, category: 'sacs',
    image: '/images/sac noir jaune.jpeg', images: ['/images/sac noir jaune.jpeg'],
    description: "Sac VIPER ultra stylé avec des touches de jaune vif.",
    details: ['Polyester 600D résistant', 'Bretelles réglables', 'Poches multiples'],
    badge: '✨ Nouveau', stock: 15, rating: 4.8, reviews: 21
  },
  {
    id: 303, name: "Sac VIPER — Noir et Rose", price: 15000, category: 'sacs',
    image: '/images/sac noir rose.jpeg', images: ['/images/sac noir rose.jpeg'],
    description: "Sac VIPER original et coloré en noir et rose.",
    details: ['Polyester 600D résistant', 'Bretelles réglables', 'Poches multiples'],
    stock: 12, rating: 4.9, reviews: 45
  },
  {
    id: 304, name: "Sac VIPER — Noir et Rouge", price: 15000, category: 'sacs',
    image: '/images/sac noir rouge.jpeg', images: ['/images/sac noir rouge.jpeg'],
    description: "Sac VIPER au style agressif, en noir et détails rouges.",
    details: ['Polyester 600D résistant', 'Bretelles réglables', 'Poches multiples'],
    stock: 18, rating: 4.8, reviews: 50
  },
  {
    id: 305, name: "Sac VIPER — Noir Classique", price: 15000, category: 'sacs',
    image: '/images/sac noire.jpeg', images: ['/images/sac noire.jpeg'],
    description: "Le sac VIPER noir classique, le compagnon de tous les jours.",
    details: ['Polyester 600D résistant', 'Bretelles réglables', 'Poches multiples'],
    badge: 'Best-seller', stock: 35, rating: 5.0, reviews: 205
  }
];
