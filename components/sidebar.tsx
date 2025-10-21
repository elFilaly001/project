"use client";

import { TrendingUp, Eye, BarChart3, BookOpen, HelpCircle, User, LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const menuItems = [
  { icon: TrendingUp, label: "Rankings", id: "rankings" },
  { icon: Eye, label: "Brand Watch", id: "brand-watch" },
  { icon: BarChart3, label: "Stock Market", id: "stock-market" },
  { icon: BookOpen, label: "Tutorial", id: "tutorial" },
  { icon: HelpCircle, label: "Support", id: "support" },
];

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("rankings");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    console.log("Logging out...");
  };

  const handleProfile = () => {
    console.log("Navigating to profile...");
  };

  return (
    <div
      className={`h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"
        }`}
    >
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        {/* Logo: show full when expanded, crop to left when collapsed */}
        <div
          className={`flex items-center overflow-hidden transition-all duration-300 `}
        >
          <img
            src="/logo-intalks.png"
            alt="In-talks"
            className="block h-8 w-[60px]"
            draggable={false}
          />
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveItem(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                      ? "bg-gradient-to-r from-[#F02CB9] to-[#35B9F4] text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100"
                    } ${isCollapsed ? "justify-center" : ""}`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && <span className="font-medium">{item.label}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-all duration-200 ${isCollapsed ? "justify-center" : ""
                }`}
            >
              <Avatar className="w-8 h-8 flex-shrink-0">
                <AvatarImage src="" />
                <AvatarFallback className="bg-gradient-to-r from-[#F02CB9] to-[#35B9F4] text-white text-sm">
                  JD
                </AvatarFallback>
              </Avatar>
              {!isCollapsed && (
                <div className="flex flex-col items-start flex-1 min-w-0">
                  <span className="font-medium text-gray-900 text-sm truncate w-full">
                    John Doe
                  </span>
                  <span className="text-xs text-gray-500 truncate w-full">
                    john@example.com
                  </span>
                </div>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleProfile} className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
