import api from './axios'

export const userAPI = {
  getMe: () => api.get('/users/me'),
  updateMe: (data) => api.patch('/users/me', data),
  getAll: () => api.get('/users'),
  getById: (id) => api.get(`/users/${id}`),
}