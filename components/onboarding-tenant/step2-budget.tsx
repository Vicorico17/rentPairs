"use client"

import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"

export function Step2Budget({ formData, updateFormData }: { formData: any; updateFormData: (data: any) => void }) {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Să vorbim despre buget.</h2>
      <div>
        <Label>Care este bugetul tău lunar pentru chirie (inclusiv utilități)?</Label>
        <div className="text-center my-4 text-3xl font-bold text-blue-600">RON{formData.rentBudget}</div>
        <Slider
          value={[formData.rentBudget]}
          onValueChange={([val]) => updateFormData({ rentBudget: val })}
          min={500}
          max={6000}
          step={50}
        />
      </div>
      <div className="flex items-center justify-between p-4 border rounded-lg">
        <Label htmlFor="share-room" className="font-semibold">
          Ești deschis/ă să împarți o cameră pentru a economisi?
        </Label>
        <Switch
          id="share-room"
          checked={formData.shareRoom}
          onCheckedChange={(checked) => updateFormData({ shareRoom: checked })}
        />
      </div>
      <div className="flex items-center justify-between p-4 border rounded-lg">
        <Label htmlFor="furnished" className="font-semibold">
          Te interesează doar locuințele complet mobilate?
        </Label>
        <Switch
          id="furnished"
          checked={formData.furnishedOnly}
          onCheckedChange={(checked) => updateFormData({ furnishedOnly: checked })}
        />
      </div>
    </div>
  )
}
