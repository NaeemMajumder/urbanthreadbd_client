import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

// Login না করলে এই route এ ঢুকতে দেবে না
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth()
  return isLoggedIn ? children : <Navigate to="/login" replace />
}

export default ProtectedRoute