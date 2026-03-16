import Anthropic from "@anthropic-ai/sdk"

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

export async function generateSkill(
  description: string,
  format: string = "claude"
): Promise<string> {
  const systemPrompt = getSystemPrompt(format)

  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4096,
    system: systemPrompt,
    messages: [
      {
        role: "user",
        content: `Please create a Skill based on the following description:\n\n${description}\n\nReturn only the YAML content, no explanation.`,
      },
    ],
  })

  const content = message.content[0]
  if (content.type !== "text") throw new Error("Unexpected response type")

  // Strip markdown code fences if present
  return content.text.replace(/^```ya?ml\n?/m, "").replace(/\n?```$/m, "").trim()
}

function getSystemPrompt(format: string): string {
  if (format === "claude") {
    return `You are an expert at creating Claude Code Skills. A Skill is a YAML file that defines a reusable AI agent capability.

Claude Code Skill format:
\`\`\`yaml
name: skill-name
description: |
  Brief description of what this skill does.
  Used by Claude to understand when to invoke it.
prompt: |
  Detailed system prompt that defines the skill's behavior.
  Include step-by-step instructions, constraints, and output format.
examples:
  - input: "example user request"
    output: "example response"
tags:
  - tag1
  - tag2
category: coding|writing|research|productivity|data|automation|other
version: "1.0.0"
\`\`\`

Guidelines:
- The description should be clear and concise (1-2 sentences)
- The prompt should be detailed and specific
- Include 1-3 examples showing input/output
- Choose appropriate tags (3-5 tags)
- Set the correct category`
  }

  if (format === "mcp") {
    return `You are an expert at creating MCP (Model Context Protocol) tool definitions.

MCP Tool Skill format:
\`\`\`yaml
name: tool-name
description: What this tool does
format: mcp
tools:
  - name: function_name
    description: What this function does
    inputSchema:
      type: object
      properties:
        param1:
          type: string
          description: Parameter description
      required:
        - param1
implementation: |
  # Python or JavaScript implementation hint
  # This describes what the tool should do
version: "1.0.0"
\`\`\``
  }

  return `You are an expert at creating AI Agent Skills in YAML format.
Create a well-structured, reusable skill based on the user's description.`
}

export async function improveSkill(
  currentContent: string,
  feedback: string
): Promise<string> {
  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4096,
    system:
      "You are an expert at improving Claude Code Skills. Return only the improved YAML content.",
    messages: [
      {
        role: "user",
        content: `Here is my current Skill:\n\n\`\`\`yaml\n${currentContent}\n\`\`\`\n\nPlease improve it based on this feedback: ${feedback}\n\nReturn only the updated YAML.`,
      },
    ],
  })

  const content = message.content[0]
  if (content.type !== "text") throw new Error("Unexpected response type")
  return content.text.replace(/^```ya?ml\n?/m, "").replace(/\n?```$/m, "").trim()
}
