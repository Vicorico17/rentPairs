"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { PropertiesGallery } from "@/components/properties-gallery"
import { getPartnerProperties } from "@/lib/partner-properties"
import type { PartnerProperty } from "@/lib/types"
import { X, Mail, Phone, MessageCircle, AlertCircle } from "lucide-react"

interface PropertiesModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PropertiesModal({ open, onOpenChange }: PropertiesModalProps) {
  const [properties, setProperties] = React.useState<PartnerProperty[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [selectedProperty, setSelectedProperty] = React.useState<PartnerProperty | null>(null)
  const [showContactInfo, setShowContactInfo] = React.useState(false)

  // Load properties when modal opens
  React.useEffect(() => {
    if (open) {
      loadProperties()
    }
  }, [open])

  const loadProperties = async () => {
    try {
      setLoading(true)
      setError(null)
      const partnerProperties = await getPartnerProperties()
      setProperties(partnerProperties)
    } catch (err) {
      setError("Nu am putut încărca proprietățile. Te rog încearcă din nou.")
      console.error("Error loading properties:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleContact = (property: PartnerProperty) => {
    setSelectedProperty(property)
    setShowContactInfo(true)
  }

  const handleCopyContact = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  const formatContactForEmail = (property: PartnerProperty) => {
    const subject = `Interes pentru proprietatea: ${property.displayTitle}`
    const body = `Bună ziua,

Sunt interesat de proprietatea dumneavoastră:
- Locație: ${property.address}
- Mărime: ${property.size}

Vă mulțumesc!`
    
    const isEmail = property.name.includes('@')
    const emailAddress = isEmail ? property.name : ''
    
    return `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <>
      {/* Main Properties Modal */}
      <Dialog open={open && !showContactInfo} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-7xl w-full h-[90vh] max-h-[90vh] overflow-hidden p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-2xl font-bold">Proprietăți de la Parteneri</DialogTitle>
          </DialogHeader>
          
          <div className="flex-1 overflow-auto p-6 pt-0">
            {error ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={loadProperties}
                  className="mt-2"
                >
                  Încearcă din nou
                </Button>
              </Alert>
            ) : (
              <PropertiesGallery
                properties={properties}
                loading={loading}
                onContact={handleContact}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Contact Info Modal */}
      <Dialog open={showContactInfo} onOpenChange={setShowContactInfo}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Contactează Proprietarul</DialogTitle>
          </DialogHeader>
          
          {selectedProperty && (
            <div className="space-y-4">
              {/* Property Info */}
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 className="font-semibold">{selectedProperty.displayTitle}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{selectedProperty.address}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedProperty.size} {selectedProperty.size.match(/\d/) ? 'camere' : ''}
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-3">
                <h4 className="font-medium">Informații de contact:</h4>
                
                {/* Property Owner */}
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{selectedProperty.contactInfo.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Proprietar</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopyContact(selectedProperty.name)}
                  >
                    Copiază
                  </Button>
                </div>

                {/* Email Option (if email detected) */}
                {selectedProperty.name.includes('@') && (
                  <Button
                    className="w-full"
                    onClick={() => window.open(formatContactForEmail(selectedProperty))}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Trimite Email
                  </Button>
                )}

                {/* General Contact Info */}
                <Alert>
                  <MessageCircle className="h-4 w-4" />
                  <AlertDescription>
                    Pentru a contacta proprietarul, folosește informațiile de contact de mai sus.
                    Te recomandăm să menționezi că ai găsit proprietatea prin RentPairs.
                  </AlertDescription>
                </Alert>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowContactInfo(false)}
                >
                  Înapoi
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => {
                    setShowContactInfo(false)
                    onOpenChange(false)
                  }}
                >
                  Închide
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
} 