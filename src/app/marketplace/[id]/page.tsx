"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Download,
  Star,
  Copy,
  CheckCircle,
  ArrowLeft,
  Loader2,
  Tag,
  Calendar,
  User,
} from "lucide-react"
import Link from "next/link"

export default function SkillDetailPage() {
  const params = useParams()
  const [skill, setSkill] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    async function fetchSkill() {
      try {
        const res = await fetch(`/api/skills/${params.id}`)
        if (res.ok) {
          const data = await res.json()
          setSkill(data)
        }
      } catch {
        // ignore
      } finally {
        setLoading(false)
      }
    }
    if (params.id) fetchSkill()
  }, [params.id])

  function handleCopy() {
    if (skill?.content) {
      navigator.clipboard.writeText(skill.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  function handleDownload() {
    if (!skill) return
    const blob = new Blob([skill.content], { type: "text/yaml" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${skill.name}.yaml`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!skill) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground mb-4">Skill not found</p>
        <Link href="/marketplace">
          <Button variant="outline"><ArrowLeft className="h-4 w-4" /> Back to Marketplace</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href="/marketplace" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Marketplace
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex items-start gap-3 mb-3">
              <h1 className="text-3xl font-bold font-mono flex-1">{skill.name}</h1>
              <span className="text-sm px-3 py-1 rounded-full border font-medium bg-orange-100 text-orange-800 border-orange-200 shrink-0">
                {skill.format}
              </span>
            </div>
            <p className="text-muted-foreground">{skill.description}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {(skill.tags ?? []).map((tag: string) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  <Tag className="h-3 w-3 mr-1" />{tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Skill content */}
          <div className="border rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-muted/50 border-b">
              <span className="text-sm font-medium">{skill.name}.yaml</span>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={handleCopy}>
                  {copied ? (
                    <><CheckCircle className="h-4 w-4 text-green-500" /> Copied</>
                  ) : (
                    <><Copy className="h-4 w-4" /> Copy</>
                  )}
                </Button>
              </div>
            </div>
            <pre className="p-4 text-sm overflow-x-auto bg-zinc-950 text-zinc-100 max-h-[500px] overflow-y-auto">
              <code>{skill.content}</code>
            </pre>
          </div>

          {skill.readme && (
            <div>
              <h2 className="text-xl font-semibold mb-3">README</h2>
              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-wrap text-sm text-muted-foreground">{skill.readme}</pre>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6 space-y-3">
              <Button className="w-full" onClick={handleDownload}>
                <Download className="h-4 w-4" /> Download YAML
              </Button>
              <Button variant="outline" className="w-full">
                <Star className="h-4 w-4" /> Star ({skill.stars ?? 0})
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Download className="h-4 w-4" /> Downloads
                </span>
                <span className="font-medium">{(skill.downloads ?? 0).toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Star className="h-4 w-4" /> Stars
                </span>
                <span className="font-medium">{(skill.stars ?? 0).toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Version</span>
                <span className="font-mono font-medium">v{skill.version}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" /> Published
                </span>
                <span className="font-medium">
                  {new Date(skill.createdAt).toLocaleDateString()}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-sm font-medium mb-3 flex items-center gap-1.5">
                <User className="h-4 w-4" /> Author
              </h3>
              <div className="flex items-center gap-3">
                {skill.authorAvatar && (
                  <img src={skill.authorAvatar} alt={skill.authorName} className="h-10 w-10 rounded-full" />
                )}
                <div>
                  <p className="font-medium text-sm">{skill.authorName}</p>
                  {skill.authorGithub && (
                    <a
                      href={`https://github.com/${skill.authorGithub}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-muted-foreground hover:text-primary"
                    >
                      @{skill.authorGithub}
                    </a>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Install instructions */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-sm font-medium mb-3">Install in Claude Code</h3>
              <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                <code>{`# Download skill
curl -o ~/.claude/skills/${skill.name}.yaml \\
  https://skill-creator.com/api/skills/${skill.id}/raw`}</code>
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
