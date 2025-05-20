import { NextResponse } from "next/server"
import { generateElaboration } from "@/lib/gemini"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { question, options } = body

    if (!question || !options) {
      return NextResponse.json({ error: "Question and options are required" }, { status: 400 })
    }

    const elaboration = await generateElaboration(question, options)
    return NextResponse.json({ elaboration })
  } catch (error) {
    console.error("Error in elaboration API route:", error)
    return NextResponse.json(
      { error: "Failed to generate elaboration", details: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}
