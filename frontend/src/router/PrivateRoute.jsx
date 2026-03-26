import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

export default function PrivateRoute({ children }) {
  const { token, isLoading } = useContext(AuthContext)

  // Пока проверяем токен — можно вернуть null или спиннер
  if (isLoading) return null

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}
