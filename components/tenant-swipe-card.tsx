"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { TenantProfile } from "@/lib/types"
import { Share2, Briefcase, Wallet, PawPrint, Cigarette } from "lucide-react"

export function TenantSwipeCard({
  tenant,
  onSwipe,
}: {
  tenant: TenantProfile
  onSwipe: (direction: "left" | "right") => void
}) {
  const { name, age, photo, budget, occupation, lifestyle, intro } = tenant

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
          <img src={photo || "/placeholder.svg"} alt={name} className="object-cover w-full h-80" draggable="false" />
          <div className="absolute top-2 right-2">
            <Button variant="secondary" size="icon" className="rounded-full bg-white/80 backdrop-blur-sm">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
          <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
            <h2 className="text-2xl font-bold">
              {name}, {age}
            </h2>
            <p className="text-lg font-semibold flex items-center gap-2">
              <Briefcase className="w-5 h-5" /> {occupation}
            </p>
          </div>
        </div>
        <CardContent className="p-4 flex-grow flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
              <Wallet className="w-4 h-4" />
              <span>
                Buget: ${budget.min} - ${budget.max}
              </span>
            </div>
            <p className="text-sm mb-4 italic">"{intro}"</p>
            <div className="flex flex-wrap gap-2">
              {lifestyle.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
              <Badge variant={tenant.pets ? "default" : "destructive"} className="flex items-center gap-1">
                <PawPrint className="w-3 h-3" /> {tenant.pets ? "Acceptă animale" : "Fără animale"}
              </Badge>
              <Badge variant={!tenant.smoker ? "default" : "destructive"} className="flex items-center gap-1">
                <Cigarette className="w-3 h-3" /> {tenant.smoker ? "Fumător" : "Nefumător"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
