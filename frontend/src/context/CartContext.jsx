// src/context/CartContext.jsx
import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // 🔑 Generate user-based storage keys
  const cartKey = user ? `cart_${user._id}` : null;
  const wishlistKey = user ? `wishlist_${user._id}` : null;

  // ================= LOAD DATA ON LOGIN =================
  useEffect(() => {
    if (!user) {
      setCartItems([]);
      setWishlist([]);
      return;
    }

    const savedCart = localStorage.getItem(cartKey);
    const savedWishlist = localStorage.getItem(wishlistKey);

    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (err) {
        console.error('Error loading cart:', err);
      }
    }

    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (err) {
        console.error('Error loading wishlist:', err);
      }
    }
  }, [user, cartKey, wishlistKey]);

  // ================= SAVE DATA =================
  useEffect(() => {
    if (cartKey) {
      localStorage.setItem(cartKey, JSON.stringify(cartItems));
    }
  }, [cartItems, cartKey]);

  useEffect(() => {
    if (wishlistKey) {
      localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
    }
  }, [wishlist, wishlistKey]);

  // ================= CART FUNCTIONS =================

  const addToCart = (product, quantity = 1) => {
    if (!user) {
      alert('Please login to add items to cart');
      return { success: false };
    }

    setCartItems(prev => {
      const exists = prev.find(item => item._id === product._id);
      if (exists) {
        return prev.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });

    return { success: true };
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item._id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) return removeFromCart(productId);

    setCartItems(prev =>
      prev.map(item =>
        item._id === productId ? { ...item, quantity } : item
      )
    );
  };

  const incrementQuantity = (productId) => {
    setCartItems(prev =>
      prev.map(item =>
        item._id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decrementQuantity = (productId) => {
    setCartItems(prev =>
      prev
        .map(item =>
          item._id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const getCartCount = () =>
    cartItems.reduce((count, item) => count + item.quantity, 0);

  const isInCart = (productId) =>
    cartItems.some(item => item._id === productId);

  // ================= WISHLIST FUNCTIONS =================

  const addToWishlist = (product) => {
    if (!user) {
      alert('Please login to add items to wishlist');
      return { success: false };
    }

    setWishlist(prev => {
      const exists = prev.find(item => item._id === product._id);
      return exists
        ? prev.filter(item => item._id !== product._id)
        : [...prev, product];
    });

    return { success: true };
  };

  const removeFromWishlist = (productId) => {
    setWishlist(prev => prev.filter(item => item._id !== productId));
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  const isInWishlist = (productId) =>
    wishlist.some(item => item._id === productId);

  const moveToCart = (productId) => {
    if (!user) {
      alert('Please login to add items to cart');
      return { success: false };
    }

    const product = wishlist.find(item => item._id === productId);
    if (product) {
      addToCart(product);
      removeFromWishlist(productId);
      return { success: true };
    }

    return { success: false };
  };

  // ================= CONTEXT =================

  const value = {
    cartItems,
    cartCount: getCartCount(),
    cartTotal: getCartTotal(),

    addToCart,
    removeFromCart,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    isInCart,

    wishlist,
    wishlistCount: wishlist.length,

    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
    moveToCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
