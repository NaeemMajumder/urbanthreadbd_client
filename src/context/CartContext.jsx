import { createContext, useState, useEffect } from "react";
import { cartAPI } from "../api/cart.api";

const CartContext = createContext(null);

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
  const [syncing, setSyncing] = useState(false);

  // cartItems বদলালে localStorage update
  useEffect(() => {
    localStorage.setItem("ut_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Backend থেকে cart load করো
  const loadCartFromBackend = async () => {
    try {
      const res = await cartAPI.get();
      const backendItems = res.data.data.items.map((item) => ({
        productId: item.productId._id || item.productId,
        name: item.productId.name || item.name,
        image: item.productId.images?.[0] || item.image || "",
        price:
          item.productId.discountPrice || item.productId.price || item.price,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
      }));
      setCartItems(backendItems);
    } catch (err) {
      console.error("Cart load failed:", err);
    }
  };

  const addToCart = async (product, size, color, quantity = 1) => {
    const token = localStorage.getItem("ut_token");

    if (token) {
      // Backend sync
      setSyncing(true);
      try {
        await cartAPI.add({
          productId: product._id,
          size,
          color,
          quantity,
        });
        await loadCartFromBackend();
      } catch (err) {
        console.error("Add to cart failed:", err);
      } finally {
        setSyncing(false);
      }
    } else {
      // LocalStorage
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
    }
  };

  const updateQuantity = async (productId, size, color, quantity) => {
    if (quantity < 1) return removeFromCart(productId, size, color);

    const token = localStorage.getItem("ut_token");
    if (token) {
      setSyncing(true);
      try {
        await cartAPI.update(productId, { size, color, quantity });
        await loadCartFromBackend();
      } catch (err) {
        console.error("Update cart failed:", err);
      } finally {
        setSyncing(false);
      }
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.productId === productId &&
          item.size === size &&
          item.color === color
            ? { ...item, quantity }
            : item,
        ),
      );
    }
  };

  const removeFromCart = async (productId, size, color) => {
    const token = localStorage.getItem("ut_token");
    if (token) {
      setSyncing(true);
      try {
        await cartAPI.remove(productId);
        await loadCartFromBackend();
      } catch (err) {
        console.error("Remove from cart failed:", err);
      } finally {
        setSyncing(false);
      }
    } else {
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
    }
  };

  const clearCart = async () => {
    const token = localStorage.getItem("ut_token");
    if (token) {
      try {
        await cartAPI.clear();
      } catch (err) {
        console.error("Clear cart failed:", err);
      }
    }
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
        syncing,
        loadCartFromBackend,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext };
