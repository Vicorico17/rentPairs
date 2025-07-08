"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function Step2Details({ formData, updateFormData }: { formData: any; updateFormData: (data: any) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <Label htmlFor="moveInDate" className="font-medium">
          Move-in Date
        </Label>
        <Input
          id="moveInDate"
          type="date"
          value={formData.moveInDate}
          onChange={(e) => updateFormData({ moveInDate: e.target.value })}
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="leaseLength" className="font-medium">
          Lease Length (months)
        </Label>
        <Input
          id="leaseLength"
          type="number"
          value={formData.leaseLength}
          onChange={(e) => {
            const val = Number.parseInt(e.target.value, 10)
            updateFormData({ leaseLength: isNaN(val) ? "" : val })
          }}
          className="mt-1"
        />
      </div>
      <div className="md:col-span-2">
        <Label htmlFor="occupation" className="font-medium">
          Occupation
        </Label>
        <Input
          id="occupation"
          placeholder="e.g., Software Engineer"
          value={formData.occupation}
          onChange={(e) => updateFormData({ occupation: e.target.value })}
          className="mt-1"
        />
      </div>
      <div className="md:col-span-2">
        <Label htmlFor="income" className="font-medium">
          Annual Income
        </Label>
        <div className="relative mt-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <Input
            id="income"
            type="number"
            placeholder="60000"
            value={formData.income}
            onChange={(e) => {
              const val = Number.parseInt(e.target.value, 10)
              updateFormData({ income: isNaN(val) ? "" : val })
            }}
            className="pl-7"
          />
        </div>
      </div>
    </div>
  )
}
