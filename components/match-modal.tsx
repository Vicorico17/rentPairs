"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart } from "lucide-react"

export function MatchModal({
  onSendMessage,
  onKeepSwiping,
}: {
  onSendMessage: () => void
  onKeepSwiping: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 text-center w-full max-w-sm">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400">
          Potrivire!
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">Tu și Alex v-ați plăcut reciproc.</p>
        <div className="flex items-center justify-center my-8 space-x-[-2rem]">
          <Avatar className="w-24 h-24 border-4 border-white dark:border-gray-900">
            <AvatarImage src="/placeholder.svg?width=96&height=96" />
            <AvatarFallback>ME</AvatarFallback>
          </Avatar>
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-orange-400 flex items-center justify-center z-10">
            <Heart className="w-8 h-8 text-white" fill="white" />
          </div>
          <Avatar className="w-24 h-24 border-4 border-white dark:border-gray-900">
            <AvatarImage src="/placeholder.svg?width=96&height=96" />
            <AvatarFallback>AL</AvatarFallback>
          </Avatar>
        </div>
        <div className="space-y-4">
          <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={onSendMessage}>
            Trimite un mesaj
          </Button>
          <Button variant="ghost" className="w-full" onClick={onKeepSwiping}>
            Continuă să derulezi
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
