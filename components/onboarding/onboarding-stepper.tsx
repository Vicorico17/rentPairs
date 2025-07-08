import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface OnboardingStepperProps {
  steps: { id: number; name: string }[]
  activeStep: number
}

export function OnboardingStepper({ steps, activeStep }: OnboardingStepperProps) {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-center">
        {steps.map((step, stepIdx) => (
          <li key={step.name} className={cn("relative", stepIdx !== steps.length - 1 ? "pr-8 sm:pr-20" : "")}>
            {stepIdx < activeStep ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-blue-600" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-blue-600">
                  <Check className="h-5 w-5 text-white" aria-hidden="true" />
                </div>
              </>
            ) : stepIdx === activeStep ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-blue-600 bg-white dark:bg-gray-800">
                  <span className="h-2.5 w-2.5 rounded-full bg-blue-600" aria-hidden="true" />
                </div>
              </>
            ) : (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white dark:bg-gray-800" />
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
