import {
  Cog6ToothIcon,
  ClockIcon,
  CommandLineIcon,
  UserCircleIcon,
  DocumentTextIcon,
  CodeBracketIcon,
  ClipboardDocumentListIcon,
  CreditCardIcon,
  QueueListIcon,
  RectangleStackIcon,
  TableCellsIcon,
} from "@heroicons/react/24/solid"
import type { ComponentType } from "react"

export type SidebarItemConfig = {
  id: string
  label: string
  href?: string
  icon: ComponentType<{ className?: string }>
  badge?: string | number
  badgeKey?: "planDays"
  disabled?: boolean
}

export type SidebarGroupConfig = {
  id: string
  label?: string
  items: SidebarItemConfig[]
}

export const sidebarGroups: SidebarGroupConfig[] = [
  {
    id: "main",
    items: [
      {
        id: "home",
        label: "Home",
        href: "/dashboard/home",
        icon: CommandLineIcon,
      },
      
    ],
  },
  {
    id: "activity",
    items: [
      // {
      //   id: "analytics",
      //   label: "Analytics",
      //   href: "/analytics",
      //   icon: DocumentTextIcon,
      // },
      {
        id: "plan",
        label: "Plan",
        href: "/plan",
        icon: CreditCardIcon,
        badge: "—",
        badgeKey: "planDays",
      },
    ],
  },
  
  {
    id: "system",
    items: [
      {
        id: "settings",
        label: "Settings",
        href: "/settings",
        icon: Cog6ToothIcon,
      },
      {
        id: "CareerTeam",
        label: "Career & Team",
        href: "/career",
        icon: CodeBracketIcon,
      },
      {
        id: "HelpCenter",
        label: "Help & Center",
        href: "/help-center",
        icon: ClipboardDocumentListIcon,
      },
      {
        id: "documentation",
        label: "Docs",
        href: "/documentation",
        icon: DocumentTextIcon,
      },
    ],
  },
]
