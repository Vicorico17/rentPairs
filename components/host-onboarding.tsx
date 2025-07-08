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

const steps = [
  { id: 1, name: "Address" },
  { id: 2, name: "Pricing" },
  { id: 3, name: "Details" },
  { id: 4, name: "Photos" },
  { id: 5, name: "Review" },
]

export function HostOnboarding({ onComplete }: { onComplete: () => void }) {
  const [activeStep, setActiveStep] = React.useState(0)
  const [formData, setFormData] = React.useState({
    address: "",
    city: "",
    state: "",
    rent: 2500,
    deposit: 2500,
    availableFrom: "",
    availableTo: "",
    propertyType: "",
    furnishing: "unfurnished",
    pets: "no",
    photos: [],
    description: "",
  })

  const handleNext = () => setActiveStep((prev) => Math.min(prev + 1, steps.length - 1))
  const handleBack = () => setActiveStep((prev) => Math.max(prev - 1, 0))
  const updateFormData = (newData: any) => setFormData((prev) => ({ ...prev, ...newData }))

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
        <CardTitle>Host Onboarding</CardTitle>
        <CardDescription>5 steps to list your property.</CardDescription>
      </CardHeader>
      <CardContent className="p-6 text-center">
        {activeStep === steps.length - 1 ? (
          <Button onClick={onComplete} className="bg-blue-600 hover:bg-blue-700 text-white shadow-md">
            Submit Listing
          </Button>
        ) : (
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
        )}
        <p className="mb-6">Details, Rent, Rules, Lifestyle, Photos...</p>
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={activeStep === 0}
            className="text-blue-600 border-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-900/20 bg-transparent"
          >
            Back
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button onClick={onComplete} className="bg-blue-600 hover:bg-blue-700 text-white shadow-md">
              Submit Listing
            </Button>
          ) : (
            <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 text-white shadow-md">
              Next
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
