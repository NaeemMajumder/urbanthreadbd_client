import { createContext, useState, useEffect } from "react";

const CartContext = createContext(null);

// localStorage থেকে initial cart সরাসরি নাও
const getInitialCart = () => {
  try {
    const saved = localStorage.getItem("ut_cart");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(getInitialCart);

  // cartItems বদলালে localStorage update করো
  useEffect(() => {
    localStorage.setItem("ut_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, size, color, quantity = 1) => {
    setCartItems((prev) => {
      const exists = prev.find(
        (item) =>
          item.productId === product._id &&
          item.size === size &&
          item.color === color,
      );
      if (exists) {
        return prev.map((item) =>
          item.productId === product._id &&
          item.size === size &&
          item.color === color
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [
        ...prev,
        {
          productId: product._id,
          name: product.name,
          image: product.images?.[0] || "",
          price: product.discountPrice || product.price,
          size,
          color,
          quantity,
        },
      ];
    });
  };

  const updateQuantity = (productId, size, color, quantity) => {
    if (quantity < 1) return removeFromCart(productId, size, color);
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId &&
        item.size === size &&
        item.color === color
          ? { ...item, quantity }
          : item,
      ),
    );
  };

  const removeFromCart = (productId, size, color) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.productId === productId &&
            item.size === size &&
            item.color === color
          ),
      ),
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("ut_cart");
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext };
