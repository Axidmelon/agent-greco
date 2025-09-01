import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";
interface LayoutProps {
  children: ReactNode;
}
export function Layout({
  children
}: LayoutProps) {
  // TODO: Connect to Google OAuth - replace with actual user state
  const isAuthenticated = true; // Placeholder for authentication state
  const userEmail = "user@example.com"; // Placeholder for user email

  const handleSignOut = () => {
    // TODO: Implement Google OAuth sign out
    console.log("Sign out functionality - connect to Google OAuth");
  };
  return <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        {/* Global header */}
        

        {/* Sidebar */}
        <AppSidebar />

        {/* Main content */}
        <main className="flex-1 pt-14">
          <div className="container mx-auto p-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>;
}