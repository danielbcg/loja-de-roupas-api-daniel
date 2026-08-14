import { createContext, useContext, useState } from 'react'
import api from '../lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'))

  async function login(email, senha) {
    const response = await api.post('/auth/login', { email, senha })
    const novoToken = response.data
    localStorage.setItem('token', novoToken)
    setToken(novoToken)
  }

  function logout() {
    localStorage.removeItem('token')
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ token, login, logout, autenticado: !!token }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}