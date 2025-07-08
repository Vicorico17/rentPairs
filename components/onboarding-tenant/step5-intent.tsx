"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CardSelect } from "@/components/ui/card-select"
import { Plane, Briefcase, Building, Star } from "lucide-react"

const situationOptions = [
  { value: "new_city", label: "Sunt nou/ă în oraș", icon: Plane },
  { value: "co_living", label: "Vreau să încerc co-living", icon: Building },
  { value: "relocating", label: "Mă mut pentru muncă/studii", icon: Briefcase },
  { value: "long_term", label: "Caut stabilitate pe termen lung", icon: Star },
]

export function Step5Intent({ formData, updateFormData }: { formData: any; updateFormData: (data: any) => void }) {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Ce te aduce aici?</h2>
      <div>
        <Label>Ce descrie cel mai bine situația ta?</Label>
        <CardSelect
          value={formData.housingSituation}
          onValueChange={(val) => updateFormData({ housingSituation: val })}
          options={situationOptions}
        />
      </div>
      <div>
        <Label>Cât timp plănuiești să stai?</Label>
        <RadioGroup
          value={formData.stayDuration}
          onValueChange={(val) => updateFormData({ stayDuration: val })}
          className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {["Termen scurt (1-3 luni)", "Termen mediu (4-8 luni)", "Termen lung (9+ luni)"].map((term) => (
            <div key={term}>
              <RadioGroupItem value={term} id={term} className="sr-only" />
              <Label
                htmlFor={term}
                className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
              >
                {term}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  )
}
