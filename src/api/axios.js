import axios from "axios";
import Nprogress from "nprogress";

const local = "http://localhost:8000/api";
const production = "https://api.temvagas.tech/api";

const api = axios.create({
  baseURL: production,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, HEAD, OPTIONS",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    "Cache-Control": "no-cache, no-store, must-revalidate",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const account = localStorage.getItem("account");
    Nprogress.start();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers["X-Account"] = account;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use((response) => {
  Nprogress.done();
  return response;
});

export default api;
