import { Brain } from "lucide-react"
import Link from "next/link"

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <Brain className="h-8 w-8 text-blue-600" />
      <span className="text-2xl font-bold text-blue-600">Cikgu AI</span>
    </Link>
  )
}
