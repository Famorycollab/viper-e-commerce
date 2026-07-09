import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { ShoppingBag, X, Plus, Minus, Trash2, Search, Menu, ChevronRight, Star, Truck, Shield, RefreshCw, Phone, Mail, MapPin, Heart, ArrowRight, Check, ChevronDown, Eye, ChevronUp, Clock, Package, Zap, Award, Edit } from 'lucide-react';
import { CartProvider, useCart } from './context/CartContext';
import { categories, jacketColors, type Product } from './data/products';

const formatPrice = (n: number) => n.toLocaleString('fr-FR') + ' FCFA';
const PHONE = '+223 99 17 25 03';
const WA = '22399172503';

/* —— Intersection Observer Hook —— */
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.unobserve(el); } },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

/* —— SVG Logo Viper —— */
function ViperMaskLogo({ size = 32, dark = true }: { size?: number; dark?: boolean }) {
  const c = dark ? '#1a1a1a' : '#fafaf8';
  const bg = dark ? '#fafaf8' : '#1a1a1a';
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Top crescent horn */}
      <path 
        d="M15 22 C30 35, 70 35, 85 22 C72 13, 28 13, 15 22 Z" 
        fill={c}
      />
      {/* Main Face Mask */}
      <path 
        d="M50 38 C42 38, 32 36, 26 33 C18 28, 10 24, 7 32 C3 42, 6 56, 17 62 C22 65, 27 63, 30 58 L32 88 C32 89.5, 33 90, 34.5 90 C36 90, 38 88.5, 38 87 L38 58 C38 56, 40 54, 43 54 L57 54 C60 54, 62 56, 62 58 L62 87 C62 88.5, 64 90, 65.5 90 C67 90, 68 89.5, 68 88 L70 58 C73 63, 78 65, 83 62 C94 56, 97 42, 93 32 C90 24, 82 28, 74 33 C68 36, 58 38, 50 38 Z" 
        fill={c}
      />
      {/* Eyes - Tilted angular cutouts */}
      <path 
        d="M32 45 L43 49 L43 44 L34 40 Z" 
        fill={bg}
      />
      <path 
        d="M68 45 L57 49 L57 44 L66 40 Z" 
        fill={bg}
      />
    </svg>
  );
}

/* —— Toast —— */
function Toast() {
  const { toast } = useCart();
  if (!toast) return null;
  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[60] animate-fade-down">
      <div className="bg-[#1a1a1a] text-[#fafaf8] px-5 py-2.5 rounded-full shadow-lg text-xs font-semibold flex items-center gap-2">
        <Check size={14}/>{toast}
      </div>
    </div>
  );
}

/* ——————————————————————————————————————————————————————————
   HEADER — Light Premium (Balenciaga-style)
   —————————————————————————————————————————————————————————— */
function Header({ onSearch, searchQuery, onMenu, onAdminClick }: { onSearch: (q: string) => void; searchQuery: string; onMenu: () => void; onAdminClick: () => void }) {
  const { totalItems, openCart } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(scrollY > 60);
    addEventListener('scroll', fn);
    return () => removeEventListener('scroll', fn);
  }, []);

  return (
    <header id="site-header" className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${scrolled ? 'scrolled' : ''}`}>
      {/* Announcement Bar */}
      <div className="announcement-bar overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee text-[#111111] text-[9px] font-semibold tracking-[0.2em] py-1.5">
          {[...[' — LIVRAISON GRATUITE DÈS 5 000 FCFA',' — NOUVELLE COLLECTION SKO\'S VIPER 2025',' — PAIEMENT À LA LIVRAISON DISPONIBLE',' — QUALITÉ PREMIUM BAMAKO, MALI',' — JACKETS IMPERMÉABLES & COUPE-VENT'],
            ...[' — LIVRAISON GRATUITE DÈS 5 000 FCFA',' — NOUVELLE COLLECTION SKO\'S VIPER 2025',' — PAIEMENT À LA LIVRAISON DISPONIBLE',' — QUALITÉ PREMIUM BAMAKO, MALI',' — JACKETS IMPERMÉABLES & COUPE-VENT']].join('')}
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Mobile menu */}
          <button onClick={onMenu} className="md:hidden p-2 text-[#1a1a1a]/60 hover:text-[#1a1a1a] transition" aria-label="Menu">
            <Menu size={20}/>
          </button>

          {/* Logo */}
          <a href="#accueil" className="flex items-center gap-2.5 group" aria-label="VIPER BOUTIQUE">
            <ViperMaskLogo size={40} dark={true}/>
            <span className="font-serif-display text-[15px] font-bold tracking-[0.2em] text-[#1a1a1a] uppercase">
              VIPER BOUTIQUE
            </span>
          </a>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Navigation principale">
            {[['Accueil','#accueil'],['Collection','#boutique'],['À Propos','#apropos'],['Contact','#contact']].map(([l,h]) => (
              <a key={l} href={h}
                className="luxury-link text-[11px] font-medium text-[#1a1a1a]/55 hover:text-[#1a1a1a] transition-colors tracking-[0.12em] uppercase">
                {l}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-0.5">
            <button onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-[#1a1a1a]/50 hover:text-[#1a1a1a] transition" aria-label="Rechercher">
              <Search size={17}/>
            </button>
            <button onClick={openCart}
              className="relative p-2 text-[#1a1a1a]/50 hover:text-[#1a1a1a] transition" aria-label="Panier">
              <ShoppingBag size={17}/>
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] bg-[#1a1a1a] rounded-full text-[9px] font-bold text-[#fafaf8] flex items-center justify-center animate-scale-in">
                  {totalItems}
                </span>
              )}
            </button>
            <button onClick={onAdminClick}
              className="hidden sm:inline-flex ml-2 items-center gap-1.5 bg-amber-100 text-[#8B6914] border border-amber-200 font-bold text-[10px] px-4 py-2.5 rounded-full hover:bg-amber-200 transition tracking-[0.15em] uppercase">
              <Shield size={13}/> Gestion
            </button>
            <a href="#boutique"
              className="hidden sm:inline-flex ml-2 bg-[#1a1a1a] text-[#fafaf8] font-bold text-[10px] px-5 py-2.5 rounded-full hover:bg-[#2d2d2d] transition tracking-[0.15em] uppercase">
              SHOP
            </a>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="pb-3 animate-fade-in">
            <div className="relative max-w-md mx-auto">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1a1a1a]/30"/>
              <input type="text" value={searchQuery} onChange={e => onSearch(e.target.value)}
                placeholder="Rechercher un produit..."
                className="w-full bg-[#f4f3f0] border border-[#1a1a1a]/10 rounded-full pl-9 pr-8 py-2 text-sm text-[#1a1a1a] placeholder-[#1a1a1a]/30 focus:outline-none focus:border-[#1a1a1a]/30 transition"
                autoFocus/>
              {searchQuery && (
                <button onClick={() => onSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1a1a1a]/30 hover:text-[#1a1a1a]">
                  <X size={13}/>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

/* —— MOBILE MENU —— */
function MobileMenu({ open, onClose, onAdminClick }: { open: boolean; onClose: () => void; onAdminClick: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-black/40 animate-fade-in" onClick={onClose}/>
      <div className="absolute left-0 inset-y-0 w-72 bg-[#fafaf8] border-r border-[#1a1a1a]/08 p-6 animate-slide-in-left shadow-xl">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2.5">
            <ViperMaskLogo size={24} dark={true}/>
            <span className="font-serif-display text-base font-bold tracking-[0.2em] text-[#1a1a1a] uppercase">VIPER WORLD</span>
          </div>
          <button onClick={onClose} className="text-[#1a1a1a]/40 hover:text-[#1a1a1a] transition"><X size={20}/></button>
        </div>
        <nav className="flex flex-col gap-0.5" aria-label="Navigation mobile">
          {[['Accueil','#accueil'],['Collection','#boutique'],['À Propos','#apropos'],['Contact','#contact']].map(([l,h]) => (
            <a key={l} href={h} onClick={onClose}
              className="text-sm text-[#1a1a1a]/65 hover:text-[#1a1a1a] py-3.5 border-b border-[#1a1a1a]/06 transition flex items-center justify-between font-medium tracking-wider uppercase">
              <span>{l}</span><ChevronRight size={14} className="text-[#1a1a1a]/20"/>
            </a>
          ))}
        </nav>
        <button onClick={() => { onAdminClick(); onClose(); }}
          className="mt-4 flex w-full items-center justify-between rounded-xl border border-[#8B6914]/20 bg-amber-50 px-3 py-3 text-sm font-semibold text-[#8B6914] transition hover:bg-amber-100">
          <span className="flex items-center gap-2"><Shield size={15}/> Gestion produits</span>
          <ChevronRight size={14}/>
        </button>
        <div className="mt-6 pt-4 border-t border-[#1a1a1a]/08 space-y-2">
          <a href={`tel:${PHONE}`} className="flex items-center gap-2 text-sm text-[#1a1a1a]/60">
            <Phone size={14}/>{PHONE}
          </a>
          <a href={`https://wa.me/${WA}`} className="flex items-center gap-2 text-sm text-green-600 font-medium">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

/* ——————————————————————————————————————————————————————————
   HERO — Balenciaga-Inspired Light Luxury
   —————————————————————————————————————————————————————————— */
const heroSlides = [
  { image: '/images/jacket gris.jpeg', title: "Gris Perle", subtitle: 'NOUVELLE COLLECTION 2025', label: 'Jacket Softshell', price: 20000, accent: '#c4c0ba' },
  { image: '/images/jacket baise.jpeg', title: "Beige Sable", subtitle: 'ÉLÉGANCE NATURELLE', label: 'Jacket Softshell', price: 20000, accent: '#c8b090' },
  { image: '/images/jacket blanc jaune.jpeg', title: "Blanc Jaune", subtitle: 'STYLE ORIGINAL', label: 'Jacket Softshell', price: 20000, accent: '#e0d0a0' },
  { image: '/images/jacket bleu.jpeg', title: "Bleu Navy", subtitle: 'STYLE TACTIQUE URBAIN', label: 'Jacket Softshell', price: 20000, accent: '#2c3e50' },
  { image: '/images/sac noire.jpeg', title: "Tactical Noir", subtitle: 'SAC SIGNATURE VIPER', label: 'Sac à Dos Premium', price: 15000, accent: '#3a3a3a' },
];

function Hero() {
  const [ok, setOk] = useState(false);
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval>|null>(null);

  useEffect(() => { setTimeout(() => setOk(true), 80); }, []);

  const goTo = useCallback((idx: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(idx);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const slide = heroSlides[current];

  return (
    <section id="accueil" className="relative min-h-screen flex flex-col pt-[90px] hero-gradient" aria-label="Section héro">
      
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.025]"
        style={{backgroundImage:'radial-gradient(circle at 1px 1px,#1a1a1a 1px,transparent 0)',backgroundSize:'28px 28px'}}/>

      {/* Main hero layout */}
      <div className="flex-1 max-w-[1400px] mx-auto px-6 sm:px-10 w-full relative z-10 flex flex-col lg:flex-row items-center gap-0 min-h-[82vh]">

        {/* LEFT — Brand + Text */}
        <div className={`w-full lg:w-[44%] flex flex-col justify-center pt-10 pb-8 lg:py-20 transition-all duration-700 ${ok ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Brand tag */}
          <div className="flex items-center gap-2 mb-10">
            <div className="w-8 h-px bg-[#1a1a1a]/30"/>
            <span className="text-[#1a1a1a]/45 text-[9px] font-bold tracking-[0.4em] uppercase">VIPER WORLD — Bamako</span>
          </div>

          {/* Collection label */}
          <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-[#8B6914] mb-4">
            {slide.subtitle}
          </span>

          {/* Product title - massive */}
          <h1 className="font-serif-display text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-bold text-[#1a1a1a] leading-[0.95] tracking-tight mb-2">
            {slide.label}
          </h1>
          <h2 className="font-serif-display text-4xl sm:text-5xl md:text-6xl lg:text-[62px] font-light text-[#1a1a1a]/40 leading-[1] tracking-tight mb-5">
            {slide.title}
          </h2>
          <p className="max-w-xl text-[#1a1a1a]/65 text-sm leading-relaxed mb-8">
            Commandez facilement via WhatsApp et recevez votre produit à Bamako. Paiement à la livraison disponible.
          </p>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-8">
            <span className="text-2xl font-bold text-[#1a1a1a] tracking-tight">
              {formatPrice(slide.price)}
            </span>
            {slide.price >= 15000 && (
              <span className="text-sm text-[#1a1a1a]/35 line-through font-light">
                {formatPrice(slide.price + 3000)}
              </span>
            )}
            {slide.price >= 15000 && (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                −17%
              </span>
            )}
          </div>

          {/* CTA */}
          <div className="flex flex-wrap gap-3 mb-10">
            <a href={`https://wa.me/${WA}?text=${encodeURIComponent(`Bonjour VIPER WORLD, je souhaite commander : ${slide.label} ${slide.title}.`)}`}
              target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-full text-[11px] font-bold tracking-[0.15em] uppercase">
              COMMANDER SUR WHATSAPP <ArrowRight size={14}/>
            </a>
            <a href="#featured"
              className="btn-outline inline-flex items-center gap-2 px-8 py-4 rounded-full text-[11px] font-bold tracking-[0.15em] uppercase">
              DÉCOUVRIR
            </a>
          </div>

          {/* Slides navigation */}
          <div className="flex gap-2">
            {heroSlides.map((_, i) => (
              <button key={i} onClick={() => goTo(i)}
                className={`hero-dot transition-all`}
                style={i === current ? {background:'#1a1a1a', width:'28px', borderRadius:'4px'} : {}}
                aria-label={`Slide ${i + 1}`}/>
            ))}
          </div>
        </div>

        {/* RIGHT — Product image */}
        <div className={`w-full lg:w-[56%] h-[50vh] lg:h-full lg:min-h-[82vh] relative flex items-center justify-center transition-all duration-700 ${ok ? 'opacity-100' : 'opacity-0'}`}>
          
          {/* Color accent blob */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background:`radial-gradient(ellipse 65% 65% at 55% 50%,${slide.accent}20 0%,transparent 70%)`
          }}/>

          {/* Product images carousel */}
          <div className="relative w-full h-full flex items-center justify-center p-8 lg:p-12">
            {heroSlides.map((s, i) => (
              <div key={i} className={`absolute inset-0 flex items-center justify-center p-8 lg:p-16 transition-all duration-800 ${i === current ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
                style={{transitionDuration:'700ms'}}>
                <img
                  src={s.image}
                  alt={`${s.label} ${s.title}`}
                  className="w-full h-full object-contain rounded-[2rem] bg-white shadow-[0_50px_120px_rgba(17,17,17,0.08)]"
                  style={{
                    filter:'drop-shadow(0 30px 60px rgba(0,0,0,0.14)) drop-shadow(0 10px 25px rgba(0,0,0,0.08))',
                    maxHeight:'72vh'
                  }}
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
              </div>
            ))}
          </div>

          {/* Side label vertical */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4">
            <div className="w-px h-16 bg-[#1a1a1a]/10"/>
            <span className="text-[9px] text-[#1a1a1a]/30 font-bold tracking-[0.35em] uppercase" style={{writingMode:'vertical-rl',textOrientation:'mixed'}}>
              VIPER WORLD — Mali
            </span>
            <div className="w-px h-16 bg-[#1a1a1a]/10"/>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="flex flex-col items-center pb-6 relative z-10 pointer-events-none">
        <div className="w-px h-12 bg-gradient-to-b from-[#1a1a1a]/20 to-transparent"/>
        <span className="text-[8px] text-[#1a1a1a]/30 tracking-[0.3em] uppercase mt-2">Défilez</span>
      </div>
    </section>
  );
}

/* —— Features Bar —— */
function Features() {
  return (
    <section className="border-y border-[#1a1a1a]/06 bg-[#f4f3f0]" aria-label="Avantages">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 py-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {i:Truck,t:'Livraison Rapide',d:'Partout à Bamako'},
            {i:Shield,t:'Qualité Premium',d:'Matériaux sélectionnés'},
            {i:RefreshCw,t:'Retours 14 jours',d:'Satisfait ou remboursé'},
            {i:Package,t:'Paiement Livraison',d:'Payez à la réception'}
          ].map(({i:I,t,d}) => (
            <div key={t} className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-full border border-[#1a1a1a]/10 flex items-center justify-center shrink-0 group-hover:border-[#1a1a1a]/30 transition bg-white">
                <I size={14} className="text-[#1a1a1a]/60"/>
              </div>
              <div>
                <p className="text-[11px] font-semibold text-[#1a1a1a]">{t}</p>
                <p className="text-[9px] text-[#1a1a1a]/40">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceHighlights() {
  return (
    <section className="py-20 bg-[#fafaf8]" aria-label="Pourquoi choisir VIPER WORLD">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[9px] font-bold tracking-[0.45em] uppercase text-[#8B6914] mb-3 block">Service premium</span>
          <h2 className="font-serif-display text-3xl md:text-4xl text-[#1a1a1a] font-semibold">Une expérience shopping simple, rapide et fiable</h2>
          <p className="text-[#1a1a1a]/55 text-sm mt-4 leading-relaxed">Des produits sélectionnés avec soin, un service réactif et une livraison efficace à Bamako pour vous offrir un shopping fluide.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Truck, title: 'Livraison rapide', text: 'Expédition et livraison efficace sur Bamako pour un suivi sans stress.' },
            { icon: Shield, title: 'Qualité garantie', text: 'Des matières soigneusement choisies pour une durabilité et un confort premium.' },
            { icon: Phone, title: 'Service client réactif', text: 'Un accompagnement rapide via WhatsApp pour toutes vos questions et commandes.' }
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl border border-[#1a1a1a]/08 bg-white p-6 shadow-sm">
              <div className="w-11 h-11 rounded-full bg-[#f4f3f0] flex items-center justify-center mb-4">
                <Icon size={18} className="text-[#1a1a1a]" />
              </div>
              <h3 className="font-serif-display text-xl text-[#1a1a1a] font-semibold mb-2">{title}</h3>
              <p className="text-sm text-[#1a1a1a]/55 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ——————————————————————————————————————————————————————————
   FEATURED PRODUCT — Jacket Showcase
   —————————————————————————————————————————————————————————— */
function FeaturedProduct() {
  const { addToCart, productsList } = useCart();
  const [activeColor, setActiveColor] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [size, setSize] = useState('M');
  const ref = useReveal(0.08);

  const color = jacketColors[activeColor];
  const jacket = productsList.find(p => p.id === 101 + activeColor);

  

  const handleColorChange = (idx: number) => {
    setImgLoaded(false);
    setActiveColor(idx);
  };

  return (
    <section id="featured" className="py-24 featured-gradient" aria-label="Produit vedette">
      <div ref={ref} className="reveal max-w-[1400px] mx-auto px-6 sm:px-10">
        {/* Header */}
        <div className="mb-16">
          <span className="text-[9px] font-bold tracking-[0.45em] uppercase text-[#8B6914] mb-3 block">Collection Vedette</span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="font-serif-display text-4xl md:text-5xl lg:text-6xl text-[#1a1a1a] font-bold">
              Jackets <span className="text-gradient-gold">VIPER WORLD</span>
            </h2>
            <p className="text-[#1a1a1a]/45 text-sm max-w-xs">Technique premium. Imperméable, coupe-vent, et style unique.</p>
          </div>
          <div className="w-20 h-px bg-[#1a1a1a]/12 mt-5"/>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Image */}
          <div className="relative">
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Clean white background for product */}
              <div className="absolute inset-0 bg-white rounded-3xl shadow-lg"/>
              <div className="absolute inset-0 rounded-3xl" style={{background:`radial-gradient(ellipse 70% 70% at 50% 45%,${color.hex}15 0%,transparent 70%)`}}/>
              
              <div className="relative w-full h-full p-10">
                <img
                  key={color.id}
                  src={color.image}
                  alt={`Jacket VIPER WORLD ${color.name}`}
                  className={`w-full h-full object-cover transition-all duration-600 ${imgLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
                  onLoad={() => setImgLoaded(true)}
                  style={{filter:'drop-shadow(0 20px 40px rgba(0,0,0,0.12))'}}
                />
                {!imgLoaded && <div className="absolute inset-0 skeleton rounded-2xl"/>}
              </div>

              {/* Badge */}
              <div className="absolute top-5 left-5 badge-premium animate-bounce-subtle">✨ NOUVEAU</div>

              {/* Sale tag */}
              {jacket && jacket.oldPrice && (
                <div className="absolute top-5 right-5 bg-emerald-700 text-white text-[9px] font-bold px-3 py-1 rounded-full tracking-wider">
                  −{Math.round((1 - jacket.price / jacket.oldPrice) * 100)}%
                </div>
              )}
            </div>
          </div>

          {/* Right — Info */}
          <div className="space-y-7">
            <div>
              <p className="text-[10px] font-bold tracking-[0.35em] uppercase text-[#8B6914] mb-2">Collection Premium</p>
              <h3 className="font-serif-display text-3xl md:text-4xl text-[#1a1a1a] font-semibold leading-tight">
                Jacket VIPER WORLD
              </h3>
              <p className="text-[#1a1a1a]/40 mt-1 font-serif-display text-xl">{color.name}</p>
            </div>

            {/* Stars */}
            <div className="flex items-center gap-2">
              <div className="flex">{[...Array(5)].map((_,i) => <Star key={i} size={14} className="text-[#8B6914] fill-[#8B6914]"/>)}</div>
              <span className="text-[11px] text-[#1a1a1a]/45">{jacket?.rating || 4.9} · {(jacket?.reviews || 87)}+ avis vérifiés</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="font-serif-display text-4xl text-[#1a1a1a] font-bold">{jacket ? formatPrice(jacket.price) : formatPrice(20000)}</span>
              {jacket?.oldPrice && (
                <span className="text-base text-[#1a1a1a]/30 line-through">{formatPrice(jacket.oldPrice)}</span>
              )}
            </div>

            {/* Color */}
            <div>
              <p className="text-[10px] font-bold text-[#1a1a1a]/50 tracking-widest uppercase mb-3">
                Couleur — <span className="text-[#1a1a1a]">{color.name}</span>
              </p>
              <div className="flex gap-3">
                {jacketColors.map((c, i) => (
                  <button key={c.id} onClick={() => handleColorChange(i)}
                    className={`color-swatch ${i === activeColor ? 'active' : ''}`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}/>
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <p className="text-[10px] font-bold text-[#1a1a1a]/50 tracking-widest uppercase mb-2.5">Taille</p>
              <div className="flex gap-2">
                {['S','M','L','XL','XXL'].map(s => (
                  <button key={s} onClick={() => setSize(s)}
                    className={`w-11 h-11 rounded-xl border text-[11px] font-semibold transition-all ${size === s ? 'bg-[#1a1a1a] border-[#1a1a1a] text-[#fafaf8] scale-105' : 'border-[#1a1a1a]/15 text-[#1a1a1a]/55 hover:border-[#1a1a1a]/35 hover:text-[#1a1a1a] bg-white'}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-2.5">
              {[{icon:Shield,text:'Imperméable'},{icon:Zap,text:'Coupe-vent'},{icon:Award,text:'Premium'},{icon:RefreshCw,text:'Retour 14j'}]
                .map(({icon:I,text}) => (
                  <div key={text} className="flex items-center gap-2 text-[#1a1a1a]/50">
                    <div className="w-7 h-7 rounded-lg border border-[#1a1a1a]/08 bg-white flex items-center justify-center">
                      <I size={12} className="text-[#8B6914]"/>
                    </div>
                    <span className="text-[11px]">{text}</span>
                  </div>
                ))}
            </div>

            {/* CTA */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => { if (jacket) addToCart(jacket, 1, size); }}
                className="flex-1 btn-primary py-4 rounded-full text-[11px] tracking-[0.15em] uppercase font-bold flex items-center justify-center gap-2">
                <ShoppingBag size={15}/> Ajouter au panier
              </button>
              <a href={`https://wa.me/${WA}?text=${encodeURIComponent(`Bonjour VIPER WORLD,\n\nJe suis intéressé(e) par l'article suivant :\n• Produit : Jacket VIPER WORLD ${color.name}\n• Taille : ${size}\n\nPourriez-vous me confirmer sa disponibilité ?`)}`}
                target="_blank" rel="noopener noreferrer"
                className="w-14 h-14 border border-green-300 bg-green-50 rounded-full flex items-center justify-center text-green-600 hover:bg-green-100 transition-all">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* —— Categories —— */
function Categories({ onSelect }: { onSelect: (id: string) => void }) {
  const ref = useReveal();
  const { productsList } = useCart();
  return (
    <section className="py-20 bg-[#fafaf8]" aria-label="Catégories">
      <div ref={ref} className="reveal max-w-[1400px] mx-auto px-6 sm:px-10">
        <div className="mb-12">
          <span className="text-[9px] font-bold tracking-[0.45em] uppercase text-[#8B6914] mb-3 block">Explorer</span>
          <h2 className="font-serif-display text-3xl md:text-4xl text-[#1a1a1a] font-semibold">Nos Catégories</h2>
          <div className="w-16 h-px bg-[#1a1a1a]/10 mt-4"/>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 stagger-children visible">
          {categories.filter(c => c.id !== 'all').map(c => (
            <button key={c.id}
              onClick={() => { onSelect(c.id); document.getElementById('boutique')?.scrollIntoView({behavior:'smooth'}); }}
              className="group bg-[#f4f3f0] border border-[#1a1a1a]/05 rounded-2xl p-5 text-left hover:bg-white hover:border-[#1a1a1a]/10 card-lift transition-all">
              <span className="text-3xl block mb-2">{c.emoji}</span>
              <h3 className="font-serif-display text-lg text-[#1a1a1a] font-semibold">{c.name}</h3>
              <p className="text-[9px] text-[#1a1a1a]/35 mt-0.5 tracking-wide">{productsList.filter(p => p.category === c.id).length} produits</p>
              <ChevronRight className="mt-2 text-[#1a1a1a]/15 group-hover:text-[#1a1a1a]/40 group-hover:translate-x-1 transition-all" size={14}/>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* —— Product Card —— */
function ProductCard({ product, onView }: { product: Product; onView: (p: Product) => void }) {
  const { addToCart, toggleWishlist, isWished } = useCart();
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="card-lift card-glow bg-white rounded-3xl border border-[#1a1a1a]/08 overflow-hidden group hover:border-[#1a1a1a]/12 transition-all">
      <div className="relative aspect-square img-zoom cursor-pointer bg-white" onClick={() => onView(product)}>
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
        />
        {!imgLoaded && <div className="absolute inset-0 skeleton"/>}
        {product.badge && (
          <div className="absolute top-2.5 left-2.5 badge-premium">{product.badge}</div>
        )}
        <button
          onClick={e => { e.stopPropagation(); toggleWishlist(product.id); }}
          className="absolute top-2.5 right-2.5 w-7 h-7 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition shadow-sm"
          aria-label="Ajouter aux favoris">
          <Heart size={12} className={isWished(product.id) ? 'text-red-500 fill-red-500' : 'text-[#1a1a1a]/50'}/>
        </button>
        <div className="absolute inset-x-2.5 bottom-2.5 flex gap-1.5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={e => { e.stopPropagation(); addToCart(product); }}
            className="flex-1 bg-[#1a1a1a] text-[#fafaf8] font-bold py-2 rounded-full text-[10px] tracking-wider uppercase hover:bg-[#2d2d2d] transition">
            Ajouter
          </button>
          <button
            onClick={e => { e.stopPropagation(); onView(product); }}
            className="w-8 h-8 bg-[#1a1a1a]/90 rounded-full flex items-center justify-center text-[#fafaf8] hover:bg-[#1a1a1a] transition shrink-0">
            <Eye size={12}/>
          </button>
        </div>
      </div>
      <div className="p-3.5 bg-[#f5f4f0]">
        <div className="flex items-center gap-0.5 mb-1">
          {[...Array(5)].map((_,i) => <Star key={i} size={9} className={i < Math.round(product.rating) ? 'text-[#8B6914] fill-[#8B6914]' : 'text-[#1a1a1a]/10'}/>)}
          <span className="text-[8px] text-[#1a1a1a]/30 ml-1">({product.reviews})</span>
        </div>
        <h3 className="font-medium text-[#1a1a1a] text-[13px] leading-snug mb-1 line-clamp-1">{product.name}</h3>
        {product.color && <p className="text-[9px] text-[#1a1a1a]/35 mb-0.5">Coloris : {product.color}</p>}
        <div className="flex items-center gap-2">
          <span className="font-serif-display text-base text-[#1a1a1a] font-semibold">{formatPrice(product.price)}</span>
          {product.oldPrice && <span className="text-[10px] text-[#1a1a1a]/30 line-through">{formatPrice(product.oldPrice)}</span>}
        </div>
      </div>
    </div>
  );
}

/* —— Product Modal —— */
function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const { addToCart, toggleWishlist, isWished } = useCart();
  const [size, setSize] = useState(product.sizes?.[0]);
  const [qty, setQty] = useState(1);
  const [imgIdx, setImgIdx] = useState(0);
  const imgs = product.images.length > 0 ? product.images : [product.image];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"/>
      <div className="relative bg-[#fafaf8] border border-[#1a1a1a]/08 rounded-2xl w-full max-w-4xl max-h-[92vh] overflow-y-auto animate-scale-in shadow-2xl" onClick={e => e.stopPropagation()}>
        <button onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 bg-[#1a1a1a]/08 rounded-full flex items-center justify-center text-[#1a1a1a]/50 hover:text-[#1a1a1a] hover:bg-[#1a1a1a]/12 transition">
          <X size={15}/>
        </button>
        <div className="grid md:grid-cols-2">
          {/* Images */}
          <div className="p-4 md:p-6 bg-white rounded-l-2xl">
            <div className="aspect-square bg-white rounded-xl overflow-hidden mb-2">
              <img src={imgs[imgIdx]} alt={product.name} className="w-full h-full object-contain p-4 transition-opacity duration-500"/>
            </div>
            {imgs.length > 1 && (
              <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
                {imgs.map((im,i) => (
                  <button key={i} onClick={() => setImgIdx(i)}
                    className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition shrink-0 ${i === imgIdx ? 'border-[#1a1a1a]' : 'border-transparent opacity-50 hover:opacity-80'}`}>
                    <img src={im} alt="" className="w-full h-full object-contain bg-white p-1"/>
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* Info */}
          <div className="p-5 md:p-6 border-t md:border-t-0 md:border-l border-[#1a1a1a]/06">
            {product.badge && (
              <span className="inline-block bg-[#1a1a1a] text-[#fafaf8] text-[8px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full mb-2">{product.badge}</span>
            )}
            <h2 className="font-serif-display text-xl md:text-2xl text-[#1a1a1a] font-semibold mb-1.5">{product.name}</h2>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex">{[...Array(5)].map((_,i) => <Star key={i} size={11} className={i < Math.round(product.rating) ? 'text-[#8B6914] fill-[#8B6914]' : 'text-[#1a1a1a]/10'}/>)}</div>
              <span className="text-[10px] text-[#1a1a1a]/40">{product.rating} · {product.reviews} avis</span>
            </div>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-2xl font-serif-display text-[#1a1a1a] font-semibold">{formatPrice(product.price)}</span>
              {product.oldPrice && <span className="text-sm text-[#1a1a1a]/30 line-through">{formatPrice(product.oldPrice)}</span>}
            </div>
            <p className="text-[13px] text-[#1a1a1a]/55 leading-relaxed mb-4">{product.description}</p>
            
            {/* Details */}
            <div className="mb-4">
              <p className="text-[9px] font-bold text-[#1a1a1a]/50 tracking-widest uppercase mb-1.5">Détails</p>
              <ul className="space-y-1">
                {product.details.map((d,i) => (
                  <li key={i} className="flex items-start gap-2 text-[11px] text-[#1a1a1a]/55">
                    <Check size={11} className="text-[#8B6914] mt-0.5 shrink-0"/>{d}
                  </li>
                ))}
              </ul>
            </div>

            {/* Sizes */}
            {product.sizes && product.sizes.length > 1 && (
              <div className="mb-3">
                <p className="text-[9px] font-bold text-[#1a1a1a]/50 tracking-widest uppercase mb-1.5">Taille</p>
                <div className="flex gap-1.5 flex-wrap">
                  {product.sizes.map(s => (
                    <button key={s} onClick={() => setSize(s)}
                      className={`w-10 h-10 rounded-lg border text-[11px] font-semibold transition ${size === s ? 'bg-[#1a1a1a] border-[#1a1a1a] text-[#fafaf8]' : 'border-[#1a1a1a]/15 text-[#1a1a1a]/55 hover:border-[#1a1a1a]/35 bg-white'}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Qty */}
            <div className="mb-4">
              <p className="text-[9px] font-bold text-[#1a1a1a]/50 tracking-widest uppercase mb-1.5">Quantité</p>
              <div className="flex items-center gap-2">
                <button onClick={() => setQty(Math.max(1,qty-1))}
                  className="w-8 h-8 bg-[#f4f3f0] border border-[#1a1a1a]/10 rounded-lg flex items-center justify-center text-[#1a1a1a]/60 hover:border-[#1a1a1a]/25 transition">
                  <Minus size={13}/>
                </button>
                <span className="w-8 text-center font-semibold text-[#1a1a1a] text-sm">{qty}</span>
                <button onClick={() => setQty(Math.min(product.stock,qty+1))}
                  className="w-8 h-8 bg-[#f4f3f0] border border-[#1a1a1a]/10 rounded-lg flex items-center justify-center text-[#1a1a1a]/60 hover:border-[#1a1a1a]/25 transition">
                  <Plus size={13}/>
                </button>
                <span className="text-[9px] text-[#1a1a1a]/35 ml-1">{product.stock} dispo</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button onClick={() => { addToCart(product,qty,size); onClose(); }}
                className="flex-1 btn-primary py-3 rounded-full text-[11px] tracking-wider uppercase font-bold flex items-center justify-center gap-2">
                <ShoppingBag size={14}/> Ajouter — {formatPrice(product.price*qty)}
              </button>
              <button onClick={() => toggleWishlist(product.id)}
                className={`w-11 h-11 border rounded-full flex items-center justify-center transition ${isWished(product.id) ? 'bg-red-50 border-red-200 text-red-500' : 'border-[#1a1a1a]/10 text-[#1a1a1a]/40 hover:text-red-500 hover:border-red-200 bg-white'}`}
                aria-label="Favoris">
                <Heart size={15} className={isWished(product.id) ? 'fill-red-500' : ''}/>
              </button>
            </div>

            <div className="mt-4 pt-4 border-t border-[#1a1a1a]/06 grid grid-cols-2 gap-1.5">
              {[{i:Truck,t:'Livraison 24-48h'},{i:Shield,t:'Qualité garantie'},{i:RefreshCw,t:'Retour 14 jours'},{i:Clock,t:'Support WhatsApp'}].map(({i:I,t}) => (
                <div key={t} className="flex items-center gap-1.5 text-[#1a1a1a]/40">
                  <I size={11} className="text-[#8B6914]"/>
                  <span className="text-[9px]">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* —— Shop / Products Section —— */
function Shop({ category, setCategory, search }: { category: string; setCategory: (c: string) => void; search: string }) {
  const [modal, setModal] = useState<Product|null>(null);
  const [sort, setSort] = useState('default');
  const ref = useReveal(0.05);
  const { productsList } = useCart();

  const filtered = useMemo(() => {
    let r = [...productsList];
    if (category !== 'all') r = r.filter(p => p.category === category);
    if (search) { const q = search.toLowerCase(); r = r.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)); }
    if (sort === 'price-asc') r.sort((a,b) => a.price - b.price);
    if (sort === 'price-desc') r.sort((a,b) => b.price - a.price);
    if (sort === 'rating') r.sort((a,b) => b.rating - a.rating);
    return r;
  }, [category, search, sort, productsList]);

  return (
    <section id="boutique" className="py-20 bg-white" aria-label="Boutique">
      <div ref={ref} className="reveal max-w-[1400px] mx-auto px-6 sm:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-[9px] font-bold tracking-[0.45em] uppercase text-[#8B6914] mb-2 block">Collection</span>
            <h2 className="font-serif-display text-3xl md:text-4xl text-[#1a1a1a] font-semibold">Notre Boutique</h2>
            <div className="w-12 h-px bg-[#1a1a1a]/10 mt-3"/>
            <p className="text-[#1a1a1a]/40 mt-2 text-xs">{filtered.length} produit{filtered.length !== 1 ? 's' : ''}</p>
          </div>
          <div className="relative">
            <select value={sort} onChange={e => setSort(e.target.value)}
              className="appearance-none bg-[#f4f3f0] border border-[#1a1a1a]/08 rounded-full px-4 py-2 pr-8 text-[10px] text-[#1a1a1a]/65 focus:outline-none focus:border-[#1a1a1a]/20 cursor-pointer tracking-wider">
              <option value="default">Trier par</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="rating">Mieux notés</option>
            </select>
            <ChevronDown size={11} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1a1a1a]/35 pointer-events-none"/>
          </div>
        </div>

        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3 mb-8">
          {categories.map(c => (
            <button key={c.id} onClick={() => setCategory(c.id)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-[10px] font-semibold tracking-wider uppercase transition-all ${category === c.id ? 'bg-[#1a1a1a] text-[#fafaf8]' : 'bg-[#f4f3f0] border border-[#1a1a1a]/06 text-[#1a1a1a]/55 hover:text-[#1a1a1a] hover:border-[#1a1a1a]/15'}`}>
              {c.emoji} {c.name}
            </button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 stagger-children visible">
            {filtered.map(p => <ProductCard key={p.id} product={p} onView={setModal}/>)}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-[#1a1a1a]/25 text-sm">Aucun produit trouvé</p>
            <button onClick={() => setCategory('all')} className="mt-3 text-[#8B6914] text-xs font-semibold hover:underline">
              Voir tout
            </button>
          </div>
        )}
      </div>
      {modal && <ProductModal product={modal} onClose={() => setModal(null)}/>}
    </section>
  );
}

/* —— About —— */
function About() {
  const ref = useReveal();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    // Attempt to play; if blocked, ensure muted and retry
    const p = v.play();
    if (p && typeof p.catch === 'function') {
      p.catch(() => {
        try { v.muted = true; v.play().catch(() => {}); } catch (e) {}
      });
    }
  }, []);
  return (
    <section id="apropos" className="py-20 bg-[#f4f3f0] relative overflow-hidden" aria-label="À propos">
      <div ref={ref} className="reveal max-w-[1400px] mx-auto px-6 sm:px-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[9px] font-bold tracking-[0.45em] uppercase text-[#8B6914] mb-3 block">Notre Histoire</span>
            <h2 className="font-serif-display text-3xl md:text-4xl text-[#1a1a1a] font-semibold mt-1 mb-5">
              L'esprit <span className="text-gradient-gold italic">Viper</span>
            </h2>
            <div className="w-12 h-px bg-[#1a1a1a]/12 mb-5"/>
            <p className="text-[#1a1a1a]/60 leading-relaxed mb-3 text-sm">
              VIPER WORLD est une marque de streetwear premium née à Bamako, Mali. Créée par des passionnés de culture urbaine, chaque pièce est conçue pour affirmer votre style avec élégance.
            </p>
            <p className="text-[#1a1a1a]/50 leading-relaxed mb-8 text-sm">
              Des jackets techniques VIPER WORLD aux sacs tactiques — nous combinons qualité premium et accessibilité, tout en restant fidèles à l'identité africaine contemporaine.
            </p>
            <div className="grid grid-cols-3 gap-3">
              {[{n:'1000+',l:'Clients satisfaits'},{n:'12+',l:'Références'},{n:'4.9',l:'Note sur 5'}].map(({n,l}) => (
                <div key={l} className="text-center bg-white rounded-xl p-4 border border-[#1a1a1a]/06 hover:border-[#1a1a1a]/12 transition">
                  <p className="font-serif-display text-2xl text-[#1a1a1a] font-bold">{n}</p>
                  <p className="text-[8px] text-[#1a1a1a]/40 mt-0.5 tracking-wider uppercase">{l}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[5/6] max-h-[520px] rounded-2xl overflow-hidden bg-black shadow-lg">
              <video
                ref={videoRef}
                src="/videos/viper-spirit.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/videos/viper-spirit.mp4" type="video/mp4" />
                <img src="/images/jacket-real.jpeg" alt="Jacket VIPER WORLD Collection" className="w-full h-full object-cover" />
              </video>
            </div>
            {/* Floating info card */}
            <div className="absolute bottom-5 left-5 right-5 bg-white/90 backdrop-blur-sm border border-[#1a1a1a]/08 rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <ViperMaskLogo size={28} dark={true}/>
                <div>
                  <p className="font-serif-display text-sm text-[#1a1a1a] font-semibold">VIPER WORLD</p>
                  <p className="text-[9px] text-[#1a1a1a]/40 tracking-wider uppercase">Bamako, Mali — Premium Streetwear</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* —— Testimonials —— */
function Testimonials() {
  const ref = useReveal();
  return (
    <section className="py-20 bg-white" aria-label="Témoignages">
      <div ref={ref} className="reveal max-w-[1400px] mx-auto px-6 sm:px-10">
        <div className="mb-12">
          <span className="text-[9px] font-bold tracking-[0.45em] uppercase text-[#8B6914] mb-3 block">Avis Clients</span>
          <h2 className="font-serif-display text-3xl md:text-4xl text-[#1a1a1a] font-semibold">Ils adorent VIPER WORLD</h2>
          <div className="w-12 h-px bg-[#1a1a1a]/10 mt-4"/>
        </div>
        <div className="grid md:grid-cols-3 gap-5 stagger-children visible">
          {[
            {n:'Amadou D.',t:'La veste VIPER WORLD est incroyable ! Qualité premium, coupe parfaite et le logo est magnifique. La meilleure veste que j\'ai eue.',r:5,item:'Veste Gris Perle'},
            {n:'Fatou N.',t:'Le sac Tactical est solide et stylé. Parfait pour mes cours. J\'ai aussi pris un bonnet, je suis fan de la marque !',r:5,item:'Sac Tactical'},
            {n:'Ibrahima S.',t:'Enfin du vrai streetwear au Mali ! Les vestes sont imperméables et le design est unique. Service client au top via WhatsApp.',r:5,item:'Veste Vert Olive'},
          ].map((r,i) => (
            <div key={i} className="bg-[#f5f4f0] rounded-2xl p-6 hover:bg-white hover:shadow-md transition-all duration-300 border border-[#1a1a1a]/04 hover:border-[#1a1a1a]/08 card-lift">
              <div className="flex gap-0.5 mb-4">{[...Array(r.r)].map((_,j) => <Star key={j} size={12} className="text-[#8B6914] fill-[#8B6914]"/>)}</div>
              <p className="text-[#1a1a1a]/65 font-cormorant text-[15px] italic leading-relaxed mb-4">"{r.t}"</p>
              <div className="flex items-center justify-between">
                <p className="text-[#1a1a1a] text-[11px] font-semibold">— {r.n}</p>
                <span className="text-[8px] text-[#8B6914] bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100 tracking-wider uppercase">{r.item}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* —— Newsletter —— */
function Newsletter() {
  const [email, setEmail] = useState('');
  const [ok, setOk] = useState(false);
  const ref = useReveal();
  return (
    <section className="py-16 bg-[#1a1a1a]" aria-label="Newsletter">
      <div ref={ref} className="reveal max-w-lg mx-auto px-4 text-center">
        <span className="text-[#fafaf8]/40 text-[9px] font-medium tracking-[.4em] uppercase">Newsletter</span>
        <h2 className="font-serif-display text-3xl text-[#fafaf8] font-semibold mt-1 mb-2">Reste connecté</h2>
        <div className="w-10 h-px bg-[#fafaf8]/15 mx-auto mb-4"/>
        <p className="text-[#fafaf8]/45 mb-6 text-sm">Reçois les nouveautés et offres exclusives en premier.</p>
        {ok ? (
          <div className="bg-white/08 border border-white/10 rounded-2xl p-5 animate-scale-in">
            <Check className="mx-auto text-emerald-400 mb-2" size={24}/>
            <p className="text-[#fafaf8] font-semibold text-sm">Merci ! Tu es inscrit 🎉</p>
          </div>
        ) : (
          <form onSubmit={e => { e.preventDefault(); if (email) setOk(true); }}
            className="flex flex-col sm:flex-row gap-2 max-w-sm mx-auto">
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="Ton adresse email..."
              required
              className="flex-1 bg-white/08 border border-white/10 rounded-full px-5 py-2.5 text-sm text-[#fafaf8] placeholder-[#fafaf8]/30 focus:outline-none focus:border-white/25 transition"/>
            <button type="submit"
              className="bg-[#fafaf8] text-[#1a1a1a] font-bold px-5 py-2.5 rounded-full text-[10px] tracking-wider uppercase hover:bg-white transition">
              S'inscrire
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

/* —— Contact —— */
function Contact() {
  const [form, setForm] = useState({name:'',email:'',phone:'',msg:''});
  const [sent, setSent] = useState(false);
  const ref = useReveal();
  return (
    <section id="contact" className="py-20 bg-[#f4f3f0]" aria-label="Contact">
      <div ref={ref} className="reveal max-w-[1400px] mx-auto px-6 sm:px-10">
        <div className="mb-12 text-center">
          <span className="text-[9px] font-bold tracking-[0.45em] uppercase text-[#8B6914] mb-3 block">Contact</span>
          <h2 className="font-serif-display text-3xl md:text-4xl text-[#1a1a1a] font-semibold">Parlons ensemble</h2>
          <div className="w-12 h-px bg-[#1a1a1a]/10 mx-auto mt-4"/>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="space-y-3">
            {[
              {i:Phone,l:'Téléphone',v:PHONE,h:`tel:${PHONE}`},
              {i:Mail,l:'Email',v:'contact@viper.ml',h:'mailto:contact@viper.ml'},
              {i:MapPin,l:'Adresse',v:'Bamako, Mali',h:undefined}
            ].map(({i:I,l,v,h}) => (
              <a key={l} href={h||'#'}
                className="flex items-center gap-3 bg-white border border-[#1a1a1a]/06 rounded-xl p-3.5 hover:border-[#1a1a1a]/12 transition">
                <div className="w-9 h-9 rounded-full bg-[#f4f3f0] flex items-center justify-center shrink-0">
                  <I size={14} className="text-[#8B6914]"/>
                </div>
                <div>
                  <p className="text-[8px] text-[#1a1a1a]/35 uppercase tracking-widest">{l}</p>
                  <p className="text-[#1a1a1a] text-sm font-medium">{v}</p>
                </div>
              </a>
            ))}
            <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 hover:border-emerald-300 transition">
              <div className="w-9 h-9 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-emerald-600 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </div>
              <div>
                <p className="text-[8px] text-emerald-600/60 uppercase tracking-widest">WhatsApp</p>
                <p className="text-emerald-700 text-sm font-semibold">Discuter maintenant</p>
              </div>
            </a>
          </div>
          <form onSubmit={e => {e.preventDefault();setSent(true);setTimeout(()=>setSent(false),3000);setForm({name:'',email:'',phone:'',msg:''})}}
            className="space-y-3">
            <input type="text" placeholder="Nom complet" value={form.name} onChange={e => setForm({...form,name:e.target.value})} required
              className="w-full bg-white border border-[#1a1a1a]/08 rounded-xl px-4 py-3 text-sm text-[#1a1a1a] placeholder-[#1a1a1a]/30 focus:outline-none focus:border-[#1a1a1a]/20 transition"/>
            <div className="grid grid-cols-2 gap-2">
              <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form,email:e.target.value})} required
                className="w-full bg-white border border-[#1a1a1a]/08 rounded-xl px-4 py-3 text-sm text-[#1a1a1a] placeholder-[#1a1a1a]/30 focus:outline-none focus:border-[#1a1a1a]/20 transition"/>
              <input type="tel" placeholder="Téléphone" value={form.phone} onChange={e => setForm({...form,phone:e.target.value})}
                className="w-full bg-white border border-[#1a1a1a]/08 rounded-xl px-4 py-3 text-sm text-[#1a1a1a] placeholder-[#1a1a1a]/30 focus:outline-none focus:border-[#1a1a1a]/20 transition"/>
            </div>
            <textarea placeholder="Ton message..." rows={4} value={form.msg} onChange={e => setForm({...form,msg:e.target.value})} required
              className="w-full bg-white border border-[#1a1a1a]/08 rounded-xl px-4 py-3 text-sm text-[#1a1a1a] placeholder-[#1a1a1a]/30 focus:outline-none focus:border-[#1a1a1a]/20 resize-none transition"/>
            <button type="submit"
              className="w-full btn-primary py-3 rounded-full text-[11px] tracking-wider uppercase font-bold flex items-center justify-center gap-2">
              {sent ? <><Check size={13}/>Envoyé !</> : 'Envoyer le message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

/* —— Footer —— */
function Footer({ onAdminClick }: { onAdminClick: () => void }) {
  return (
    <footer className="bg-[#1a1a1a] pt-12 pb-6" aria-label="Pied de page">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <ViperMaskLogo size={22} dark={false}/>
              <span className="font-serif-display text-sm font-bold tracking-[0.2em] text-[#fafaf8] uppercase">VIPER WORLD</span>
            </div>
            <p className="text-[11px] text-[#fafaf8]/35 leading-relaxed">
              Streetwear premium à Bamako.<br/>Vestes & sacs — Affirmez votre style.
            </p>
            <button onClick={onAdminClick}
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#fafaf8]/15 bg-[#fafaf8]/10 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#fafaf8]/80 transition hover:bg-[#fafaf8]/15">
              <Shield size={13}/> Gestion produits
            </button>
            <div className="flex gap-2 mt-4">
              {['instagram','facebook','tiktok'].map(s => (
                <a key={s} href="#"
                  className="w-8 h-8 rounded-full border border-[#fafaf8]/10 flex items-center justify-center text-[#fafaf8]/35 hover:text-[#fafaf8] hover:border-[#fafaf8]/25 transition">
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                    {s === 'instagram' && <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>}
                    {s === 'facebook' && <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>}
                    {s === 'tiktok' && <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>}
                  </svg>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-[#fafaf8] mb-3 text-[9px] tracking-widest uppercase">Boutique</h4>
            <ul className="space-y-1.5">
              {['Jackets','Bonnets','Sacs'].map(l => (
                <li key={l}><a href="#boutique" className="text-[11px] text-[#fafaf8]/35 hover:text-[#fafaf8]/70 transition">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-[#fafaf8] mb-3 text-[9px] tracking-widest uppercase">Aide</h4>
            <ul className="space-y-1.5">
              {['Livraison','Retours','Guide tailles','FAQ'].map(l => (
                <li key={l}><a href="#" className="text-[11px] text-[#fafaf8]/35 hover:text-[#fafaf8]/70 transition">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-[#fafaf8] mb-3 text-[9px] tracking-widest uppercase">Contact</h4>
            <ul className="space-y-1.5">
              <li><a href={`tel:${PHONE}`} className="text-[11px] text-[#fafaf8]/35 hover:text-[#fafaf8]/70 transition">{PHONE}</a></li>
              <li><a href="mailto:contact@viper.ml" className="text-[11px] text-[#fafaf8]/35 hover:text-[#fafaf8]/70 transition">contact@viper.ml</a></li>
              <li><span className="text-[11px] text-[#fafaf8]/35">Bamako, Mali</span></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#fafaf8]/06 pt-5 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-[9px] text-[#fafaf8]/25">© 2025–2026 VIPER WORLD. Tous droits réservés.</p>
          <p className="text-[9px] text-[#fafaf8]/20 font-cormorant italic">Fait avec 🐍 à Bamako, Mali</p>
        </div>
      </div>
    </footer>
  );
}

/* —— CART DRAWER —— */
function CartDrawer() {
  const { items, isOpen, closeCart, removeFromCart, updateQuantity, totalPrice, totalItems, clearCart } = useCart();
  
  const [step, setStep] = useState<'cart'|'shipping'|'payment'|'processing'|'done'>('cart');
  const [form, setForm] = useState({ name: '', phone: '', address: '', note: '' });
  const [payMethod, setPayMethod] = useState<'online'|'whatsapp'>('online');
  const [momoOperator, setMomoOperator] = useState<'wave'|'orange'>('wave');
  const [momoPhone, setMomoPhone] = useState('');
  const [processingStep, setProcessingStep] = useState(0);
  const [orderRef, setOrderRef] = useState('');
  const [momoPin, setMomoPin] = useState('');
  const [showMomoPrompt, setShowMomoPrompt] = useState(false);
  const [orderSummary, setOrderSummary] = useState<{ total: number; items: any[]; payMethod: string; momoOperator: string }>({
    total: 0,
    items: [],
    payMethod: 'online',
    momoOperator: 'wave'
  });
  // 🔐 SÉCURITÉ PAIEMENT
  const [secureCode, setSecureCode] = useState(''); // Code OTP affiché au client
  const [verifyCode, setVerifyCode] = useState(''); // Saisie de vérification
  const [verifyError, setVerifyError] = useState(false);
  const [isProcessingLocked, setIsProcessingLocked] = useState(false); // Anti double-soumission
  const [sessionToken, setSessionToken] = useState(''); // Jeton de session unique

  const handleClose = () => { 
    closeCart(); 
    setTimeout(() => {
      setStep('cart'); setPayMethod('online');
      setMomoPhone('');
      setProcessingStep(0); setShowMomoPrompt(false); setMomoPin('');
      setSecureCode(''); setVerifyCode(''); setVerifyError(false); setIsProcessingLocked(false); setSessionToken('');
      setOrderSummary({ total: 0, items: [], payMethod: 'online', momoOperator: 'wave' });
    }, 300); 
  };

  // Génère un code OTP à 6 chiffres + jeton de session sécurisé
  const generateSecureOrder = () => {
    const ref = 'VPR-' + Math.floor(100000 + Math.random() * 900000);
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const token = btoa(`${ref}:${otp}:${Date.now()}:${totalPrice}`).slice(0, 16).toUpperCase();
    return { ref, otp, token };
  };

  const startCheckout = () => {
    const { ref, otp, token } = generateSecureOrder();
    setOrderRef(ref);
    setSecureCode(otp);
    setSessionToken(token);
    setStep('shipping');
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (payMethod === 'whatsapp') { triggerWhatsAppOrder(); } else { setStep('payment'); }
  };

  const triggerWhatsAppOrder = () => {
    const lines = items.map(i => `• ${i.product.name}${i.size ? ` (Taille ${i.size})` : ''} ×${i.quantity} = ${formatPrice(i.product.price * i.quantity)}`);
    const msg = encodeURIComponent(
      `Bonjour VIPER WORLD,\n\nJe souhaite passer une commande.\n\n` +
      `*RÉFÉRENCE :* ${orderRef}\n` +
      `*MODE DE PAIEMENT :* Paiement à la livraison\n\n` +
      `👤 *INFORMATIONS CLIENT*\n` +
      `• Nom : ${form.name}\n` +
      `• Téléphone : ${form.phone}\n` +
      `• Adresse de livraison : ${form.address}\n` +
      (form.note ? `• Note supplémentaire : ${form.note}\n\n` : `\n`) +
      `🛍️ *DÉTAIL DE LA COMMANDE*\n` +
      `${lines.join('\n')}\n\n` +
      `💰 *TOTAL À RÉGLER : ${formatPrice(totalPrice)}*\n\n` +
      `Merci de me confirmer la prise en compte de ma commande.`
    );
    setOrderSummary({
      total: totalPrice,
      items: [...items],
      payMethod: 'whatsapp',
      momoOperator
    });
    setStep('done');
    clearCart();
    setTimeout(() => { window.open(`https://wa.me/${WA}?text=${msg}`, '_blank'); }, 1000);
  };

  // 🔐 Vérification du code sécurisé avant traitement
  const verifySecureCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyCode.trim() !== secureCode) {
      setVerifyError(true);
      setTimeout(() => setVerifyError(false), 2000);
      return;
    }
    setVerifyError(false);
    processOnlinePayment();
  };

  const processOnlinePayment = () => {
    if (isProcessingLocked) return; // Anti double-soumission
    setIsProcessingLocked(true);
    setStep('processing'); setProcessingStep(1);
    setTimeout(() => {
      setProcessingStep(2);
      setTimeout(() => {
        setProcessingStep(3);
        setShowMomoPrompt(true);
      }, 1500);
    }, 1500);
  };

  const handlePinInput = (num: string) => { if (momoPin.length < 4) setMomoPin(prev => prev + num); };
  const handlePinDelete = () => { setMomoPin(prev => prev.slice(0, -1)); };
  const confirmMomoPin = () => {
    if (momoPin.length < 4) return;
    setShowMomoPrompt(false); setProcessingStep(5);
    setOrderSummary({
      total: totalPrice,
      items: [...items],
      payMethod,
      momoOperator
    });
    setTimeout(() => { setStep('done'); clearCart(); }, 2000);
  };

  const triggerPrint = () => { window.print(); };

  const getReceiptWhatsAppMessage = () => {
    const lines = orderSummary.items.map(i => `• ${i.product.name}${i.size ? ' (Taille ' + i.size + ')' : ''} ×${i.quantity} = ${formatPrice(i.product.price * i.quantity)}`);
    const paymentStr = `Mobile Money (${orderSummary.momoOperator.toUpperCase()})`;
    return encodeURIComponent(
      `Bonjour VIPER WORLD,\n\nJe vous confirme le paiement de ma commande en ligne.\n\n` +
      `*RÉFÉRENCE :* ${orderRef}\n` +
      `*MODE DE PAIEMENT :* ${paymentStr}\n\n` +
      `👤 *INFORMATIONS CLIENT*\n` +
      `• Nom : ${form.name}\n` +
      `• Téléphone : ${form.phone}\n` +
      `• Adresse de livraison : ${form.address}\n\n` +
      `🛍️ *DÉTAIL DE LA COMMANDE*\n` +
      `${lines.join('\n')}\n\n` +
      `💰 *TOTAL PAYÉ : ${formatPrice(orderSummary.total)}*\n\n` +
      `Merci de valider l'expédition de ma commande.`
    );
  };

  /* Printable invoice container */
  return (<>
    {isOpen && <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm animate-fade-in" onClick={handleClose}/>}
    
    <div id="checkout-root"
      className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-[#fafaf8] border-l border-[#1a1a1a]/08 shadow-2xl flex flex-col transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[#1a1a1a]/06 print:hidden bg-white">
        <div className="flex items-center gap-2">
          <ShoppingBag size={15} className="text-[#1a1a1a]/60"/>
          <h2 className="font-serif-display text-sm font-semibold tracking-wider text-[#1a1a1a] uppercase">
            {step==='cart'?'Panier':step==='shipping'?'Livraison':step==='payment'?'Paiement':step==='processing'?'Traitement...':'Commande Validée'}
          </h2>
        </div>
        <button onClick={handleClose}
          className="w-8 h-8 rounded-full bg-[#f4f3f0] flex items-center justify-center text-[#1a1a1a]/50 hover:text-[#1a1a1a] transition">
          <X size={14}/>
        </button>
      </div>

      {/* Print invoice */}
      <div className="hidden print-invoice-container print:block text-black bg-white p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold tracking-[0.1em] border-b pb-2 mb-1">VIPER WORLD</h1>
          <p className="text-xs text-gray-500">Streetwear Premium — Bamako, Mali</p>
          <p className="text-[10px] text-gray-500">{PHONE}</p>
        </div>
        <div className="border-b pb-4 mb-4 text-xs">
          <div className="flex justify-between mb-1"><strong>N° Facture :</strong> <span>{orderRef}</span></div>
          <div className="flex justify-between mb-1"><strong>Date :</strong> <span>{new Date().toLocaleDateString('fr-FR')}</span></div>
          <div className="flex justify-between mb-1"><strong>Client :</strong> <span>{form.name}</span></div>
          <div className="flex justify-between mb-1"><strong>Téléphone :</strong> <span>{form.phone}</span></div>
          <div className="flex justify-between"><strong>Adresse :</strong> <span>{form.address}</span></div>
        </div>
        <div className="text-xs mb-6">
          <h3 className="font-bold border-b pb-1 mb-2 uppercase text-[10px] tracking-wider">Articles</h3>
          {items.map(i => (
            <div key={`${i.product.id}-${i.size}`} className="flex justify-between py-1 border-b border-gray-100">
              <span>{i.product.name} {i.size?`(${i.size})`:''} x{i.quantity}</span>
              <span>{formatPrice(i.product.price*i.quantity)}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold pt-3 text-sm"><span>TOTAL :</span><span>{formatPrice(totalPrice)}</span></div>
        </div>
        <div className="text-center text-[10px] text-gray-400 mt-12 border-t pt-4">Merci pour votre confiance ! VIPER WORLD 🚀</div>
      </div>

      {/* CART SCREEN */}
      {step === 'cart' && (
        items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center p-6 print:hidden">
            <div className="text-center animate-scale-in">
              <div className="w-16 h-16 bg-[#f4f3f0] rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag size={22} className="text-[#1a1a1a]/25"/>
              </div>
              <p className="text-[#1a1a1a]/40 text-sm mb-3">Votre panier est vide</p>
              <button onClick={handleClose} className="text-[#8B6914] text-xs font-semibold hover:underline uppercase tracking-wider">
                Découvrir la collection
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col justify-between overflow-hidden print:hidden">
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.map(item => (
                <div key={`${item.product.id}-${item.size}`}
                  className="flex gap-3 bg-white rounded-2xl p-3 border border-[#1a1a1a]/05 animate-fade-in">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#f5f4f0] shrink-0">
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-contain p-1"/>
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <p className="text-[12px] font-semibold text-[#1a1a1a] truncate">{item.product.name}</p>
                      {item.size && <p className="text-[9px] text-[#1a1a1a]/35 mt-0.5">Taille: {item.size}</p>}
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-[12px] font-serif-display text-[#1a1a1a] font-semibold">{formatPrice(item.product.price*item.quantity)}</p>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center bg-[#f4f3f0] rounded-full border border-[#1a1a1a]/05">
                          <button onClick={() => updateQuantity(item.product.id,item.quantity-1,item.size)}
                            className="w-6 h-6 flex items-center justify-center text-[#1a1a1a]/50 hover:text-[#1a1a1a] transition">
                            <Minus size={9}/>
                          </button>
                          <span className="text-[9px] font-bold text-[#1a1a1a] w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id,item.quantity+1,item.size)}
                            className="w-6 h-6 flex items-center justify-center text-[#1a1a1a]/50 hover:text-[#1a1a1a] transition">
                            <Plus size={9}/>
                          </button>
                        </div>
                        <button onClick={() => removeFromCart(item.product.id,item.size)} className="text-[#1a1a1a]/25 hover:text-red-500 transition">
                          <Trash2 size={12}/>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-[#1a1a1a]/06 p-4 space-y-3 bg-white">
              <div className="flex justify-between items-baseline">
                <span className="text-[11px] text-[#1a1a1a]/40">{totalItems} article{totalItems>1?'s':''}</span>
                <span className="font-serif-display text-xl text-[#1a1a1a] font-bold">{formatPrice(totalPrice)}</span>
              </div>
              <p className="text-[9px] text-emerald-600 flex items-center gap-1"><Truck size={10}/>Livraison gratuite à Bamako</p>
              <button onClick={startCheckout}
                className="w-full btn-primary py-3.5 rounded-full text-[11px] tracking-wider uppercase font-bold flex items-center justify-center gap-2 shadow-lg">
                Commander <ArrowRight size={14}/>
              </button>
            </div>
          </div>
        )
      )}

      {/* SHIPPING SCREEN */}
      {step === 'shipping' && (
        <form onSubmit={handleShippingSubmit} className="flex-1 flex flex-col justify-between overflow-hidden print:hidden">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <h3 className="text-[10px] text-[#8B6914] font-bold tracking-[0.2em] uppercase border-b border-[#1a1a1a]/06 pb-2">
              Adresse de livraison — Bamako
            </h3>
            <div className="space-y-3">
              <input required type="text" value={form.name} onChange={e => setForm({...form,name:e.target.value})} placeholder="Nom complet *"
                className="w-full bg-white border border-[#1a1a1a]/10 rounded-xl px-4 py-3 text-sm text-[#1a1a1a] placeholder-[#1a1a1a]/30 focus:outline-none focus:border-[#1a1a1a]/25 transition"/>
              <input required type="tel" value={form.phone} onChange={e => setForm({...form,phone:e.target.value})} placeholder="Téléphone * (ex: 84004915)"
                className="w-full bg-white border border-[#1a1a1a]/10 rounded-xl px-4 py-3 text-sm text-[#1a1a1a] placeholder-[#1a1a1a]/30 focus:outline-none focus:border-[#1a1a1a]/25 transition"/>
              <textarea required rows={3} value={form.address} onChange={e => setForm({...form,address:e.target.value})} placeholder="Adresse complète * (Quartier, rue...)"
                className="w-full bg-white border border-[#1a1a1a]/10 rounded-xl px-4 py-3 text-sm text-[#1a1a1a] placeholder-[#1a1a1a]/30 focus:outline-none focus:border-[#1a1a1a]/25 resize-none transition"/>
              <textarea rows={2} value={form.note} onChange={e => setForm({...form,note:e.target.value})} placeholder="Instructions livraison (optionnel)"
                className="w-full bg-white border border-[#1a1a1a]/10 rounded-xl px-4 py-3 text-sm text-[#1a1a1a] placeholder-[#1a1a1a]/30 focus:outline-none focus:border-[#1a1a1a]/25 resize-none transition"/>
            </div>
            <div className="pt-2">
              <h4 className="text-[10px] text-[#1a1a1a]/45 font-bold tracking-[0.2em] uppercase mb-2.5">Mode de paiement</h4>
              <div className="grid grid-cols-1 gap-2">
                <button type="button" onClick={() => setPayMethod('online')}
                  className={`rounded-2xl border p-3 text-left transition-all ${payMethod==='online' ? 'border-[#1a1a1a] bg-[#1a1a1a] text-[#fafaf8] shadow-md' : 'border-[#1a1a1a]/12 bg-white text-[#1a1a1a]/70 hover:border-[#1a1a1a]/20'}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-[10px] font-bold tracking-[0.2em] uppercase">Mobile Money</div>
                      <div className={`text-[8px] mt-1 normal-case font-normal ${payMethod==='online' ? 'text-[#fafaf8]/70' : 'text-[#1a1a1a]/55'}`}>Payez rapidement avec Wave ou Orange Money</div>
                    </div>
                    <div className={`rounded-full px-2 py-1 text-[8px] font-bold uppercase whitespace-nowrap ${payMethod==='online' ? 'bg-white/15 text-white' : 'bg-[#f4f3f0] text-[#1a1a1a]/60'}`}>
                      Recommandé
                    </div>
                  </div>
                </button>
                <button type="button" onClick={() => setPayMethod('whatsapp')}
                  className={`rounded-2xl border p-3 text-left transition-all ${payMethod==='whatsapp' ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm' : 'border-[#1a1a1a]/12 bg-white text-[#1a1a1a]/70 hover:border-[#1a1a1a]/20'}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-[10px] font-bold tracking-[0.2em] uppercase">WhatsApp</div>
                      <div className={`text-[8px] mt-1 normal-case font-normal ${payMethod==='whatsapp' ? 'text-emerald-700/70' : 'text-[#1a1a1a]/55'}`}>Confirmez votre commande à la livraison</div>
                    </div>
                    <div className={`rounded-full px-2 py-1 text-[8px] font-bold uppercase whitespace-nowrap ${payMethod==='whatsapp' ? 'bg-emerald-100 text-emerald-700' : 'bg-[#f4f3f0] text-[#1a1a1a]/60'}`}>
                      Simple
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-[#1a1a1a]/06 p-4 flex gap-3 bg-white">
            <button type="button" onClick={() => setStep('cart')}
              className="w-1/3 border border-[#1a1a1a]/12 text-[#1a1a1a]/55 font-semibold py-3 rounded-full text-[10px] tracking-wider uppercase hover:bg-[#f4f3f0] transition">
              Retour
            </button>
            <button type="submit"
              className={`w-2/3 font-bold py-3 rounded-full text-[10px] tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all shadow-lg ${payMethod==='whatsapp' ? 'bg-emerald-500 hover:bg-emerald-600 text-white' : 'btn-primary'}`}>
              {payMethod==='whatsapp' ? <>WhatsApp <ChevronRight size={12}/></> : <>Paiement <ChevronRight size={12}/></>}
            </button>
          </div>
        </form>
      )}

      {/* PAYMENT SCREEN */}
      {step === 'payment' && (
        <div className="flex-1 flex flex-col overflow-hidden print:hidden">
          {/* 🔐 Bandeau sécurité */}
          <div className="bg-emerald-50 border-b border-emerald-200 px-4 py-2.5 flex items-center gap-2">
            <Shield size={13} className="text-emerald-600 shrink-0"/>
            <div>
              <p className="text-[9px] text-emerald-700 font-bold uppercase tracking-wider">Paiement 100% Sécurisé</p>
              <p className="text-[8px] text-emerald-600/70">Session chiffrée · Token: {sessionToken}</p>
            </div>
          </div>
          <form onSubmit={verifySecureCode} className="flex-1 flex flex-col justify-between overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <h3 className="text-[10px] text-[#8B6914] font-bold tracking-[0.2em] uppercase border-b border-[#1a1a1a]/06 pb-2">
              Paiement sécurisé
            </h3>
            <div className="rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-white p-3">
              <div className="flex items-start gap-2">
                <div className="rounded-full bg-emerald-600/10 p-1.5">
                  <Shield size={14} className="text-emerald-600"/>
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-emerald-700">Paiement Mobile Money sécurisé</p>
                  <p className="text-[8px] mt-1 leading-relaxed text-emerald-700/70">Sélectionnez votre opérateur, validez le code puis confirmez la transaction. Le parcours reste simple et rapide.</p>
                </div>
              </div>
            </div>
            {(
              <div className="space-y-4 animate-scale-in">
                <div>
                  <label className="block text-[9px] text-[#1a1a1a]/40 font-bold uppercase tracking-wider mb-2">Opérateur</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button type="button" onClick={() => setMomoOperator('wave')}
                      className={`py-3 rounded-xl border flex flex-col items-center justify-center transition-all ${momoOperator==='wave' ? 'border-blue-400 bg-blue-50 text-blue-600' : 'border-[#1a1a1a]/10 bg-white text-[#1a1a1a]/45'}`}>
                      <span className="font-bold text-sm tracking-wider">WAVE</span>
                      <span className="text-[8px] font-medium opacity-65">Frais 1%</span>
                    </button>
                    <button type="button" onClick={() => setMomoOperator('orange')}
                      className={`py-3 rounded-xl border flex flex-col items-center justify-center transition-all ${momoOperator==='orange' ? 'border-orange-400 bg-orange-50 text-orange-600' : 'border-[#1a1a1a]/10 bg-white text-[#1a1a1a]/45'}`}>
                      <span className="font-bold text-sm tracking-wider">ORANGE</span>
                      <span className="text-[8px] font-medium opacity-65">Frais 0%</span>
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-[9px] text-[#1a1a1a]/40 font-bold uppercase tracking-wider mb-1.5">Numéro du compte</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1a1a1a]/35 text-xs font-semibold">+223</span>
                    <input required type="tel" value={momoPhone} onChange={e => setMomoPhone(e.target.value.replace(/[^0-9]/g,''))} placeholder="Numéro Mobile Money *"
                      className="w-full bg-white border border-[#1a1a1a]/10 rounded-xl pl-14 pr-4 py-3 text-sm text-[#1a1a1a] placeholder-[#1a1a1a]/25 focus:outline-none focus:border-[#1a1a1a]/25 transition"/>
                  </div>
                  <p className="text-[9px] text-[#1a1a1a]/30 mt-1.5">Demande Push envoyée sur ce numéro.</p>
                </div>
              </div>
            )}
            <div className="bg-[#f4f3f0] border border-[#1a1a1a]/05 rounded-xl p-3 flex justify-between text-xs items-center">
              <span className="text-[#1a1a1a]/45">Total de votre commande :</span>
              <span className="font-serif-display font-semibold text-[#1a1a1a] text-base">{formatPrice(totalPrice)}</span>
            </div>

            {/* 🔐 Bloc Code de Confirmation Sécurisé */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-3">
              <div className="flex items-start gap-2">
                <Shield size={15} className="text-amber-600 mt-0.5 shrink-0"/>
                <div>
                  <p className="text-[9px] text-amber-700 font-bold uppercase tracking-wider">Votre Code de Confirmation</p>
                  <p className="text-[8px] text-amber-600/70 mt-0.5">Communiquez ce code à notre équipe WhatsApp avant de payer.</p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="bg-white border-2 border-amber-300 rounded-xl px-6 py-3 shadow-sm">
                  <p className="font-mono text-2xl font-bold text-amber-700 tracking-[0.3em]">{secureCode}</p>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="block text-[9px] text-[#1a1a1a]/55 font-bold uppercase tracking-wider">Confirmez le code pour valider :</label>
                <input
                  type="text" inputMode="numeric" maxLength={6}
                  value={verifyCode}
                  onChange={e => setVerifyCode(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="Saisissez votre code à 6 chiffres *"
                  className={`w-full bg-white border rounded-xl px-4 py-2.5 text-sm text-center font-mono font-bold tracking-widest focus:outline-none transition ${verifyError ? 'border-red-400 bg-red-50 text-red-600 shake' : 'border-[#1a1a1a]/15 text-[#1a1a1a] focus:border-amber-400'}`}
                />
                {verifyError && <p className="text-[10px] text-red-500 font-semibold text-center">❌ Code incorrect. Vérifiez et réessayez.</p>}
              </div>
            </div>

          </div>
          <div className="border-t border-[#1a1a1a]/06 p-4 flex gap-3 bg-white">
            <button type="button" onClick={() => setStep('shipping')}
              className="w-1/3 border border-[#1a1a1a]/12 text-[#1a1a1a]/55 font-semibold py-3 rounded-full text-[10px] tracking-wider uppercase hover:bg-[#f4f3f0] transition">
              Retour
            </button>
            <button type="submit" disabled={verifyCode.length < 6}
              className={`w-2/3 py-3 rounded-full text-[10px] tracking-wider uppercase font-bold flex items-center justify-center gap-1.5 shadow-lg transition-all ${
                verifyCode.length === 6 ? 'btn-primary' : 'bg-[#1a1a1a]/20 text-[#fafaf8]/50 cursor-not-allowed'
              }`}>
              <Shield size={12}/> Payer {formatPrice(totalPrice)}
            </button>
          </div>
          </form>
        </div>
      )}

      {/* PROCESSING SCREEN */}
      {step === 'processing' && (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center print:hidden bg-[#fafaf8] animate-fade-in relative overflow-hidden">
          {!showMomoPrompt ? (
            <div className="space-y-6 max-w-xs animate-scale-in">
              <div className="relative w-14 h-14 mx-auto">
                <div className="absolute inset-0 border-[2px] border-[#1a1a1a]/08 rounded-full"/>
                <div className="absolute inset-0 border-[2px] border-[#1a1a1a] border-t-transparent rounded-full animate-spin"/>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] text-[#8B6914] font-bold tracking-[0.2em] uppercase">Traitement en cours</p>
                <h4 className="text-sm font-medium text-[#1a1a1a]">
                  {processingStep === 1 && "Connexion sécurisée..."}
                  {processingStep === 2 && "Vérification des informations..."}
                  {processingStep === 3 && "Demande Push Mobile Money..."}
                  {processingStep === 4 && "Débit en cours..."}
                </h4>
                <p className="text-[10px] text-[#1a1a1a]/35">Ne fermez pas cette fenêtre.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6 w-full animate-scale-in">
              <p className="text-[10px] text-[#8B6914] font-bold tracking-[0.2em] uppercase">Notification Push envoyée</p>
              <div className="phone-mockup">
                <div className="momo-screen">
                  <div className={`text-xs font-bold px-3 py-1 rounded-full mb-3 ${momoOperator==='wave'?'bg-blue-500/20 text-blue-400':'bg-orange-500/20 text-orange-500'}`}>
                    {momoOperator === 'wave' ? 'Wave Mobile' : 'Orange Money'}
                  </div>
                  <p className="text-[10px] text-[#fafaf8]/70 text-center mb-4">
                    Confirmez le paiement de <br/>
                    <strong className="text-[#fafaf8] text-xs">{formatPrice(totalPrice)}</strong> <br/>
                    pour <span className="text-[#c8a97e] font-semibold">VIPER WORLD</span>
                  </p>
                  <div className="flex gap-3.5 mb-5">
                    {[...Array(4)].map((_,i) => (
                      <div key={i} className={`w-3.5 h-3.5 rounded-full border border-[#c8a97e]/30 flex items-center justify-center transition-all ${momoPin.length > i ? 'bg-[#c8a97e]' : 'bg-transparent'}`}/>
                    ))}
                  </div>
                  <p className="text-[9px] text-[#fafaf8]/40 mb-1">Saisissez votre code PIN</p>
                </div>
              </div>
              <div className="max-w-[240px] mx-auto grid grid-cols-3 gap-2 pb-2">
                {['1','2','3','4','5','6','7','8','9'].map(n => (
                  <button key={n} type="button" onClick={() => handlePinInput(n)}
                    className="w-16 h-10 bg-[#f4f3f0] hover:bg-[#eeede9] active:bg-[#e8e7e2] rounded-lg text-sm text-[#1a1a1a] font-semibold border border-[#1a1a1a]/06 flex items-center justify-center transition-all">
                    {n}
                  </button>
                ))}
                <button type="button" onClick={handlePinDelete}
                  className="w-16 h-10 bg-red-50 hover:bg-red-100 rounded-lg text-[10px] text-red-500 font-bold uppercase border border-red-200/50 flex items-center justify-center">
                  Eff.
                </button>
                <button type="button" onClick={() => handlePinInput('0')}
                  className="w-16 h-10 bg-[#f4f3f0] hover:bg-[#eeede9] rounded-lg text-sm text-[#1a1a1a] font-semibold border border-[#1a1a1a]/06 flex items-center justify-center">
                  0
                </button>
                <button type="button" onClick={confirmMomoPin} disabled={momoPin.length < 4}
                  className={`w-16 h-10 rounded-lg text-[10px] font-bold uppercase border flex items-center justify-center transition-all ${momoPin.length === 4 ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg' : 'bg-emerald-50 border-emerald-200/50 text-emerald-300 cursor-not-allowed'}`}>
                  OK
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* DONE SCREEN */}
      {step === 'done' && (
        <div className="flex-1 flex flex-col justify-between overflow-hidden print:hidden">
          <div className="flex-1 overflow-y-auto p-5 text-center space-y-5">
            <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center mx-auto animate-scale-in">
              <Check size={26} className="text-emerald-600"/>
            </div>
            <div className="space-y-1">
              <h3 className="font-serif-display text-xl font-bold text-[#1a1a1a]">Commande validée !</h3>
              <p className="text-[#1a1a1a]/45 text-xs">Merci pour votre commande chez VIPER WORLD.</p>
              <div className="inline-block bg-[#f4f3f0] text-[#1a1a1a] text-[10px] font-mono px-3.5 py-1 rounded-md border border-[#1a1a1a]/08 mt-2">
                Réf : {orderRef}
              </div>
            </div>
            <div className="bg-[#f4f3f0] border border-[#1a1a1a]/06 rounded-2xl p-4 text-left space-y-2 text-xs">
              <h4 className="text-[9px] text-[#1a1a1a]/40 font-bold uppercase tracking-wider border-b border-[#1a1a1a]/06 pb-1.5">Récapitulatif</h4>
              <div className="flex justify-between"><span className="text-[#1a1a1a]/50">Client :</span><span className="font-medium text-[#1a1a1a]">{form.name}</span></div>
              <div className="flex justify-between"><span className="text-[#1a1a1a]/50">Téléphone :</span><span className="font-medium text-[#1a1a1a]">{form.phone}</span></div>
              <div className="flex justify-between"><span className="text-[#1a1a1a]/50">Adresse :</span><span className="font-medium text-[#1a1a1a] truncate max-w-[200px]">{form.address}</span></div>
              <div className="flex justify-between"><span className="text-[#1a1a1a]/50">Paiement :</span><span className="font-medium text-emerald-600">{payMethod==='whatsapp'?'À la livraison':'Mobile Money'}</span></div>
              <div className="border-t border-[#1a1a1a]/06 pt-2 flex justify-between font-bold text-sm">
                <span className="text-[#1a1a1a]">Montant total :</span>
                <span className="text-[#1a1a1a]">{formatPrice(orderSummary.total)}</span>
              </div>
            </div>
            <p className="text-[10px] text-[#1a1a1a]/35 leading-relaxed px-2">
              {payMethod === 'whatsapp'
                ? "L'application WhatsApp va s'ouvrir pour confirmer votre commande avec notre équipe."
                : "Le paiement a été traité. Vous pouvez télécharger votre reçu ou l'envoyer par WhatsApp."}
            </p>
          </div>
          <div className="border-t border-[#1a1a1a]/06 p-4 space-y-2 bg-white">
            {payMethod === 'online' && (<>
              <button onClick={() => window.open(`https://wa.me/${WA}?text=${getReceiptWhatsAppMessage()}`, '_blank')}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-full text-[10px] tracking-wider uppercase flex items-center justify-center gap-1.5">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Envoyer sur WhatsApp
            </button>
            <button onClick={triggerPrint}
              className="w-full border border-[#1a1a1a]/12 text-[#1a1a1a] font-bold py-3 rounded-full text-[10px] tracking-wider uppercase hover:bg-[#f4f3f0] transition-all flex items-center justify-center gap-1.5">
              📥 Télécharger le Reçu
            </button>
          </>)}
          <button onClick={handleClose}
            className="w-full btn-primary py-3 rounded-full text-[10px] tracking-wider uppercase font-bold shadow-md">
            Retourner à la boutique
          </button>
        </div>
      </div>
      )}
    </div>
  </>);
}

/* —— WhatsApp Button —— */
function WhatsAppBtn() {
  return (
    <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40 w-12 h-12 bg-emerald-500 hover:bg-emerald-600 rounded-full flex items-center justify-center shadow-xl shadow-emerald-500/25 transition-all hover:scale-110 animate-float group"
      style={{animationDuration:'3s'}} aria-label="WhatsApp">
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-white fill-current group-hover:scale-110 transition">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );
}

/* —— Back to Top —— */
function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => { const fn = () => setShow(scrollY > 400); addEventListener('scroll', fn); return () => removeEventListener('scroll', fn); }, []);
  if (!show) return null;
  return (
    <button onClick={() => scrollTo({top:0,behavior:'smooth'})}
      className="fixed bottom-5 left-5 z-40 w-10 h-10 bg-white border border-[#1a1a1a]/10 rounded-full flex items-center justify-center text-[#1a1a1a]/60 hover:bg-[#1a1a1a] hover:text-[#fafaf8] hover:border-[#1a1a1a] transition-all animate-fade-in shadow-sm"
      aria-label="Retour en haut">
      <ChevronUp size={16}/>
    </button>
  );
}

/* ——————————————————————————————————————————————————————————
   ADMIN PANEL — Premium Boutique Manager
   —————————————————————————————————————————————————————————— */
function AdminPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { productsList, addProduct, updateProduct, deleteProduct, resetProducts } = useCart();
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [search, setSearch] = useState('');
  
  // CRUD states
  const [formOpen, setFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<Product | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [price, setPrice] = useState(20000);
  const [oldPrice, setOldPrice] = useState<number | undefined>(undefined);
  const [category, setCategory] = useState('vestes');
  const [image, setImage] = useState('');
  const [images, setImages] = useState('');
  const [description, setDescription] = useState('');
  const [details, setDetails] = useState('');
  const [sizes, setSizes] = useState<string[]>([]);
  const [stock, setStock] = useState(10);
  const [badge, setBadge] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const readFileAsDataUrl = (file: File) => new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Impossible de lire l’image'));
      reader.readAsDataURL(file);
    });

    Promise.all(files.map(readFileAsDataUrl)).then(urls => {
      const [mainImage, ...secondaryImages] = urls;
      if (mainImage) setImage(mainImage);
      if (secondaryImages.length > 0) {
        setImages(secondaryImages.join(', '));
      } else {
        setImages('');
      }
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'VIPER2025') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Code propriétaire incorrect');
    }
  };

  const handleOpenForm = (item?: Product) => {
    if (item) {
      setEditItem(item);
      setName(item.name);
      setPrice(item.price);
      setOldPrice(item.oldPrice);
      setCategory(item.category);
      setImage(item.image);
      setImages(item.images.join(', '));
      setDescription(item.description);
      setDetails(item.details.join('\n'));
      setSizes(item.sizes || []);
      setStock(item.stock);
      setBadge(item.badge || '');
    } else {
      setEditItem(null);
      setName('');
      setPrice(15000);
      setOldPrice(undefined);
      setCategory('vestes');
      setImage('/images/jacket-viper-grey.png');
      setImages('');
      setDescription("Nouveau produit streetwear premium Viper.");
      setDetails("Tissu premium 100%\nDesign exclusif VIPER\nFinition haute qualité");
      setSizes(['S', 'M', 'L', 'XL']);
      setStock(20);
      setBadge('Nouveau');
    }
    setFormOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const imgsArray = images ? images.split(',').map(s => s.trim()).filter(Boolean) : [image];
    const detailsArray = details.split('\n').map(s => s.trim()).filter(Boolean);

    const productData: Product = {
      id: editItem ? editItem.id : Date.now(),
      name,
      price: Number(price),
      oldPrice: oldPrice ? Number(oldPrice) : undefined,
      category,
      image,
      images: imgsArray.length > 0 ? imgsArray : [image],
      description,
      details: detailsArray.length > 0 ? detailsArray : ['Qualité premium'],
      sizes: sizes.length > 0 ? sizes : undefined,
      stock: Number(stock),
      badge: badge || undefined,
      rating: editItem ? editItem.rating : 5.0,
      reviews: editItem ? editItem.reviews : Math.floor(Math.random() * 20) + 1,
    };

    if (editItem) {
      updateProduct(productData);
    } else {
      addProduct(productData);
    }
    setFormOpen(false);
  };

  const toggleSize = (s: string) => {
    setSizes(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  };

  const filteredProducts = useMemo(() => {
    const q = search.toLowerCase();
    return productsList.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  }, [productsList, search]);

  const outOfStockCount = useMemo(() => productsList.filter(p => p.stock === 0).length, [productsList]);
  const averagePrice = useMemo(() => {
    if (productsList.length === 0) return 0;
    return Math.round(productsList.reduce((s, p) => s + p.price, 0) / productsList.length);
  }, [productsList]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in overflow-hidden">
      <div className="relative bg-[#fafaf8] border border-[#1a1a1a]/10 rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl animate-scale-in">
        
        {/* Close Button */}
        <button onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 bg-[#1a1a1a]/08 rounded-full flex items-center justify-center text-[#1a1a1a]/50 hover:text-[#1a1a1a] transition">
          <X size={15}/>
        </button>

        {/* 🔐 AUTHENTICATION SCREEN */}
        {!isAuthenticated ? (
          <div className="flex-1 flex items-center justify-center py-20 px-6">
            <form onSubmit={handleLogin} className="w-full max-w-sm space-y-6 text-center">
              <div className="w-16 h-16 bg-[#1a1a1a]/05 border border-[#1a1a1a]/10 rounded-full flex items-center justify-center mx-auto">
                <Shield size={24} className="text-[#8B6914]"/>
              </div>
              <div>
                <h3 className="font-serif-display text-xl font-bold text-[#1a1a1a]">Connexion Espace Admin</h3>
                <p className="text-[10px] text-[#1a1a1a]/40 uppercase tracking-widest mt-1">VIPER WORLD Manager</p>
              </div>
              <div className="space-y-2 text-left">
                <input required type="password" value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="Code d'accès propriétaire *"
                  className="w-full bg-white border border-[#1a1a1a]/10 rounded-xl px-4 py-3 text-sm text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a]/25 transition"
                  autoFocus/>
                {authError && <p className="text-red-500 text-xs mt-1">{authError}</p>}
                <p className="text-[9px] text-[#1a1a1a]/30 italic text-center">Accès réservé au propriétaire</p>
              </div>
              <button type="submit" className="w-full btn-primary py-3 rounded-full text-xs font-bold uppercase tracking-wider">
                Se connecter
              </button>
            </form>
          </div>
        ) : (
          /* 📦 MAIN ADMIN INTERFACE */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Header + Stats */}
            <div className="p-6 border-b border-[#1a1a1a]/06 bg-white">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-3">
                <div>
                  <h3 className="font-serif-display text-2xl font-bold text-[#1a1a1a]">Gestion du Catalogue</h3>
                  <p className="text-[10px] text-[#8B6914] font-bold tracking-[0.2em] uppercase">Espace Administrateur VIPER WORLD</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleOpenForm()}
                    className="bg-[#1a1a1a] text-[#fafaf8] text-[10px] font-bold px-5 py-2.5 rounded-full hover:bg-[#2d2d2d] transition tracking-wider uppercase flex items-center gap-1.5 shadow-md">
                    <Plus size={13}/> Ajouter un produit
                  </button>
                  <button onClick={resetProducts}
                    className="border border-[#1a1a1a]/15 text-[#1a1a1a]/60 text-[10px] font-bold px-4 py-2.5 rounded-full hover:bg-[#f4f3f0] hover:text-[#1a1a1a] transition tracking-wider uppercase">
                    Réinitialiser
                  </button>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-[#f4f3f0]/50 border border-[#1a1a1a]/06 rounded-xl p-4">
                  <p className="text-[9px] text-[#1a1a1a]/40 font-bold uppercase tracking-wider">Total Produits</p>
                  <p className="font-serif-display text-2xl text-[#1a1a1a] font-bold mt-1">{productsList.length}</p>
                </div>
                <div className="bg-[#f4f3f0]/50 border border-[#1a1a1a]/06 rounded-xl p-4">
                  <p className="text-[9px] text-[#1a1a1a]/40 font-bold uppercase tracking-wider">Ruptures Stock</p>
                  <p className={`font-serif-display text-2xl font-bold mt-1 ${outOfStockCount > 0 ? 'text-red-500':'text-[#1a1a1a]'}`}>{outOfStockCount}</p>
                </div>
                <div className="bg-[#f4f3f0]/50 border border-[#1a1a1a]/06 rounded-xl p-4">
                  <p className="text-[9px] text-[#1a1a1a]/40 font-bold uppercase tracking-wider">Prix Moyen</p>
                  <p className="font-serif-display text-2xl text-[#1a1a1a] font-bold mt-1">{formatPrice(averagePrice)}</p>
                </div>
              </div>
            </div>

            {/* List Actions */}
            <div className="p-4 border-b border-[#1a1a1a]/06 flex items-center gap-3 bg-[#f5f4f0]/30">
              <div className="relative flex-1 max-w-md">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1a1a1a]/30"/>
                <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Rechercher par nom ou catégorie..."
                  className="w-full bg-white border border-[#1a1a1a]/10 rounded-full pl-9 pr-4 py-2 text-xs text-[#1a1a1a] placeholder-[#1a1a1a]/30 focus:outline-none focus:border-[#1a1a1a]/20 transition"/>
              </div>
              <p className="text-[10px] text-[#1a1a1a]/40 ml-auto">{filteredProducts.length} produit(s) filtré(s)</p>
            </div>

            {/* Products Table */}
            <div className="flex-1 overflow-y-auto p-6">
              {filteredProducts.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#1a1a1a]/08 text-[10px] text-[#1a1a1a]/40 uppercase font-bold tracking-wider">
                        <th className="pb-3 w-16">Photo</th>
                        <th className="pb-3 pl-4">Nom</th>
                        <th className="pb-3">Catégorie</th>
                        <th className="pb-3 text-right">Prix</th>
                        <th className="pb-3 text-center">Stock</th>
                        <th className="pb-3 text-center w-24">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1a1a1a]/04 text-xs">
                      {filteredProducts.map(p => (
                        <tr key={p.id} className="group hover:bg-[#1a1a1a]/02 transition-colors">
                          <td className="py-3.5">
                            <div className="w-11 h-11 bg-white border border-[#1a1a1a]/08 rounded-lg overflow-hidden flex items-center justify-center p-1 shrink-0 shadow-sm">
                              <img src={p.image} alt={p.name} className="w-full h-full object-contain"/>
                            </div>
                          </td>
                          <td className="py-3.5 pl-4 font-medium text-[#1a1a1a]">
                            <div className="flex flex-col">
                              <span>{p.name}</span>
                              {p.badge && (
                                <span className="inline-block self-start bg-amber-50 border border-amber-200 text-amber-700 text-[8px] font-bold px-1.5 py-0.2 rounded mt-1 uppercase tracking-wide">
                                  {p.badge}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-3.5 text-[#1a1a1a]/60 capitalize">{p.category}</td>
                          <td className="py-3.5 text-right font-semibold text-[#1a1a1a]">
                            <div className="flex flex-col items-end">
                              <span>{formatPrice(p.price)}</span>
                              {p.oldPrice && (
                                <span className="text-[10px] text-[#1a1a1a]/30 line-through mt-0.5">{formatPrice(p.oldPrice)}</span>
                              )}
                            </div>
                          </td>
                          <td className="py-3.5 text-center">
                            <span className={`inline-block px-2 py-0.5 rounded-full font-bold text-[9px] ${p.stock === 0 ? 'bg-red-50 text-red-500 border border-red-200' : p.stock <= 5 ? 'bg-amber-50 text-amber-600 border border-amber-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
                              {p.stock === 0 ? 'Rupture' : `${p.stock} unités`}
                            </span>
                          </td>
                          <td className="py-3.5 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <button onClick={() => handleOpenForm(p)}
                                className="w-7 h-7 bg-white hover:bg-[#1a1a1a]/05 border border-[#1a1a1a]/10 text-[#1a1a1a]/60 hover:text-[#1a1a1a] rounded-full flex items-center justify-center transition shadow-sm"
                                title="Modifier">
                                <Edit size={12}/>
                              </button>
                              <button onClick={() => setDeleteConfirmId(p.id)}
                                className="w-7 h-7 bg-white hover:bg-red-50 border border-[#1a1a1a]/10 text-[#1a1a1a]/40 hover:text-red-500 hover:border-red-200 rounded-full flex items-center justify-center transition shadow-sm"
                                title="Supprimer">
                                <Trash2 size={12}/>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-[#1a1a1a]/30 text-sm">Aucun produit ne correspond à votre recherche</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 📝 ADD / EDIT PRODUCT FORM */}
        {formOpen && (
          <div className="absolute inset-0 z-20 flex justify-end bg-black/30 backdrop-blur-xs animate-fade-in">
            <div className="bg-[#fafaf8] border-l border-[#1a1a1a]/10 w-full max-w-xl h-full flex flex-col animate-slide-in-right shadow-2xl overflow-hidden">
              <div className="p-5 border-b border-[#1a1a1a]/06 bg-white flex items-center justify-between">
                <h4 className="font-serif-display text-lg font-bold text-[#1a1a1a]">
                  {editItem ? `Modifier : ${editItem.name}` : "Nouveau produit"}
                </h4>
                <button onClick={() => setFormOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#f4f3f0] flex items-center justify-center text-[#1a1a1a]/50 hover:text-[#1a1a1a] transition">
                  <X size={14}/>
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="flex-1 overflow-y-auto p-6 space-y-4">
                {/* Product Name */}
                <div>
                  <label className="block text-[9px] text-[#1a1a1a]/55 font-bold uppercase tracking-wider mb-1.5">Nom du produit *</label>
                  <input required type="text" value={name} onChange={e => setName(e.target.value)} placeholder="ex: Casquette VIPER Mesh"
                    className="w-full bg-white border border-[#1a1a1a]/10 rounded-xl px-4 py-2.5 text-xs text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a]/25 transition"/>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Category */}
                  <div>
                    <label className="block text-[9px] text-[#1a1a1a]/55 font-bold uppercase tracking-wider mb-1.5">Catégorie *</label>
                    <select value={category} onChange={e => setCategory(e.target.value)}
                      className="w-full bg-white border border-[#1a1a1a]/10 rounded-xl px-4 py-2.5 text-xs text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a]/25 transition cursor-pointer">
                      <option value="vestes">🧥 Vestes</option>
                      <option value="bonnets">🧢 Bonnets</option>
                      <option value="sacs">👜 Sacs</option>
                    </select>
                  </div>

                  {/* Stock */}
                  <div>
                    <label className="block text-[9px] text-[#1a1a1a]/55 font-bold uppercase tracking-wider mb-1.5">Stock initial *</label>
                    <input required type="number" min={0} value={stock} onChange={e => setStock(Number(e.target.value))}
                      className="w-full bg-white border border-[#1a1a1a]/10 rounded-xl px-4 py-2.5 text-xs text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a]/25 transition"/>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Price */}
                  <div>
                    <label className="block text-[9px] text-[#1a1a1a]/55 font-bold uppercase tracking-wider mb-1.5">Prix (FCFA) *</label>
                    <input required type="number" min={0} value={price} onChange={e => setPrice(Number(e.target.value))}
                      className="w-full bg-white border border-[#1a1a1a]/10 rounded-xl px-4 py-2.5 text-xs text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a]/25 transition"/>
                  </div>

                  {/* Old Price */}
                  <div>
                    <label className="block text-[9px] text-[#1a1a1a]/55 font-bold uppercase tracking-wider mb-1.5">Ancien prix (FCFA) (Optionnel)</label>
                    <input type="number" min={0} value={oldPrice || ''} onChange={e => setOldPrice(e.target.value ? Number(e.target.value) : undefined)}
                      className="w-full bg-white border border-[#1a1a1a]/10 rounded-xl px-4 py-2.5 text-xs text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a]/25 transition"/>
                  </div>
                </div>

                {/* Badge */}
                <div>
                  <label className="block text-[9px] text-[#1a1a1a]/55 font-bold uppercase tracking-wider mb-1.5">Badge / Étiquette (Optionnel)</label>
                  <input type="text" value={badge} onChange={e => setBadge(e.target.value)} placeholder="ex: Nouveau, Populaire, Offre..."
                    className="w-full bg-white border border-[#1a1a1a]/10 rounded-xl px-4 py-2.5 text-xs text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a]/25 transition"/>
                </div>

                {/* Image principal */}
                <div>
                  <label className="block text-[9px] text-[#1a1a1a]/55 font-bold uppercase tracking-wider mb-1.5">Image principale (URL ou fichier)</label>
                  <input required type="text" value={image} onChange={e => setImage(e.target.value)} placeholder="ex: /images/jacket-viper-grey.png"
                    className="w-full bg-white border border-[#1a1a1a]/10 rounded-xl px-4 py-2.5 text-xs text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a]/25 transition"/>
                  <label className="mt-2 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-[#1a1a1a]/15 bg-[#f4f3f0] px-3 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-[#1a1a1a]/70 transition hover:bg-[#ece9e1]">
                    <Plus size={12}/> Ajouter une image depuis l’ordinateur
                    <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden"/>
                  </label>
                  <p className="mt-1 text-[9px] text-[#1a1a1a]/40">Tu peux aussi coller une URL directe ou choisir un fichier local.</p>
                  {image && (
                    <div className="mt-3 rounded-xl border border-[#1a1a1a]/08 bg-white p-2">
                      <img src={image} alt="Aperçu produit" className="h-24 w-full rounded-lg object-cover" />
                    </div>
                  )}
                  <div className="flex gap-2 items-center mt-2 flex-wrap">
                    <p className="text-[9px] text-[#1a1a1a]/40">Images par défaut : </p>
                    <div className="flex gap-1 flex-wrap">
                      {['jacket-viper-grey.png', 'beanie-viper-black.jpg', 'backpack-viper-new.png'].map(imgName => (
                        <button key={imgName} type="button" onClick={() => setImage(`/images/${imgName}`)}
                          className="bg-[#1a1a1a]/04 hover:bg-[#1a1a1a]/08 border border-[#1a1a1a]/08 text-[8px] px-2 py-0.5 rounded transition">
                          {imgName.split('-')[0]}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Images additionnelles */}
                <div>
                  <label className="block text-[9px] text-[#1a1a1a]/55 font-bold uppercase tracking-wider mb-1.5">Images secondaires (URL ou fichiers)</label>
                  <input type="text" value={images} onChange={e => setImages(e.target.value)} placeholder="ex: /images/jacket-viper-grey.png, /images/jacket-viper-beige.png"
                    className="w-full bg-white border border-[#1a1a1a]/10 rounded-xl px-4 py-2.5 text-xs text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a]/25 transition"/>
                  <p className="mt-1 text-[9px] text-[#1a1a1a]/40">Tu peux aussi sélectionner plusieurs images pour les ajouter ici.</p>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-[9px] text-[#1a1a1a]/55 font-bold uppercase tracking-wider mb-1.5">Description *</label>
                  <textarea required rows={3} value={description} onChange={e => setDescription(e.target.value)} placeholder="Description détaillée du produit..."
                    className="w-full bg-white border border-[#1a1a1a]/10 rounded-xl px-4 py-3 text-xs text-[#1a1a1a] resize-none focus:outline-none focus:border-[#1a1a1a]/25 transition"/>
                </div>

                {/* Details list */}
                <div>
                  <label className="block text-[9px] text-[#1a1a1a]/55 font-bold uppercase tracking-wider mb-1.5">Détails techniques (un par ligne) *</label>
                  <textarea required rows={3} value={details} onChange={e => setDetails(e.target.value)} placeholder="100% Coton premium&#10;Logo Viper brodé poitrine&#10;Lavage en machine à 30°"
                    className="w-full bg-white border border-[#1a1a1a]/10 rounded-xl px-4 py-3 text-xs text-[#1a1a1a] resize-none focus:outline-none focus:border-[#1a1a1a]/25 transition"/>
                </div>

                {/* Sizes Checkboxes */}
                <div>
                  <label className="block text-[9px] text-[#1a1a1a]/55 font-bold uppercase tracking-wider mb-2">Tailles disponibles</label>
                  <div className="flex gap-2">
                    {['S', 'M', 'L', 'XL', 'XXL', 'Unique'].map(s => {
                      const active = sizes.includes(s);
                      return (
                        <button key={s} type="button" onClick={() => toggleSize(s)}
                          className={`px-3.5 py-1.5 rounded-lg border text-[10px] font-bold transition-all ${active ? 'bg-[#1a1a1a] border-[#1a1a1a] text-[#fafaf8] scale-105' : 'border-[#1a1a1a]/15 text-[#1a1a1a]/55 hover:border-[#1a1a1a]/35 hover:text-[#1a1a1a] bg-white'}`}>
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Actions Form */}
                <div className="flex gap-3 pt-3 border-t border-[#1a1a1a]/06">
                  <button type="button" onClick={() => setFormOpen(false)}
                    className="flex-1 border border-[#1a1a1a]/12 text-[#1a1a1a]/60 font-semibold py-3 rounded-full text-xs tracking-wider uppercase hover:bg-[#f4f3f0] hover:text-[#1a1a1a] transition">
                    Annuler
                  </button>
                  <button type="submit"
                    className="flex-1 btn-primary py-3 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                    {editItem ? "Enregistrer" : "Créer le produit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* aŒ CONFIRM DELETE DIALOG */}
        {deleteConfirmId !== null && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-xs animate-fade-in">
            <div className="bg-[#fafaf8] border border-[#1a1a1a]/12 rounded-2xl p-6 max-w-sm w-full text-center shadow-2xl animate-scale-in">
              <div className="w-12 h-12 bg-red-50 border border-red-200 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 size={20}/>
              </div>
              <h4 className="font-serif-display text-base font-bold text-[#1a1a1a]">Supprimer ce produit ?</h4>
              <p className="text-xs text-[#1a1a1a]/45 mt-1.5 mb-6">
                Cette action supprimera définitivement le produit du catalogue et de tous les paniers.
              </p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteConfirmId(null)}
                  className="flex-1 border border-[#1a1a1a]/12 text-[#1a1a1a]/60 font-semibold py-2.5 rounded-full text-xs tracking-wider uppercase hover:bg-[#f4f3f0] hover:text-[#1a1a1a] transition">
                  Annuler
                </button>
                <button onClick={() => { deleteProduct(deleteConfirmId); setDeleteConfirmId(null); }}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2.5 rounded-full text-xs tracking-wider uppercase transition shadow-lg shadow-red-500/10">
                  Oui, supprimer
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

/* ——————————————————————————————————————————————————————————
   APP ROOT
   —————————————————————————————————————————————————————————— */
export default function App() {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('all');
  const [menu, setMenu] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isOwnerShortcut = (event.ctrlKey || event.metaKey) && event.shiftKey && event.key.toLowerCase() === 'a';
      if (isOwnerShortcut) {
        event.preventDefault();
        setAdminOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <CartProvider>
      <div className="min-h-screen bg-[#fafaf8] text-[#1a1a1a]">
        <Header onSearch={setSearch} searchQuery={search} onMenu={() => setMenu(true)} onAdminClick={() => setAdminOpen(true)}/>
        <MobileMenu open={menu} onClose={() => setMenu(false)} onAdminClick={() => setAdminOpen(true)}/>
        <Toast/>
        <main>
          <Hero/>
          <Features/>
          <ServiceHighlights/>
          <FeaturedProduct/>
          <Categories onSelect={setCat}/>
          <Shop category={cat} setCategory={setCat} search={search}/>
          <About/>
          <Testimonials/>
          <Newsletter/>
          <Contact/>
        </main>
        <Footer onAdminClick={() => setAdminOpen(true)}/>
        <CartDrawer/>
        <AdminPanel isOpen={adminOpen} onClose={() => setAdminOpen(false)}/>
        <WhatsAppBtn/>
        <BackToTop/>
      </div>
    </CartProvider>
  );
}

