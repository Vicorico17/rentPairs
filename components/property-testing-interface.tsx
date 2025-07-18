"use client"

import * as React from "react"
import { AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"
import type { Property } from "@/lib/types"
import { X, Heart, Undo, RefreshCw, ArrowLeft } from "lucide-react"
import { PropertySwipeCard } from "@/components/property-swipe-card"

// Database property type from Supabase
interface DatabaseProperty {
  id: string
  created_at: string
  updated_at: string
  host_id: string | null
  street_address: string
  city: string
  state: string
  full_address: string
  monthly_rent: number
  security_deposit: number
  available_from: string
  available_to: string | null
  property_type: 'apartment' | 'house' | 'studio' | 'shared-room' | null
  furnishing_status: 'furnished' | 'unfurnished' | null
  pets_allowed: boolean | null
  smoking_allowed: boolean | null
  bedrooms: number | null
  bathrooms: number | null
  square_feet: number | null
  photos: string[] | null
  description: string | null
  amenities: string[] | null
  is_active: boolean | null
  verification_status: 'pending' | 'verified' | 'rejected' | null
}

// Transform database property to UI Property format - robust handling of missing fields
function transformProperty(dbProperty: DatabaseProperty): Property {
  // Handle missing or null critical fields gracefully
  const city = dbProperty.city || 'Necunoscut'
  const propertyType = dbProperty.property_type || 'apartment'
  const monthlyRent = dbProperty.monthly_rent || 0
  const securityDeposit = dbProperty.security_deposit || 0
  const streetAddress = dbProperty.street_address || 'Adresă necunoscută'
  
  // Handle availability date safely
  let availabilityDate = new Date()
  if (dbProperty.available_from) {
    try {
      availabilityDate = new Date(dbProperty.available_from)
      // Check if date is valid
      if (isNaN(availabilityDate.getTime())) {
        availabilityDate = new Date()
      }
    } catch (e) {
      availabilityDate = new Date()
    }
  }

  // Create location string from available fields
  let location = 'Locație necunoscută'
  if (dbProperty.full_address) {
    location = dbProperty.full_address
  } else if (dbProperty.street_address && dbProperty.city) {
    location = `${dbProperty.street_address}, ${dbProperty.city}`
  } else if (dbProperty.city) {
    location = dbProperty.city
  } else if (dbProperty.street_address) {
    location = dbProperty.street_address
  }

  // Format property type for display
  const formatPropertyType = (type: string): "Apartment" | "House" | "Studio" | "Shared Room" => {
    const typeMap: Record<string, "Apartment" | "House" | "Studio" | "Shared Room"> = {
      'apartment': 'Apartment',
      'house': 'House', 
      'studio': 'Studio',
      'shared-room': 'Shared Room',
      'shared_room': 'Shared Room'
    }
    return typeMap[type.toLowerCase()] || 'Apartment'
  }

  return {
    id: dbProperty.id,
    hostId: dbProperty.host_id || "unknown",
    title: `${propertyType.charAt(0).toUpperCase() + propertyType.slice(1)} în ${city}`,
    type: formatPropertyType(propertyType),
    rent: monthlyRent,
    deposit: securityDeposit,
    location: location,
    availability: availabilityDate,
    furnished: dbProperty.furnishing_status === 'furnished',
    rules: {
      pets: dbProperty.pets_allowed || false,
      smoking: dbProperty.smoking_allowed || false
    },
    photos: dbProperty.photos && dbProperty.photos.length > 0 ? dbProperty.photos : ["/placeholder.svg"],
    description: dbProperty.description || `${formatPropertyType(propertyType)} disponibilă în ${city}`,
    amenities: dbProperty.amenities || [],
    details: {
      beds: dbProperty.bedrooms || 1,
      baths: dbProperty.bathrooms || 1,
      sqft: dbProperty.square_feet || 500
    }
  }
}

interface PropertyTestingInterfaceProps {
  onMatch: () => void
  onBack: () => void
}

export function PropertyTestingInterface({ onMatch, onBack }: PropertyTestingInterfaceProps) {
  const [properties, setProperties] = React.useState<Property[]>([])
  const [history, setHistory] = React.useState<Property[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [likes, setLikes] = React.useState<string[]>([])
  const [dislikes, setDislikes] = React.useState<string[]>([])

  // Fetch properties from database
  const fetchProperties = React.useCallback(async () => {
    console.log('🔍 Fetching properties from database...')
    
    if (!supabase) {
      setError("Database nu este disponibilă momentan")
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)

      // First, let's check the total count of all properties
      const { count: totalCount } = await supabase
        .from('properties')
        .select('*', { count: 'exact', head: true })

      console.log(`📊 Total properties in database: ${totalCount}`)

      // Check active properties count
      const { count: activeCount } = await supabase
        .from('properties')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true)

      console.log(`📊 Active properties in database: ${activeCount}`)

      // Fetch ALL properties (not just active ones) for testing purposes
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1000) // Set a high limit to get all properties

      if (error) {
        console.error('❌ Error fetching properties:', error)
        setError('Nu am putut încărca proprietățile din baza de date')
        return
      }

      console.log(`✅ Fetched ${data?.length || 0} total properties (active: ${activeCount}, total: ${totalCount}):`, data)

      if (!data || data.length === 0) {
        setError('Nu există proprietăți în baza de date. Adaugă proprietăți folosind formularul de host.')
        return
      }

      // Transform database properties to UI format with error handling
      const transformedProperties: Property[] = []
      let transformErrors = 0

      data.forEach((dbProperty, index) => {
        try {
          const transformed = transformProperty(dbProperty)
          transformedProperties.push(transformed)
        } catch (error) {
          console.error(`❌ Error transforming property at index ${index}:`, error, dbProperty)
          transformErrors++
        }
      })

      console.log(`✅ Successfully transformed ${transformedProperties.length} properties (${transformErrors} errors)`)
      
      if (transformedProperties.length === 0) {
        setError('Nu am putut procesa proprietățile din baza de date.')
        return
      }
      
      setProperties(transformedProperties)

    } catch (err) {
      console.error('💥 Unexpected error fetching properties:', err)
      setError('A apărut o eroare neașteptată')
    } finally {
      setLoading(false)
    }
  }, [])

  // Load properties on component mount
  React.useEffect(() => {
    fetchProperties()
  }, [fetchProperties])

  const handleSwipe = (direction: "left" | "right") => {
    if (properties.length === 0) return

    const swipedProperty = properties[properties.length - 1]
    setHistory((prev) => [...prev, swipedProperty])
    setProperties((prev) => prev.slice(0, prev.length - 1))

    if (direction === "right") {
      setLikes((prev) => [...prev, swipedProperty.id])
      // Simulate a match chance
      if (Math.random() > 0.5) {
        onMatch()
      }
    } else {
      setDislikes((prev) => [...prev, swipedProperty.id])
    }

    console.log(`${direction === "right" ? "❤️ Liked" : "❌ Disliked"} property: ${swipedProperty.title}`)
  }

  const handleUndo = () => {
    if (history.length > 0) {
      const lastProperty = history[history.length - 1]
      setProperties((prev) => [...prev, lastProperty])
      setHistory((prev) => prev.slice(0, prev.length - 1))
      
      // Remove from likes/dislikes
      setLikes((prev) => prev.filter(id => id !== lastProperty.id))
      setDislikes((prev) => prev.filter(id => id !== lastProperty.id))
    }
  }

  const handleRefresh = () => {
    setProperties([])
    setHistory([])
    setLikes([])
    setDislikes([])
    fetchProperties()
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-[calc(100vh-8rem)]">
        <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mb-4" />
        <p className="text-lg text-gray-600 dark:text-gray-400">Se încarcă proprietățile...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-[calc(100vh-8rem)] px-4">
        <Card className="w-full max-w-md p-6 text-center">
          <p className="text-lg text-red-600 dark:text-red-400 mb-4">{error}</p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Înapoi
            </Button>
            <Button onClick={handleRefresh}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Încearcă din nou
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-[calc(100vh-8rem)]">
      {/* Header with stats */}
      <div className="w-full max-w-sm mb-4 text-center">
        <div className="flex justify-between items-center mb-2">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Înapoi
          </Button>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {properties.length} proprietăți rămase
          </div>
          <Button variant="ghost" size="sm" onClick={handleRefresh}>
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex justify-center gap-4 text-xs text-gray-500">
          <span className="text-green-600">❤️ {likes.length} apreciate</span>
          <span className="text-red-600">❌ {dislikes.length} respinse</span>
        </div>
      </div>

      {/* Swipe Cards Area */}
      <div className="relative w-full max-w-sm h-[550px] mb-6">
        <AnimatePresence>
          {properties.length > 0 ? (
            properties.map((property, index) => (
              <React.Fragment key={property.id}>
                <PropertySwipeCard 
                  property={property} 
                  onSwipe={index === properties.length - 1 ? handleSwipe : () => {}} 
                />
              </React.Fragment>
            ))
          ) : (
            <Card className="w-full h-full flex items-center justify-center">
              <div className="text-center p-6">
                <p className="text-lg text-gray-500 mb-4">
                  Nu mai sunt proprietăți disponibile!
                </p>
                <div className="text-sm text-gray-400 mb-4">
                  Statistici sesiune:
                  <br />
                  ❤️ {likes.length} apreciate
                  <br />
                  ❌ {dislikes.length} respinse
                </div>
                <div className="flex gap-3 justify-center">
                  <Button variant="outline" onClick={onBack}>
                    Înapoi acasă
                  </Button>
                  <Button onClick={handleRefresh}>
                    Reîncearcă
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </AnimatePresence>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-4">
        <Button
          variant="outline"
          size="icon"
          className="w-16 h-16 rounded-full border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-100 dark:hover:bg-yellow-900/50 bg-transparent"
          onClick={handleUndo}
          disabled={history.length === 0}
        >
          <Undo className="w-8 h-8" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="w-20 h-20 rounded-full border-2 border-red-500 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 bg-transparent"
          onClick={() => handleSwipe("left")}
          disabled={properties.length === 0}
        >
          <X className="w-10 h-10" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="w-20 h-20 rounded-full border-2 border-green-500 text-green-500 hover:bg-green-100 dark:hover:bg-green-900/50 bg-transparent"
          onClick={() => handleSwipe("right")}
          disabled={properties.length === 0}
        >
          <Heart className="w-10 h-10" />
        </Button>
      </div>
    </div>
  )
} 