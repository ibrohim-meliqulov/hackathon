import axios from 'axios';

const BASE_URL = 'https://hackathon-26.onrender.com';
// const BASE_URL = 'http://localhost:3000';

export const axiosClient = axios.create({
  baseURL: BASE_URL,
});

// Add a request interceptor to include the Bearer token
axiosClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('agro_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
