import api from './axios'

export const cartAPI = {
  get: () => api.get('/cart'),
  add: (data) => api.post('/cart', data),
  update: (productId, data) => api.patch(`/cart/${productId}`, data),
  remove: (productId) => api.delete(`/cart/${productId}`),
  clear: () => api.delete('/cart'),
}