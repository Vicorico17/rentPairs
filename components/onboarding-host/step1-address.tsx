"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface FormData {
  street_address: string
  city: string
  state: string
}

export function Step1Address({ formData, updateFormData }: { formData: FormData; updateFormData: (data: Partial<FormData>) => void }) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="street_address">Adresa Străzii</Label>
        <Input
          id="street_address"
          placeholder="Strada Victoriei nr. 123, Sector 1"
          value={formData.street_address}
          onChange={(e) => updateFormData({ street_address: e.target.value })}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="city">Oraș</Label>
          <Input
            id="city"
            placeholder="București"
            value={formData.city}
            onChange={(e) => updateFormData({ city: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="state">Țară</Label>
          <Input
            id="state"
            placeholder="România"
            value={formData.state}
            onChange={(e) => updateFormData({ state: e.target.value })}
          />
        </div>
      </div>
    </div>
  )
}
