"use client"

import { useState, useEffect } from "react"
import { SkillCard } from "@/components/skill/skill-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, SlidersHorizontal, Loader2 } from "lucide-react"
import type { Skill } from "@/types/skill"
import Link from "next/link"

const CATEGORIES = ["all", "coding", "writing", "research", "productivity", "data", "automation", "other"]
const FORMATS = ["all", "claude", "mcp", "skillmp", "openai"]

// Demo skills for when DB is empty
const DEMO_SKILLS: Skill[] = [
  {
    id: "demo-1",
    name: "pr-reviewer",
    description: "Reviews pull requests with detailed feedback on code quality, naming conventions, and potential bugs. Provides actionable suggestions for improvement.",
    version: "1.0.0",
    authorId: "demo",
    authorName: "skillbot",
    authorAvatar: "https://github.com/skillbot.png",
    format: "claude",
    category: "coding",
    tags: ["code-review", "git", "quality", "pr"],
    content: "",
    downloads: 1240,
    stars: 89,
    isPublic: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "demo-2",
    name: "sql-generator",
    description: "Converts natural language descriptions into optimized SQL queries with proper indexing hints and performance considerations.",
    version: "1.2.0",
    authorId: "demo",
    authorName: "dbwizard",
    format: "mcp",
    category: "data",
    tags: ["sql", "database", "nlp", "query"],
    content: "",
    downloads: 892,
    stars: 67,
    isPublic: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "demo-3",
    name: "test-writer",
    description: "Generates comprehensive unit tests for TypeScript and Python functions including edge cases and mocking patterns.",
    version: "2.0.0",
    authorId: "demo",
    authorName: "testmaster",
    format: "claude",
    category: "coding",
    tags: ["testing", "typescript", "python", "tdd"],
    content: "",
    downloads: 743,
    stars: 54,
    isPublic: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "demo-4",
    name: "doc-summarizer",
    description: "Summarizes long documents, PDFs, and articles into structured bullet points with key insights and action items.",
    version: "1.0.0",
    authorId: "demo",
    authorName: "writepro",
    format: "claude",
    category: "research",
    tags: ["summarize", "document", "notes"],
    content: "",
    downloads: 621,
    stars: 48,
    isPublic: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "demo-5",
    name: "code-translator",
    description: "Translates code between programming languages while preserving logic, idioms, and best practices of the target language.",
    version: "1.1.0",
    authorId: "demo",
    authorName: "polyglot",
    format: "claude",
    category: "coding",
    tags: ["translation", "refactor", "polyglot"],
    content: "",
    downloads: 512,
    stars: 41,
    isPublic: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "demo-6",
    name: "commit-message",
    description: "Generates clear, conventional commit messages from git diffs following the Conventional Commits specification.",
    version: "1.0.0",
    authorId: "demo",
    authorName: "gitguru",
    format: "skillmp",
    category: "productivity",
    tags: ["git", "commit", "conventional"],
    content: "",
    downloads: 498,
    stars: 37,
    isPublic: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export default function MarketplacePage() {
  const [skills, setSkills] = useState<Skill[]>(DEMO_SKILLS)
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("all")
  const [format, setFormat] = useState("all")

  useEffect(() => {
    async function fetchSkills() {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (query) params.set("q", query)
        if (category !== "all") params.set("category", category)
        if (format !== "all") params.set("format", format)

        const res = await fetch(`/api/skills?${params}`)
        if (res.ok) {
          const data = await res.json()
          if (data.skills?.length > 0) {
            setSkills(data.skills)
          }
        }
      } catch {
        // Keep demo skills on error
      } finally {
        setLoading(false)
      }
    }
    fetchSkills()
  }, [query, category, format])

  const filtered = skills.filter((s) => {
    const matchesQuery =
      !query ||
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.description.toLowerCase().includes(query.toLowerCase()) ||
      s.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
    const matchesCategory = category === "all" || s.category === category
    const matchesFormat = format === "all" || s.format === format
    return matchesQuery && matchesCategory && matchesFormat
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Skill Marketplace</h1>
          <p className="text-muted-foreground mt-1">
            {filtered.length} skills available
          </p>
        </div>
        <Link href="/create">
          <Button>+ Create Skill</Button>
        </Link>
      </div>

      {/* Search & filters */}
      <div className="space-y-4 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search skills by name, description, or tag..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
          <div className="flex flex-wrap gap-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                  category === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background border-border text-muted-foreground hover:border-primary/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="h-4 border-l mx-1" />
          <div className="flex flex-wrap gap-1">
            {FORMATS.map((fmt) => (
              <button
                key={fmt}
                onClick={() => setFormat(fmt)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                  format === fmt
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background border-border text-muted-foreground hover:border-primary/50"
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-lg mb-2">No skills found</p>
          <p className="text-sm">
            Try different filters or{" "}
            <Link href="/create" className="text-primary hover:underline">
              create the first one
            </Link>
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      )}
    </div>
  )
}
