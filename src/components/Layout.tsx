import { ReactNode } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Button } from "@/components/ui/button"
import { User, LogOut } from "lucide-react"

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  // TODO: Connect to Google OAuth - replace with actual user state
  const isAuthenticated = true // Placeholder for authentication state
  const userEmail = "user@example.com" // Placeholder for user email

  const handleSignOut = () => {
    // TODO: Implement Google OAuth sign out
    console.log("Sign out functionality - connect to Google OAuth")
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        {/* Global header */}
        <header className="fixed top-0 left-0 right-0 h-14 bg-white/80 backdrop-blur-sm border-b border-border z-50 flex items-center justify-between px-4">
          <SidebarTrigger className="text-foreground hover:bg-accent" />
          
          {isAuthenticated && (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>{userEmail}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          )}
        </header>

        {/* Sidebar */}
        <AppSidebar />

        {/* Main content */}
        <main className="flex-1 pt-14">
          <div className="container mx-auto p-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}