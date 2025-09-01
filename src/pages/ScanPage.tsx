import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Search, 
  Globe, 
  Crown, 
  Loader2, 
  CheckCircle, 
  AlertTriangle,
  Lock,
  Zap
} from "lucide-react"

export default function ScanPage() {
  const [singleUrl, setSingleUrl] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [scanResults, setScanResults] = useState<any>(null)

  // TODO: Replace with actual user subscription status
  const isPremium = false

  const handleSingleScan = async () => {
    if (!singleUrl.trim()) return

    setIsScanning(true)
    setScanProgress(0)
    setScanResults(null)

    // TODO: Connect to backend scan agent API
    // Simulating API call with progress updates
    try {
      // Progress simulation
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval)
            return 90
          }
          return prev + 10
        })
      }, 500)

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 5000))
      clearInterval(interval)
      setScanProgress(100)

      // TODO: Replace with actual API response from scan agent
      const mockResults = {
        url: singleUrl,
        overallScore: 87,
        issues: [
          {
            type: "Misleading Claims",
            severity: "High",
            description: "Found unsubstantiated environmental claims in product descriptions",
            location: "/products/eco-friendly-soap"
          },
          {
            type: "Vague Terminology",
            severity: "Medium",
            description: "Use of non-specific terms like 'eco-friendly' without certification",
            location: "/about/sustainability"
          }
        ],
        compliantSections: [
          "Privacy Policy",
          "Terms of Service",
          "Contact Information"
        ],
        recommendations: [
          "Provide specific certifications for environmental claims",
          "Replace vague terms with measurable environmental benefits",
          "Include third-party verification for sustainability claims"
        ]
      }

      setScanResults(mockResults)

      // TODO: Save results to DynamoDB
      console.log("Save scan results to DynamoDB:", mockResults)

    } catch (error) {
      console.error("Scan failed:", error)
      // TODO: Handle error appropriately
    } finally {
      setIsScanning(false)
    }
  }

  const handleDeepCrawl = () => {
    if (!isPremium) {
      // TODO: Redirect to upgrade/premium page
      alert("Premium feature - please upgrade your subscription")
      return
    }
    // TODO: Implement deep crawl functionality
    console.log("Deep crawl scan - premium feature")
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-foreground">
          Scan for Anomalies
        </h1>
        <p className="text-muted-foreground">
          Analyze your website for greenwashing compliance issues
        </p>
      </div>

      {/* Scan Options */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Single URL Scan */}
        <Card className="bg-gradient-card border-border shadow-soft hover:shadow-hover transition-all duration-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              Single URL Scan
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Free
              </Badge>
            </CardTitle>
            <CardDescription>
              Analyze a single page for compliance issues and get detailed insights
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="single-url" className="text-sm font-medium text-foreground">
                Website URL
              </label>
              <Input
                id="single-url"
                type="url"
                placeholder="https://example.com"
                value={singleUrl}
                onChange={(e) => setSingleUrl(e.target.value)}
                disabled={isScanning}
                className="w-full"
              />
            </div>

            {isScanning && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Scanning website...
                </div>
                <Progress value={scanProgress} className="w-full" />
              </div>
            )}

            <Button 
              onClick={handleSingleScan}
              disabled={!singleUrl.trim() || isScanning}
              className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
            >
              {isScanning ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Start Scan
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Deep Crawl Scan */}
        <Card className="bg-gradient-card border-border shadow-soft relative overflow-hidden">
          {!isPremium && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center">
              <div className="text-center p-6">
                <Crown className="h-12 w-12 mx-auto mb-4 text-warning" />
                <Badge variant="outline" className="border-warning text-warning mb-2">
                  Premium Feature
                </Badge>
                <p className="text-sm text-muted-foreground">
                  Upgrade to unlock deep crawl scanning
                </p>
              </div>
            </div>
          )}
          
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-warning" />
              Deep Crawl Scan
              <Badge variant="outline" className="border-warning text-warning">
                Premium
              </Badge>
            </CardTitle>
            <CardDescription>
              Comprehensive analysis of your entire website with AI-powered crawling
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="deep-url" className="text-sm font-medium text-foreground">
                Website URL
              </label>
              <Input
                id="deep-url"
                type="url"
                placeholder="https://example.com"
                disabled={!isPremium}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Features included:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li className="flex items-center gap-2">
                  <Zap className="h-3 w-3 text-warning" />
                  Full website crawling
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="h-3 w-3 text-warning" />
                  Advanced AI analysis
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="h-3 w-3 text-warning" />
                  Detailed compliance reports
                </li>
              </ul>
            </div>

            <Button 
              onClick={handleDeepCrawl}
              disabled={!isPremium}
              className="w-full"
              variant={isPremium ? "default" : "outline"}
            >
              {isPremium ? (
                <>
                  <Globe className="h-4 w-4 mr-2" />
                  Start Deep Crawl
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4 mr-2" />
                  Upgrade to Premium
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Scan Results */}
      {scanResults && (
        <Card className="bg-gradient-card border-border shadow-soft animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                Scan Results
              </span>
              <Badge 
                variant={scanResults.overallScore > 80 ? "secondary" : "destructive"}
                className={scanResults.overallScore > 80 ? "bg-primary/10 text-primary" : ""}
              >
                Score: {scanResults.overallScore}%
              </Badge>
            </CardTitle>
            <CardDescription>
              Analysis complete for {scanResults.url}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Issues Found */}
            {scanResults.issues.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  Issues Found ({scanResults.issues.length})
                </h3>
                <div className="space-y-3">
                  {scanResults.issues.map((issue: any, index: number) => (
                    <div key={index} className="border border-border rounded-lg p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-foreground">{issue.type}</h4>
                        <Badge 
                          variant={issue.severity === "High" ? "destructive" : "outline"}
                          className={issue.severity === "Medium" ? "border-warning text-warning" : ""}
                        >
                          {issue.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{issue.description}</p>
                      <p className="text-xs text-muted-foreground">Location: {issue.location}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            {scanResults.recommendations.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-foreground">
                  Recommendations
                </h3>
                <ul className="space-y-2">
                  {scanResults.recommendations.map((rec: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}