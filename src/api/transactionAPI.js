import axios from 'axios';
import { create } from 'domain';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const transactionAPI = {
    get_user_transactions: async (user_id) => {
        try { 
            const response = await axios.get(`${BASE_URL}/users/${user_id}/transactions`, {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
        
            return response;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    create_transaction: async (transaction) => {
        try {
            const response = await axios.post(`${BASE_URL}/transactions`, transaction, {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
        
            return response;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    update_transaction: async (transaction) => {
        try {
            const response = await axios.put(`${BASE_URL}/transactions/${transaction.id}`, transaction, {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
        
            return response;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    delete_transaction: async (transaction_id) => {
        try {
            const response = await axios.delete(`${BASE_URL}/transactions/${transaction_id}`, {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
        
            return response;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    get_calendar_data: async (user_id) => {
        try {
            const response = await axios.get(`${BASE_URL}/users/${user_id}/balance`, {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return response;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }

};