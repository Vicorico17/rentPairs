"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

interface FormData {
  property_type: 'apartment' | 'house' | 'studio' | 'shared-room' | ''
  furnishing_status: 'furnished' | 'unfurnished' | ''
  pets_allowed: boolean | null
  smoking_allowed: boolean | null
  bedrooms: number | null
  bathrooms: number | null
  square_feet: number | null
  description: string
  amenities: string[]
}

const availableAmenities = [
  "Wi-Fi",
  "Parcare",
  "Lift",
  "Balcon",
  "Terasă",
  "Grădină",
  "Mașină de spălat",
  "Mașină de spălat vase",
  "Aer condiționat",
  "Încălzire centrală",
  "Animale permise",
  "Mobilat",
  "Bucătărie echipată"
]

export function Step3Details({ formData, updateFormData }: { formData: FormData; updateFormData: (data: Partial<FormData>) => void }) {
  const handleAmenityChange = (amenity: string, checked: boolean) => {
    const currentAmenities = formData.amenities || []
    if (checked) {
      updateFormData({ amenities: [...currentAmenities, amenity] })
    } else {
      updateFormData({ amenities: currentAmenities.filter(a => a !== amenity) })
    }
  }

  return (
    <div className="space-y-6">
      {/* Property Type */}
      <div>
        <Label>Tipul Proprietății</Label>
        <Select 
          value={formData.property_type} 
          onValueChange={(value) => updateFormData({ property_type: value as any })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selectează tipul proprietății" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apartment">Apartament</SelectItem>
            <SelectItem value="house">Casă</SelectItem>
            <SelectItem value="studio">Studio</SelectItem>
            <SelectItem value="shared-room">Cameră în comun</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Room Details */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="bedrooms">Dormitoare</Label>
          <Input
            id="bedrooms"
            type="number"
            placeholder="2"
            min="0"
            value={formData.bedrooms || ''}
            onChange={(e) => {
              const val = Number.parseInt(e.target.value, 10)
              updateFormData({ bedrooms: isNaN(val) ? null : val })
            }}
          />
        </div>
        <div>
          <Label htmlFor="bathrooms">Băi</Label>
          <Input
            id="bathrooms"
            type="number"
            placeholder="1"
            min="0"
            value={formData.bathrooms || ''}
            onChange={(e) => {
              const val = Number.parseInt(e.target.value, 10)
              updateFormData({ bathrooms: isNaN(val) ? null : val })
            }}
          />
        </div>
        <div>
          <Label htmlFor="square_feet">Metri pătrați</Label>
          <Input
            id="square_feet"
            type="number"
            placeholder="80"
            min="0"
            value={formData.square_feet || ''}
            onChange={(e) => {
              const val = Number.parseInt(e.target.value, 10)
              updateFormData({ square_feet: isNaN(val) ? null : val })
            }}
          />
        </div>
      </div>

      {/* Property Features */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <Label>Mobilare</Label>
          <RadioGroup
            value={formData.furnishing_status || ''}
            onValueChange={(value) => updateFormData({ furnishing_status: value as any })}
            className="mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="furnished" id="furnished" />
              <Label htmlFor="furnished">Mobilat</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="unfurnished" id="unfurnished" />
              <Label htmlFor="unfurnished">Nemobilat</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div>
          <Label>Animale permise?</Label>
          <RadioGroup 
            value={formData.pets_allowed === null ? '' : formData.pets_allowed ? 'yes' : 'no'} 
            onValueChange={(value) => updateFormData({ pets_allowed: value === 'yes' ? true : value === 'no' ? false : null })} 
            className="mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="pets-yes" />
              <Label htmlFor="pets-yes">Da</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="pets-no" />
              <Label htmlFor="pets-no">Nu</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      {/* Smoking */}
      <div>
        <Label>Fumatul permis?</Label>
        <RadioGroup 
          value={formData.smoking_allowed === null ? '' : formData.smoking_allowed ? 'yes' : 'no'} 
          onValueChange={(value) => updateFormData({ smoking_allowed: value === 'yes' ? true : value === 'no' ? false : null })} 
          className="mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="smoking-yes" />
            <Label htmlFor="smoking-yes">Da</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="smoking-no" />
            <Label htmlFor="smoking-no">Nu</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Amenities */}
      <div>
        <Label>Facilități (selectează toate care se aplică)</Label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {availableAmenities.map((amenity) => (
            <div key={amenity} className="flex items-center space-x-2">
              <Checkbox
                id={`amenity-${amenity}`}
                checked={formData.amenities?.includes(amenity) || false}
                onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
              />
              <Label htmlFor={`amenity-${amenity}`} className="text-sm">{amenity}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* Description */}
      <div>
        <Label htmlFor="description">Descriere (Opțional)</Label>
        <Textarea
          id="description"
          placeholder="Descrie proprietatea ta: locația, caracteristicile speciale, regulile casei..."
          value={formData.description}
          onChange={(e) => updateFormData({ description: e.target.value })}
          rows={4}
        />
      </div>
    </div>
  )
}
