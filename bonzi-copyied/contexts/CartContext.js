import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [cartLoading, setCartLoading] = useState(false);

  // Load cart data from localStorage on mount
  useEffect(() => {
    const savedCartCount = localStorage.getItem('cart_count');
    const savedCartItems = localStorage.getItem('cart_items');

    if (savedCartCount) {
      setCartCount(parseInt(savedCartCount, 10));
    }

    if (savedCartItems) {
      try {
        setCartItems(JSON.parse(savedCartItems));
      } catch (error) {
        console.error('Error parsing cart items from localStorage:', error);
      }
    }
  }, []);

  // Save cart data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart_count', cartCount.toString());
    localStorage.setItem('cart_items', JSON.stringify(cartItems));
  }, [cartCount, cartItems]);

  const addToCart = async (productId, quantity = 1, colorId = null, sizeId = null) => {
    setCartLoading(true);
    try {
      const accessToken = localStorage.getItem('access_token');

      const payload = {
        product_id: productId,
        product_qty: quantity,
        color_id: colorId || "",
        size_id: sizeId || ""
      };

      const response = await fetch('https://api.glst.in/api/v3/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (data.success) {
        // Update cart count and items
        setCartCount(data.data.cart_count);
        setCartItems(data.data.cart_items);

        return { success: true, message: data.message };
      } else {
        throw new Error(data.message || 'Failed to add item to cart');
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      return { success: false, message: error.message };
    } finally {
      setCartLoading(false);
    }
  };

  const clearCart = () => {
    setCartCount(0);
    setCartItems([]);
  };

  const value = {
    cartCount,
    cartItems,
    cartLoading,
    addToCart,
    clearCart,
    setCartCount,
    setCartItems
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}