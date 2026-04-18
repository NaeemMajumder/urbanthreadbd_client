import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import AppRoutes from "./routes/AppRoutes";
import ScrollToTop from "./components/common/ScrollToTop";
import { useAuth } from "./hooks/useAuth";
import { useCart } from './hooks/useCart';
import { useEffect } from "react";
import { cartAPI } from "./api/cart.api";

function App() {
const CartSync = () => {
  const { isLoggedIn } = useAuth()
  const { loadCartFromBackend } = useCart()

  useEffect(() => {
    if (isLoggedIn) {
      const syncCart = async () => {
        // Local cart এ items আছে কিনা check করো
        const localCart = JSON.parse(localStorage.getItem('ut_cart') || '[]')

        if (localCart.length > 0) {
          // Local items গুলো backend এ add করো
          for (const item of localCart) {
            try {
              await cartAPI.add({
                productId: item.productId,
                size: item.size,
                color: item.color,
                quantity: item.quantity,
              })
            } catch (err) {
              console.error('Sync item failed:', err)
            }
          }
        }

        // তারপর backend থেকে load করো
        await loadCartFromBackend()
      }
      syncCart()
    }
  }, [isLoggedIn])

  return null
}

  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <CartSync />
          <ScrollToTop />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#1A1A1A",
                color: "#F0F0F0",
                border: "1px solid #333333",
              },
              success: {
                iconTheme: { primary: "#AAFF00", secondary: "#0A0A0A" },
              },
              error: {
                iconTheme: { primary: "#FF4444", secondary: "#0A0A0A" },
              },
            }}
          />
          <AppRoutes />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
