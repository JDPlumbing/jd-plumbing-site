import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(req: Request) {
  const { messages } = await req.json()

  const chat = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: messages.map((m: any) => ({
      role: m.role,
      content: m.content
    })),
    temperature: 0.7
  })

  const reply = chat.choices[0]?.message?.content
  return NextResponse.json({ reply })
}