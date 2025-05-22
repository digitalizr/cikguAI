export interface QuizQuestion {
  id: number
  subject: string
  question: string
  options: {
    a: string
    b: string
    c: string
    d: string
  }
  correctAnswer: string
}

export interface QuizData {
  educationLevel: string
  subject: string
  questions: QuizQuestion[]
}
