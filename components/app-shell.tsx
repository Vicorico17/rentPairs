"use client"

import type React from "react"

import { Home, MessageSquare, User, CheckSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type AppState = "matching" | "chat" | "lease_planning" | "profile"

export function AppShell({
  children,
  onNavigate,
  activeState,
}: {
  children: React.ReactNode
  onNavigate: (state: AppState) => void
  activeState: string
}) {
  const navItems = [
    { state: "matching", icon: Home, label: "Potriviri" },
    { state: "chat", icon: MessageSquare, label: "Conversații" },
    { state: "lease_planning", icon: CheckSquare, label: "Contract" },
    { state: "profile", icon: User, label: "Profil" },
  ]

  return (
    <div className="relative min-h-screen w-full pb-20">
      <div className="p-4 md:p-6">{children}</div>
      <footer className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-900 dark:border-gray-800">
        <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
          {navItems.map((item) => (
            <Button
              key={item.state}
              variant="ghost"
              className={cn(
                "inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group rounded-none",
                activeState === item.state ? "text-blue-600 dark:text-blue-500" : "text-gray-500 dark:text-gray-400",
              )}
              onClick={() => onNavigate(item.state as AppState)}
            >
              <item.icon className="w-6 h-6 mb-1" />
              <span className="text-xs">{item.label}</span>
            </Button>
          ))}
        </div>
      </footer>
    </div>
  )
}
