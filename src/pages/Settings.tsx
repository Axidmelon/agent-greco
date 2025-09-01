import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { 
  Settings as SettingsIcon, 
  User, 
  Crown, 
  Bell, 
  Shield, 
  Trash2, 
  Download,
  Mail,
  CreditCard
} from "lucide-react"

export default function Settings() {
  // TODO: Replace with actual user data and settings
  const userPlan = "Free" as "Free" | "Premium"
  const userEmail = "user@example.com"
  const totalScans = 47
  const totalGenerations = 23

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-foreground">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your account preferences and subscription
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Account Information */}
        <Card className="bg-gradient-card border-border shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Email</Label>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-foreground">{userEmail}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Current Plan</Label>
              <div className="flex items-center gap-2">
                {userPlan === "Premium" ? (
                  <>
                    <Crown className="h-4 w-4 text-warning" />
                    <Badge variant="outline" className="border-warning text-warning">
                      Premium
                    </Badge>
                  </>
                ) : (
                  <>
                    <Shield className="h-4 w-4 text-primary" />
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      Free
                    </Badge>
                  </>
                )}
              </div>
            </div>

            <div className="pt-2">
              <Button 
                variant="outline" 
                className="w-full gap-2"
                onClick={() => {
                  // TODO: Implement Google OAuth sign out
                  console.log("Sign out functionality")
                }}
              >
                <User className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Subscription & Billing */}
        <Card className="bg-gradient-card border-border shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              Subscription & Billing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {userPlan === "Free" ? (
              <div className="space-y-3">
                <div className="text-center p-4 border border-border rounded-lg">
                  <Crown className="h-8 w-8 mx-auto mb-2 text-warning" />
                  <h3 className="font-semibold text-foreground">Upgrade to Premium</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Unlock deep crawl scanning and advanced features
                  </p>
                  <Button className="w-full bg-gradient-primary hover:opacity-90">
                    Upgrade Now
                  </Button>
                </div>
                
                <div className="text-sm space-y-2">
                  <h4 className="font-medium text-foreground">Premium Features:</h4>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• Deep crawl website scanning</li>
                    <li>• Unlimited content generation</li>
                    <li>• Advanced compliance reports</li>
                    <li>• Priority support</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Premium Plan</span>
                  <Badge variant="outline" className="border-warning text-warning">
                    Active
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Next billing date: January 15, 2025
                </p>
                <Button variant="outline" className="w-full">
                  Manage Subscription
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Usage Statistics */}
        <Card className="bg-gradient-card border-border shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5 text-primary" />
              Usage Statistics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 border border-border rounded-lg">
                <p className="text-2xl font-bold text-foreground">{totalScans}</p>
                <p className="text-sm text-muted-foreground">Total Scans</p>
              </div>
              <div className="text-center p-3 border border-border rounded-lg">
                <p className="text-2xl font-bold text-foreground">{totalGenerations}</p>
                <p className="text-sm text-muted-foreground">Content Generated</p>
              </div>
            </div>
            
            {userPlan === "Free" && (
              <div className="text-sm text-muted-foreground">
                <p>Free plan limits:</p>
                <ul className="list-disc list-inside space-y-1 mt-1">
                  <li>10 scans per month</li>
                  <li>5 content generations per month</li>
                </ul>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card className="bg-gradient-card border-border shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm font-medium">Email Notifications</Label>
                  <p className="text-xs text-muted-foreground">
                    Receive updates about scan results
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm font-medium">Marketing Emails</Label>
                  <p className="text-xs text-muted-foreground">
                    Product updates and tips
                  </p>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm font-medium">Auto-save Results</Label>
                  <p className="text-xs text-muted-foreground">
                    Automatically save scan and generation results
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card className="bg-gradient-card border-border shadow-soft lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Data Management
            </CardTitle>
            <CardDescription>
              Manage your data and privacy settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export Data
              </Button>
              
              <Button variant="outline" className="gap-2">
                <Shield className="h-4 w-4" />
                Privacy Policy
              </Button>
              
              <Button variant="destructive" className="gap-2">
                <Trash2 className="h-4 w-4" />
                Delete Account
              </Button>
            </div>
            
            <div className="mt-4 p-3 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Data Storage:</strong> Your scan results and generated content are securely stored 
                in our encrypted database. You can export or delete your data at any time.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}