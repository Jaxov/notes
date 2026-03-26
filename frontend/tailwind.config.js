export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Geist", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
              background: "var(--theme-bg)",
              surface: "var(--theme-surface)",
              panel: "var(--theme-panel)",
              border: "var(--theme-border)",
              foreground: "var(--theme-text)",
              muted: "var(--theme-text-muted)",
              accent: "var(--theme-accent)",
              accentStrong: "var(--theme-accent-strong)",
      },
      keyframes: {
        glow: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        glow: "glow 6s ease infinite",
      },
    },
  },
  plugins: [],
}
