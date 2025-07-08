"use client"

import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Paperclip,
  Send,
  Smile,
  CalendarPlus,
  ShieldCheck,
  ArrowLeft,
  MoreVertical,
  MessageSquareX,
} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import type { Conversation } from "@/lib/types"

function EndedChatView({ conversation }: { conversation: Conversation }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <Avatar className="w-24 h-24 mb-4">
        <AvatarImage src={conversation.participant.avatar || "/placeholder.svg"} />
        <AvatarFallback>{conversation.participant.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <h2 className="text-xl font-bold">{conversation.participant.name}</h2>
      <p className="text-sm text-gray-500 mb-8">{conversation.lastMessage}</p>
      <MessageSquareX className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
      <h3 className="text-lg font-semibold">Se pare că a încheiat conversația.</h3>
      <p className="text-gray-500 max-w-xs">Nu vei mai putea vedea profilul sau mesajele din această conversație.</p>
      <Card className="mt-12 p-4 w-full max-w-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold">Ai nevoie de ajutor?</p>
            <p className="text-sm text-gray-500">Suntem aici dacă ai nevoie.</p>
          </div>
          <Button variant="secondary">Ajutor</Button>
        </div>
      </Card>
    </div>
  )
}

export function ChatInterface({
  conversation,
  onNavigate,
}: {
  conversation: Conversation
  onNavigate: (state: any) => void
}) {
  const router = useRouter()
  const quickReplies = ["Salut! Mai este valabil?", "Când aș putea veni la vizionare?", "Ce utilități sunt incluse?"]

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col h-[calc(100vh-5rem)] bg-white dark:bg-gray-950">
      <CardHeader className="sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-10 flex flex-row items-center justify-between border-b">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push("/?view=chat")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Avatar>
            <AvatarImage src={conversation.participant.avatar || "/placeholder.svg"} />
            <AvatarFallback>{conversation.participant.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg">{conversation.participant.name}</CardTitle>
              <ShieldCheck className="w-5 h-5 text-green-500" />
            </div>
            <CardDescription className="text-xs">
              {conversation.status === "ended" ? "Conversație încheiată" : "Activ recent"}
            </CardDescription>
          </div>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="rounded-t-2xl">
            <SheetHeader>
              <SheetTitle>Opțiuni</SheetTitle>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <Button variant="outline" className="w-full justify-start text-red-500 bg-transparent">
                Șterge din conversații
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                Raportează
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </CardHeader>

      {conversation.status === "ended" ? (
        <EndedChatView conversation={conversation} />
      ) : (
        <>
          <CardContent className="flex-grow overflow-y-auto p-4 space-y-4">
            {/* Chat messages */}
            <div className="flex justify-end">
              <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg max-w-xs">
                Hey! Your place looks great.
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-gray-200 dark:bg-gray-700 p-3 rounded-r-lg rounded-bl-lg max-w-xs">
                Thanks! Happy to answer any questions.
              </div>
            </div>
          </CardContent>
          <div className="p-4 border-t bg-white dark:bg-gray-900">
            <div className="flex gap-2 mb-2 overflow-x-auto pb-2">
              {quickReplies.map((reply) => (
                <Button key={reply} variant="outline" size="sm" className="whitespace-nowrap bg-transparent">
                  {reply}
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Smile className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Paperclip className="w-5 h-5" />
              </Button>
              <Input placeholder="Scrie un mesaj..." className="flex-grow" />
              <Button size="icon">
                <Send className="w-5 h-5" />
              </Button>
            </div>
            <Button className="w-full mt-4" onClick={() => onNavigate("lease_planning")}>
              <CalendarPlus className="w-4 h-4 mr-2" />
              Confirmă potrivirea & Planifică închirierea
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
