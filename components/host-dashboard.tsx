import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export function HostDashboard() {
  return (
    <div className="w-full max-w-4xl mx-auto relative">
      <Card>
        <CardHeader>
          <CardTitle>Host Dashboard</CardTitle>
          <CardDescription>Manage your listings and view matches.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 border-2 border-dashed rounded-lg">
            <h3 className="text-lg font-medium">Your listings will appear here.</h3>
            <p className="text-sm text-muted-foreground mt-2">You can edit, view matches, and manage availability.</p>
          </div>
        </CardContent>
      </Card>
      <Button className="fixed bottom-24 right-6 h-16 w-16 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700">
        <Plus className="w-8 h-8" />
        <span className="sr-only">Add New Listing</span>
      </Button>
    </div>
  )
}
