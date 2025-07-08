"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function Step1Address({ formData, updateFormData }: { formData: any; updateFormData: (data: any) => void }) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="address">Street Address</Label>
        <Input
          id="address"
          placeholder="123 Main St"
          value={formData.address}
          onChange={(e) => updateFormData({ address: e.target.value })}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            placeholder="San Francisco"
            value={formData.city}
            onChange={(e) => updateFormData({ city: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            placeholder="CA"
            value={formData.state}
            onChange={(e) => updateFormData({ state: e.target.value })}
          />
        </div>
      </div>
    </div>
  )
}
