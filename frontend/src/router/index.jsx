import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import Login from "../pages/auth/Login"
import Register from "../pages/auth/Register"
import DashboardLayout from "../components/layout/DashboardLayout"
import Notes from "../pages/dashboard/Notes"
import Settings from "../pages/dashboard/Settings"
import Profile from "../pages/dashboard/Profile"
import PrivateRoute from "./PrivateRoute"
import PublicRoute from "./PublicRoute"
import Home from "../pages/dashboard/Home"
import { Navigate } from "react-router-dom"

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

        <Route path="/dashboard" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
          <Route path='home' element={<Home />} />
          <Route path="notes" element={<Notes />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
          <Route index element={<Navigate to="home" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}




