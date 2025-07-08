"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function Step3Details({ formData, updateFormData }: { formData: any; updateFormData: (data: any) => void }) {
  return (
    <div className="space-y-8">
      <div>
        <Label>Property Type</Label>
        <Select value={formData.propertyType} onValueChange={(value) => updateFormData({ propertyType: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select property type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apartment">Apartment</SelectItem>
            <SelectItem value="house">House</SelectItem>
            <SelectItem value="studio">Studio</SelectItem>
            <SelectItem value="shared-room">Shared Room</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <Label>Furnishing</Label>
          <RadioGroup
            value={formData.furnishing}
            onValueChange={(value) => updateFormData({ furnishing: value })}
            className="mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="furnished" id="furnished" />
              <Label htmlFor="furnished">Furnished</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="unfurnished" id="unfurnished" />
              <Label htmlFor="unfurnished">Unfurnished</Label>
            </div>
          </RadioGroup>
        </div>
        <div>
          <Label>Pets Allowed?</Label>
          <RadioGroup value={formData.pets} onValueChange={(value) => updateFormData({ pets: value })} className="mt-2">
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
      </div>
    </div>
  )
}
