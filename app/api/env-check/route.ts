import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    geminiApiKeySet: !!process.env.GEMINI_API_KEY,
    // Don't return the actual key values for security reasons
    environmentVariables: {
      GEMINI_API_KEY: process.env.GEMINI_API_KEY ? "[SET]" : "[NOT SET]",
    },
  })
}
