import axios from 'axios';

// Dynamic API URL detection
const getApiUrl = () => {
  // If REACT_APP_API_URL is set, use it
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  
  // Check if we're in GitHub Codespaces
  if (window.location.hostname.includes('github.dev')) {
    // Extract the codespace URL and replace port 3000 with 5000
    const currentUrl = window.location.origin;
    const codespaceUrl = currentUrl.replace(':3000', ':5000');
    return codespaceUrl;
  }
  
  // Default to localhost for local development
  return 'http://localhost:5000';
};

const API_URL = getApiUrl();

console.log('API URL:', API_URL);

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api; 