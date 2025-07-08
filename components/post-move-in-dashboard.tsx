import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function PostMoveInDashboard() {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Panou de Control Casă</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="chat">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="chat">Chat-ul Casei</TabsTrigger>
            <TabsTrigger value="tasks">Sarcini</TabsTrigger>
            <TabsTrigger value="bills">Facturi</TabsTrigger>
          </TabsList>
          <TabsContent value="chat" className="mt-4 p-4 border rounded-lg min-h-[200px]">
            Conținutul chat-ului casei...
          </TabsContent>
          <TabsContent value="tasks" className="mt-4 p-4 border rounded-lg min-h-[200px]">
            Calendar de curățenie comun...
          </TabsContent>
          <TabsContent value="bills" className="mt-4 p-4 border rounded-lg min-h-[200px]">
            Modul de urmărire a facturilor...
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
