import { NavLink } from "react-router-dom"
import type { SidebarItemConfig } from "./sidebarConfig"

type SidebarItemProps = {
  item: SidebarItemConfig
  isExpanded: boolean
  onNavigate?: () => void
}

export default function SidebarItem({ item, isExpanded, onNavigate }: SidebarItemProps) {
  const content = (
    <>
      <item.icon className="h-4 w-4 shrink-0" />
      {isExpanded && <span className="truncate">{item.label}</span>}
      {isExpanded && item.badge != null && (
        <span className="ml-auto rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/80">
          {item.badge}
        </span>
      )}
    </>
  )

  if (!item.href || item.disabled) {
    return (
      <button
        type="button"
        disabled={item.disabled}
        aria-disabled={item.disabled || undefined}
        className={`flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-[13px] text-white/70 transition-colors
          ${item.disabled ? "opacity-40" : "hover:bg-white/5 hover:text-white"}
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20`}
        title={!isExpanded ? item.label : undefined}
      >
        {content}
      </button>
    )
  }

  return (
    <NavLink
      to={item.href}
      onClick={onNavigate}
      end
      title={!isExpanded ? item.label : undefined}
      className={({ isActive }) =>
        `flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-[13px] transition-colors
          ${
            isActive
              ? "bg-white/15 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_6px_16px_rgba(0,0,0,0.35)] ring-1 ring-inset ring-white/15"
              : "text-white/70 hover:bg-white/5 hover:text-white"
          }
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20`
      }
    >
      {content}
    </NavLink>
  )
}
