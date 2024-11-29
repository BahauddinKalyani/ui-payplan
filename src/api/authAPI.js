import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
axios.defaults.withCredentials = true
export const authAPI = {
    checkAuth: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/check-auth`, {
                headers: {
                'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                return true;
            }
            return false;
            // return response;
        } catch (error) {
            console.log('error', error.response?.data || error.message || error.detail);
            return false;
            // throw error.response?.data || error.message || error.detail;
        }
    },
    login: async (credentials) => {
        try {
            const formData = new FormData();
            for (const [key, value] of Object.entries(credentials)) {
                formData.append(key, value);
            }
            const response = await axios.post(`${BASE_URL}/login`, formData, {
                headers: {
                'Content-Type': 'multipart/form-data',
                },
            });
        
            return response;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    signup: async (credentials) => {
        try {
            const response = await axios.post(`${BASE_URL}/signup`, credentials, {
                headers: {
                'Content-Type': 'application/json',
                },
            });
        
            return response;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    confirm_signup: async (credentials) => {
        try {
            const response = await axios.post(`${BASE_URL}/confirm-signup`, credentials, {
                headers: {
                'Content-Type': 'application/json',
                },
            });
            return response;
        } catch (error) {
            // console.log('error', error.response?.data || error.message); 
            throw error.response?.data || error.message;
        }
    },
    logout: async () => {
        try {
            const response = await axios.post(`${BASE_URL}/logout`, {
                headers: {
                'Content-Type': 'application/json',
                },
            });
            return response;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
};