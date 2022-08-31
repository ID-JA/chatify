import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URI,
});

// Set the AUTH token for any request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt');
  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

export default axiosInstance;
