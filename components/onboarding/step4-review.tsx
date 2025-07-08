export function Step4Review({ formData }: { formData: any }) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-center">Review Your Profile</h3>
      <div className="rounded-lg border bg-gray-50 dark:bg-gray-800 p-6 space-y-4">
        <div className="flex justify-between">
          <span className="font-medium text-gray-600 dark:text-gray-300">Location:</span>
          <span className="font-semibold">{formData.location || "Not set"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600 dark:text-gray-300">Budget:</span>
          <span className="font-semibold">
            ${formData.budget.min} - ${formData.budget.max}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600 dark:text-gray-300">Move-in Date:</span>
          <span className="font-semibold">{formData.moveInDate || "Not set"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600 dark:text-gray-300">Occupation:</span>
          <span className="font-semibold">{formData.occupation || "Not set"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600 dark:text-gray-300">Pets / Smoking:</span>
          <span className="font-semibold capitalize">
            {formData.pets} / {formData.smoking}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600 dark:text-gray-300">Lifestyle:</span>
          <span className="font-semibold">{formData.lifestyle.join(", ") || "Not set"}</span>
        </div>
      </div>
      <p className="text-xs text-center text-gray-500">
        By submitting, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  )
}
