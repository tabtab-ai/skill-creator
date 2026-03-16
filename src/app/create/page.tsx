import { SkillCreator } from "@/components/skill/skill-creator"
import { Sparkles } from "lucide-react"

export const metadata = {
  title: "Create Skill — Skill Creator",
  description: "Use AI to generate a custom Agent Skill in seconds",
}

export default function CreatePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium mb-4">
          <Sparkles className="h-4 w-4" />
          Powered by Claude
        </div>
        <h1 className="text-4xl font-bold mb-3">Create a Skill</h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Describe the Agent Skill you want. Claude will generate a production-ready Skill definition you can publish or download.
        </p>
      </div>
      <SkillCreator />
    </div>
  )
}
