import axios from 'axios';
import { create } from 'zustand'

interface proms {
    user: {}
}

export interface AuthStore {
    signUp: (name: string, email: string, password: string) => Promise<proms | null>;
    verifyEmail:(code: string) => Promise<proms | null>;
    LoginHandler: (email: string, password: string) => Promise<proms | null>
    checkAuth: () => Promise<proms | null>;
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
     
    signUp: async (name: string, email: string, password: string) => {
        set({ isLoading: true, error: null});

        try {
            
            const response = await axios.post(`${API_URL}/signup`, {name, email, password})
            
            console.log(response.data)

            set({ isLoading: false, isAuthenticated: true, user: response.data.user})

        } catch (error: any) {
            set({ isLoading: false, error: error.message})
            console.log(error)
            throw error
        }
    },

    verifyEmail: async ( code: string ) => {
        set({isLoading: true, error: null});

        try {

            const response = await axios.post(`${API_URL}/verify-email`, { code })

            set({isLoading: false, isAuthenticated: true, user: response.data.user})
            
        } catch (error) {
            
            set({isLoading: false, error:error})
            console.log(error)
            throw error
        }


    },

    LoginHandler: async(email: string, password: string) => {
        set({isLoading: true, error: null});

        try {
            
            const response = await axios.post(`${API_URL}/login`, {email, password})

            set({isLoading: false, isAuthenticated: true, user: response.data.user})


        } catch (error) {
            set({isLoading: false, error:error})
            console.log(error)
            throw error
        }
    },

    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null});

        try {
            
            const response = await axios.get(`${API_URL}/check-auth`)

            set({isCheckingAuth: false, isAuthenticated: true, user: response.data.user})

        } catch (error) {
            console.log(error)
            set({isCheckingAuth: false, isAuthenticated: false, user: null})
        }
    }
}))