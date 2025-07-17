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
  // Get today's date for validation
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Parse available_from date for validation
  const availableFromDate = formData.available_from ? new Date(formData.available_from) : null

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
            if (date) {
              // Ensure the selected date is not in the past
              const selectedDate = new Date(date)
              selectedDate.setHours(0, 0, 0, 0)
              
              if (selectedDate >= today) {
                updateFormData({ 
                  available_from: date.toISOString().split('T')[0] 
                })
                
                // If available_to is before the new available_from, clear it
                if (formData.available_to) {
                  const availableToDate = new Date(formData.available_to)
                  if (availableToDate < selectedDate) {
                    updateFormData({ available_to: '' })
                  }
                }
              }
            } else {
              updateFormData({ available_from: '' })
            }
          }}
          placeholder="Selectează data disponibilității"
        />
        <p className="text-sm text-gray-500 mt-1">Data nu poate fi în trecut</p>
      </div>
      <div>
        <Label htmlFor="available_to">Disponibil până la (Opțional)</Label>
        <DatePicker
          date={formData.available_to ? new Date(formData.available_to) : undefined}
          onDateChange={(date) => {
            if (date) {
              // Ensure the selected date is after available_from
              const selectedDate = new Date(date)
              selectedDate.setHours(0, 0, 0, 0)
              
              if (!availableFromDate || selectedDate > availableFromDate) {
                updateFormData({ 
                  available_to: date.toISOString().split('T')[0] 
                })
              }
            } else {
              updateFormData({ available_to: '' })
            }
          }}
          placeholder="Selectează data limită (opțional)"
          disabled={(date: Date) => {
            const checkDate = new Date(date)
            checkDate.setHours(0, 0, 0, 0)
            
            // Disable past dates
            if (checkDate < today) return true
            
            // Disable dates before available_from
            if (availableFromDate && checkDate <= availableFromDate) return true
            
            return false
          }}
        />
        {availableFromDate && (
          <p className="text-sm text-gray-500 mt-1">
            Data trebuie să fie după {new Date(availableFromDate).toLocaleDateString('ro-RO')}
          </p>
        )}
      </div>
    </div>
  )
}
