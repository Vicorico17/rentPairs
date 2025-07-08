export function Step5Review({ formData }: { formData: any }) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-center">Review Your Listing</h3>
      <div className="rounded-lg border bg-gray-50 dark:bg-gray-800 p-6 space-y-4">
        <div className="flex justify-between">
          <span className="font-medium text-gray-600 dark:text-gray-300">Address:</span>
          <span className="font-semibold text-right">
            {formData.address}, {formData.city}, {formData.state}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600 dark:text-gray-300">Rent:</span>
          <span className="font-semibold">${formData.rent}/month</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600 dark:text-gray-300">Available:</span>
          <span className="font-semibold">{formData.availableFrom || "N/A"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600 dark:text-gray-300">Property Type:</span>
          <span className="font-semibold capitalize">{formData.propertyType || "N/A"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600 dark:text-gray-300">Rules:</span>
          <span className="font-semibold capitalize">Pets: {formData.pets}</span>
        </div>
      </div>
    </div>
  )
}
