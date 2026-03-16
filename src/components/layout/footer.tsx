import Link from "next/link"
import { Zap, Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-background mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-3">
              <Zap className="h-6 w-6 text-yellow-500" />
              <span>skill-creator</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              The open-source platform for creating, sharing, and discovering AI Agent Skills. Build powerful automations with ease.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://github.com/skill-creator/skill-creator"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/marketplace" className="hover:text-foreground transition-colors">Marketplace</Link></li>
              <li><Link href="/create" className="hover:text-foreground transition-colors">Create Skill</Link></li>
              <li><Link href="/docs" className="hover:text-foreground transition-colors">Documentation</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/docs#spec" className="hover:text-foreground transition-colors">Skill Spec</Link></li>
              <li><Link href="/docs#examples" className="hover:text-foreground transition-colors">Examples</Link></li>
              <li>
                <a href="https://github.com/skill-creator/skill-creator/issues" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                  Report Issue
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © 2024 skill-creator.com · Open source under MIT License
          </p>
          <p className="text-xs text-muted-foreground">
            Built with Claude API
          </p>
        </div>
      </div>
    </footer>
  )
}
