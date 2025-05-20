"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface QuizContainerProps {
  currentQuestion: any
  currentQuestionIndex: number
  totalQuestions: number
  selectedAnswer: string | null
  aiResponse: string
  feedback: {
    isCorrect: boolean
    feedbackText: string
    aiExplanation: string
  } | null
  isAnswerSubmitted: boolean
  isLoading: boolean
  quizCompleted: boolean
  onGetHint: () => void
  onGetElaboration: () => void
  onSelectAnswer: (answerLetter: string) => void
  onNextQuestion: () => void
  onRestartQuiz: () => void
}

export default function QuizContainer({
  currentQuestion,
  currentQuestionIndex,
  totalQuestions,
  selectedAnswer,
  aiResponse,
  feedback,
  isAnswerSubmitted,
  isLoading,
  quizCompleted,
  onGetHint,
  onGetElaboration,
  onSelectAnswer,
  onNextQuestion,
  onRestartQuiz,
}: QuizContainerProps) {
  if (quizCompleted) {
    return (
      <Card className="w-full max-w-3xl shadow-lg">
        <CardHeader className="text-center">
          <h1 className="text-2xl font-bold text-green-600">Quiz Completed!</h1>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-lg mb-6">You have completed all the questions.</p>
          <Button onClick={onRestartQuiz} className="px-8">
            Start Over
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-3xl shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-500">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </span>
          <span className="text-sm font-medium text-blue-600">{currentQuestion.subject}</span>
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
              onClick={() => onSelectAnswer(key)}
            >
              <span className="font-bold mr-2">{key.toUpperCase()}.</span> {value as string}
            </Button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <Button variant="outline" className="flex-1" onClick={onGetHint} disabled={isAnswerSubmitted || isLoading}>
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
            onClick={onGetElaboration}
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
          <Button onClick={onNextQuestion}>
            {currentQuestionIndex < totalQuestions - 1 ? "Next Question" : "Finish Quiz"}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
