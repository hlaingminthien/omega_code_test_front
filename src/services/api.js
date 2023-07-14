import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api'; // Replace with your API base URL

// Set the token for subsequent API requests
export const setAuthToken = (newToken) => {
  const token = newToken || localStorage.getItem('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Basic ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Request interceptor for adding the token to requests
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Basic ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Login API call
export const login = async (email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, { email, password });
      const { token } = response.data;
  
      setAuthToken(token); // Set the authentication token for subsequent requests
      localStorage.setItem('token', token); // Store the token in local storage
  
      return response.data;
    } catch (error) {
      throw new Error('Login failed'); // Customize the error message if needed
    }
  };

// Example of another API call with token authentication
export const fetchUserData = async (limit, skip, keyword) => {
  try {
    const response = await axios.get(`${BASE_URL}/users?limit=${limit}&skip=${skip}&keyword=${keyword}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user data'); // Customize the error message if needed
  }
};

// Export user data API call
export const exportUserData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users/export/data`, {
      responseType: 'blob', // Set the response type to 'blob'
    });

    // Create a temporary anchor element to trigger the file download
    const downloadLink = document.createElement('a');
    const url = window.URL.createObjectURL(new Blob([response.data]));
    downloadLink.href = url;
    downloadLink.setAttribute('download', 'users.csv');
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    throw new Error('Failed to export user data'); // Customize the error message if needed
  }
};

export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/users`, userData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create user');
  }
};

// Get user by ID
export const getUser = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user');
  }
};

// Update user by ID
export const updateUser = async (id, user) => {
  try {
    await axios.patch(`${BASE_URL}/users/${id}`, user);
  } catch (error) {
    throw new Error('Failed to update user');
  }
};

export const getProfitLossData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/profit-loss`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch profit-loss data');
  }
};

export const sendEmail = async (payload) => {
  try {
    const response = await axios.post('http://localhost:8000/api/users/send/email', payload);
    return response.data;
  } catch (error) {
    throw new Error('Failed to send email');
  }
};