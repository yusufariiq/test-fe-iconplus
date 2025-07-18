import { ChevronRight } from "lucide-react"

interface BreadcrumbsItem {
  label: string
  href?: string
  isActive?: boolean
}

interface BreadcrumbsProps {
  items: BreadcrumbsItem[]
}

export default function Breadcrumbs({items}: BreadcrumbsProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && <ChevronRight className="size-4"/>}
          {item.href && !item.isActive ? (
            <a href={item.href} className="hover:text-gray-700 transition-colors">
              {item.label}
            </a>
          ) : (
            <span className={item.isActive ? "text-cyan-600 font-medium" : ""}>
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  )
}