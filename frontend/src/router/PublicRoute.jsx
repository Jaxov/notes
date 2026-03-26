import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

export default function PublicRoute({ children }) {
  const { token, isLoading } = useContext(AuthContext)

  if (isLoading) return null

  // Если юзер залогинен — редиректим с /login или /register на /dashboard/notes
  if (token) {
    return <Navigate to="/dashboard/notes" replace />
  }

  return children
}
