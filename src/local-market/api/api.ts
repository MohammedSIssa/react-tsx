import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/local-market",
  withCredentials: true, // sends cookies automatically
});

export default API;
