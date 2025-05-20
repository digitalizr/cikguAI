import { NextResponse } from "next/server"
import { listModels } from "@/lib/gemini"

export async function GET() {
  try {
    const models = await listModels()
    return NextResponse.json({
      models,
      apiKeySet: !!process.env.GEMINI_API_KEY,
    })
  } catch (error) {
    console.error("Error in models API route:", error)
    return NextResponse.json(
      {
        error: "Failed to list models",
        details: error instanceof Error ? error.message : String(error),
        apiKeySet: !!process.env.GEMINI_API_KEY,
      },
      { status: 500 },
    )
  }
}
