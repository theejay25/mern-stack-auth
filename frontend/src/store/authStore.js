import axios from 'axios';
import { create } from 'zustand'

const API_URL = 'http://localhost:5050/api/auth'

export const useAuthStore = create((set) => ( {
    user: null,
    isLoading: false,
    error: null,
    isAuthenticated: false,
    isCheckingAuth: true,
    
    signup: async (email, name, password) => {
        set({ isLoading: true, error: null});

        try {
            
            const response = await axios.post(`${API_URL}/signup`, {name, email, password})\

            const data = await response.json()

             console.log(data.data)

        } catch (error) {
            
        }
    }
}))