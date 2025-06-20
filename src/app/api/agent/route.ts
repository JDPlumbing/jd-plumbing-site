// src/app/api/agent/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { OpenAI } from 'openai'
import { schemaMap } from '@/schemas'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! })

// Infer valid keys from schemaMap
type SchemaKey = keyof typeof schemaMap

export async function POST(req: NextRequest) {
  const body = (await req.json()) as {
    prompt: string
    schemaRefs?: SchemaKey[]
    agent?: 'openai' | 'runpod'
  }

  const { prompt, schemaRefs = [] } = body

  if (!prompt) {
    return NextResponse.json({ error: 'Missing prompt' }, { status: 400 })
  }

  // Convert schema keys to summaries
  const schemas = schemaRefs.map((ref) => {
    const capsule = schemaMap[ref]
    if (!capsule) return `⚠️ Missing schema: ${ref}`

    return `## ${capsule.title}\n\n${capsule.description}\n\nFields:\n${Object.entries(capsule.fields)
      .map(([k, v]) => `- **${k}**: ${v}`)
      .join('\n')}`
  })

  const systemPrompt = `You are Drippy, a plumbing agent.\nSchemas:\n\n${schemas.join(
    '\n\n---\n\n'
  )}`

  try {
    const result = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt },
      ],
    })

    const output = result.choices?.[0]?.message?.content ?? '[No response]'
    return NextResponse.json({ output })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
