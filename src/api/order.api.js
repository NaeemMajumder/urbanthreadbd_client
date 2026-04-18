import api from './axios'

export const orderAPI = {
  // User
  create: (data) => api.post('/orders', data),
  getMyOrders: () => api.get('/orders/my-orders'),

  // Admin
  getAll: (params) => api.get('/orders', { params }),
  updateStatus: (id, status) => api.patch(`/orders/${id}/status`, { orderStatus: status }),
}