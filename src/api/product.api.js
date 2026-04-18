import api from './axios'

export const productAPI = {
  // Public
  getAll: (params) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),

  // Admin
  create: (data) => api.post('/products', data),
  update: (id, data) => api.patch(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
}