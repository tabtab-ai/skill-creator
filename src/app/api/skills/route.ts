import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/db"
import { skills } from "@/db/schema"
import { eq, desc, ilike, or } from "drizzle-orm"

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function extractFromYaml(content: string) {
  const get = (key: string) => {
    const match = content.match(new RegExp(`^${key}:\\s*(.+)$`, "m"))
    return match ? match[1].trim().replace(/^["']|["']$/g, "") : ""
  }
  const getMultiline = (key: string) => {
    const match = content.match(new RegExp(`^${key}:\\s*\\|\\s*\\n((?:  .+\\n?)+)`, "m"))
    return match ? match[1].replace(/^  /gm, "").trim() : get(key)
  }
  const getTags = () => {
    const match = content.match(/^tags:\s*\n((?:\s*-\s*.+\n?)+)/m)
    if (!match) return []
    return match[1].match(/[-•]\s*(.+)/g)?.map((t) => t.replace(/^[-•]\s*/, "").trim()) ?? []
  }

  return {
    name: get("name"),
    description: getMultiline("description"),
    version: get("version") || "1.0.0",
    category: get("category") || "other",
    tags: getTags(),
  }
}

// GET /api/skills - list skills
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get("q") || ""
  const category = searchParams.get("category") || ""
  const format = searchParams.get("format") || ""
  const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 50)

  try {
    const conditions = [eq(skills.isPublic, true)]

    const results = await db
      .select()
      .from(skills)
      .where(eq(skills.isPublic, true))
      .orderBy(desc(skills.downloads))
      .limit(limit)

    return NextResponse.json({ skills: results })
  } catch (error) {
    console.error("List skills error:", error)
    return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 })
  }
}

// POST /api/skills - create skill
export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { name, content, format } = body

    if (!name || !content) {
      return NextResponse.json({ error: "Name and content are required" }, { status: 400 })
    }

    const extracted = extractFromYaml(content)
    const baseSlug = slugify(name)

    // Ensure unique slug
    const existing = await db
      .select({ slug: skills.slug })
      .from(skills)
      .where(eq(skills.slug, baseSlug))
    const slug = existing.length > 0 ? `${baseSlug}-${Date.now()}` : baseSlug

    const [skill] = await db
      .insert(skills)
      .values({
        name: extracted.name || name,
        slug,
        description: extracted.description || "No description",
        version: extracted.version,
        authorId: session.user.id,
        format: format || "claude",
        category: extracted.category,
        tags: extracted.tags,
        content,
        isPublic: true,
      })
      .returning()

    return NextResponse.json({ skill }, { status: 201 })
  } catch (error) {
    console.error("Create skill error:", error)
    return NextResponse.json({ error: "Failed to create skill" }, { status: 500 })
  }
}
