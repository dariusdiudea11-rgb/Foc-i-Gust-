import Anthropic from '@anthropic-ai/sdk'
import { TOOLS_SCHEMA, executeTool } from './tools.js'
import { buildSystemPrompt } from './prompts.js'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
const MODEL = 'claude-haiku-4-5-20251001'
const MAX_TOKENS = 1024
const MAX_TOOL_ROUNDS = 5

export async function processMessage(userText) {
  const messages = [{ role: 'user', content: userText }]
  let round = 0

  while (round < MAX_TOOL_ROUNDS) {
    round++

    const response = await client.messages.create({
      model:      MODEL,
      max_tokens: MAX_TOKENS,
      system:     buildSystemPrompt(),
      tools:      TOOLS_SCHEMA,
      messages,
    })

    messages.push({ role: 'assistant', content: response.content })

    if (response.stop_reason === 'end_turn') {
      return response.content
        .filter(b => b.type === 'text')
        .map(b => b.text)
        .join('\n')
        .trim() || 'Am procesat cererea.'
    }

    if (response.stop_reason === 'tool_use') {
      const toolResults = response.content
        .filter(b => b.type === 'tool_use')
        .map(b => ({
          type:        'tool_result',
          tool_use_id: b.id,
          content:     executeTool(b.name, b.input),
        }))
      messages.push({ role: 'user', content: toolResults })
      continue
    }

    break
  }

  return 'Nu am putut procesa cererea. Te rog încearcă din nou.'
}
