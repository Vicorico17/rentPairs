"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { DatePicker } from "@/components/ui/date-picker"

interface FormData {
  monthly_rent: number
  security_deposit: number
  available_from: string
  available_to: string
}

export function Step2Pricing({ formData, updateFormData }: { formData: FormData; updateFormData: (data: Partial<FormData>) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <Label htmlFor="monthly_rent">Chirie Lunară</Label>
        <div className="relative mt-1">
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">RON</span>
          <Input
            id="monthly_rent"
            type="number"
            placeholder="2500"
            className="pr-12"
            value={formData.monthly_rent || ''}
            onChange={(e) => {
              const val = Number.parseInt(e.target.value, 10)
              updateFormData({ monthly_rent: isNaN(val) ? 0 : val })
            }}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="security_deposit">Garanție</Label>
        <div className="relative mt-1">
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">RON</span>
          <Input
            id="security_deposit"
            type="number"
            placeholder="2500"
            className="pr-12"
            value={formData.security_deposit || ''}
            onChange={(e) => {
              const val = Number.parseInt(e.target.value, 10)
              updateFormData({ security_deposit: isNaN(val) ? 0 : val })
            }}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="available_from">Disponibil de la</Label>
        <DatePicker
          date={formData.available_from ? new Date(formData.available_from) : undefined}
          onDateChange={(date) => {
            updateFormData({ 
              available_from: date ? date.toISOString().split('T')[0] : '' 
            })
          }}
          placeholder="Selectează data disponibilității"
        />
      </div>
      <div>
        <Label htmlFor="available_to">Disponibil până la (Opțional)</Label>
        <DatePicker
          date={formData.available_to ? new Date(formData.available_to) : undefined}
          onDateChange={(date) => {
            updateFormData({ 
              available_to: date ? date.toISOString().split('T')[0] : '' 
            })
          }}
          placeholder="Selectează data limită (opțional)"
        />
      </div>
    </div>
  )
}
