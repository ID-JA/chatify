import axios from "axios";
console.log(process.env.REACT_APP_SERVER_URI);
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URI,
});

export default axiosInstance;
