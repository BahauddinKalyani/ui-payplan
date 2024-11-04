import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const authAPI = {
    login: async (credentials) => {
        try {
          
            // Create a new FormData object
            const formData = new FormData();
            
            // Append each credential to the FormData object
            for (const [key, value] of Object.entries(credentials)) {
                formData.append(key, value);
            }
        
            // Make the POST request with the FormData
            const response = await axios.post(`${BASE_URL}/login`, formData, {
                headers: {
                'Content-Type': 'multipart/form-data',
                },
            });
        
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
  // Add other auth-related API calls here
};