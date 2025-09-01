import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Home, Search, FileText, Settings, Shield, ChevronLeft, ChevronRight } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter, useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
const navigationItems = [{
  title: "Dashboard",
  url: "/",
  icon: Home
}, {
  title: "Scan for Anomalies",
  url: "/scan",
  icon: Search
}, {
  title: "Generate Content",
  url: "/generate",
  icon: FileText
}];
export function AppSidebar() {
  const {
    state,
    toggleSidebar
  } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";
  const isActive = (path: string) => currentPath === path;
  return <Sidebar className="border-r border-sidebar-border bg-sidebar">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
            <Shield className="h-5 w-5 text-white" />
          </div>
          {!collapsed && <div className="animate-fade-in">
              <h2 className="text-lg font-semibold text-sidebar-foreground">
                ComplianceCheck
              </h2>
              <p className="text-xs text-sidebar-foreground/70">
                Greenwashing Guardian
              </p>
            </div>}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/60 text-xs font-medium mb-2">
            {!collapsed ? "Navigation" : ""}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map(item => <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="w-full">
                    <NavLink to={item.url} className={({
                  isActive
                }) => `
                        flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200
                        ${isActive ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-soft' : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'}
                      `}>
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && <span className="font-medium animate-fade-in">
                          {item.title}
                        </span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="w-full">
              <NavLink to="/settings" className={({
              isActive
            }) => `
                  flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200
                  ${isActive ? 'bg-sidebar-primary text-sidebar-primary-foreground' : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'}
                `}>
                <Settings className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span className="font-medium animate-fade-in">Settings</span>}
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        
        
      </SidebarFooter>
    </Sidebar>;
}