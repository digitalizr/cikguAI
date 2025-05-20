import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize the Google Generative AI with the API key
const apiKey = process.env.GEMINI_API_KEY
if (!apiKey) {
  console.error("Warning: GEMINI_API_KEY environment variable is not set")
}

const genAI = new GoogleGenerativeAI(apiKey || "")

// Get the generative model - using the stable gemini-1.5-flash model
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

// Function to list available models (useful for debugging)
export async function listModels() {
  try {
    const models = await genAI.listModels()
    return models
  } catch (error) {
    console.error("Error listing models:", error)
    return null
  }
}

export async function generateHint(question: string, options: Record<string, string>) {
  try {
    const prompt = `
You are an educational assistant helping SPM Form 5 students with their studies.

Please provide a helpful hint for the following multiple-choice question. 
The hint should guide the student's thinking without directly revealing the answer.

Question: ${question}

Options:
${Object.entries(options)
  .map(([key, value]) => `${key.toUpperCase()}. ${value}`)
  .join("\n")}

Provide a concise hint (2-3 sentences maximum) that helps the student understand the concept needed to answer this question.
`

    const result = await model.generateContent(prompt)
    const response = result.response
    return response.text()
  } catch (error) {
    console.error("Error generating hint:", error)
    return "Sorry, I couldn't generate a hint at this time. Please try again later."
  }
}

export async function generateElaboration(question: string, options: Record<string, string>) {
  try {
    const prompt = `
You are an educational assistant helping SPM Form 5 students with their studies.

Please provide a detailed elaboration on the following multiple-choice question.
The elaboration should explain the key concepts involved without directly revealing the answer.

Question: ${question}

Options:
${Object.entries(options)
  .map(([key, value]) => `${key.toUpperCase()}. ${value}`)
  .join("\n")}

Provide a comprehensive explanation (4-5 sentences) of the concepts involved in this question to help the student understand the topic better.
`

    const result = await model.generateContent(prompt)
    const response = result.response
    return response.text()
  } catch (error) {
    console.error("Error generating elaboration:", error)
    return "Sorry, I couldn't generate an elaboration at this time. Please try again later."
  }
}

export async function generateFeedback(
  question: string,
  options: Record<string, string>,
  selectedAnswer: string,
  correctAnswer: string,
) {
  try {
    const isCorrect = selectedAnswer === correctAnswer
    const prompt = `
You are an educational assistant helping SPM Form 5 students with their studies.

Please provide feedback for a student's answer to the following multiple-choice question:

Question: ${question}

Options:
${Object.entries(options)
  .map(([key, value]) => `${key.toUpperCase()}. ${value}`)
  .join("\n")}

The student selected: ${selectedAnswer.toUpperCase()}. ${options[selectedAnswer]}
The correct answer is: ${correctAnswer.toUpperCase()}. ${options[correctAnswer]}

${
  isCorrect
    ? "The student's answer is correct. Please explain why this answer is correct and what concepts it demonstrates understanding of."
    : "The student's answer is incorrect. Please explain why the correct answer is right and why the student's choice was wrong. Be encouraging and educational."
}

Provide a concise explanation (3-4 sentences) that helps the student understand the correct answer.
`

    const result = await model.generateContent(prompt)
    const response = result.response
    return {
      isCorrect,
      feedbackText: isCorrect
        ? "Correct! Great job!"
        : `Not quite. The correct answer was ${correctAnswer.toUpperCase()}.`,
      aiExplanation: response.text(),
    }
  } catch (error) {
    console.error("Error generating feedback:", error)
    return {
      isCorrect: selectedAnswer === correctAnswer,
      feedbackText:
        selectedAnswer === correctAnswer
          ? "Correct! Great job!"
          : `Not quite. The correct answer was ${correctAnswer.toUpperCase()}.`,
      aiExplanation: "Sorry, I couldn't generate a detailed explanation at this time. Please try again later.",
    }
  }
}
