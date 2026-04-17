import { Routes, Route } from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout'
import ProtectedRoute from './ProtectedRoute'
import AdminRoute from './AdminRoute'

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Public */}
        <Route path="/" element={
          <div className="flex items-center justify-center h-96">
            <p className="text-[#AAFF00] font-mono text-xl">
              UrbanThread BD ✅ — Navbar Ready!
            </p>
          </div>
        } />
        {/* বাকি routes পরে */}
      </Route>
    </Routes>
  )
}

export default AppRoutes