import { Bell, ChevronDown, LogOut, Megaphone, User } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  return (
    <nav className="bg-linear-to-r from-[#18A2BA] to-[#296377] text-white px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img 
          src="/logo-pln.png"
          alt="logo-pln"  
          className="h-16 w-full"
        />
      </div>

      <div className="flex items-center gap-8">
        <Button variant="ghost" className="bg-white/30 sm:inline-flex gap-2 rounded-lg">
          <Megaphone className="size-5"/>
          Kontak Admin
        </Button>
        
        <Button variant="ghost" className="sm:inline-flex">
          <Bell className="size-5"/>
        </Button>

        <div className="relative">
          <Button
            variant="ghost"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-3 py-4 text-white rounded-lg transition-colors"
          >
            <div className="size-8 rounded-full bg-gray-300 overflow-hidden">
              <User className="size-full object-cover"/>
            </div>
            <span className="hidden sm:inline">John Doe</span>
            <ChevronDown className="h-4 w-4" />
          </Button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
              <Button variant="ghost" className="flex items-center justify-start w-full text-sm text-gray-700 hover:bg-gray-100 gap-2">
                <User className="size-4 text-[#296377]"/>
                Profile
              </Button>
              <Button variant="ghost" className="flex items-center justify-start w-full text-sm text-gray-700 hover:bg-gray-100 gap-2">
                <LogOut className="size-4 text-red-500"/>
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}