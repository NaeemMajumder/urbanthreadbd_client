import api from './axios'

export const reviewAPI = {
  getByProduct: (productId) => api.get(`/reviews/${productId}`),
  create: (productId, data) => api.post(`/reviews/${productId}`, data),
  update: (id, data) => api.patch(`/reviews/${id}`, data),
  delete: (id) => api.delete(`/reviews/${id}`),
}