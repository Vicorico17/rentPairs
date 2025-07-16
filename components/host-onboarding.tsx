"use client"

import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Step1Address } from "./onboarding-host/step1-address"
import { Step2Pricing } from "./onboarding-host/step2-pricing"
import { Step3Details } from "./onboarding-host/step3-details"
import { Step4Media } from "./onboarding-host/step4-media"
import { Step5Review } from "./onboarding-host/step5-review"
import { supabase } from "@/lib/supabase"

const steps = [
  { id: 1, name: "Adresă" },
  { id: 2, name: "Preț" },
  { id: 3, name: "Detalii" },
  { id: 4, name: "Poze" },
  { id: 5, name: "Verificare" },
]

interface HostFormData {
  // Address fields
  street_address: string
  city: string
  state: string
  
  // Pricing fields
  monthly_rent: number
  security_deposit: number
  available_from: string
  available_to: string
  
  // Property details
  property_type: 'apartment' | 'house' | 'studio' | 'shared-room' | ''
  furnishing_status: 'furnished' | 'unfurnished' | ''
  pets_allowed: boolean | null
  smoking_allowed: boolean | null
  bedrooms: number | null
  bathrooms: number | null
  square_feet: number | null
  
  // Description and amenities
  description: string
  amenities: string[]
  
  // Photos
  photos: string[]
}

export function HostOnboarding({ onComplete }: { onComplete: () => void }) {
  const [activeStep, setActiveStep] = React.useState(0)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  
  const [formData, setFormData] = React.useState<HostFormData>({
    street_address: "",
    city: "",
    state: "România",
    monthly_rent: 0,
    security_deposit: 0,
    available_from: "",
    available_to: "",
    property_type: '',
    furnishing_status: '',
    pets_allowed: null,
    smoking_allowed: null,
    bedrooms: null,
    bathrooms: null,
    square_feet: null,
    description: "",
    amenities: [],
    photos: [],
  })

  const handleNext = () => setActiveStep((prev) => Math.min(prev + 1, steps.length - 1))
  const handleBack = () => setActiveStep((prev) => Math.max(prev - 1, 0))
  const updateFormData = (newData: Partial<HostFormData>) => setFormData((prev) => ({ ...prev, ...newData }))

  const handleSubmit = async () => {
    if (!supabase) {
      setError("Database nu este disponibilă momentan")
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Create full address for database
      const full_address = `${formData.street_address}, ${formData.city}, ${formData.state}`
      
      // Generate a temporary host ID (in real app, this would come from authentication)
      const host_id = `host_${Date.now()}`

      const propertyData = {
        host_id,
        street_address: formData.street_address,
        city: formData.city,
        state: formData.state,
        full_address,
        monthly_rent: formData.monthly_rent,
        security_deposit: formData.security_deposit,
        available_from: formData.available_from,
        available_to: formData.available_to || null,
        property_type: formData.property_type || null,
        furnishing_status: formData.furnishing_status || null,
        pets_allowed: formData.pets_allowed,
        smoking_allowed: formData.smoking_allowed,
        bedrooms: formData.bedrooms,
        bathrooms: formData.bathrooms,
        square_feet: formData.square_feet,
        description: formData.description || null,
        amenities: formData.amenities.length > 0 ? formData.amenities : null,
        photos: formData.photos.length > 0 ? formData.photos : null,
        is_active: true,
        verification_status: 'pending' as const,
      }

      const { data, error } = await supabase
        .from('properties')
        .insert([propertyData])
        .select()

      if (error) {
        console.error('Error saving property:', error)
        setError('Nu am putut salva proprietatea. Te rog încearcă din nou.')
        return
      }

      console.log('Property saved successfully:', data)
      onComplete()
    } catch (err) {
      console.error('Error submitting property:', err)
      setError('A apărut o eroare neașteptată. Te rog încearcă din nou.')
    } finally {
      setLoading(false)
    }
  }

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return <Step1Address formData={formData} updateFormData={updateFormData} />
      case 1:
        return <Step2Pricing formData={formData} updateFormData={updateFormData} />
      case 2:
        return <Step3Details formData={formData} updateFormData={updateFormData} />
      case 3:
        return <Step4Media formData={formData} updateFormData={updateFormData} />
      case 4:
        return <Step5Review formData={formData} />
      default:
        return null
    }
  }

  return (
    <Card className="w-full max-w-lg mx-auto shadow-2xl rounded-2xl">
      <CardHeader>
        <CardTitle>Înregistrare Proprietar</CardTitle>
        <CardDescription>5 pași pentru a-ți lista proprietatea.</CardDescription>
      </CardHeader>
      <CardContent className="p-6 text-center">
        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
          </div>
        )}
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
        
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          Pasul {activeStep + 1} din {steps.length}: {steps[activeStep].name}
        </p>
        
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={activeStep === 0}
            className="text-blue-600 border-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-900/20 bg-transparent"
          >
            Înapoi
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button 
              onClick={handleSubmit} 
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-md"
            >
              {loading ? "Se salvează..." : "Publică Anunțul"}
            </Button>
          ) : (
            <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 text-white shadow-md">
              Următorul
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
