export type SkillFormat = "claude" | "mcp" | "skillmp" | "openai"
export type SkillCategory =
  | "productivity"
  | "coding"
  | "writing"
  | "research"
  | "data"
  | "automation"
  | "other"

export interface SkillFile {
  name: string
  description: string
  version: string
  author: string
  format: SkillFormat
  category: SkillCategory
  tags: string[]
  content: string // YAML/JSON skill definition
  readme?: string
  examples?: SkillExample[]
}

export interface SkillExample {
  title: string
  input: string
  output: string
}

export interface Skill {
  id: string
  name: string
  description: string
  version: string
  authorId: string
  authorName: string
  authorAvatar?: string
  format: SkillFormat
  category: SkillCategory
  tags: string[]
  content: string
  readme?: string
  examples?: SkillExample[]
  downloads: number
  stars: number
  isPublic: boolean
  createdAt: Date
  updatedAt: Date
}
