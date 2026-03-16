import { NextRequest, NextResponse } from "next/server"
import { db } from "@/db"
import { skills, users, skillStars } from "@/db/schema"
import { eq, sql } from "drizzle-orm"
import { auth } from "@/lib/auth"

// GET /api/skills/[id]
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const [skill] = await db
      .select({
        skill: skills,
        authorName: users.name,
        authorAvatar: users.image,
        authorGithub: users.githubUsername,
      })
      .from(skills)
      .leftJoin(users, eq(skills.authorId, users.id))
      .where(eq(skills.id, id))
      .limit(1)

    if (!skill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 })
    }

    // Increment downloads
    await db
      .update(skills)
      .set({ downloads: sql`${skills.downloads} + 1` })
      .where(eq(skills.id, id))

    return NextResponse.json({
      ...skill.skill,
      authorName: skill.authorName,
      authorAvatar: skill.authorAvatar,
      authorGithub: skill.authorGithub,
    })
  } catch (error) {
    console.error("Get skill error:", error)
    return NextResponse.json({ error: "Failed to fetch skill" }, { status: 500 })
  }
}

// POST /api/skills/[id]/star
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    // Toggle star
    const existing = await db
      .select()
      .from(skillStars)
      .where(
        eq(skillStars.userId, session.user.id) &&
        eq(skillStars.skillId, id)
      )
      .limit(1)

    if (existing.length > 0) {
      await db
        .delete(skillStars)
        .where(
          eq(skillStars.userId, session.user.id) &&
          eq(skillStars.skillId, id)
        )
      await db
        .update(skills)
        .set({ stars: sql`${skills.stars} - 1` })
        .where(eq(skills.id, id))
      return NextResponse.json({ starred: false })
    } else {
      await db.insert(skillStars).values({ userId: session.user.id, skillId: id })
      await db
        .update(skills)
        .set({ stars: sql`${skills.stars} + 1` })
        .where(eq(skills.id, id))
      return NextResponse.json({ starred: true })
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to star skill" }, { status: 500 })
  }
}
