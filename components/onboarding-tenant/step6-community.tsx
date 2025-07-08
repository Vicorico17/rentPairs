"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CardSelect } from "@/components/ui/card-select"
import { Users, User, Heart } from "lucide-react"

const communityOptions = [
  { value: "connect", label: "Vreau să mă conectez și să socializez", icon: Heart },
  { value: "privacy", label: "Prefer intimitatea și independența", icon: User },
  { value: "between", label: "Undeva la mijloc", icon: Users },
]

export function Step6Community({ formData, updateFormData }: { formData: any; updateFormData: (data: any) => void }) {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Care este atmosfera ideală a comunității pentru tine?</h2>
      <div>
        <Label>Cauți o experiență de comunitate?</Label>
        <CardSelect
          value={formData.communityVibe}
          onValueChange={(val) => updateFormData({ communityVibe: val })}
          options={communityOptions}
        />
      </div>
      <div>
        <Label>Dorești să te potrivești doar cu colegi de apartament sau și cu anunțuri individuale?</Label>
        <RadioGroup
          value={formData.matchWith}
          onValueChange={(val) => updateFormData({ matchWith: val })}
          className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {["Colegi de apartament", "Anunțuri individuale"].map((type) => (
            <div key={type}>
              <RadioGroupItem value={type} id={type} className="sr-only" />
              <Label
                htmlFor={type}
                className="flex items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
              >
                {type}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  )
}
