"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronRight, GraduationCap, BookOpen, Menu, X, Home, Brain } from "lucide-react"

interface SidebarItem {
  title: string
  href?: string
  icon?: React.ReactNode
  submenu?: SidebarItem[]
  educationLevel?: string
}

const sidebarItems: SidebarItem[] = [
  {
    title: "Primary School",
    icon: <GraduationCap className="h-4 w-4" />,
    submenu: [
      {
        title: "Standard 1",
        submenu: [
          { title: "Bahasa Melayu", href: "/quiz/primary/standard-1/bahasa-melayu", educationLevel: "Standard 1" },
          { title: "English", href: "/quiz/primary/standard-1/english", educationLevel: "Standard 1" },
          { title: "Mathematics", href: "/quiz/primary/standard-1/mathematics", educationLevel: "Standard 1" },
        ],
      },
      {
        title: "Standard 2",
        submenu: [
          { title: "Bahasa Melayu", href: "/quiz/primary/standard-2/bahasa-melayu", educationLevel: "Standard 2" },
          { title: "English", href: "/quiz/primary/standard-2/english", educationLevel: "Standard 2" },
          { title: "Mathematics", href: "/quiz/primary/standard-2/mathematics", educationLevel: "Standard 2" },
        ],
      },
      {
        title: "Standard 3",
        submenu: [
          { title: "Bahasa Melayu", href: "/quiz/primary/standard-3/bahasa-melayu", educationLevel: "Standard 3" },
          { title: "English", href: "/quiz/primary/standard-3/english", educationLevel: "Standard 3" },
          { title: "Mathematics", href: "/quiz/primary/standard-3/mathematics", educationLevel: "Standard 3" },
          { title: "Science", href: "/quiz/primary/standard-3/science", educationLevel: "Standard 3" },
        ],
      },
      {
        title: "Standard 4",
        submenu: [
          { title: "Bahasa Melayu", href: "/quiz/primary/standard-4/bahasa-melayu", educationLevel: "Standard 4" },
          { title: "English", href: "/quiz/primary/standard-4/english", educationLevel: "Standard 4" },
          { title: "Mathematics", href: "/quiz/primary/standard-4/mathematics", educationLevel: "Standard 4" },
          { title: "Science", href: "/quiz/primary/standard-4/science", educationLevel: "Standard 4" },
          { title: "Sejarah", href: "/quiz/primary/standard-4/sejarah", educationLevel: "Standard 4" },
        ],
      },
      {
        title: "Standard 5",
        submenu: [
          { title: "Bahasa Melayu", href: "/quiz/primary/standard-5/bahasa-melayu", educationLevel: "Standard 5" },
          { title: "English", href: "/quiz/primary/standard-5/english", educationLevel: "Standard 5" },
          { title: "Mathematics", href: "/quiz/primary/standard-5/mathematics", educationLevel: "Standard 5" },
          { title: "Science", href: "/quiz/primary/standard-5/science", educationLevel: "Standard 5" },
          { title: "Sejarah", href: "/quiz/primary/standard-5/sejarah", educationLevel: "Standard 5" },
        ],
      },
      {
        title: "Standard 6",
        submenu: [
          { title: "Bahasa Melayu", href: "/quiz/primary/standard-6/bahasa-melayu", educationLevel: "Standard 6" },
          { title: "English", href: "/quiz/primary/standard-6/english", educationLevel: "Standard 6" },
          { title: "Mathematics", href: "/quiz/primary/standard-6/mathematics", educationLevel: "Standard 6" },
          { title: "Science", href: "/quiz/primary/standard-6/science", educationLevel: "Standard 6" },
          { title: "Sejarah", href: "/quiz/primary/standard-6/sejarah", educationLevel: "Standard 6" },
        ],
      },
    ],
  },
  {
    title: "Secondary School",
    icon: <BookOpen className="h-4 w-4" />,
    submenu: [
      {
        title: "Form 1",
        submenu: [
          { title: "Bahasa Melayu", href: "/quiz/secondary/form-1/bahasa-melayu", educationLevel: "Form 1" },
          { title: "English", href: "/quiz/secondary/form-1/english", educationLevel: "Form 1" },
          { title: "Mathematics", href: "/quiz/secondary/form-1/mathematics", educationLevel: "Form 1" },
          { title: "Science", href: "/quiz/secondary/form-1/science", educationLevel: "Form 1" },
          { title: "Sejarah", href: "/quiz/secondary/form-1/sejarah", educationLevel: "Form 1" },
        ],
      },
      {
        title: "Form 2",
        submenu: [
          { title: "Bahasa Melayu", href: "/quiz/secondary/form-2/bahasa-melayu", educationLevel: "Form 2" },
          { title: "English", href: "/quiz/secondary/form-2/english", educationLevel: "Form 2" },
          { title: "Mathematics", href: "/quiz/secondary/form-2/mathematics", educationLevel: "Form 2" },
          { title: "Science", href: "/quiz/secondary/form-2/science", educationLevel: "Form 2" },
          { title: "Sejarah", href: "/quiz/secondary/form-2/sejarah", educationLevel: "Form 2" },
        ],
      },
      {
        title: "Form 3",
        submenu: [
          { title: "Bahasa Melayu", href: "/quiz/secondary/form-3/bahasa-melayu", educationLevel: "Form 3" },
          { title: "English", href: "/quiz/secondary/form-3/english", educationLevel: "Form 3" },
          { title: "Mathematics", href: "/quiz/secondary/form-3/mathematics", educationLevel: "Form 3" },
          { title: "Science", href: "/quiz/secondary/form-3/science", educationLevel: "Form 3" },
          { title: "Sejarah", href: "/quiz/secondary/form-3/sejarah", educationLevel: "Form 3" },
        ],
      },
      {
        title: "Form 4",
        submenu: [
          {
            title: "Science Stream",
            submenu: [
              {
                title: "Bahasa Melayu",
                href: "/quiz/secondary/form-4/science/bahasa-melayu",
                educationLevel: "Form 4",
              },
              { title: "English", href: "/quiz/secondary/form-4/science/english", educationLevel: "Form 4" },
              { title: "Mathematics", href: "/quiz/secondary/form-4/science/mathematics", educationLevel: "Form 4" },
              {
                title: "Additional Mathematics",
                href: "/quiz/secondary/form-4/science/add-mathematics",
                educationLevel: "Form 4",
              },
              { title: "Physics", href: "/quiz/secondary/form-4/science/physics", educationLevel: "Form 4" },
              { title: "Chemistry", href: "/quiz/secondary/form-4/science/chemistry", educationLevel: "Form 4" },
              { title: "Biology", href: "/quiz/secondary/form-4/science/biology", educationLevel: "Form 4" },
            ],
          },
          {
            title: "Arts Stream",
            submenu: [
              { title: "Bahasa Melayu", href: "/quiz/secondary/form-4/arts/bahasa-melayu", educationLevel: "Form 4" },
              { title: "English", href: "/quiz/secondary/form-4/arts/english", educationLevel: "Form 4" },
              { title: "Mathematics", href: "/quiz/secondary/form-4/arts/mathematics", educationLevel: "Form 4" },
              { title: "Economics", href: "/quiz/secondary/form-4/arts/economics", educationLevel: "Form 4" },
              { title: "Accounting", href: "/quiz/secondary/form-4/arts/accounting", educationLevel: "Form 4" },
            ],
          },
        ],
      },
      {
        title: "Form 5",
        submenu: [
          {
            title: "Science Stream",
            submenu: [
              {
                title: "Bahasa Melayu",
                href: "/quiz/secondary/form-5/science/bahasa-melayu",
                educationLevel: "Form 5",
              },
              { title: "English", href: "/quiz/secondary/form-5/science/english", educationLevel: "Form 5" },
              { title: "Mathematics", href: "/quiz/secondary/form-5/science/mathematics", educationLevel: "Form 5" },
              {
                title: "Additional Mathematics",
                href: "/quiz/secondary/form-5/science/add-mathematics",
                educationLevel: "Form 5",
              },
              { title: "Physics", href: "/quiz/secondary/form-5/science/physics", educationLevel: "Form 5" },
              { title: "Chemistry", href: "/quiz/secondary/form-5/science/chemistry", educationLevel: "Form 5" },
              { title: "Biology", href: "/quiz/secondary/form-5/science/biology", educationLevel: "Form 5" },
            ],
          },
          {
            title: "Arts Stream",
            submenu: [
              { title: "Bahasa Melayu", href: "/quiz/secondary/form-5/arts/bahasa-melayu", educationLevel: "Form 5" },
              { title: "English", href: "/quiz/secondary/form-5/arts/english", educationLevel: "Form 5" },
              { title: "Mathematics", href: "/quiz/secondary/form-5/arts/mathematics", educationLevel: "Form 5" },
              { title: "Economics", href: "/quiz/secondary/form-5/arts/economics", educationLevel: "Form 5" },
              { title: "Accounting", href: "/quiz/secondary/form-5/arts/accounting", educationLevel: "Form 5" },
            ],
          },
        ],
      },
      {
        title: "Form 6",
        submenu: [
          {
            title: "Science Stream",
            submenu: [
              {
                title: "Pengajian Am",
                href: "/quiz/secondary/form-6/science/pengajian-am",
                educationLevel: "Form 6",
              },
              { title: "Mathematics", href: "/quiz/secondary/form-6/science/mathematics", educationLevel: "Form 6" },
              { title: "Physics", href: "/quiz/secondary/form-6/science/physics", educationLevel: "Form 6" },
              { title: "Chemistry", href: "/quiz/secondary/form-6/science/chemistry", educationLevel: "Form 6" },
              { title: "Biology", href: "/quiz/secondary/form-6/science/biology", educationLevel: "Form 6" },
            ],
          },
          {
            title: "Arts Stream",
            submenu: [
              { title: "Pengajian Am", href: "/quiz/secondary/form-6/arts/pengajian-am", educationLevel: "Form 6" },
              { title: "Economics", href: "/quiz/secondary/form-6/arts/economics", educationLevel: "Form 6" },
              { title: "Accounting", href: "/quiz/secondary/form-6/arts/accounting", educationLevel: "Form 6" },
              { title: "Business Studies", href: "/quiz/secondary/form-6/arts/business", educationLevel: "Form 6" },
              { title: "History", href: "/quiz/secondary/form-6/arts/history", educationLevel: "Form 6" },
            ],
          },
        ],
      },
    ],
  },
]

interface SidebarLayoutProps {
  children: React.ReactNode
}

export default function SidebarLayout({ children }: SidebarLayoutProps) {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathname = usePathname()

  // Initialize open state based on current path
  useEffect(() => {
    const newOpenItems: Record<string, boolean> = {}

    const checkAndOpenParents = (items: SidebarItem[], path: string, parentKey = "") => {
      for (const item of items) {
        const currentKey = parentKey ? `${parentKey}-${item.title}` : item.title

        if (item.href && path.includes(item.href)) {
          newOpenItems[currentKey] = true
          return true
        }

        if (item.submenu) {
          const isChildOpen = checkAndOpenParents(item.submenu, path, currentKey)
          if (isChildOpen) {
            newOpenItems[currentKey] = true
            return true
          }
        }
      }
      return false
    }

    checkAndOpenParents(sidebarItems, pathname)
    setOpenItems(newOpenItems)
  }, [pathname])

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const renderSidebarItems = (items: SidebarItem[], level = 0, parentKey = "") => {
    return items.map((item) => {
      const key = parentKey ? `${parentKey}-${item.title}` : item.title
      const isOpen = openItems[key] || false
      const isActive = item.href && pathname === item.href

      return (
        <div key={key} className={cn("text-sm", level > 0 && "ml-4")}>
          {item.href ? (
            <Link
              href={item.href}
              className={cn(
                "flex items-center py-2 px-3 rounded-md hover:bg-gray-100 transition-colors",
                isActive && "bg-blue-50 text-blue-600 font-medium",
              )}
            >
              {item.icon && <span className="mr-2">{item.icon}</span>}
              <span>{item.title}</span>
              {item.educationLevel && <span className="ml-auto text-xs text-gray-500">{item.educationLevel}</span>}
            </Link>
          ) : (
            <div
              className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-gray-100 cursor-pointer transition-colors"
              onClick={() => toggleItem(key)}
            >
              <div className="flex items-center">
                {item.icon && <span className="mr-2">{item.icon}</span>}
                <span>{item.title}</span>
              </div>
              {item.submenu && (
                <span className="text-gray-500">
                  {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </span>
              )}
            </div>
          )}

          {item.submenu && isOpen && <div className="mt-1">{renderSidebarItems(item.submenu, level + 1, key)}</div>}
        </div>
      )
    })
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile sidebar toggle */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-white shadow-md"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar overlay for mobile */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/20 z-40 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 w-64 h-full bg-white border-r border-gray-200 overflow-y-auto transition-transform duration-300 md:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="p-4 border-b border-gray-200">
          <Link href="/" className="flex items-center space-x-2" onClick={() => setIsSidebarOpen(false)}>
            <Brain className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-blue-600">Cikgu AI</span>
          </Link>
        </div>
        <div className="p-4">
          <Link
            href="/"
            className="flex items-center py-2 px-3 rounded-md hover:bg-gray-100 mb-4"
            onClick={() => setIsSidebarOpen(false)}
          >
            <Home className="h-4 w-4 mr-2" />
            <span>Home</span>
          </Link>
          <div className="space-y-1">{renderSidebarItems(sidebarItems)}</div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 md:ml-64">
        <div className="container mx-auto p-4 pt-16 md:pt-4">{children}</div>
      </div>
    </div>
  )
}
