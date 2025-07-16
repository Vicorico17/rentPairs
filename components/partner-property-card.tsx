"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { PartnerProperty } from "@/lib/types"
import { MapPin, User, MessageCircle, Phone } from "lucide-react"

export function PartnerPropertyCard({
  property,
  onContact,
}: {
  property: PartnerProperty
  onContact: (property: PartnerProperty) => void
}) {
  const { displayTitle, address, size, estimatedRent, photos, contactInfo } = property

  return (
    <Card className="w-full overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
      <div className="relative">
        <img
          src={photos[0] || "/placeholder.svg"}
          alt={displayTitle}
          className="object-cover w-full h-48"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
            {size} {size.match(/\d/) ? (parseInt(size) === 1 ? 'cameră' : 'camere') : ''}
          </Badge>
        </div>
        <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/80 to-transparent text-white">
          <h3 className="text-lg font-bold">{displayTitle}</h3>
          {estimatedRent && (
            <p className="text-sm font-semibold opacity-90">
              ~{estimatedRent.toLocaleString()} RON/lună
            </p>
          )}
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{address}</span>
          </div>

          {/* Contact Info */}
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <User className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{contactInfo.name}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button
              onClick={() => onContact(property)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              size="sm"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Contactează
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="px-3"
              onClick={() => onContact(property)}
            >
              <Phone className="w-4 h-4" />
            </Button>
          </div>

          {/* Additional Info */}
          <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500">
              Adăugat pe {new Date(property.created_at).toLocaleDateString('ro-RO')}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 