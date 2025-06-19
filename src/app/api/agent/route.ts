// src/app/api/agent/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { OpenAI } from 'openai'
import fs from 'fs'
import path from 'path'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! })

export async function POST(req: NextRequest) {
  // Ensure correct types for incoming body
  const body = (await req.json()) as {
    prompt: string
    schemaRefs?: string[]
    agent?: 'openai' | 'runpod'
  }

  const { prompt, schemaRefs = [] } = body

  if (!prompt) {
    return NextResponse.json({ error: 'Missing prompt' }, { status: 400 })
  }

  // Load schemas
  const schemas: string[] = schemaRefs.map((ref) => {
    const filePath = path.join(process.cwd(), 'src/schemas', `${ref}.md`)
    try {
      return fs.readFileSync(filePath, 'utf-8')
    } catch {
      return `⚠️ Missing schema: ${ref}`
    }
  })

  const systemPrompt = `You are Drippy, a plumbing agent.\nSchemas:\n\n${schemas.join(
    '\n---\n'
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
