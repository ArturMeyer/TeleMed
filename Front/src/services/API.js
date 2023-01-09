import axios from 'axios';
 
const api = axios.create({
  baseURL: `http://IP:4000` //endereço ipv4 + porta da api
});
 
export default api;