// src/axiosConfig.ts
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5001' // Change to your backend URL if different
});

export default instance;
