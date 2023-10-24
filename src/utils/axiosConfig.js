import axios from "axios";

// Create an Axios instance
const service = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  timeout: 5000, // Set the timeout in milliseconds (e.g., 5000ms for 5 seconds)
});

export default service;