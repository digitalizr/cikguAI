"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Loader2, ChevronRight } from "lucide-react"
import type { QuizQuestion } from "@/types/quiz"

interface QuizLayoutProps {
  questions: QuizQuestion[]
  subject: string
  educationLevel: string
}

export default function QuizLayout({ questions, subject, educationLevel }: QuizLayoutProps) {
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

  const pathname = usePathname()
  const pathSegments = pathname.split("/").filter(Boolean)

  const currentQuestion = questions[currentQuestionIndex]

  const fetchAIResponse = async (questionDetails: QuizQuestion, requestType: "hint" | "elaboration") => {
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

  const submitAnswerAndGetFeedback = async (questionDetails: QuizQuestion, selectedAnswerLetter: string) => {
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
  }

  const restartQuiz = () => {
    setCurrentQuestionIndex(0)
    resetQuestionState()
    setQuizCompleted(false)
  }

  // Generate breadcrumbs
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Quiz", href: "/quiz" },
    ...pathSegments.slice(1).map((segment, index) => {
      const href = `/${pathSegments.slice(0, index + 2).join("/")}`
      return {
        label: segment
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
        href,
      }
    }),
  ]

  if (quizCompleted) {
    return (
      <div className="max-w-3xl mx-auto">
        <nav className="mb-6">
          <ol className="flex flex-wrap items-center text-sm text-gray-500">
            {breadcrumbs.map((crumb, index) => (
              <li key={index} className="flex items-center">
                {index > 0 && <ChevronRight className="h-4 w-4 mx-2" />}
                {index === breadcrumbs.length - 1 ? (
                  <span className="font-medium text-blue-600">{crumb.label}</span>
                ) : (
                  <Link href={crumb.href} className="hover:text-blue-600">
                    {crumb.label}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <h1 className="text-2xl font-bold text-green-600">Quiz Completed!</h1>
            <p className="text-gray-500">
              {educationLevel} - {subject}
            </p>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-lg mb-6">Congratulations! You have completed all the questions.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={restartQuiz} className="px-8">
                Start Over
              </Button>
              <Link href="/">
                <Button variant="outline" className="px-8">
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <nav className="mb-6">
        <ol className="flex flex-wrap items-center text-sm text-gray-500">
          {breadcrumbs.map((crumb, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && <ChevronRight className="h-4 w-4 mx-2" />}
              {index === breadcrumbs.length - 1 ? (
                <span className="font-medium text-blue-600">{crumb.label}</span>
              ) : (
                <Link href={crumb.href} className="hover:text-blue-600">
                  {crumb.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{subject}</h1>
        <p className="text-gray-500">{educationLevel}</p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-500">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
          </div>
          <h2 className="text-xl font-semibold">{currentQuestion.question}</h2>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(currentQuestion.options).map(([key, value]) => (
              <Button
                key={key}
                variant={selectedAnswer === key ? "default" : "outline"}
                className={`justify-start text-left h-auto py-3 px-4 ${
                  isAnswerSubmitted && key === currentQuestion.correctAnswer
                    ? "border-green-500 bg-green-50"
                    : isAnswerSubmitted && selectedAnswer === key && key !== currentQuestion.correctAnswer
                      ? "border-red-500 bg-red-50"
                      : ""
                }`}
                disabled={isAnswerSubmitted || isLoading}
                onClick={() => handleSelectAnswer(key)}
              >
                <span className="font-bold mr-2">{key.toUpperCase()}.</span> {value as string}
              </Button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleGetHint}
              disabled={isAnswerSubmitted || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading...
                </>
              ) : (
                "Get a Hint"
              )}
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleGetElaboration}
              disabled={isAnswerSubmitted || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading...
                </>
              ) : (
                "Get an Elaboration"
              )}
            </Button>
          </div>

          {aiResponse && (
            <div className="bg-blue-50 border border-blue-100 rounded-md p-4 mt-4">
              <h3 className="text-sm font-semibold text-blue-700 mb-1">AI Assistance:</h3>
              <p className="text-sm text-blue-800">{aiResponse}</p>
            </div>
          )}

          {feedback && (
            <div
              className={`${
                feedback.isCorrect ? "bg-green-50 border-green-100" : "bg-red-50 border-red-100"
              } border rounded-md p-4 mt-4`}
            >
              <h3 className={`text-sm font-semibold ${feedback.isCorrect ? "text-green-700" : "text-red-700"} mb-1`}>
                {feedback.feedbackText}
              </h3>
              <p className={`text-sm ${feedback.isCorrect ? "text-green-800" : "text-red-800"}`}>
                {feedback.aiExplanation}
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end">
          {isAnswerSubmitted && (
            <Button onClick={handleNextQuestion}>
              {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish Quiz"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
