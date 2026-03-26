import SidebarItem from "./SidebarItem"
import type { SidebarGroupConfig } from "./sidebarConfig"

type SidebarSectionProps = {
  group: SidebarGroupConfig
  isExpanded: boolean
  showDivider: boolean
  onNavigate?: () => void
}

export default function SidebarSection({
  group,
  isExpanded,
  showDivider,
  onNavigate,
}: SidebarSectionProps) {
  return (
    <div className="space-y-2">
      {showDivider && (
        <div className="px-1">
          <div className="h-1 rounded-full bg-white/5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.6),inset_0_-1px_0_rgba(255,255,255,0.04)]" />
        </div>
      )}
      {group.label && isExpanded && (
        <div className="px-2 text-xs font-medium uppercase tracking-wider text-white/40">
          {group.label}
        </div>
      )}
      <ul className="space-y-1">
        {group.items.map((item) => (
          <li key={item.id}>
            <SidebarItem item={item} isExpanded={isExpanded} onNavigate={onNavigate} />
          </li>
        ))}
      </ul>
    </div>
  )
}
