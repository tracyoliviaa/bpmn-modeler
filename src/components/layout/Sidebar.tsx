
import { Link, useLocation } from "react-router-dom"
import { BarChart, Cog, Database, LayoutDashboard, LogOut, Workflow } from 'lucide-react'
import { cn } from "../../utils/utils"
import { Button } from "../ui/button"

export default function Sidebar() {
  const location = useLocation()

  const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Processes", href: "/processes", icon: Workflow },
    { name: "Modeler", href: "/modeler", icon: Database },
    { name: "Analytics", href: "/analytics", icon: BarChart },
    { name: "Settings", href: "/settings", icon: Cog },
  ]

  return (
    <div className="hidden lg:flex lg:flex-col lg:w-64 lg:z-50 lg:border-r lg:bg-background">
      <div className="flex h-14 items-center border-b px-4">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <Workflow className="h-6 w-6" />
          <span>BPMN Modeler</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href || location.pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                  isActive ? "bg-muted text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="mt-auto p-4 border-t">
        <Button variant="outline" className="w-full justify-start" size="sm">
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </Button>
      </div>
    </div>
  )
}
export {}


