import { NextResponse } from "next/server"
import { generateHint } from "@/lib/gemini"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { question, options } = body

    if (!question || !options) {
      return NextResponse.json({ error: "Question and options are required" }, { status: 400 })
    }

    const hint = await generateHint(question, options)
    return NextResponse.json({ hint })
  } catch (error) {
    console.error("Error in hint API route:", error)
    return NextResponse.json(
      { error: "Failed to generate hint", details: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}
