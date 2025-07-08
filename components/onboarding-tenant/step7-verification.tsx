"use client"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Linkedin, Shield, FileText, UserCircle } from "lucide-react"

export function Step7Verification({
  formData,
  updateFormData,
}: { formData: any; updateFormData: (data: any) => void }) {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Ultimul pas: Construiește-ți profilul de încredere.</h2>
      <p className="text-gray-600">
        Adăugarea acestor elemente poate crește rata de potrivire cu până la 50%. Toate sunt opționale.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Linkedin className="w-6 h-6 text-blue-700" /> <span className="font-semibold">LinkedIn</span>
            </div>
            <Button variant="outline">Conectează</Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-green-600" /> <span className="font-semibold">Verificare ID</span>
            </div>
            <Button variant="outline">Încarcă</Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-gray-600" />{" "}
              <span className="font-semibold">Scrisoare de referință</span>
            </div>
            <Button variant="outline">Încarcă</Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <UserCircle className="w-6 h-6 text-purple-600" /> <span className="font-semibold">Profil Social</span>
            </div>
            <Button variant="outline">Link</Button>
          </CardContent>
        </Card>
      </div>
      <div>
        <Label htmlFor="bio">Scrie o scurtă biografie sau introducere despre tine</Label>
        <Textarea
          id="bio"
          placeholder="Spune-le potențialilor proprietari și colegi câte ceva despre tine..."
          value={formData.bio}
          onChange={(e) => updateFormData({ bio: e.target.value })}
          rows={4}
        />
      </div>
    </div>
  )
}
