import axios from 'axios';
export const api = axios.create({ baseURL: '/api' });
export function setAuth(token?: string) {
  if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  else delete (api.defaults.headers.common as any)['Authorization'];
}