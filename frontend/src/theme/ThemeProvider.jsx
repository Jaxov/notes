import { createContext, useContext, useEffect, useState } from "react"

export const ThemeContext = createContext()

const THEME_KEY = "app-theme"

const predefinedThemes = ["theme-light", "theme-dark", "theme-ink"]

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState("theme-light")

  useEffect(() => {
    const saved = localStorage.getItem(THEME_KEY)
    if (saved) {
      applyTheme(saved)
      setThemeState(saved)
    } else {
      applyTheme("theme-light")
    }
  }, [])

  const applyTheme = (newTheme) => {
    const html = document.documentElement

    // Удаляем старые классы тем
    predefinedThemes.forEach(t => html.classList.remove(t))

    // Если это не кастом — добавляем класс
    if (predefinedThemes.includes(newTheme)) {
      html.classList.add(newTheme)
    }

    localStorage.setItem(THEME_KEY, newTheme)
    setThemeState(newTheme)
  }

  const setCustomTheme = (customVars) => {
    const html = document.documentElement

    // Удаляем theme-классы
    predefinedThemes.forEach(t => html.classList.remove(t))

    Object.entries(customVars).forEach(([key, value]) => {
      html.style.setProperty(`--${key}`, value)
    })

    localStorage.setItem(THEME_KEY, "custom")
    setThemeState("custom")
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: applyTheme,
        setCustomTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
