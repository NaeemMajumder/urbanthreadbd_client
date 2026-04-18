import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
})

// Request interceptor — token attach করে
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('ut_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor — 401 হলে logout
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Login page এ থাকলে redirect করবো না
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        localStorage.removeItem('ut_token')
        localStorage.removeItem('ut_user')
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default api