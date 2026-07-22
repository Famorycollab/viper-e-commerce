import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { products as defaultProducts, type Product } from '../data/products';
import { ref, onValue, set, remove, get } from 'firebase/database';
import { db } from '../config/firebase';

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

// Helper: clean undefined values for Firebase (it doesn't accept undefined)
function cleanForFirebase<T>(obj: T): T {
  if (obj === null || obj === undefined) return obj;
  if (Array.isArray(obj)) return obj.map(cleanForFirebase) as T;
  if (typeof obj === 'object') {
    const cleaned: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
      if (value !== undefined) {
        cleaned[key] = cleanForFirebase(value);
      }
    }
    return cleaned as T;
  }
  return obj;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [productsList, setProductsList] = useState<Product[]>([]);

  // 1. Restore local cart/wishlist from localStorage
  useEffect(() => {
    try {
      const c = localStorage.getItem('viper-cart'); if (c) setItems(JSON.parse(c));
      const w = localStorage.getItem('viper-wish'); if (w) setWishlist(JSON.parse(w));
    } catch {/* */}
  }, []);

  // 2. Sync Cart/Wishlist to localStorage
  useEffect(() => { localStorage.setItem('viper-cart', JSON.stringify(items)); }, [items]);
  useEffect(() => { localStorage.setItem('viper-wish', JSON.stringify(wishlist)); }, [wishlist]);

  // 3. Real-time Firebase Sync for products (Realtime Database)
  useEffect(() => {
    const productsRef = ref(db, 'products');

    // Seed default products if database is empty
    const seedProducts = async () => {
      try {
        const snapshot = await get(productsRef);
        if (!snapshot.exists()) {
          console.log("Seeding default products to Firebase...");
          const productsMap: Record<string, Product> = {};
          defaultProducts.forEach((p) => {
            productsMap[String(p.id)] = cleanForFirebase(p);
          });
          await set(productsRef, productsMap);
          console.log("Seeding complete!");
        }
      } catch (e) {
        console.error("Firebase seed error:", e);
      }
    };
    seedProducts();

    // Listen for real-time changes
    const unsubscribe = onValue(productsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const dbProducts: Product[] = Object.values(data);
        // Sort by id descending (newest first)
        dbProducts.sort((a, b) => b.id - a.id);
        setProductsList(dbProducts);
      } else {
        setProductsList([]);
      }
    }, (error) => {
      console.error("Firebase listen error:", error);
      // Fallback to default products if Firebase fails
      setProductsList(defaultProducts);
    });

    return () => unsubscribe();
  }, []);

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

  // CRUD actions — write directly to Firebase Realtime Database
  const addProduct = async (p: Product) => {
    try {
      const productRef = ref(db, `products/${p.id}`);
      await set(productRef, cleanForFirebase(p));
      showToast(`✓ Produit "${p.name}" créé`);
    } catch (e) {
      showToast(`✗ Erreur lors de la création`);
      console.error("Add product error:", e);
    }
  };

  const updateProduct = async (p: Product) => {
    try {
      const productRef = ref(db, `products/${p.id}`);
      await set(productRef, cleanForFirebase(p));
      // Update cart details silently if modified
      setItems(prev => prev.map(item => item.product.id === p.id ? { ...item, product: p } : item));
      showToast(`✓ Produit "${p.name}" modifié`);
    } catch (e) {
      showToast(`✗ Erreur lors de la modification`);
      console.error("Update product error:", e);
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      const productRef = ref(db, `products/${id}`);
      await remove(productRef);
      // Also remove from cart
      setItems(prev => prev.filter(item => item.product.id !== id));
      showToast(`✗ Produit supprimé`);
    } catch (e) {
      showToast(`✗ Erreur lors de la suppression`);
      console.error("Delete product error:", e);
    }
  };

  const resetProducts = async () => {
    try {
      const productsRef = ref(db, 'products');
      const productsMap: Record<string, Product> = {};
      defaultProducts.forEach((p) => {
        productsMap[String(p.id)] = cleanForFirebase(p);
      });
      await set(productsRef, productsMap);
      showToast("✓ Boutique réinitialisée aux valeurs d'origine");
    } catch (e) {
      console.error("Reset products error:", e);
    }
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
