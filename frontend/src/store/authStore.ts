import axios from 'axios';
import { create } from 'zustand'

export interface AuthStore {
    signUp: (name: any, email: any, password: any) => Promise<any>;
     user: any;
    isLoading: boolean;
    error: any;
    isAuthenticated: boolean;
    isCheckingAuth: boolean;
}

const API_URL = 'http://localhost:5050/api/auth'

export const useAuthStore = create((set) => ( {
    user: null,
    isLoading: false,
    error: null,
    isAuthenticated: false,
    isCheckingAuth: true,
     
    signUp: async (name: any, email: any, password: any) => {
        set({ isLoading: true, error: null});

        try {
            
            const response = await axios.post(`${API_URL}/signup`, {name, email, password})

            alert('sign up successful')
            
            console.log(response.data)

        } catch (error) {
            console.log(error)
        }
    }
}))