"use client"

import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MOCK_CONVERSATIONS, MOCK_MATCH_QUEUE } from "@/lib/data"
import type { Conversation } from "@/lib/types"
import { Search, ListFilter } from "lucide-react"

export function ChatListPage() {
  const router = useRouter()

  const handleConversationClick = (conversation: Conversation) => {
    router.push(`/?view=chat&chatId=${conversation.id}`)
  }

  return (
    <div className="w-full max-w-2xl mx-auto h-full flex flex-col">
      <header className="p-4 border-b sticky top-0 bg-white dark:bg-gray-950 z-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Conversații</h1>
          <Search className="w-6 h-6 text-gray-500" />
        </div>
      </header>

      <div className="p-4">
        <h2 className="text-sm font-semibold text-gray-500 uppercase">Potriviri noi</h2>
        <div className="flex space-x-4 mt-2 overflow-x-auto pb-2 -mx-4 px-4">
          {MOCK_MATCH_QUEUE.map((match) => (
            <div key={match.id} className="flex-shrink-0 text-center">
              <div className="relative">
                <Avatar className="w-16 h-16 border-2 border-blue-500">
                  <AvatarImage src={match.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{match.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {match.newMessages > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-blue-600 text-white rounded-full h-6 w-6 flex items-center justify-center">
                    {match.newMessages}
                  </Badge>
                )}
              </div>
              <p className="text-sm mt-1">{match.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-grow overflow-y-auto px-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-semibold text-gray-500 uppercase">Recente</h2>
          <ListFilter className="w-5 h-5 text-gray-500" />
        </div>
        <div className="space-y-2">
          {MOCK_CONVERSATIONS.map((convo) => (
            <div
              key={convo.id}
              onClick={() => handleConversationClick(convo)}
              className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
            >
              <Avatar className="w-14 h-14">
                <AvatarImage src={convo.participant.avatar || "/placeholder.svg"} />
                <AvatarFallback>{convo.participant.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">{convo.participant.name}</h3>
                  {convo.status === "expiring" && (
                    <Badge variant="destructive" className="text-black bg-blue-200">
                      YOUR MOVE
                    </Badge>
                  )}
                </div>
                
                {convo.expiresIn && <p className="text-xs text-red-500">Conversația expiră în {convo.expiresIn}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
