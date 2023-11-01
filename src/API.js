import axios from 'axios';
const api = axios.create({
  baseURL: 'http://37.187.176.243:8001',
})
export default api;