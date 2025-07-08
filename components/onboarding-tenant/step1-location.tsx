"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"

export function Step1Location({ formData, updateFormData }: { formData: any; updateFormData: (data: any) => void }) {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Unde vrei să locuiești?</h2>
      <div>
        <Label htmlFor="neighborhoods">Ce cartiere te interesează?</Label>
        <Input
          id="neighborhoods"
          placeholder="ex: Victoriei, Floreasca, Militari"
          value={formData.neighborhoods}
          onChange={(e) => updateFormData({ neighborhoods: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="workLocation">Unde lucrezi sau studiezi?</Label>
        <Input
          id="workLocation"
          placeholder="Introdu o adresă sau un punct de reper"
          value={formData.workLocation}
          onChange={(e) => updateFormData({ workLocation: e.target.value })}
        />
      </div>
      <div>
        <Label>Care este timpul maxim preferat pentru navetă?</Label>
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-blue-600">{formData.maxCommute} minute</span>
        </div>
        <Slider
          value={[formData.maxCommute]}
          onValueChange={([val]) => updateFormData({ maxCommute: val })}
          min={5}
          max={90}
          step={5}
        />
      </div>
      <div className="p-4 border rounded-lg text-center bg-gray-50 dark:bg-gray-800">
        <p className="mb-2">Opțional: Marchează puncte de interes pe hartă.</p>
        <Button variant="outline">
          <MapPin className="w-4 h-4 mr-2" /> Deschide Harta
        </Button>
        <p className="text-xs text-gray-500 mt-2">Funcționalitatea hărții ar fi implementată aici.</p>
      </div>
    </div>
  )
}
