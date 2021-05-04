import axios from "axios";

const api = axios.create({
  //  baseURL: 'http://localhost:3003/',
  baseURL: process.env.REACT_APP_BACKEND_URL || "http://localhost:3003/",
  // baseURL: process.env.BACKEND_URL ||'http://localhost:3003/'
  // baseURL: 'https://api.stepx.com.br/',
  // baseURL: process.env.USER === "deploy"  ? "https://api.stepx.com.br/": "http://localhost:3003/",
  // 'https://api.stepx.com.br/',
  // headers: { Authorization: `Bearer ${localStorage.getItem('@Step:token')}` }
});

export default api;
