import axios from "axios";

const API_URL =
  "https://employee-management-system-mern-bs3y.onrender.com/api/auth";
// Register User
export const registerUser = (user) => {
    return axios.post(`${API_URL}/register`, user);
};

// Login User
export const loginUser = (user) => {
    return axios.post(`${API_URL}/login`, user);
};