import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#1A1A1A',
                color: '#F0F0F0',
                border: '1px solid #333333',
              },
              success: {
                iconTheme: { primary: '#AAFF00', secondary: '#0A0A0A' },
              },
              error: {
                iconTheme: { primary: '#FF4444', secondary: '#0A0A0A' },
              },
            }}
          />
          <AppRoutes />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App