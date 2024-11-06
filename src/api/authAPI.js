import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const authAPI = {
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
            // const formData = new FormData();
            // for (const [key, value] of Object.entries(credentials)) {
            //     formData.append(key, value);
            //     console.log('key', key);
            //     console.log('value', value);
            // }
            // console.log('formData', formData);
            
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
            console.log('response', response);
            return response;
        } catch (error) {
            console.log('error', error.response?.data || error.message); 
            throw error.response?.data || error.message;
        }
    }
};