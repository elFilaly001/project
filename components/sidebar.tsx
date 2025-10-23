"use client";

import { LayoutDashboard, TrendingUp, Eye, BarChart3, ServerCog, Activity, FileText, Database, MonitorSpeaker, BookOpen, HelpCircle, User, LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useSidebar } from '@/components/sidebar-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// menu items are defined inside the component so we can translate labels with useTranslations

export default function Sidebar() {
  const t = useTranslations();
  const params = useParams();
  const lang = (params && (params as any).lang) || 'en';
  const router = useRouter();
  const { isCollapsed, setIsCollapsed } = useSidebar();
  const [activeItem, setActiveItem] = useState("dashboard");

  const topMenuItems = [
    { icon: LayoutDashboard, label: t('sidebar.dashboard'), id: 'dashboard' },
    { icon: FileText, label: t('sidebar.reports'), id: 'reports' },
    { icon: MonitorSpeaker, label: t('sidebar.digital_ad_monitoring'), id: 'digital-ad-monitoring' },
    { icon: TrendingUp, label: t('sidebar.ranking'), id: 'ranking' },
    { icon: Eye, label: t('sidebar.brand_watch'), id: 'brand-watch' },
    { icon: BarChart3, label: t('sidebar.stock_market'), id: 'stock-market' },
    { icon: Database, label: t('sidebar.data_api'), id: 'data-api' },
  ];

  // Bottom menu items that should always be pinned to the bottom
  const bottomMenuItems = [
    { icon: BookOpen, label: t('sidebar.tutorial'), id: 'tutorial' },
    { icon: HelpCircle, label: t('sidebar.support'), id: 'support' },
  ];

  const handleLogout = () => {
    console.log("Logging out...");
  };

  const handleProfile = () => {
    console.log("Navigating to profile...");
  };

  return (
    // Make sidebar fixed on the left so it stays visible while scrolling
    <div
      className={`fixed left-0 top-0 bottom-0 bg-white border-r border-gray-200 flex flex-col transition-all duration-300 z-40 ${isCollapsed ? "w-20" : "w-66"
        }`}
      style={{ height: '100vh' }}
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
          aria-label={isCollapsed ? t('sidebar.expand') : t('sidebar.collapse')}
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>

      <nav className="flex-1 p-4 flex flex-col">
        <ul className="space-y-2">
          {topMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => {
                    setActiveItem(item.id);
                    // navigate to dashboard route when clicking the dashboard item
                    if (item.id === 'dashboard') {
                      router.push(`/${lang}/dashboard`);
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                    ? "bg-gradient-to-r from-[#F02CB9] to-[#35B9F4] text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                    } ${isCollapsed ? "justify-center" : ""}`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && <span className="font-medium text-sm">{item.label}</span>}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Bottom group - pinned to the bottom */}
        <ul className="space-y-2 mt-auto">
          {bottomMenuItems.map((item) => {
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
                  {!isCollapsed && <span className="font-medium text-sm">{item.label}</span>}
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
                  {t('sidebar.avatar_initials')}
                </AvatarFallback>
              </Avatar>
              {!isCollapsed && (
                <div className="flex flex-col items-start flex-1 min-w-0">
                  <span className="font-medium text-gray-900 text-sm truncate w-full">
                    {t('sidebar.user_name')}
                  </span>
                  <span className="text-xs text-gray-500 truncate w-full">
                    {t('sidebar.user_email')}
                  </span>
                </div>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>{t('sidebar.my_account')}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/${lang}/profile`} className="flex items-center w-full text-sm">
                <User className="mr-2 h-4 w-4" />
                <span>{t('sidebar.profile')}</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span className="text-sm">{t('sidebar.logout')}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
