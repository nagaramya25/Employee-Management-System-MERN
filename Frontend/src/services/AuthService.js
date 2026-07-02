import axios from "axios";

const API_URL = "http://localhost:5000/auth";

// Register User
export const registerUser = (user) => {
    return axios.post(`${API_URL}/register`, user);
};

// Login User
export const loginUser = (user) => {
    return axios.post(`${API_URL}/login`, user);
};