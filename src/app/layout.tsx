import type { Metadata } from "next"
import "./globals.css"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Providers } from "./providers"

export const metadata: Metadata = {
  title: "Skill Creator — Build & Share AI Agent Skills",
  description:
    "The open-source platform for creating, sharing, and discovering AI Agent Skills. Build powerful automations with Claude in seconds.",
  keywords: ["AI", "Agent", "Skill", "Claude", "MCP", "automation"],
  openGraph: {
    title: "Skill Creator",
    description: "Build & Share AI Agent Skills",
    url: "https://skill-creator.com",
    siteName: "Skill Creator",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
