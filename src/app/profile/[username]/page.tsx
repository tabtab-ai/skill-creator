"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { SkillCard } from "@/components/skill/skill-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, Loader2, Plus } from "lucide-react"
import Link from "next/link"
import type { Skill } from "@/types/skill"

export default function ProfilePage() {
  const params = useParams()
  const { data: session } = useSession()
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const username = params.username as string

  const isOwnProfile = session?.user?.name === username

  useEffect(() => {
    async function fetchUserSkills() {
      try {
        const res = await fetch(`/api/skills?author=${encodeURIComponent(username)}`)
        if (res.ok) {
          const data = await res.json()
          setSkills(data.skills ?? [])
        }
      } catch {
        // ignore
      } finally {
        setLoading(false)
      }
    }
    fetchUserSkills()
  }, [username])

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Profile header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-10 pb-10 border-b">
        <img
          src={`https://github.com/${username}.png`}
          alt={username}
          className="h-20 w-20 rounded-full border-2 border-border"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${username}&background=random`
          }}
        />
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{username}</h1>
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 mt-1"
          >
            <Github className="h-4 w-4" />@{username}
          </a>
          <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
            <span><strong className="text-foreground">{skills.length}</strong> skills</span>
            <span>
              <strong className="text-foreground">
                {skills.reduce((sum, s) => sum + s.downloads, 0).toLocaleString()}
              </strong>{" "}
              total downloads
            </span>
          </div>
        </div>
        {isOwnProfile && (
          <Link href="/create">
            <Button>
              <Plus className="h-4 w-4" />
              New Skill
            </Button>
          </Link>
        )}
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-xl font-semibold mb-6">
          {isOwnProfile ? "Your Skills" : `${username}'s Skills`}
        </h2>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : skills.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground border-2 border-dashed rounded-lg">
            <p className="text-lg mb-2">No skills published yet</p>
            {isOwnProfile && (
              <Link href="/create">
                <Button variant="outline" className="mt-4">
                  Create your first Skill
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
