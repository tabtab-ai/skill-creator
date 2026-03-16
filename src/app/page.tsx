import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Sparkles,
  Zap,
  Globe,
  Download,
  Star,
  ArrowRight,
  Code2,
  BookOpen,
  Users,
} from "lucide-react"

const FEATURED_SKILLS = [
  {
    name: "pr-reviewer",
    description: "Reviews pull requests with detailed feedback on code quality, naming, and potential bugs",
    format: "claude",
    tags: ["code-review", "git", "quality"],
    downloads: 1240,
    stars: 89,
    author: "skillbot",
  },
  {
    name: "sql-generator",
    description: "Converts natural language descriptions into optimized SQL queries",
    format: "mcp",
    tags: ["sql", "database", "nlp"],
    downloads: 892,
    stars: 67,
    author: "dbwizard",
  },
  {
    name: "test-writer",
    description: "Generates comprehensive unit tests for TypeScript and Python functions",
    format: "claude",
    tags: ["testing", "typescript", "python"],
    downloads: 743,
    stars: 54,
    author: "testmaster",
  },
]

const FORMAT_COLORS: Record<string, string> = {
  claude: "bg-orange-100 text-orange-800 border-orange-200",
  mcp: "bg-blue-100 text-blue-800 border-blue-200",
  skillmp: "bg-purple-100 text-purple-800 border-purple-200",
}

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <Badge variant="secondary" className="mb-6 text-xs px-3 py-1">
            <Sparkles className="h-3 w-3 mr-1" />
            Open Source · Powered by Claude
          </Badge>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            Build AI Agent{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">
              Skills
            </span>
            <br />
            in Seconds
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Describe what you want, let Claude generate the Skill, then publish it to the community marketplace. Compatible with Claude Code, MCP, SkillMP, and OpenAI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/create">
              <Button size="lg" className="h-12 px-8 text-base">
                <Sparkles className="h-5 w-5" />
                Create a Skill
              </Button>
            </Link>
            <Link href="/marketplace">
              <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                Browse Marketplace
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-12 mt-16 text-sm text-muted-foreground">
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground">500+</p>
              <p>Skills published</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground">10k+</p>
              <p>Downloads</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground">MIT</p>
              <p>Open source</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">How It Works</h2>
            <p className="text-muted-foreground">Three steps to create and share your Skill</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: <Sparkles className="h-8 w-8 text-yellow-500" />,
                title: "Describe Your Skill",
                desc: "Tell Claude what you want the Skill to do in plain language. Be as specific or as broad as you like.",
              },
              {
                step: "02",
                icon: <Zap className="h-8 w-8 text-blue-500" />,
                title: "AI Generates It",
                desc: "Claude automatically generates a well-structured Skill definition in YAML format, ready to use.",
              },
              {
                step: "03",
                icon: <Globe className="h-8 w-8 text-green-500" />,
                title: "Publish & Share",
                desc: "One click to publish to the marketplace. The community can discover, download, and star your Skill.",
              },
            ].map((item) => (
              <Card key={item.step} className="relative overflow-hidden">
                <CardContent className="pt-6">
                  <div className="text-5xl font-black text-muted/20 absolute top-4 right-4">
                    {item.step}
                  </div>
                  <div className="mb-4">{item.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Skills */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Skills</h2>
              <p className="text-muted-foreground">Popular skills from the community</p>
            </div>
            <Link href="/marketplace">
              <Button variant="outline">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURED_SKILLS.map((skill) => (
              <Card key={skill.name} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold font-mono">{skill.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${FORMAT_COLORS[skill.format]}`}>
                      {skill.format}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {skill.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {skill.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex gap-3">
                      <span className="flex items-center gap-1">
                        <Download className="h-3 w-3" />{skill.downloads}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3" />{skill.stars}
                      </span>
                    </div>
                    <span>@{skill.author}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Everything You Need</h2>
            <p className="text-muted-foreground">A complete platform for the AI Skills ecosystem</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Code2 className="h-6 w-6 text-primary" />,
                title: "Multi-format Support",
                desc: "Generate Skills compatible with Claude Code, MCP tools, SkillMP, and OpenAI Actions.",
              },
              {
                icon: <BookOpen className="h-6 w-6 text-primary" />,
                title: "Skill Specification",
                desc: "Comprehensive documentation on Skill format, best practices, and advanced patterns.",
              },
              {
                icon: <Users className="h-6 w-6 text-primary" />,
                title: "Community Marketplace",
                desc: "Discover, fork, and remix Skills from developers around the world.",
              },
              {
                icon: <Download className="h-6 w-6 text-primary" />,
                title: "One-click Download",
                desc: "Download any Skill as YAML and use it immediately in your AI setup.",
              },
              {
                icon: <Zap className="h-6 w-6 text-primary" />,
                title: "AI-powered Creator",
                desc: "Natural language to Skill — just describe what you want and Claude does the rest.",
              },
              {
                icon: <Globe className="h-6 w-6 text-primary" />,
                title: "Fully Open Source",
                desc: "MIT licensed, self-hostable. Contribute on GitHub and shape the future of the platform.",
              },
            ].map((feature) => (
              <div key={feature.title} className="flex gap-4 p-4 rounded-lg bg-background border">
                <div className="shrink-0 mt-0.5">{feature.icon}</div>
                <div>
                  <h3 className="font-semibold mb-1 text-sm">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Start Building Today</h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Join the open-source community building the future of AI automation.
            Create your first Skill in under a minute.
          </p>
          <Link href="/create">
            <Button size="lg" className="h-12 px-10 text-base">
              <Sparkles className="h-5 w-5" />
              Create Your First Skill — Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
