"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function LeasePlanner({ onNavigate }: { onNavigate: (state: any) => void }) {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Planificare și Confirmare Contract</CardTitle>
        <CardDescription>Finalizează detaliile cu noul tău coleg de apartament.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Chirie & Garanție</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Chirie: $1200/lună</p>
            <p>Garanție: $1200 (Plătită)</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Contract de Închiriere</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <p>Contract Standard de Co-Living.pdf</p>
            <Button variant="outline">Previzualizează & Semnează Electronic</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Calendarul Mutării</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Checkbox id="keys" />
              <Label htmlFor="keys">Predarea cheilor</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="movein" />
              <Label htmlFor="movein">Ziua mutării: 1 Oct, 2025</Label>
            </div>
          </CardContent>
        </Card>
        <Button className="w-full" onClick={() => onNavigate("post_move_in")}>
          Confirmă Mutarea
        </Button>
      </CardContent>
    </Card>
  )
}
