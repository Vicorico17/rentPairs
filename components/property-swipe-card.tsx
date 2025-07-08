"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { Property } from "@/lib/types"
import { Share2, MapPin, BedDouble, Bath, Ruler } from "lucide-react"

export function PropertySwipeCard({
  property,
  onSwipe,
}: {
  property: Property
  onSwipe: (direction: "left" | "right") => void
}) {
  const { title, rent, location, photos, details, matchScore } = property

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={1}
      onDragEnd={(e, { offset, velocity }) => {
        const swipe = Math.abs(offset.x) * velocity.x
        if (swipe < -10000) onSwipe("left")
        else if (swipe > 10000) onSwipe("right")
      }}
      className="absolute w-full h-full"
    >
      <Card className="w-full h-full overflow-hidden rounded-2xl shadow-xl flex flex-col cursor-grab active:cursor-grabbing">
        <div className="relative">
          <img
            src={photos[0] || "/placeholder.svg"}
            alt={title}
            className="object-cover w-full h-80"
            draggable="false"
          />
          <div className="absolute top-2 right-2">
            <Button variant="secondary" size="icon" className="rounded-full bg-white/80 backdrop-blur-sm">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
          <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="text-lg font-semibold">{rent} RON/lună</p>
          </div>
        </div>
        <CardContent className="p-4 flex-grow flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary" className="flex items-center gap-1">
                <BedDouble className="w-3 h-3" /> {details.beds}
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Bath className="w-3 h-3" /> {details.baths}
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Ruler className="w-3 h-3" /> {details.sqft} sqft
              </Badge>
            </div>
          </div>
          {matchScore && (
            <div className="mt-auto">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-sm font-semibold">Compatibilitate</h3>
                <span className="text-sm font-bold text-green-600">{matchScore.score}%</span>
              </div>
              <Progress value={matchScore.score} className="h-2 [&>*]:bg-green-500" />
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
