import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080', // Debe coincidir con tu backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;
