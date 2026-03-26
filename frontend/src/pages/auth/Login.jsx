// src/pages/Login.jsx
import { useState, useContext } from "react"
import { login as apiLogin } from "../../api/auth"
import { AuthContext } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { LogIn, User, Lock } from "lucide-react"
import { Button } from "../../components/ui/button"
import GlowWrapper from "../../components/ui/GlowWrapper"
import { Alert } from "../../components/ui/Alert"
import { Link } from "react-router-dom"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const { login: saveToken } = useContext(AuthContext)
  const navigate = useNavigate()

  async function handleLogin(e) {
    e.preventDefault()
    setError("")
    setIsLoading(true)
    try {
      const data = await apiLogin(username, password)
      if (!data.access_token) throw new Error("Неверный логин или пароль")
      saveToken(data.access_token)
      navigate("/notes")
    } catch (err) {
      setError(err.detail || err.message || "Нет связи с сервером")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0B0B0B] to-[#1E1E1E] text-white px-4">
      <GlowWrapper className="w-full max-w-sm">
        <motion.form
          onSubmit={handleLogin}
          className="relative z-10 bg-[#1B1B1B] rounded-3xl p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center mb-6">
            <div className="text-3xl font-bold text-[#95DBFF] tracking-wide">Notiq</div>
          </div>

          <h2 className="text-xl font-semibold mb-6 text-center text-[#D0D0D0]">
            Добро пожаловать 👋
          </h2>

          {/* Username */}
          <div className="mb-4">
            <label className="block text-sm mb-1 text-[#D0D0D0]">Имя пользователя</label>
            <div className="flex items-center border border-[#2A2A2A] rounded-xl px-3 py-2 bg-[#0B0B0B] focus-within:ring-2 focus-within:ring-[#95DBFF]">
              <User className="w-5 h-5 text-[#A27EFF] mr-2" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="pavel"
                className="w-full bg-transparent text-white placeholder-[#555] outline-none"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-sm mb-1 text-[#D0D0D0]">Пароль</label>
            <div className="flex items-center border border-[#2A2A2A] rounded-xl px-3 py-2 bg-[#0B0B0B] focus-within:ring-2 focus-within:ring-[#A27EFF]">
              <Lock className="w-5 h-5 text-[#A27EFF] mr-2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent text-white placeholder-[#555] outline-none"
                required
              />
            </div>
          </div>

          {/* Alert message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="mb-4"
              >
                <Alert variant="error">{error}</Alert>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit button */}
          <Button
            type="submit"
            variant="magic"
            className="w-full flex items-center justify-center gap-2 mt-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="animate-pulse">Загрузка...</span>
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                Войти
              </>
            )}
          </Button>

          <div className="mt-6 text-center text-xs text-[#666]">
            <p>
              Ещё нет аккаунта? <Link to="/register" className="text-[#95DBFF] hover:underline">Зарегистрируйтесь</Link>
            </p>
          </div>
        </motion.form>
      </GlowWrapper>
    </div>
  )
}
