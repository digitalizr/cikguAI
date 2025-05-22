import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import SidebarLayout from "@/components/sidebar-layout"
import { GraduationCap, BookOpen, ArrowRight } from "lucide-react"

export default function QuizSelectionPage() {
  return (
    <SidebarLayout>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Quiz Categories</h1>
        <p className="text-gray-600 mb-8">
          Select an education level and subject to start practicing with our AI-powered quizzes.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <GraduationCap className="h-5 w-5 mr-2 text-blue-600" />
                Primary School
              </CardTitle>
              <CardDescription>Standard 1 to Standard 6</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-gray-600 mb-4">
                  Practice quizzes for primary school subjects including Bahasa Melayu, English, Mathematics, Science,
                  and more.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/quiz/primary/standard-3/mathematics"
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                  >
                    Standard 3 Mathematics <ArrowRight className="h-3 w-3 ml-1" />
                  </Link>
                  <Link
                    href="/quiz/primary/standard-4/science"
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                  >
                    Standard 4 Science <ArrowRight className="h-3 w-3 ml-1" />
                  </Link>
                  <Link
                    href="/quiz/primary/standard-5/english"
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                  >
                    Standard 5 English <ArrowRight className="h-3 w-3 ml-1" />
                  </Link>
                  <Link
                    href="/quiz/primary/standard-6/bahasa-melayu"
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                  >
                    Standard 6 Bahasa Melayu <ArrowRight className="h-3 w-3 ml-1" />
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                Secondary School
              </CardTitle>
              <CardDescription>Form 1 to Form 6</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-gray-600 mb-4">
                  Practice quizzes for secondary school subjects including Science, Mathematics, Languages, and
                  specialized subjects.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/quiz/secondary/form-3/science"
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                  >
                    Form 3 Science <ArrowRight className="h-3 w-3 ml-1" />
                  </Link>
                  <Link
                    href="/quiz/secondary/form-5/science/physics"
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                  >
                    Form 5 Physics <ArrowRight className="h-3 w-3 ml-1" />
                  </Link>
                  <Link
                    href="/quiz/secondary/form-4/science/chemistry"
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                  >
                    Form 4 Chemistry <ArrowRight className="h-3 w-3 ml-1" />
                  </Link>
                  <Link
                    href="/quiz/secondary/form-5/arts/economics"
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                  >
                    Form 5 Economics <ArrowRight className="h-3 w-3 ml-1" />
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Popular Quizzes</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Form 5 SPM Mathematics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">
                  Practice essential mathematics concepts for SPM examination.
                </p>
                <Link
                  href="/quiz/secondary/form-5/science/mathematics"
                  className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                >
                  Start Quiz <ArrowRight className="h-3 w-3 ml-1" />
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Form 5 SPM Biology</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">
                  Test your knowledge on biology concepts for SPM examination.
                </p>
                <Link
                  href="/quiz/secondary/form-5/science/biology"
                  className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                >
                  Start Quiz <ArrowRight className="h-3 w-3 ml-1" />
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Standard 6 UPSR Science</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">Prepare for UPSR with these science practice questions.</p>
                <Link
                  href="/quiz/primary/standard-6/science"
                  className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                >
                  Start Quiz <ArrowRight className="h-3 w-3 ml-1" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SidebarLayout>
  )
}
