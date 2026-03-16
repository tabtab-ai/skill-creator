import Link from "next/link"
import { Download, Star, Tag } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Skill } from "@/types/skill"
import { formatDistanceToNow } from "date-fns"

const FORMAT_COLORS: Record<string, string> = {
  claude: "bg-orange-100 text-orange-800 border-orange-200",
  mcp: "bg-blue-100 text-blue-800 border-blue-200",
  skillmp: "bg-purple-100 text-purple-800 border-purple-200",
  openai: "bg-green-100 text-green-800 border-green-200",
}

interface SkillCardProps {
  skill: Skill
}

export function SkillCard({ skill }: SkillCardProps) {
  return (
    <Card className="flex flex-col hover:shadow-md transition-shadow group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base line-clamp-1">
            <Link
              href={`/marketplace/${skill.id}`}
              className="hover:text-primary transition-colors"
            >
              {skill.name}
            </Link>
          </CardTitle>
          <span
            className={`text-xs px-2 py-0.5 rounded-full border font-medium shrink-0 ${FORMAT_COLORS[skill.format] ?? "bg-gray-100 text-gray-800"}`}
          >
            {skill.format}
          </span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
          {skill.description}
        </p>
      </CardHeader>

      <CardContent className="pb-3 flex-1">
        <div className="flex flex-wrap gap-1">
          {skill.tags.slice(0, 4).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="pt-3 border-t flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Download className="h-3 w-3" />
            {skill.downloads.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <Star className="h-3 w-3" />
            {skill.stars.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <img
            src={skill.authorAvatar ?? `https://github.com/${skill.authorName}.png`}
            alt={skill.authorName}
            className="h-5 w-5 rounded-full"
          />
          <span>{skill.authorName}</span>
        </div>
      </CardFooter>
    </Card>
  )
}
