import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Brain, CheckCircle, Lightbulb, GraduationCap } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-blue-600">Cikgu AI</span>
          </div>
          <Link href="/quiz">
            <Button>Explore Quizzes</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Your AI-Powered Study Companion
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mb-8">
            Cikgu AI helps Malaysian students from Standard 1 to Form 6 prepare for exams with interactive quizzes,
            personalized hints, and detailed explanations powered by artificial intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/quiz">
              <Button size="lg" className="text-lg px-8 py-6">
                Explore Quizzes <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/quiz/secondary/form-5/science/mathematics">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                Try SPM Mathematics
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Education Levels Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">All Education Levels</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <GraduationCap className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Primary School</h3>
                  <p className="text-gray-500">Standard 1 to Standard 6</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                Comprehensive quizzes covering all primary school subjects including Bahasa Melayu, English,
                Mathematics, Science, and more.
              </p>
              <Link
                href="/quiz/primary/standard-6/science"
                className="text-blue-600 hover:text-blue-800 flex items-center"
              >
                Try Standard 6 Science <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Secondary School</h3>
                  <p className="text-gray-500">Form 1 to Form 6</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                Specialized quizzes for all secondary school subjects including Science Stream, Arts Stream, and
                preparation for SPM and STPM examinations.
              </p>
              <Link
                href="/quiz/secondary/form-5/science/physics"
                className="text-blue-600 hover:text-blue-800 flex items-center"
              >
                Try Form 5 Physics <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How Cikgu AI Helps You Excel</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Comprehensive Coverage</h3>
              <p className="text-gray-600">
                Practice with questions covering all Malaysian curriculum subjects from Standard 1 to Form 6.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Lightbulb className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI-Powered Assistance</h3>
              <p className="text-gray-600">
                Get intelligent hints and detailed explanations that adapt to your specific learning needs, just like
                having a personal tutor.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Instant Feedback</h3>
              <p className="text-gray-600">
                Receive immediate, personalized feedback on your answers to understand concepts better and learn from
                mistakes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Ace Your Exams?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of Malaysian students who are using Cikgu AI to prepare smarter and score higher.
          </p>
          <Link href="/quiz">
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-white text-blue-600 hover:bg-blue-50">
              Start Exploring Quizzes <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Brain className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold text-white">Cikgu AI</span>
            </div>
            <div className="text-sm">© {new Date().getFullYear()} Cikgu AI. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
