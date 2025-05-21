
import { Bell, Search, User } from 'lucide-react'
import { Button } from "../ui/button"

export default function Header() {
  return (
    <header className="h-14 border-b bg-background flex items-center px-6 sticky top-0 z-10">
      <div className="flex-1 flex items-center">
        <form className="w-full max-w-lg">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search..."
              className="w-full pl-8 bg-muted/40 h-9 rounded-md border border-input"
            />
          </div>
        </form>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <div className="relative">
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
            <span className="sr-only">User menu</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
export {}