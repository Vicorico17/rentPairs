"use client"

import * as React from "react"
import { AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MOCK_PROPERTIES, MOCK_TENANTS, MOCK_LIKES, MOCK_HOST_ID } from "@/lib/data"
import { calculateMatchScore } from "@/lib/matching"
import type { Property, TenantProfile } from "@/lib/types"
import { X, Heart, Undo } from "lucide-react"
import { PropertySwipeCard } from "@/components/property-swipe-card"
import { TenantSwipeCard } from "@/components/tenant-swipe-card"

export function MatchingInterface({ userType, onMatch }: { userType: "tenant" | "host" | null; onMatch: () => void }) {
  const [profiles, setProfiles] = React.useState<(Property | TenantProfile)[]>([])
  const [history, setHistory] = React.useState<(Property | TenantProfile)[]>([])

  React.useEffect(() => {
    if (userType === "tenant") {
      const scoredProperties = MOCK_PROPERTIES.map((property) => ({
        ...property,
        matchScore: calculateMatchScore(MOCK_TENANTS[0], property), // Assume tenant is the first mock tenant
      })).sort((a, b) => (b.matchScore?.score ?? 0) - (a.matchScore?.score ?? 0))
      setProfiles(scoredProperties)
    } else if (userType === "host") {
      // Find which tenants liked the host's properties
      const hostPropertyIds = MOCK_PROPERTIES.filter((p) => p.hostId === MOCK_HOST_ID).map((p) => p.id)
      const tenantIdsWhoLiked = MOCK_LIKES.filter((like) => hostPropertyIds.includes(like.propertyId)).map(
        (like) => like.tenantId,
      )
      const tenantProfiles = MOCK_TENANTS.filter((tenant) => tenantIdsWhoLiked.includes(tenant.id))
      setProfiles(tenantProfiles)
    }
  }, [userType])

  const handleSwipe = (direction: "left" | "right") => {
    if (profiles.length === 0) return

    const swipedProfile = profiles[profiles.length - 1]
    setHistory((prev) => [...prev, swipedProfile])
    setProfiles((prev) => prev.slice(0, prev.length - 1))

    if (direction === "right") {
      // For a host, a right swipe is a mutual match.
      // For a tenant, we simulate a 50% chance of an instant match.
      if (userType === "host" || (userType === "tenant" && Math.random() > 0.5)) {
        onMatch()
      }
    }
  }

  const handleUndo = () => {
    if (history.length > 0) {
      const lastProfile = history[history.length - 1]
      setProfiles((prev) => [...prev, lastProfile])
      setHistory((prev) => prev.slice(0, prev.length - 1))
    }
  }

  const renderCard = (profile: Property | TenantProfile, onSwipe: (direction: "left" | "right") => void) => {
    if ("rent" in profile) {
      // It's a Property
      return <PropertySwipeCard property={profile as Property} onSwipe={onSwipe} />
    } else {
      // It's a TenantProfile
      return <TenantSwipeCard tenant={profile as TenantProfile} onSwipe={onSwipe} />
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-[calc(100vh-8rem)]">
      <div className="relative w-full max-w-sm h-[550px] mb-6">
        <AnimatePresence>
          {profiles.length > 0 ? (
            profiles.map((profile, index) => (
              <React.Fragment key={profile.id}>
                {renderCard(profile, index === profiles.length - 1 ? handleSwipe : () => {})}
              </React.Fragment>
            ))
          ) : (
            <Card className="w-full h-full flex items-center justify-center">
              <p className="text-lg text-gray-500">
                {userType === "tenant" ? "Nu mai sunt proprietăți" : "Nicio apreciere nouă"}
              </p>
            </Card>
          )}
        </AnimatePresence>
      </div>
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
          disabled={profiles.length === 0}
        >
          <X className="w-10 h-10" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="w-20 h-20 rounded-full border-2 border-green-500 text-green-500 hover:bg-green-100 dark:hover:bg-green-900/50 bg-transparent"
          onClick={() => handleSwipe("right")}
          disabled={profiles.length === 0}
        >
          <Heart className="w-10 h-10" />
        </Button>
      </div>
    </div>
  )
}
