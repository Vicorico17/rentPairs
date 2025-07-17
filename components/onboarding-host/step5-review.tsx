"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Home, Calendar, Euro, Users, PawPrint, Cigarette } from "lucide-react"

interface ImageData {
  url: string
  path: string
}

interface FormData {
  street_address: string
  city: string
  state: string
  monthly_rent: number
  security_deposit: number
  available_from: string
  available_to: string
  property_type: string
  furnishing_status: string
  pets_allowed: boolean | null
  smoking_allowed: boolean | null
  bedrooms: number | null
  bathrooms: number | null
  square_feet: number | null
  description: string
  amenities: string[]
  photos: ImageData[]
}

export function Step5Review({ formData }: { formData: FormData }) {
  const getPropertyTypeLabel = (type: string) => {
    switch (type) {
      case 'apartment': return 'Apartament'
      case 'house': return 'Casă'
      case 'studio': return 'Studio'
      case 'shared-room': return 'Cameră în comun'
      default: return 'Necunoscut'
    }
  }

  const getFurnishingLabel = (status: string) => {
    switch (status) {
      case 'furnished': return 'Mobilat'
      case 'unfurnished': return 'Nemobilat'
      default: return 'Nespecificat'
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold">Verifică datele anunțului</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Revizuiește informațiile înainte de publicare
        </p>
      </div>

      {/* Address & Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Locația & Tipul Proprietății
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p><strong>Adresa:</strong> {formData.street_address}</p>
          <p><strong>Oraș:</strong> {formData.city}, {formData.state}</p>
          <p><strong>Tip:</strong> {getPropertyTypeLabel(formData.property_type)}</p>
          <p><strong>Mobilare:</strong> {getFurnishingLabel(formData.furnishing_status)}</p>
        </CardContent>
      </Card>

      {/* Pricing & Availability */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Euro className="h-4 w-4" />
            Preț & Disponibilitate
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p><strong>Chirie lunară:</strong> {formData.monthly_rent} RON</p>
          <p><strong>Garanție:</strong> {formData.security_deposit} RON</p>
          <p><strong>Disponibil de la:</strong> {formData.available_from}</p>
          {formData.available_to && (
            <p><strong>Disponibil până la:</strong> {formData.available_to}</p>
          )}
        </CardContent>
      </Card>

      {/* Property Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Home className="h-4 w-4" />
            Detalii Proprietate
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {formData.bedrooms && <p><strong>Dormitoare:</strong> {formData.bedrooms}</p>}
          {formData.bathrooms && <p><strong>Băi:</strong> {formData.bathrooms}</p>}
          {formData.square_feet && <p><strong>Suprafața:</strong> {formData.square_feet} m²</p>}
          
          <div className="flex gap-2 mt-3">
            {formData.pets_allowed !== null && (
              <Badge variant={formData.pets_allowed ? "default" : "secondary"}>
                <PawPrint className="h-3 w-3 mr-1" />
                Animale {formData.pets_allowed ? 'permise' : 'interzise'}
              </Badge>
            )}
            {formData.smoking_allowed !== null && (
              <Badge variant={formData.smoking_allowed ? "default" : "secondary"}>
                <Cigarette className="h-3 w-3 mr-1" />
                Fumatul {formData.smoking_allowed ? 'permis' : 'interzis'}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Amenities */}
      {formData.amenities.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Facilități</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {formData.amenities.map((amenity, index) => (
                <Badge key={index} variant="outline">{amenity}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Description */}
      {formData.description && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Descriere</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{formData.description}</p>
          </CardContent>
        </Card>
      )}

      {/* Photos */}
      {formData.photos.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Fotografii ({formData.photos.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2">
              {formData.photos.slice(0, 6).map((photo, index) => (
                <div key={index} className="aspect-video bg-gray-100 dark:bg-gray-800 rounded overflow-hidden">
                  <img 
                    src={photo.url} 
                    alt={`Fotografie ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
