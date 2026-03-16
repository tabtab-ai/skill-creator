"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Sparkles,
  Copy,
  Download,
  Send,
  RefreshCw,
  CheckCircle,
  Loader2,
} from "lucide-react"

const FORMAT_OPTIONS = [
  { value: "claude", label: "Claude Code", color: "bg-orange-100 text-orange-800 border-orange-200" },
  { value: "mcp", label: "MCP Tool", color: "bg-blue-100 text-blue-800 border-blue-200" },
  { value: "skillmp", label: "SkillMP", color: "bg-purple-100 text-purple-800 border-purple-200" },
  { value: "openai", label: "OpenAI", color: "bg-green-100 text-green-800 border-green-200" },
]

const EXAMPLE_PROMPTS = [
  "A skill that reviews pull requests and provides feedback on code quality",
  "A skill that converts natural language to SQL queries",
  "A skill that generates unit tests for TypeScript functions",
  "A skill that summarizes long documents into key bullet points",
  "A skill that translates code from Python to TypeScript",
]

export function SkillCreator() {
  const [prompt, setPrompt] = useState("")
  const [format, setFormat] = useState("claude")
  const [generatedSkill, setGeneratedSkill] = useState("")
  const [skillName, setSkillName] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [copied, setCopied] = useState(false)
  const [published, setPublished] = useState(false)
  const [error, setError] = useState("")
  const [feedbackMode, setFeedbackMode] = useState(false)
  const [feedback, setFeedback] = useState("")

  async function handleGenerate() {
    if (!prompt.trim()) return
    setIsGenerating(true)
    setError("")
    setPublished(false)
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, format }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Generation failed")
      }
      const data = await res.json()
      setGeneratedSkill(data.content)
      // Extract name from YAML
      const nameMatch = data.content.match(/^name:\s*(.+)$/m)
      if (nameMatch) setSkillName(nameMatch[1].trim())
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setIsGenerating(false)
    }
  }

  async function handleImprove() {
    if (!feedback.trim()) return
    setIsGenerating(true)
    setError("")
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: feedback, format, currentContent: generatedSkill }),
      })
      if (!res.ok) throw new Error("Improvement failed")
      const data = await res.json()
      setGeneratedSkill(data.content)
      setFeedback("")
      setFeedbackMode(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setIsGenerating(false)
    }
  }

  async function handlePublish() {
    if (!generatedSkill || !skillName) return
    setIsPublishing(true)
    setError("")
    try {
      const res = await fetch("/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: skillName,
          content: generatedSkill,
          format,
        }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Publishing failed")
      }
      setPublished(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setIsPublishing(false)
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(generatedSkill)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleDownload() {
    const blob = new Blob([generatedSkill], { type: "text/yaml" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${skillName || "skill"}.yaml`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Format selector */}
      <div>
        <p className="text-sm font-medium mb-2 text-muted-foreground">Target format</p>
        <div className="flex flex-wrap gap-2">
          {FORMAT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFormat(opt.value)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                format === opt.value
                  ? opt.color + " ring-2 ring-offset-1 ring-primary/30"
                  : "bg-background border-border text-muted-foreground hover:border-primary/50"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Prompt input */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Describe the Skill you want to create</label>
        <Textarea
          placeholder="e.g. A skill that reviews pull requests and provides constructive feedback on code quality, naming conventions, and potential bugs..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-[120px] resize-none text-base"
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleGenerate()
          }}
        />
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-muted-foreground">Try:</span>
            {EXAMPLE_PROMPTS.slice(0, 2).map((ex) => (
              <button
                key={ex}
                onClick={() => setPrompt(ex)}
                className="text-xs text-primary hover:underline"
              >
                {ex.substring(0, 40)}...
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">Ctrl+Enter to generate</p>
        </div>
      </div>

      <Button
        onClick={handleGenerate}
        disabled={isGenerating || !prompt.trim()}
        className="w-full h-12 text-base"
      >
        {isGenerating ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Generating with Claude...
          </>
        ) : (
          <>
            <Sparkles className="h-5 w-5" />
            Generate Skill
          </>
        )}
      </Button>

      {error && (
        <p className="text-sm text-destructive bg-destructive/10 px-4 py-3 rounded-md">
          {error}
        </p>
      )}

      {/* Generated Skill */}
      {generatedSkill && (
        <div className="border rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-muted/50 border-b">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Generated Skill</span>
              {skillName && (
                <Badge variant="secondary" className="text-xs">
                  {skillName}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleCopy}>
                {copied ? (
                  <><CheckCircle className="h-4 w-4 text-green-500" /> Copied</>
                ) : (
                  <><Copy className="h-4 w-4" /> Copy</>
                )}
              </Button>
              <Button variant="ghost" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4" />
                Download
              </Button>
            </div>
          </div>

          <pre className="p-4 text-sm overflow-x-auto bg-zinc-950 text-zinc-100 max-h-96 overflow-y-auto">
            <code>{generatedSkill}</code>
          </pre>

          {/* Skill name editor */}
          <div className="px-4 py-3 border-t bg-background flex items-center gap-3">
            <label className="text-sm font-medium text-muted-foreground shrink-0">Name:</label>
            <Input
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
              className="max-w-xs h-8 text-sm"
              placeholder="skill-name"
            />
          </div>

          {/* Actions */}
          <div className="px-4 py-3 border-t bg-background flex flex-wrap items-center gap-3">
            <Button
              onClick={handlePublish}
              disabled={isPublishing || published || !skillName}
            >
              {published ? (
                <><CheckCircle className="h-4 w-4 text-green-500" /> Published!</>
              ) : isPublishing ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Publishing...</>
              ) : (
                <><Send className="h-4 w-4" /> Publish to Marketplace</>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={() => setFeedbackMode(!feedbackMode)}
            >
              <RefreshCw className="h-4 w-4" />
              Improve
            </Button>
          </div>

          {/* Feedback for improvement */}
          {feedbackMode && (
            <div className="px-4 pb-4 bg-background border-t">
              <div className="flex gap-2 mt-3">
                <Textarea
                  placeholder="What would you like to improve? e.g. Add more examples, make the prompt more specific..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="min-h-[80px] resize-none text-sm"
                />
                <Button
                  onClick={handleImprove}
                  disabled={isGenerating || !feedback.trim()}
                  className="self-end"
                >
                  {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
