import { useNavigate, useResolvedPath, useMatch } from "react-router-dom"

export default function SidebarItem({
  icon: Icon,
  name,
  className = "",
  small = false,
  path,
  displayedname,
  activeColor = "blue",
  onClick,
}) {
  const navigate = useNavigate()

  // Надёжный матч: активен только точный маршрут (без подроутов)
  const resolved = useResolvedPath((path || "").toLowerCase())
  const match = useMatch({ path: resolved.pathname, end: true })
  const isActive = !!match

  const glowColors = {
    blue: "rgba(52,108,255,0.7)",
    green: "rgba(43,214,123,0.7)",
    pink: "rgba(236,72,153,0.7)",
    yellow: "rgba(253,224,71,0.7)",
  }
  const semiColors = {
    blue: "rgba(52,108,255,0.4)",
    green: "rgba(43,214,123,0.4)",
    pink: "rgba(236,72,153,0.4)",
    yellow: "rgba(253,224,71,0.4)",
  }
  const glowColor = glowColors[activeColor] || glowColors.blue
  const semiGlow = semiColors[activeColor] || semiColors.blue

  return (
    <button
      onClick={() => { onClick?.(); navigate(resolved.pathname) }}
      className={`
        relative flex items-center w-full rounded-lg
        pl-3 pr-4 py-1.5 ${small ? "text-xs" : "text-sm"}  /* pr-4 даём место под glow */
        transition-all duration-300
        ${isActive
          ? "text-white bg-white/10"
          : "text-white/70 hover:text-white hover:bg-white/5"}
        ${className}
      `}
    >
      <span className="relative z-10 flex items-center">
  {Icon && <Icon className="w-4 h-4 mr-2 flex-shrink-0" />}
  {displayedname}
</span>
    </button>
  )
}
