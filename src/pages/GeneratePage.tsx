import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { 
  FileText, 
  Wand2, 
  Copy, 
  CheckCircle, 
  Loader2,
  AlertCircle,
  Lightbulb
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function GeneratePage() {
  const [inputContent, setInputContent] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState("")
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const handleGenerate = async () => {
    if (!inputContent.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter some content to make compliant.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    setGeneratedContent("")

    try {
      // TODO: Connect to backend RAG agent API
      // Simulate API call to generate compliant content
      await new Promise(resolve => setTimeout(resolve, 3000))

      // TODO: Replace with actual API response from RAG agent
      const mockGeneratedContent = `
🌱 **Sustainable Product Line - Verified Claims**

Our eco-conscious collection features products made with **certified organic cotton** (GOTS certification #2024-001) and **recycled polyester** (GRS certified, containing 75% post-consumer waste).

**Environmental Impact:**
• Water usage reduced by 40% compared to conventional manufacturing (verified by third-party assessment, Report #ENV-2024-123)
• Carbon footprint: 2.3 kg CO2e per product (LCA certified by Green Assessment Institute)
• Packaging: 100% recyclable materials with FSC certification

**Transparency:**
✓ Full supply chain traceability available
✓ Annual sustainability report published
✓ Third-party verified environmental claims

*Learn more about our sustainability certifications and view detailed impact reports on our transparency page.*
      `.trim()

      setGeneratedContent(mockGeneratedContent)

      // TODO: Save generated content to DynamoDB
      const contentData = {
        original: inputContent,
        generated: mockGeneratedContent,
        timestamp: new Date().toISOString(),
        // Add user ID when authentication is implemented
      }
      console.log("Save generated content to DynamoDB:", contentData)

      toast({
        title: "Content Generated",
        description: "Your compliant content has been generated successfully.",
      })

    } catch (error) {
      console.error("Generation failed:", error)
      toast({
        title: "Generation Failed",
        description: "Failed to generate compliant content. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedContent)
      setCopied(true)
      toast({
        title: "Copied!",
        description: "Content copied to clipboard.",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy content to clipboard.",
        variant: "destructive",
      })
    }
  }

  const handleClear = () => {
    setInputContent("")
    setGeneratedContent("")
  }

  const exampleContent = `Our new eco-friendly soap is 100% natural and completely chemical-free. It's the most sustainable option on the market and will save the planet. Made with green ingredients that are better for the environment.`

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-foreground">
          Generate Compliant Content
        </h1>
        <p className="text-muted-foreground">
          Transform non-compliant content into greenwashing-compliant copy using AI
        </p>
      </div>

      {/* Guidelines Card */}
      <Card className="bg-gradient-card border-border shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-warning" />
            Compliance Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">✅ Do Include:</h4>
              <ul className="text-muted-foreground space-y-1">
                <li>• Specific certifications and standards</li>
                <li>• Measurable environmental benefits</li>
                <li>• Third-party verification details</li>
                <li>• Clear supporting evidence</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">❌ Avoid:</h4>
              <ul className="text-muted-foreground space-y-1">
                <li>• Vague terms like "eco-friendly"</li>
                <li>• Unsubstantiated claims</li>
                <li>• Exaggerated environmental benefits</li>
                <li>• Misleading imagery or language</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card className="bg-gradient-card border-border shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Original Content
            </CardTitle>
            <CardDescription>
              Paste your non-compliant content below
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Textarea
                placeholder="Paste your content here that needs to be made compliant with greenwashing guidelines..."
                value={inputContent}
                onChange={(e) => setInputContent(e.target.value)}
                className="min-h-[200px] resize-none"
                disabled={isGenerating}
              />
              <p className="text-xs text-muted-foreground">
                Characters: {inputContent.length}
              </p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => setInputContent(exampleContent)}
                variant="outline"
                size="sm"
                className="w-full"
                disabled={isGenerating}
              >
                Load Example Content
              </Button>

              <div className="flex gap-2">
                <Button 
                  onClick={handleGenerate}
                  disabled={!inputContent.trim() || isGenerating}
                  className="flex-1 bg-gradient-primary hover:opacity-90 transition-opacity"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-4 w-4 mr-2" />
                      Generate Compliant
                    </>
                  )}
                </Button>
                <Button 
                  onClick={handleClear}
                  variant="outline"
                  disabled={isGenerating}
                >
                  Clear
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Output Section */}
        <Card className="bg-gradient-card border-border shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                Compliant Content
              </span>
              {generatedContent && (
                <Button
                  onClick={handleCopy}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy
                    </>
                  )}
                </Button>
              )}
            </CardTitle>
            <CardDescription>
              AI-generated compliant version of your content
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isGenerating ? (
              <div className="flex items-center justify-center min-h-[200px] text-muted-foreground">
                <div className="text-center space-y-2">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto" />
                  <p>Generating compliant content...</p>
                </div>
              </div>
            ) : generatedContent ? (
              <div className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg border border-border">
                  <pre className="whitespace-pre-wrap text-sm text-foreground font-mono">
                    {generatedContent}
                  </pre>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  Content meets India's greenwashing compliance guidelines
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center min-h-[200px] text-muted-foreground">
                <div className="text-center space-y-2">
                  <FileText className="h-12 w-12 mx-auto opacity-50" />
                  <p>Generated content will appear here</p>
                  <p className="text-xs">Enter content and click "Generate Compliant" to start</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Usage Tips */}
      <Card className="bg-gradient-card border-border shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-primary" />
            Usage Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">Best Results</h4>
              <p className="text-muted-foreground">
                Provide complete sentences and context for more accurate compliance suggestions.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">Review Output</h4>
              <p className="text-muted-foreground">
                Always review generated content to ensure it matches your brand voice and specific claims.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">Legal Review</h4>
              <p className="text-muted-foreground">
                Consider legal review for final content, especially for marketing materials.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}