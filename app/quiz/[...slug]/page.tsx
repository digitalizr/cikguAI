import { notFound } from "next/navigation"
import SidebarLayout from "@/components/sidebar-layout"
import QuizLayout from "@/components/quiz-layout"
import { biologyQuizData } from "@/data/secondary/form-5/science/biology"
import { mathematicsQuizData } from "@/data/secondary/form-5/science/mathematics"
import { scienceQuizData } from "@/data/primary/standard-6/science"
import { chemistryForm5QuizData } from "@/data/secondary/form-5/science/chemistry"
import { chemistryForm6QuizData } from "@/data/secondary/form-6/science/chemistry"

// This would be expanded with more quiz data imports as needed
const quizDataMap: Record<string, any> = {
  "secondary/form-5/science/biology": biologyQuizData,
  "secondary/form-5/science/mathematics": mathematicsQuizData,
  "primary/standard-6/science": scienceQuizData,
  "secondary/form-5/science/chemistry": chemistryForm5QuizData,
  "secondary/form-6/science/chemistry": chemistryForm6QuizData,
}

export default function QuizPage({ params }: { params: { slug: string[] } }) {
  const slugPath = params.slug.join("/")
  const quizData = quizDataMap[slugPath]

  if (!quizData) {
    // For paths that don't have data yet, show a placeholder
    if (params.slug.length >= 3) {
      const level = params.slug[0] === "primary" ? params.slug[1].replace("-", " ") : params.slug[1].replace("-", " ")
      const subject = params.slug[params.slug.length - 1].replace("-", " ")

      return (
        <SidebarLayout>
          <div className="max-w-3xl mx-auto text-center py-12">
            <h1 className="text-3xl font-bold mb-4 capitalize">{subject}</h1>
            <p className="text-xl text-gray-600 mb-8 capitalize">{level}</p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-xl mx-auto">
              <h2 className="text-lg font-medium text-yellow-800 mb-2">Coming Soon</h2>
              <p className="text-yellow-700">
                We're currently developing quiz content for this subject. Please check back later or try one of our
                available quizzes.
              </p>
            </div>
          </div>
        </SidebarLayout>
      )
    }

    return notFound()
  }

  return (
    <SidebarLayout>
      <QuizLayout questions={quizData.questions} subject={quizData.subject} educationLevel={quizData.educationLevel} />
    </SidebarLayout>
  )
}
