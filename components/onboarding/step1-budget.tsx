"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

export function Step1Budget({ formData, updateFormData }: { formData: any; updateFormData: (data: any) => void }) {
  return (
    <div className="space-y-8">
      <div>
        <Label htmlFor="location" className="text-lg font-medium">
          Preferred City/Area
        </Label>
        <p className="text-sm text-gray-500 mb-2">Where are you looking to live?</p>
        <Input
          id="location"
          placeholder="e.g., Downtown, North Park"
          value={formData.location}
          onChange={(e) => updateFormData({ location: e.target.value })}
          className="mt-1"
        />
      </div>
      <div>
        <Label className="text-lg font-medium">Monthly Budget</Label>
        <p className="text-sm text-gray-500 mb-4">What's your price range for rent?</p>
        <div className="flex justify-between items-center text-lg font-semibold text-blue-600 dark:text-blue-400">
          <span>${formData.budget.min}</span>
          <span>${formData.budget.max}</span>
        </div>
        <Slider
          value={[formData.budget.min, formData.budget.max]}
          onValueChange={([min, max]) => updateFormData({ budget: { min, max } })}
          min={500}
          max={5000}
          step={100}
          className="mt-2"
        />
      </div>
    </div>
  )
}
