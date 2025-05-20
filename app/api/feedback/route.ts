import { NextResponse } from "next/server"
import { generateFeedback } from "@/lib/gemini"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { question, options, selectedAnswer, correctAnswer } = body

    if (!question || !options || !selectedAnswer || !correctAnswer) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const feedback = await generateFeedback(question, options, selectedAnswer, correctAnswer)
    return NextResponse.json(feedback)
  } catch (error) {
    console.error("Error in feedback API route:", error)
    return NextResponse.json(
      { error: "Failed to generate feedback", details: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}
