"use client"

import Link from "next/link"
import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Zap, Github, Menu, X } from "lucide-react"
import { useState } from "react"

export function Navbar() {
  const { data: session } = useSession()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Zap className="h-6 w-6 text-yellow-500" />
            <span>skill-creator</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/marketplace" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Marketplace
            </Link>
            <Link href="/create" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Create
            </Link>
            <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Docs
            </Link>
            <a
              href="https://github.com/skill-creator/skill-creator"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </div>

          {/* Auth */}
          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <>
                <Link href="/create">
                  <Button size="sm">Create Skill</Button>
                </Link>
                <Link href={`/profile/${session.user?.name}`}>
                  <img
                    src={session.user?.image ?? ""}
                    alt={session.user?.name ?? ""}
                    className="h-8 w-8 rounded-full cursor-pointer border-2 border-primary/20 hover:border-primary"
                  />
                </Link>
                <Button variant="ghost" size="sm" onClick={() => signOut()}>
                  Sign out
                </Button>
              </>
            ) : (
              <Button size="sm" onClick={() => signIn("github")}>
                <Github className="h-4 w-4" />
                Sign in with GitHub
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t py-4 space-y-3">
            <Link href="/marketplace" className="block text-sm py-2" onClick={() => setMenuOpen(false)}>Marketplace</Link>
            <Link href="/create" className="block text-sm py-2" onClick={() => setMenuOpen(false)}>Create</Link>
            <Link href="/docs" className="block text-sm py-2" onClick={() => setMenuOpen(false)}>Docs</Link>
            {session ? (
              <Button variant="ghost" size="sm" onClick={() => signOut()} className="w-full justify-start">
                Sign out
              </Button>
            ) : (
              <Button size="sm" onClick={() => signIn("github")} className="w-full">
                <Github className="h-4 w-4" />
                Sign in with GitHub
              </Button>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
