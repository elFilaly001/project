"use client";

import { SidebarProvider, useSidebar } from '@/components/sidebar-context';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import React from 'react';

interface LayoutContentProps {
  children: React.ReactNode;
  user: { name: string; email: string };
}

function InnerLayoutContent({ children, user }: LayoutContentProps) {
  const { isCollapsed } = useSidebar();

  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isCollapsed ? 'pl-0 lg:pl-20' : 'pl-0 lg:pl-[264px]'}`}>
        <Header user={user} />
        <div className="mt-4 flex-1">
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}

export default function LayoutContent({ children, user }: LayoutContentProps) {
  return (
    <SidebarProvider>
      <InnerLayoutContent children={children} user={user} />
    </SidebarProvider>
  );
}