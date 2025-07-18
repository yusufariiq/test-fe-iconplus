import { Home, FileText } from "lucide-react"

interface SidebarProps {
  activeItem?: string
}

export default function Sidebar({ activeItem = "order-meeting" }: SidebarProps) {
  const navigationItems = [
    {
      id: "home",
      icon: Home,
      label: "Home",
      href: "/",
    },
    {
      id: "order-meeting",
      icon: FileText,
      label: "Order Meeting Rooms",
      href: "/",
    },
  ]

  return (
    <aside className="min-h-screen w-20 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = activeItem === item.id

          return (
            <button
              key={item.id}
              aria-label={item.label}
              className={`w-full flex items-center justify-start gap-3 h-12 px-3 rounded-lg transition-colors ${
                isActive ? "bg-[#296377] text-white hover:bg-[#18A2BA]" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
            </button>
          )
        })}
      </div>
    </aside>
  )
}
