"use client"

import * as React from "react"
import { PropertySwipeCard } from "@/components/property-swipe-card"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MOCK_PROPERTIES, MOCK_TENANT_PROFILE } from "@/lib/data"
import type { Property } from "@/lib/types"
import { calculateMatchScore } from "@/lib/matching"
import { Undo, X, Heart, Zap } from "lucide-react"

export function RentalMatchUI() {
  const [properties, setProperties] = React.useState<Property[]>([])
  const [currentIndex, setCurrentIndex] = React.useState(0)

  React.useEffect(() => {
    const scoredProperties = MOCK_PROPERTIES.map((property) => ({
      ...property,
      matchScore: calculateMatchScore(MOCK_TENANT_PROFILE, property),
    })).sort((a, b) => (b.matchScore?.score ?? 0) - (a.matchScore?.score ?? 0))
    setProperties(scoredProperties)
  }, [])

  const handleSwipe = (direction: "left" | "right") => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % properties.length)
  }

  const handleUndo = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0))
  }

  if (properties.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading properties...</p>
      </div>
    )
  }

  const currentProperty = properties[currentIndex]
  const nextProperty = properties[(currentIndex + 1) % properties.length]

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 md:p-6 lg:p-8">
      <div className="w-full max-w-sm mx-auto">
        <div className="relative h-[600px] w-full">
          {nextProperty && (
            <div className="absolute top-0 left-0 w-full h-full transform scale-95 -z-10 opacity-75">
              <Card className="w-full h-full bg-gray-200 dark:bg-gray-800" />
            </div>
          )}
          {currentProperty ? (
            <PropertySwipeCard 
              key={currentProperty.id} 
              property={currentProperty} 
              onSwipe={handleSwipe}
            />
          ) : (
            <Card className="flex items-center justify-center w-full h-full">
              <p className="text-lg text-gray-500">No more properties</p>
            </Card>
          )}
        </div>
        <div className="flex items-center justify-center gap-4 mt-6">
          <Button
            variant="outline"
            size="icon"
            className="w-16 h-16 rounded-full border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-100 dark:hover:bg-yellow-900/50 bg-transparent"
            onClick={handleUndo}
          >
            <Undo className="w-8 h-8" />
            <span className="sr-only">Undo</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="w-20 h-20 rounded-full border-2 border-red-500 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 bg-transparent"
            onClick={() => handleSwipe("left")}
          >
            <X className="w-10 h-10" />
            <span className="sr-only">Skip</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="w-20 h-20 rounded-full border-2 border-green-500 text-green-500 hover:bg-green-100 dark:hover:bg-green-900/50 bg-transparent"
            onClick={() => handleSwipe("right")}
          >
            <Heart className="w-10 h-10" />
            <span className="sr-only">Like</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="w-16 h-16 rounded-full border-2 border-purple-500 text-purple-500 hover:bg-purple-100 dark:hover:bg-purple-900/50 bg-transparent"
            onClick={() => handleSwipe("right")}
          >
            <Zap className="w-8 h-8" />
            <span className="sr-only">Super Like</span>
          </Button>
        </div>
      </div>
    </main>
  )
}
