import { createContext, useState, useEffect } from 'react'
import { verifyToken } from '../api/auth' // эндпоинт на FastAPI

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null)
  const [isLoading, setIsLoading] = useState(true) // пока не знаем валидность

  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    if (!savedToken) {
      setIsLoading(false)
      return
    }

    async function checkToken() {
      try {
        await verifyToken(savedToken) // бэкенд вернёт ошибку если невалидный
        setToken(savedToken) // токен валиден
      } catch {
        setToken(null)
        localStorage.removeItem('token')
      } finally {
        setIsLoading(false)
      }
    }

    checkToken()
  }, [])

  const login = (newToken) => {
    setToken(newToken)
    localStorage.setItem('token', newToken)
  }

  const logout = () => {
    setToken(null)
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}
