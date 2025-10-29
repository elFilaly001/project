"use client";

import { LayoutDashboard, TrendingUp, Eye, BarChart3, FileText, Database, MonitorSpeaker, BookOpen, HelpCircle, User, LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter, useParams, usePathname, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useSidebar } from '@/components/sidebar-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
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
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Determine active sidebar item from current pathname
  const determineActiveFromPath = (p?: string) => {
    const path = (p || "") as string;
    // check known routes and return the matching menu id
    if (path.includes("/dashboard")) return "dashboard";
    if (path.includes("/reports")) return "reports";
    if (path.includes("/digital-ad-monitoring")) return "digital-ad-monitoring";
    if (path.includes("/ranking")) return "ranking";
    if (path.includes("/brand-watch")) return "brand-watch";
    if (path.includes("/stock-market")) return "stock-market";
    // API might be under /api or /{lang}/api
    if (path === "/api" || path.includes("/api")) return "data-api";
    if (path.includes("/tutorial")) return "tutorial";
    if (path.includes("/support")) return "support";
    return undefined;
  };

  useEffect(() => {
    try {
      const id = determineActiveFromPath(pathname);
      if (id) setActiveItem(id);
    } catch (e) {
      // ignore and keep current active item
    }
  }, [pathname]);

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

  // Languages available in `translation/`
  const languages = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
    { code: 'ar', label: 'العربية' },
  ];

  const handleLogout = () => {
    console.log("Logging out...");
  };

  return (
    // Make sidebar fixed on the left so it stays visible while scrolling
    <div
      className={`fixed left-0 top-0 bottom-0 bg-white border-r border-gray-200 flex flex-col transition-all duration-300 z-40 ${isCollapsed ? "w-20" : "w-[264px]"
        }`}
      style={{ height: '100vh' }}
    >
      <div className="h-20 border-b border-gray-200 flex items-center justify-between px-5">
        {/* Logo: show full when expanded, crop to left when collapsed */}
        <div
          className={`flex items-center overflow-hidden transition-all duration-300 `}
        >
          {/* Only show full logo when sidebar is expanded */}
          {!isCollapsed && (
            <img
              src="/logo-intalks.png"
              alt="In-talks"
              className="block h-8 w-full"
              draggable={false}
            />
          )}
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

      <nav className="flex-1 p-4 flex flex-col min-w-0">
        <ul className="space-y-2">
          {topMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => {
                    setActiveItem(item.id);
                    // navigate based on selected item
                    switch (item.id) {
                      case 'dashboard':
                        router.push(`/${lang}/dashboard`);
                        break;
                      case 'data-api':
                        // open the API page at root /api
                        router.push(`/${lang}/api`);
                        break;
                      case 'reports':
                        router.push(`/${lang}/reports`);
                        break;
                      default:
                        // no navigation for other items (keep behavior unchanged)
                        break;
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                    ? "bg-gradient-to-r from-[#F02CB9] to-[#35B9F4] text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                    } ${isCollapsed ? "justify-center" : ""} min-w-0`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && <span className="font-medium text-sm truncate">{item.label}</span>}
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
                  onClick={() => {
                    setActiveItem(item.id);
                    switch (item.id) {
                      case 'tutorial':
                        router.push(`/${lang}/tutorial`);
                        break;
                      case 'support':
                        router.push(`/${lang}/support`);
                        break;
                      default:
                        break;
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

            {/* Language submenu - opens to the right on hover/click */}
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="flex items-center w-full text-sm">
                <span>{t('sidebar.language') ?? 'Language'}</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent sideOffset={6} className="w-44">
                {languages.map((l) => (
                  <DropdownMenuItem
                    key={l.code}
                    onClick={() => {
                      try {
                        const currentPath = pathname || '/';
                        const segments = currentPath.split('/');
                        // segments[0] is empty string because pathname starts with '/'
                        if (segments.length > 1 && segments[1]) {
                          // replace existing lang segment
                          segments[1] = l.code;
                        } else {
                          // no lang present, insert after the root
                          segments.splice(1, 0, l.code);
                        }
                        const newPath = segments.join('/') + (searchParams ? `?${searchParams.toString()}` : '');
                        router.push(newPath);
                      } catch (e) {
                        router.push(`/${l.code}`);
                      }
                    }}
                    className={`flex items-center justify-between w-full text-sm ${l.code === lang ? 'font-medium' : ''}`}
                  >
                    <span className="mr-2 text-sm">{l.label}</span>
                    {l.code === lang && <span className="text-xs text-gray-500">✓</span>}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>

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
