import type { TenantProfile, Property } from "./types"

export function calculateMatchScore(tenant: TenantProfile, property: Property) {
  let score = 0
  let hardFilterPassed = true
  const softFilterReasons: string[] = []

  // --- Hard Filters ---
  // Budget
  if (property.rent < tenant.budget.min || property.rent > tenant.budget.max) {
    hardFilterPassed = false
  }
  // Availability
  if (property.availability > tenant.moveInDate) {
    hardFilterPassed = false
  }
  // Pets
  if (tenant.pets && !property.rules.pets) {
    hardFilterPassed = false
  }
  // Smoking
  if (tenant.smoker && !property.rules.smoking) {
    hardFilterPassed = false
  }

  if (!hardFilterPassed) {
    return { score: 0, summary: "Doesn't meet key requirements." }
  }

  let totalWeight = 0
  let weightedScore = 0

  // --- Soft Filters (Weighted) ---
  const softFilters: { weight: number; check: () => number; reason: string }[] = [
    {
      weight: 30,
      check: () => (tenant.income / 12 >= property.rent * 3 ? 100 : 50),
      reason: "income ratio",
    },
    {
      weight: 20,
      check: () => (tenant.creditScore && tenant.creditScore >= 700 ? 100 : 60),
      reason: "credit score",
    },
    {
      weight: 20,
      check: () => (Math.abs(tenant.leaseDuration - 12) <= 2 ? 100 : 70), // Assuming 12 month is ideal
      reason: "lease duration",
    },
    {
      weight: 15,
      check: () => (tenant.location.includes(property.location) ? 100 : 50),
      reason: "location preference",
    },
    {
      weight: 15,
      check: () => {
        const amenityMatch = tenant.lifestyle.includes("Remote Work") && property.amenities.includes("Wi-Fi")
        return amenityMatch ? 100 : 70
      },
      reason: "lifestyle fit",
    },
  ]

  softFilters.forEach((filter) => {
    const result = filter.check()
    weightedScore += result * filter.weight
    totalWeight += filter.weight
    if (result > 70) {
      softFilterReasons.push(filter.reason)
    }
  })

  score = Math.round(weightedScore / totalWeight)

  let summary = "Good fit."
  if (score >= 80) summary = `Great match! Strong on ${softFilterReasons.slice(0, 2).join(" & ")}.`
  else if (score >= 60) summary = `Decent match. Aligns on ${softFilterReasons[0]}.`
  else summary = "Low compatibility. Might be missing key preferences."

  return { score, summary }
}
