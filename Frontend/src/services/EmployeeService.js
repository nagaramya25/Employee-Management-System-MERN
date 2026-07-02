import axios from "axios";

const API_URL = "http://localhost:5000/employees";

// Function to get Authorization header
const getAuthHeader = () => {
    const token = localStorage.getItem("token");

    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

// Get all employees
export const getEmployees = () => {
    return axios.get(API_URL, getAuthHeader());
};

// Get employee by ID
export const getEmployeeById = (id) => {
    return axios.get(`${API_URL}/${id}`, getAuthHeader());
};

// Add employee
export const addEmployee = (employee) => {

    const config = {
        headers: {
            ...getAuthHeader().headers,
            "Content-Type": "multipart/form-data"
        }
    };

    return axios.post(API_URL, employee, config);

};

// Update employee
export const updateEmployee = (id, employee) => {

    const config = {
        headers: {
            ...getAuthHeader().headers,
            "Content-Type": "multipart/form-data"
        }
    };

    return axios.put(`${API_URL}/${id}`, employee, config);

};

// Delete employee
export const deleteEmployee = (id) => {
    return axios.delete(`${API_URL}/${id}`, getAuthHeader());
};