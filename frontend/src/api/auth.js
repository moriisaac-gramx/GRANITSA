import axios from 'axios';

// ✅ Backend API Base URL
const API_URL = 'http://localhost:5000/api/auth';

// ✅ Login Request
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data; // Returns token and user role
  } catch (error) {
    console.error('❌ Login failed:', error.response?.data || error.message);
    return error.response?.data || { message: 'Login failed' };
  }
};

// ✅ Signup Request
export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data; // Success message
  } catch (error) {
    console.error('❌ Signup failed:', error.response?.data || error.message);
    return error.response?.data || { message: 'Signup failed' };
  }
};

// ✅ Logout Utility
export const logout = () => {
  localStorage.removeItem('authToken'); // Clears stored JWT token
};
