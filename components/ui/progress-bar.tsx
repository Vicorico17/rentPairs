interface ProgressBarProps {
  steps: { id: number; name: string }[]
  activeStep: number
}

export function ProgressBar({ steps, activeStep }: ProgressBarProps) {
  return (
    <div className="w-full">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-500">
          Pasul {activeStep + 1} din {steps.length}
        </span>
        <span className="text-sm font-medium text-blue-600">{steps[activeStep].name}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
        />
      </div>
    </div>
  )
}
