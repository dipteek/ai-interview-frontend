// src/lib/api.js - Updated to work with NextAuth
import axios from 'axios'
import { getSession } from 'next-auth/react'
import { signOut, useSession } from "next-auth/react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

const handleLogout = () => {
    signOut({ callbackUrl: '/' });
  };

class ApiService {
  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Request interceptor to add auth token from NextAuth session
    // this.client.interceptors.request.use(
    //   async (config) => {
    //     try {
    //       const session = await getSession()

    //       console.log("token ",session?.access_token)
          
    //       // Try to get Django token from session first
    //       if (session?.djangoToken) {
    //         config.headers.Authorization = `Bearer ${session.djangoToken}`
    //       }
    //       // Fallback to NextAuth token if available
    //       else if (session?.accessToken) {
    //         config.headers.Authorization = `Bearer ${session.accessToken}`
    //       }
    //       // Or use the token from NextAuth user object
    //       else if (session?.user?.token) {
    //         config.headers.Authorization = `Bearer ${session.user.token}`
    //       }
          
    //       console.log('Session data:', session) // Debug log
    //       console.log('Authorization header:', config.headers.Authorization) // Debug log
    //     } catch (error) {
    //       console.error('Error getting session:', error)
    //     }
        
    //     return config
    //   },
    //   (error) => Promise.reject(error)
    // )

    this.client.interceptors.request.use(
  async (config) => {
    try {
      const session = await getSession()
      console.log("session ",session)
      console.log("token ",session?.accessToken)

    //   const token =
    //     session?.accessToken || session?.user?.accessToken || session?.user?.token;
    
        const token =
  session?.djangoToken || session?.jwtToken || session?.user?.djangoToken || session?.user?.jwtToken;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }

      console.log('Session:', session)
      console.log('Auth Header:', config.headers.Authorization)
    } catch (error) {
      console.error('Error getting session:', error)
    }

    return config
  },
  (error) => Promise.reject(error)
)


    // Response interceptor to handle auth errors
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
        //()=>{handleLogout}
        localStorage.removeItem("token");
  localStorage.removeItem("user");
        //signOut({ callbackUrl: '/login' });
          console.error('Authentication failed:', error.response.data)
          // Redirect to login page
          
          window.location.href = '/login'
        }
        return Promise.reject(error)
      }
    )
  }

  // ... rest of your API methods remain the same
  async generateProblem(params) {
    const response = await this.client.post('/api/coding/generate-problem/', params)
    return response.data
  }

  async runCode(codeData) {
    const response = await this.client.post('/api/coding/run/', codeData)
    return response.data
  }

  async submitCode(codeData) {
    const response = await this.client.post('/api/coding/submit/', codeData)
    return response.data
  }

  async saveSession(sessionData) {
    const response = await this.client.post('/api/coding/save-session/', sessionData)
    return response.data
  }

  async getUserSubmissions() {
    const response = await this.client.get('/api/coding/submissions/')
    return response.data
  }

  async getDashboardStats() {
    const response = await this.client.get('/api/dashboard/')
    return response.data
  }

  async getAnalytics(timeRange = '30d') {
    const response = await this.client.get(`/api/analytics/?range=${timeRange}`)
    return response.data
  }
}

export default new ApiService()