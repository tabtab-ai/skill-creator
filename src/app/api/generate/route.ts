import { NextRequest, NextResponse } from "next/server"
import { generateSkill, improveSkill } from "@/lib/claude"

export async function POST(req: NextRequest) {
  try {
    const { prompt, format, currentContent } = await req.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    let content: string
    if (currentContent) {
      content = await improveSkill(currentContent, prompt)
    } else {
      content = await generateSkill(prompt, format)
    }

    return NextResponse.json({ content })
  } catch (error) {
    console.error("Generate error:", error)
    return NextResponse.json(
      { error: "Failed to generate skill. Please try again." },
      { status: 500 }
    )
  }
}
