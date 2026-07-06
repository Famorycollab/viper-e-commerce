import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { products as defaultProducts, type Product } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, qty?: number, size?: string) => void;
  removeFromCart: (productId: number, size?: string) => void;
  updateQuantity: (productId: number, quantity: number, size?: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  wishlist: number[];
  toggleWishlist: (id: number) => void;
  isWished: (id: number) => boolean;
  toast: string | null;
  // Dynamic product list CRUD
  productsList: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: number) => void;
  resetProducts: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [productsList, setProductsList] = useState<Product[]>([]);

  // Catalog version — changes when default products are updated (rename, new products, etc.)
  const CATALOG_VERSION = 'vw-4'; // Bump this to force localStorage refresh

  useEffect(() => {
    try {
      const c = localStorage.getItem('viper-cart'); if (c) setItems(JSON.parse(c));
      const w = localStorage.getItem('viper-wish'); if (w) setWishlist(JSON.parse(w));
      
      const storedVersion = localStorage.getItem('viper-catalog-version');
      const savedProducts = localStorage.getItem('viper-products');

      if (storedVersion === CATALOG_VERSION && savedProducts) {
        // Same catalog version — use saved products
        setProductsList(JSON.parse(savedProducts));
      } else {
        // New catalog version or first visit — reset to defaults
        setProductsList(defaultProducts);
        localStorage.setItem('viper-products', JSON.stringify(defaultProducts));
        localStorage.setItem('viper-catalog-version', CATALOG_VERSION);
        // Also clear old cart items that may reference deleted/renamed products
        if (storedVersion && storedVersion !== CATALOG_VERSION) {
          setItems([]);
          localStorage.setItem('viper-cart', '[]');
        }
      }
    } catch {/* */}
  }, []);

  useEffect(() => { localStorage.setItem('viper-cart', JSON.stringify(items)); }, [items]);
  useEffect(() => { localStorage.setItem('viper-wish', JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(() => { 
    if (productsList.length > 0) {
      localStorage.setItem('viper-products', JSON.stringify(productsList));
    }
  }, [productsList]);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const addToCart = (product: Product, qty = 1, size?: string) => {
    setItems(prev => {
      const ex = prev.find(i => i.product.id === product.id && i.size === size);
      if (ex) return prev.map(i => i.product.id === product.id && i.size === size ? { ...i, quantity: Math.min(i.quantity + qty, product.stock) } : i);
      return [...prev, { product, quantity: Math.min(qty, product.stock), size }];
    });
    showToast(`✓ ${product.name} ajouté`);
    setIsOpen(true);
  };

  const removeFromCart = (id: number, size?: string) => setItems(p => p.filter(i => !(i.product.id === id && i.size === size)));

  const updateQuantity = (id: number, q: number, size?: string) => {
    if (q <= 0) { removeFromCart(id, size); return; }
    setItems(p => p.map(i => i.product.id === id && i.size === size ? { ...i, quantity: Math.min(q, i.product.stock) } : i));
  };

  const toggleWishlist = (id: number) => setWishlist(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  // CRUD actions
  const addProduct = (p: Product) => {
    setProductsList(prev => [p, ...prev]);
    showToast(`✓ Produit "${p.name}" créé`);
  };

  const updateProduct = (p: Product) => {
    setProductsList(prev => prev.map(item => item.id === p.id ? p : item));
    // Also update product details in the cart if modified
    setItems(prev => prev.map(item => item.product.id === p.id ? { ...item, product: p } : item));
    showToast(`✓ Produit "${p.name}" modifié`);
  };

  const deleteProduct = (id: number) => {
    const p = productsList.find(item => item.id === id);
    setProductsList(prev => prev.filter(item => item.id !== id));
    // Also remove from cart
    setItems(prev => prev.filter(item => item.product.id !== id));
    if (p) showToast(`✗ Produit "${p.name}" supprimé`);
  };

  const resetProducts = () => {
    setProductsList(defaultProducts);
    localStorage.setItem('viper-products', JSON.stringify(defaultProducts));
    showToast("✓ Boutique réinitialisée aux valeurs d'origine");
  };

  const activePriceOf = (product: Product) => {
    const found = productsList.find(p => p.id === product.id);
    return found ? found.price : product.price;
  };

  return (
    <CartContext.Provider value={{
      items, isOpen, openCart: () => setIsOpen(true), closeCart: () => setIsOpen(false),
      addToCart, removeFromCart, updateQuantity, clearCart: () => setItems([]),
      totalItems: items.reduce((s, i) => s + i.quantity, 0),
      totalPrice: items.reduce((s, i) => s + activePriceOf(i.product) * i.quantity, 0),
      wishlist, toggleWishlist, isWished: (id) => wishlist.includes(id),
      toast,
      productsList,
      addProduct,
      updateProduct,
      deleteProduct,
      resetProducts
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const c = useContext(CartContext);
  if (!c) throw new Error('useCart must be inside CartProvider');
  return c;
}
