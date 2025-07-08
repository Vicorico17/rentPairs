"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"

const lifestyleOptions = ["Quiet", "Sociable", "Family-Friendly", "Remote Work", "Student Life"]

export function Step3Lifestyle({ formData, updateFormData }: { formData: any; updateFormData: (data: any) => void }) {
  const handleLifestyleChange = (option: string) => {
    const newLifestyle = formData.lifestyle.includes(option)
      ? formData.lifestyle.filter((item: string) => item !== option)
      : [...formData.lifestyle, option]
    updateFormData({ lifestyle: newLifestyle })
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-8">
        <div>
          <Label className="font-medium">Pets?</Label>
          <RadioGroup
            value={formData.pets}
            onValueChange={(value) => updateFormData({ pets: value })}
            className="mt-2 space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="pets-yes" />
              <Label htmlFor="pets-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="pets-no" />
              <Label htmlFor="pets-no">No</Label>
            </div>
          </RadioGroup>
        </div>
        <div>
          <Label className="font-medium">Smoking?</Label>
          <RadioGroup
            value={formData.smoking}
            onValueChange={(value) => updateFormData({ smoking: value })}
            className="mt-2 space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="smoking-yes" />
              <Label htmlFor="smoking-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="smoking-no" />
              <Label htmlFor="smoking-no">No</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
      <div>
        <Label className="text-lg font-medium">Lifestyle Preferences</Label>
        <p className="text-sm text-gray-500 mb-4">Select what best describes you.</p>
        <div className="flex flex-wrap gap-2">
          {lifestyleOptions.map((option) => (
            <Badge
              key={option}
              variant={formData.lifestyle.includes(option) ? "default" : "secondary"}
              onClick={() => handleLifestyleChange(option)}
              className="cursor-pointer text-base px-4 py-2"
            >
              {option}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
