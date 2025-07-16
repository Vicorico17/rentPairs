"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PartnerPropertyCard } from "@/components/partner-property-card"
import type { PartnerProperty } from "@/lib/types"
import { Search, Filter, MapPin, Home } from "lucide-react"

interface PropertiesGalleryProps {
  properties: PartnerProperty[]
  loading?: boolean
  onContact: (property: PartnerProperty) => void
}

export function PropertiesGallery({ properties, loading = false, onContact }: PropertiesGalleryProps) {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedCity, setSelectedCity] = React.useState<string | null>(null)
  const [selectedSize, setSelectedSize] = React.useState<string | null>(null)

  // Extract unique cities and sizes for filtering
  const cities = React.useMemo(() => {
    const citySet = new Set<string>()
    properties.forEach(property => {
      // Extract city from address
      const city = property.address.split(',').pop()?.trim() || property.address.split(' ')[0]
      if (city) citySet.add(city)
    })
    return Array.from(citySet).sort()
  }, [properties])

  const sizes = React.useMemo(() => {
    const sizeSet = new Set<string>()
    properties.forEach(property => {
      const sizeMatch = property.size.match(/\d+/)
      if (sizeMatch) {
        sizeSet.add(sizeMatch[0])
      }
    })
    return Array.from(sizeSet).sort((a, b) => parseInt(a) - parseInt(b))
  }, [properties])

  // Filter properties based on search and filters
  const filteredProperties = React.useMemo(() => {
    return properties.filter(property => {
      const matchesSearch = searchTerm === "" || 
        property.displayTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.contactInfo.name.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCity = selectedCity === null || 
        property.address.toLowerCase().includes(selectedCity.toLowerCase())

      const matchesSize = selectedSize === null ||
        property.size.includes(selectedSize)

      return matchesSearch && matchesCity && matchesSize
    })
  }, [properties, searchTerm, selectedCity, selectedSize])

  if (loading) {
    return (
      <div className="w-full">
        <div className="animate-pulse space-y-6">
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="h-80 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Proprietăți Disponibile
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Descoperă {properties.length} proprietăți de la partenerii noștri
        </p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Caută după locație, proprietar sau tip..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-3">
          {/* City Filters */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              Oraș:
            </span>
            <Button
              variant={selectedCity === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCity(null)}
            >
              Toate
            </Button>
            {cities.slice(0, 5).map(city => (
              <Button
                key={city}
                variant={selectedCity === city ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCity(selectedCity === city ? null : city)}
              >
                {city}
              </Button>
            ))}
          </div>

          {/* Size Filters */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Camere:
            </span>
            <Button
              variant={selectedSize === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSize(null)}
            >
              Toate
            </Button>
            {sizes.map(size => (
              <Button
                key={size}
                variant={selectedSize === size ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSize(selectedSize === size ? null : size)}
              >
                {size}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {filteredProperties.length} {filteredProperties.length === 1 ? 'proprietate găsită' : 'proprietăți găsite'}
          </p>
          {(searchTerm || selectedCity || selectedSize) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchTerm("")
                setSelectedCity(null)
                setSelectedSize(null)
              }}
            >
              Resetează filtrele
            </Button>
          )}
        </div>
      </div>

      {/* Properties Grid */}
      {filteredProperties.length === 0 ? (
        <div className="text-center py-12">
          <Home className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Nu am găsit proprietăți
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Încearcă să schimbi filtrele sau să cauți altceva.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProperties.map((property) => (
            <PartnerPropertyCard
              key={property.id}
              property={property}
              onContact={onContact}
            />
          ))}
        </div>
      )}
    </div>
  )
} 