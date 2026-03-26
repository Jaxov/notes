// src/pages/Register.jsx
import { use, useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { User, Mail, Lock, UserPlus } from "lucide-react"
import { Button } from "../../components/ui/button"
import GlowWrapper from "../../components/ui/GlowWrapper"
import { Alert } from "../../components/ui/Alert"
import { register as apiRegister } from "../../api/auth" // нужно будет сделать на бэке
import { Link } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"
export default function Register() {
   
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const [error, setError] = useState("")
    
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()

    async function handleRegister(e) {
        e.preventDefault()
        setError("")
        
        setIsLoading(true)
        try {
            const data = await apiRegister(email, password)
            // print(data)
            // if (!data) throw new Error("Пользователь уже зарегистрирован")
            
            navigate("/dashboard/notes") // если хочешь автологин
            // navigate("/login")
        } catch (err) {
            setError(err?.detail || err?.message || "Нет связи с сервером")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0B0B0B] to-[#1E1E1E] text-white px-4">
            <GlowWrapper className="w-full max-w-sm">
                <motion.form
                    onSubmit={handleRegister}
                    className="relative z-10 bg-[#1B1B1B] rounded-3xl p-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex justify-center mb-6">
                        <div className="text-3xl font-bold text-[#95DBFF] tracking-wide">Notiq</div>
                    </div>

                    <h2 className="text-xl font-semibold mb-6 text-center text-[#D0D0D0]">
                        Создать аккаунт ✨
                    </h2>

                    <InputField
                        label="Email"
                        icon={<Mail className="w-5 h-5 text-[#A27EFF] mr-2" />}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        type="email"
                    />

                    <InputField
                        label="Пароль"
                        icon={<Lock className="w-5 h-5 text-[#A27EFF] mr-2" />}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        type={showPassword ? "text" : "password"}
                        isPassword
                        toggleShow={() => setShowPassword(!showPassword)}
                    />

                    {/* <InputField
                        label="Подтверждение пароля"
                        icon={<Lock className="w-5 h-5 text-[#A27EFF] mr-2" />}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        type="password"
                    /> */}

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

                    <Button
                        type="submit"
                        variant="magic"
                        className={`w-full flex items-center justify-center gap-2 mt-2 ${isLoading ? "cursor-wait" : ""}`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <motion.div
                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                            />
                        ) : (
                            <>
                                <UserPlus className="w-5 h-5" />
                                Зарегистрироваться
                            </>
                        )}


                    </Button>
                    <div className="mt-6 text-center text-xs text-[#666]">
                        <p>
                            Уже зарегистрированы? <Link to="/login" className="text-[#95DBFF] hover:underline">Войдите</Link>
                        </p>
                    </div>
                </motion.form>
            </GlowWrapper>
        </div>
    )
}

function InputField({ label, icon, isPassword, toggleShow, type, ...props }) {
  return (
    <div className="mb-4">
      <label className="block text-sm mb-1 text-[#D0D0D0]">{label}</label>
      <div className="flex items-center border border-[#2A2A2A] rounded-xl px-3 py-2 bg-[#0B0B0B] focus-within:ring-2 focus-within:ring-[#A27EFF]">
        {icon}
        <input
          className="w-full bg-transparent text-white placeholder-[#555] outline-none"
          type={type}
          required
          {...props}
        />
        {isPassword && (
          <button type="button" onClick={toggleShow} className="ml-2">
            {type === "password" ? (
              <Eye className="w-5 h-5 text-[#A27EFF]" />
            ) : (
              <EyeOff className="w-5 h-5 text-[#A27EFF]" />
            )}
          </button>
        )}
      </div>
    </div>
  )
}

