import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  FileText, 
  TrendingUp, 
  Shield, 
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowRight
} from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function Dashboard() {
  const navigate = useNavigate()

  // TODO: Replace with actual data from DynamoDB
  const recentScans = [
    {
      id: 1,
      url: "example-brand.com",
      status: "compliant",
      timestamp: "2 hours ago",
      score: 95
    },
    {
      id: 2,
      url: "another-brand.com",
      status: "issues",
      timestamp: "1 day ago",
      score: 72
    },
    {
      id: 3,
      url: "green-company.com",
      status: "pending",
      timestamp: "3 hours ago",
      score: null
    }
  ]

  const stats = [
    {
      title: "Total Scans",
      value: "47",
      icon: Search,
      trend: "+12%"
    },
    {
      title: "Compliance Score",
      value: "87%",
      icon: Shield,
      trend: "+5%"
    },
    {
      title: "Content Generated",
      value: "23",
      icon: FileText,
      trend: "+8%"
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "compliant":
        return <CheckCircle className="h-4 w-4 text-primary" />
      case "issues":
        return <AlertCircle className="h-4 w-4 text-warning" />
      case "pending":
        return <Clock className="h-4 w-4 text-muted-foreground" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "compliant":
        return <Badge variant="secondary" className="bg-primary/10 text-primary">Compliant</Badge>
      case "issues":
        return <Badge variant="destructive">Issues Found</Badge>
      case "pending":
        return <Badge variant="outline">Scanning...</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-foreground">
          Welcome to ComplianceCheck
        </h1>
        <p className="text-muted-foreground">
          Monitor your brand's compliance with India's greenwashing guidelines
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-gradient-card border-border shadow-soft hover:shadow-hover transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-xs text-primary font-medium">
                    {stat.trend} from last month
                  </p>
                </div>
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card className="bg-gradient-card border-border shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Quick Actions
            </CardTitle>
            <CardDescription>
              Start scanning or generate compliant content
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              onClick={() => navigate("/scan")}
              className="w-full justify-between bg-gradient-primary hover:opacity-90 transition-opacity"
            >
              <span className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                Scan for Anomalies
              </span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button 
              onClick={() => navigate("/generate")}
              variant="outline"
              className="w-full justify-between hover:bg-accent"
            >
              <span className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Generate Content
              </span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Recent Scans */}
        <Card className="bg-gradient-card border-border shadow-soft">
          <CardHeader>
            <CardTitle>Recent Scans</CardTitle>
            <CardDescription>
              Your latest compliance checks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentScans.map((scan) => (
                <div 
                  key={scan.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {getStatusIcon(scan.status)}
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {scan.url}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {scan.timestamp}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {scan.score && (
                      <span className="text-sm font-medium text-foreground">
                        {scan.score}%
                      </span>
                    )}
                    {getStatusBadge(scan.status)}
                  </div>
                </div>
              ))}
            </div>
            {recentScans.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No scans yet. Start your first compliance check!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}