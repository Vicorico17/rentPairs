"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function Step2Pricing({ formData, updateFormData }: { formData: any; updateFormData: (data: any) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <Label htmlFor="rent">Monthly Rent</Label>
        <div className="relative mt-1">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
          <Input
            id="rent"
            type="number"
            placeholder="2500"
            className="pl-7"
            value={formData.rent}
            onChange={(e) => {
              const val = Number.parseInt(e.target.value, 10)
              updateFormData({ rent: isNaN(val) ? "" : val })
            }}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="deposit">Security Deposit</Label>
        <div className="relative mt-1">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
          <Input
            id="deposit"
            type="number"
            placeholder="2500"
            className="pl-7"
            value={formData.deposit}
            onChange={(e) => {
              const val = Number.parseInt(e.target.value, 10)
              updateFormData({ deposit: isNaN(val) ? "" : val })
            }}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="available-from">Available From</Label>
        <Input
          id="available-from"
          type="date"
          value={formData.availableFrom}
          onChange={(e) => updateFormData({ availableFrom: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="available-to">Available To (Optional)</Label>
        <Input
          id="available-to"
          type="date"
          value={formData.availableTo}
          onChange={(e) => updateFormData({ availableTo: e.target.value })}
        />
      </div>
    </div>
  )
}
