// src/hooks/useAuth.js
import { useState, useEffect, createContext, useContext } from 'react'
import ApiService from '@/lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      const token = ApiService.getToken()
      if (token) {
        try {
          const data = await ApiService.verifyToken()
          setUser(data.user)
        } catch (error) {
          ApiService.removeToken()
        }
      }
      setLoading(false)
    }

    initAuth()
  }, [])

  const login = async (credentials) => {
    try {
      const data = await ApiService.login(credentials)
      setUser(data.user)
      return data
    } catch (error) {
      throw error
    }
  }

  const register = async (userData) => {
    try {
      const data = await ApiService.register(userData)
      setUser(data.user)
      return data
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    ApiService.removeToken()
    window.location.href = '/'
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}