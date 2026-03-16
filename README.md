# skill-creator.com

> The open-source platform for creating, sharing, and discovering AI Agent Skills.

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org)
[![Powered by Claude](https://img.shields.io/badge/AI-Claude%20API-orange)](https://anthropic.com)

## Overview

**skill-creator.com** helps developers quickly create Agent Skills using AI, then publish them to a community marketplace. Compatible with Claude Code, MCP, SkillMP, and OpenAI.

**Core workflow:**
1. Describe the Skill you want in a dialog box
2. Claude generates the Skill YAML definition
3. One-click publish to the Skill marketplace
4. Community can discover, download, and star Skills

## Features

- **AI Skill Creator** — Natural language → Skill YAML via Claude API
- **Skill Marketplace** — Browse, search, filter, download Skills
- **Multi-format Support** — Claude Code, MCP, SkillMP, OpenAI
- **GitHub OAuth** — Sign in with your GitHub account
- **Skill Specification** — Comprehensive docs and best practices
- **Open Source** — MIT licensed, self-hostable

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | PostgreSQL + Drizzle ORM |
| Auth | NextAuth v5 (GitHub OAuth) |
| AI | Anthropic Claude API |
| Deployment | Vercel / Self-hosted |

## Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database
- GitHub OAuth App
- Anthropic API key

### Setup

```bash
# Clone the repo
git clone https://github.com/skill-creator/skill-creator.git
cd skill-creator

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
# Edit .env.local with your credentials

# Run database migrations
npm run db:push

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

```env
DATABASE_URL=postgresql://user:password@localhost:5432/skill_creator
AUTH_SECRET=your-secret-key
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
ANTHROPIC_API_KEY=sk-ant-...
```

See [`.env.example`](.env.example) for full reference.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home / landing page
│   ├── create/            # Skill Creator (AI dialog)
│   ├── marketplace/       # Skill Marketplace
│   ├── docs/              # Skill Specification docs
│   ├── profile/           # User profile pages
│   └── api/               # API routes
│       ├── auth/          # NextAuth handlers
│       ├── generate/      # Claude API skill generation
│       └── skills/        # Skill CRUD
├── components/
│   ├── layout/            # Navbar, Footer
│   ├── skill/             # SkillCard, SkillCreator
│   └── ui/                # Button, Card, Badge, etc.
├── db/                    # Drizzle schema + client
├── lib/                   # Auth, Claude client, utils
└── types/                 # TypeScript types
```

## Skill Format

```yaml
name: your-skill-name
description: |
  Clear description of what this skill does.
prompt: |
  Detailed system prompt for the skill behavior.
  Include step-by-step instructions and output format.
examples:
  - input: "example request"
    output: "example response"
tags:
  - tag1
  - tag2
category: coding
version: "1.0.0"
```

See [Skill Specification](https://skill-creator.com/docs) for full documentation.

## Contributing

Contributions are welcome! Please submit PRs to the `main` branch.

```bash
# Fork and clone
git clone https://github.com/YOUR_USERNAME/skill-creator.git

# Create feature branch
git checkout -b feature/your-feature

# Make changes and submit PR
```

## License

MIT © skill-creator.com contributors
