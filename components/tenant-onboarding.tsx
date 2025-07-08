"use client"

import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ProgressBar } from "@/components/ui/progress-bar"
import { Step1Location } from "./onboarding-tenant/step1-location"
import { Step2Budget } from "./onboarding-tenant/step2-budget"
import { Step3Lifestyle } from "./onboarding-tenant/step3-lifestyle"
import { Step4Dealbreakers } from "./onboarding-tenant/step4-dealbreakers"
import { Step5Intent } from "./onboarding-tenant/step5-intent"
import { Step6Community } from "./onboarding-tenant/step6-community"
import { Step7Verification } from "./onboarding-tenant/step7-verification"

const steps = [
  { id: 1, name: "Locație" },
  { id: 2, name: "Buget" },
  { id: 3, name: "Stil de viață" },
  { id: 4, name: "Criterii eliminatorii" },
  { id: 5, name: "Intenție" },
  { id: 6, name: "Comunitate" },
  { id: 7, name: "Profil" },
]

export function TenantOnboarding({ onComplete }: { onComplete: () => void }) {
  const [activeStep, setActiveStep] = React.useState(0)
  const [formData, setFormData] = React.useState({
    // Step 1
    neighborhoods: "",
    workLocation: "",
    maxCommute: 30,
    // Step 2
    rentBudget: 2000,
    shareRoom: false,
    furnishedOnly: true,
    // Step 3
    wakeTime: 8,
    sleepTime: 23,
    guestFrequency: "Rarely",
    homeVibe: "Quiet",
    cleanliness: 3,
    // Step 4
    dealbreakers: [],
    // Step 5
    housingSituation: "",
    stayDuration: "Long-term",
    // Step 6
    communityVibe: "Somewhere in between",
    matchWith: "Anyone",
    // Step 7
    bio: "",
  })

  const handleNext = () => setActiveStep((prev) => Math.min(prev + 1, steps.length - 1))
  const handleBack = () => setActiveStep((prev) => Math.max(prev - 1, 0))
  const updateFormData = (newData: any) => setFormData((prev) => ({ ...prev, ...newData }))

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return <Step1Location formData={formData} updateFormData={updateFormData} />
      case 1:
        return <Step2Budget formData={formData} updateFormData={updateFormData} />
      case 2:
        return <Step3Lifestyle formData={formData} updateFormData={updateFormData} />
      case 3:
        return <Step4Dealbreakers formData={formData} updateFormData={updateFormData} />
      case 4:
        return <Step5Intent formData={formData} updateFormData={updateFormData} />
      case 5:
        return <Step6Community formData={formData} updateFormData={updateFormData} />
      case 6:
        return <Step7Verification formData={formData} updateFormData={updateFormData} />
      default:
        return null
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl rounded-2xl flex flex-col h-[90vh]">
      <CardHeader>
        <ProgressBar steps={steps} activeStep={activeStep} />
      </CardHeader>
      <CardContent className="flex-grow flex flex-col p-4 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="flex-grow"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
        <div className="flex items-center justify-between mt-8 pt-4 border-t">
          <Button variant="ghost" onClick={handleBack} disabled={activeStep === 0}>
            Înapoi
          </Button>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={onComplete}>
              Salvează și Ieși
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button onClick={onComplete} className="bg-blue-600 hover:bg-blue-700">
                Găsește-mi Potrivirea
              </Button>
            ) : (
              <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700">
                Următorul
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
