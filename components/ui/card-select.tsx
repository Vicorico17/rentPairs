"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface CardSelectProps {
  value: string
  options: { value: string; label: string; icon?: React.ElementType }[]
  onValueChange: (value: string) => void
}

export function CardSelect({ value, options, onValueChange }: CardSelectProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {options.map((option) => (
        <Card
          key={option.value}
          onClick={() => onValueChange(option.value)}
          className={cn(
            "cursor-pointer transition-all",
            value === option.value ? "border-blue-600 border-2 shadow-lg" : "hover:shadow-md",
          )}
        >
          <CardContent className="p-6 flex flex-col items-center justify-center text-center">
            {option.icon && <option.icon className="w-10 h-10 mb-4 text-gray-500" />}
            <span className="font-semibold">{option.label}</span>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
