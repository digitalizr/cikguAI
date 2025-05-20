"use client"

import { useState } from "react"
import QuizContainer from "@/components/quiz-container"
import { questions } from "@/data/questions"

export default function Home() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [aiResponse, setAiResponse] = useState("")
  const [feedback, setFeedback] = useState<{
    isCorrect: boolean
    feedbackText: string
    aiExplanation: string
  } | null>(null)
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const currentQuestion = questions[currentQuestionIndex]

  const fetchAIResponse = async (questionDetails: any, requestType: "hint" | "elaboration") => {
    console.log(`Fetching ${requestType} for:`, questionDetails)
    setIsLoading(true)

    try {
      const response = await fetch(`/api/${requestType}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: questionDetails.question,
          options: questionDetails.options,
        }),
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch ${requestType}`)
      }

      const data = await response.json()
      setIsLoading(false)
      return data[requestType]
    } catch (error) {
      console.error(`Error fetching ${requestType}:`, error)
      setIsLoading(false)
      return `Sorry, I couldn't generate a ${requestType} at this time. Please try again later.`
    }
  }

  const submitAnswerAndGetFeedback = async (questionDetails: any, selectedAnswerLetter: string) => {
    console.log("Submitting answer:", selectedAnswerLetter, "for question:", questionDetails)
    setIsLoading(true)

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: questionDetails.question,
          options: questionDetails.options,
          selectedAnswer: selectedAnswerLetter,
          correctAnswer: questionDetails.correctAnswer,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch feedback")
      }

      const data = await response.json()
      setIsLoading(false)
      return data
    } catch (error) {
      console.error("Error fetching feedback:", error)
      setIsLoading(false)
      return {
        isCorrect: selectedAnswerLetter === questionDetails.correctAnswer,
        feedbackText:
          selectedAnswerLetter === questionDetails.correctAnswer
            ? "Correct! Great job!"
            : `Not quite. The correct answer was ${questionDetails.correctAnswer.toUpperCase()}.`,
        aiExplanation: "Sorry, I couldn't generate a detailed explanation at this time. Please try again later.",
      }
    }
  }

  const handleGetHint = async () => {
    const hint = await fetchAIResponse(currentQuestion, "hint")
    setAiResponse(hint)
  }

  const handleGetElaboration = async () => {
    const elaboration = await fetchAIResponse(currentQuestion, "elaboration")
    setAiResponse(elaboration)
  }

  const handleSelectAnswer = async (answerLetter: string) => {
    setSelectedAnswer(answerLetter)
    setIsAnswerSubmitted(true)

    const feedbackResult = await submitAnswerAndGetFeedback(currentQuestion, answerLetter)
    setFeedback(feedbackResult)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      // Make sure we're properly resetting the state
      resetQuestionState()
    } else {
      setQuizCompleted(true)
    }
  }

  const resetQuestionState = () => {
    setSelectedAnswer(null)
    setAiResponse("")
    setFeedback(null)
    setIsAnswerSubmitted(false)
    // Add this line to ensure isLoading is reset
    setIsLoading(false)
  }

  const restartQuiz = () => {
    setCurrentQuestionIndex(0)
    resetQuestionState()
    setQuizCompleted(false)
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <QuizContainer
        currentQuestion={currentQuestion}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={questions.length}
        selectedAnswer={selectedAnswer}
        aiResponse={aiResponse}
        feedback={feedback}
        isAnswerSubmitted={isAnswerSubmitted}
        isLoading={isLoading}
        quizCompleted={quizCompleted}
        onGetHint={handleGetHint}
        onGetElaboration={handleGetElaboration}
        onSelectAnswer={handleSelectAnswer}
        onNextQuestion={handleNextQuestion}
        onRestartQuiz={restartQuiz}
      />
    </main>
  )
}
