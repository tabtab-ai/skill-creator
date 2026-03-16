import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Code2, Lightbulb, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Skill Specification — Skill Creator",
  description: "Complete guide to creating Agent Skills for Claude Code, MCP, SkillMP, and OpenAI",
}

const CLAUDE_SKILL_EXAMPLE = `name: code-reviewer
description: |
  Reviews code changes for quality, bugs, and best practices.
  Provides actionable feedback with specific line references.
prompt: |
  You are an expert code reviewer with deep knowledge of software
  engineering best practices, design patterns, and security.

  When reviewing code:
  1. Check for correctness and logic errors
  2. Identify potential security vulnerabilities
  3. Suggest performance improvements
  4. Ensure proper error handling
  5. Verify naming conventions and readability

  Format your feedback as:
  - **Critical**: Issues that must be fixed
  - **Suggestion**: Recommended improvements
  - **Nitpick**: Minor style preferences
examples:
  - input: "Review this function: function add(a, b) { return a + b }"
    output: |
      **Suggestion**: Add TypeScript types for better safety:
      \`function add(a: number, b: number): number { return a + b }\`
tags:
  - code-review
  - quality
  - feedback
category: coding
version: "1.0.0"`

const MCP_SKILL_EXAMPLE = `name: web-search
description: Searches the web and returns structured results
format: mcp
tools:
  - name: search
    description: Search the web for information
    inputSchema:
      type: object
      properties:
        query:
          type: string
          description: The search query
        limit:
          type: integer
          description: Number of results (default 5)
      required:
        - query
version: "1.0.0"`

export default function DocsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <Badge variant="secondary" className="mb-4">
          <BookOpen className="h-3 w-3 mr-1" />
          Documentation
        </Badge>
        <h1 className="text-4xl font-bold mb-3">Skill Specification</h1>
        <p className="text-muted-foreground text-lg">
          Everything you need to know about creating, formatting, and publishing Agent Skills.
        </p>
      </div>

      {/* TOC */}
      <nav className="bg-muted/50 rounded-lg p-4 mb-10 border">
        <h2 className="font-semibold text-sm mb-3 text-muted-foreground uppercase tracking-wide">Contents</h2>
        <ul className="space-y-1 text-sm">
          {[
            ["#what-is-a-skill", "What is a Skill?"],
            ["#formats", "Supported Formats"],
            ["#claude-skill", "Claude Code Skill Format"],
            ["#mcp-skill", "MCP Tool Skill Format"],
            ["#fields", "Field Reference"],
            ["#best-practices", "Best Practices"],
            ["#publishing", "Publishing Guide"],
          ].map(([href, label]) => (
            <li key={href}>
              <a href={href} className="text-primary hover:underline">{label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="space-y-16">
        {/* What is a Skill */}
        <section id="what-is-a-skill">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-yellow-500" />
            What is a Skill?
          </h2>
          <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
            <p>
              A <strong className="text-foreground">Skill</strong> is a reusable, shareable YAML definition that extends an AI agent&apos;s capabilities. Think of it like a plugin or function — you define what the agent should do, and it can be invoked by name across different tools and platforms.
            </p>
            <p>
              Skills are stored as <code className="bg-muted px-1 py-0.5 rounded text-xs">.yaml</code> files and follow a standardized format depending on the target platform (Claude Code, MCP, SkillMP, or OpenAI).
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 not-prose mt-6">
              {[
                { icon: "⚡", title: "Reusable", desc: "Write once, use across projects and teams" },
                { icon: "🌐", title: "Shareable", desc: "Publish to the marketplace for others to discover" },
                { icon: "🔧", title: "Composable", desc: "Combine multiple Skills for complex workflows" },
              ].map((item) => (
                <Card key={item.title}>
                  <CardContent className="pt-4 text-center">
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <h3 className="font-semibold text-sm">{item.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Formats */}
        <section id="formats">
          <h2 className="text-2xl font-bold mb-4">Supported Formats</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                name: "Claude Code",
                value: "claude",
                color: "bg-orange-100 text-orange-800 border-orange-200",
                desc: "Skills for Claude Code CLI. Uses a prompt-based format with examples. Ideal for complex reasoning tasks.",
                use: "code review, writing, analysis",
              },
              {
                name: "MCP Tool",
                value: "mcp",
                color: "bg-blue-100 text-blue-800 border-blue-200",
                desc: "Model Context Protocol tool definitions. Function-based format with JSON schema. For tool integrations.",
                use: "API calls, file operations, web search",
              },
              {
                name: "SkillMP",
                value: "skillmp",
                color: "bg-purple-100 text-purple-800 border-purple-200",
                desc: "SkillMP marketplace format. Compatible with the SkillMP ecosystem for sharing and discovery.",
                use: "cross-platform sharing",
              },
              {
                name: "OpenAI",
                value: "openai",
                color: "bg-green-100 text-green-800 border-green-200",
                desc: "OpenAI GPT Actions schema format. Compatible with GPT builders and Assistants API.",
                use: "GPT custom actions, Assistants",
              },
            ].map((fmt) => (
              <Card key={fmt.value}>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-base">{fmt.name}</CardTitle>
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${fmt.color}`}>
                      {fmt.value}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p className="mb-2">{fmt.desc}</p>
                  <p><strong className="text-foreground">Best for:</strong> {fmt.use}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Claude Skill Format */}
        <section id="claude-skill">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Code2 className="h-6 w-6" />
            Claude Code Skill Format
          </h2>
          <p className="text-muted-foreground mb-4">
            Claude Code Skills use a prompt-based YAML format. The skill&apos;s <code className="bg-muted px-1 py-0.5 rounded text-xs">prompt</code> field becomes the system instruction when the skill is invoked.
          </p>
          <div className="border rounded-lg overflow-hidden">
            <div className="px-4 py-2 bg-muted/50 border-b flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">code-reviewer.yaml</span>
              <Badge variant="secondary" className="text-xs">Claude Code</Badge>
            </div>
            <pre className="p-4 text-sm overflow-x-auto bg-zinc-950 text-zinc-100">
              <code>{CLAUDE_SKILL_EXAMPLE}</code>
            </pre>
          </div>
        </section>

        {/* MCP Format */}
        <section id="mcp-skill">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Code2 className="h-6 w-6" />
            MCP Tool Skill Format
          </h2>
          <p className="text-muted-foreground mb-4">
            MCP Skills define tool schemas using JSON Schema. These integrate with the Model Context Protocol for function-calling capabilities.
          </p>
          <div className="border rounded-lg overflow-hidden">
            <div className="px-4 py-2 bg-muted/50 border-b flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">web-search.yaml</span>
              <Badge variant="secondary" className="text-xs">MCP</Badge>
            </div>
            <pre className="p-4 text-sm overflow-x-auto bg-zinc-950 text-zinc-100">
              <code>{MCP_SKILL_EXAMPLE}</code>
            </pre>
          </div>
        </section>

        {/* Field Reference */}
        <section id="fields">
          <h2 className="text-2xl font-bold mb-4">Field Reference</h2>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b">
                  <th className="text-left px-4 py-3 font-medium">Field</th>
                  <th className="text-left px-4 py-3 font-medium">Required</th>
                  <th className="text-left px-4 py-3 font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {[
                  ["name", "Yes", "Unique identifier (kebab-case). e.g. code-reviewer"],
                  ["description", "Yes", "Clear description of what the skill does (1-3 sentences)"],
                  ["prompt", "Claude only", "System prompt defining the skill's behavior and output format"],
                  ["version", "No", "Semantic version (default: 1.0.0)"],
                  ["format", "No", "Target platform: claude | mcp | skillmp | openai (default: claude)"],
                  ["category", "No", "One of: coding, writing, research, productivity, data, automation, other"],
                  ["tags", "No", "Array of searchable keywords (3-5 recommended)"],
                  ["examples", "No", "Array of {input, output} examples to demonstrate the skill"],
                ].map(([field, required, desc]) => (
                  <tr key={field} className="hover:bg-muted/20">
                    <td className="px-4 py-3 font-mono text-xs">{field}</td>
                    <td className="px-4 py-3">
                      <Badge variant={required === "Yes" ? "default" : "secondary"} className="text-xs">
                        {required}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Best Practices */}
        <section id="best-practices">
          <h2 className="text-2xl font-bold mb-4">Best Practices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-4 w-4" /> Do
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {[
                    "Use specific, actionable language in prompts",
                    "Include 2-3 concrete examples",
                    "Specify the exact output format expected",
                    "Use kebab-case for skill names",
                    "Keep descriptions under 2 sentences",
                    "Test with edge cases before publishing",
                    "Add relevant tags for discoverability",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2 text-red-600">
                  <AlertCircle className="h-4 w-4" /> Avoid
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {[
                    "Vague or overly broad skill descriptions",
                    "Skills that do too many unrelated things",
                    "Hardcoded values that should be parameters",
                    "Missing version field (breaks updates)",
                    "No tags — makes skills undiscoverable",
                    "Copying skills without attribution",
                    "Publishing untested or broken skills",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <AlertCircle className="h-3 w-3 text-red-500 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Publishing */}
        <section id="publishing">
          <h2 className="text-2xl font-bold mb-4">Publishing Guide</h2>
          <div className="space-y-4 text-sm text-muted-foreground">
            <div className="flex gap-4 items-start">
              <div className="h-7 w-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs shrink-0">1</div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Create your Skill</h3>
                <p>Use the <Link href="/create" className="text-primary hover:underline">Skill Creator</Link> or write your YAML manually following the format above.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="h-7 w-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs shrink-0">2</div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Sign in with GitHub</h3>
                <p>Authentication is required to publish. Your GitHub profile is linked to your skills.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="h-7 w-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs shrink-0">3</div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Review and publish</h3>
                <p>Preview your skill in the creator, then click &quot;Publish to Marketplace&quot;. Your skill will be immediately discoverable.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="h-7 w-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs shrink-0">4</div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Iterate and improve</h3>
                <p>Collect feedback from the community and publish updated versions with bumped version numbers.</p>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <Link href="/create">
              <Button>Start Creating Skills →</Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
