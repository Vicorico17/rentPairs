"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { AppShell } from "@/components/app-shell"
import { LandingPage } from "@/components/landing-page"
import { TenantOnboarding } from "@/components/tenant-onboarding"
import { HostOnboarding } from "@/components/host-onboarding"
import { MatchingInterface } from "@/components/matching-interface"
import { ChatInterface } from "@/components/chat-interface"
import { ChatListPage } from "@/components/chat-list-page"
import { LeasePlanner } from "@/components/lease-planner"
import { PostMoveInDashboard } from "@/components/post-move-in-dashboard"
import { TrustSafetyModule } from "@/components/trust-safety-module"
import { MatchModal } from "@/components/match-modal"
import { MOCK_CONVERSATIONS } from "@/lib/data"
import { HostLandingPage } from "@/components/host-landing-page"
import { PropertyTestingInterface } from "@/components/property-testing-interface"

type AppState =
  | "landing"
  | "host_landing"
  | "tenant_onboarding"
  | "host_onboarding"
  | "matching"
  | "chat"
  | "lease_planning"
  | "post_move_in"
  | "profile"
  | "property_testing"

type UserType = "tenant" | "host" | "property_testing" | null

function Home() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const appState = (searchParams.get("view") as AppState) || "landing"
  const chatId = searchParams.get("chatId")

  // These states are session-specific and don't need to be in the URL
  const [userType, setUserType] = React.useState<UserType>(null)
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)
  const [showMatchModal, setShowMatchModal] = React.useState(false)

  const navigate = (state: AppState, params?: Record<string, string>) => {
    const query = new URLSearchParams(params).toString()
    router.push(`/?view=${state}${query ? `&${query}` : ""}`)
  }

  const handleLandingChoice = (type: UserType) => {
    setUserType(type)
    if (type === "tenant") navigate("tenant_onboarding")
    if (type === "host") navigate("host_landing")
    if (type === "property_testing") navigate("property_testing")
  }

  const handleOnboardingComplete = () => {
    if (userType === "host") {
      // For hosts, go back to landing page after adding property
      setUserType(null)
      navigate("landing")
    } else {
      // For tenants, continue to matching as before
      setIsAuthenticated(true)
      navigate("matching")
    }
  }

  const handleMatch = () => {
    setShowMatchModal(true)
  }

  const renderContent = () => {
    switch (appState) {
      case "landing":
        return <LandingPage onChoice={handleLandingChoice} />
      case "tenant_onboarding":
        return <TenantOnboarding onComplete={handleOnboardingComplete} />
      case "host_onboarding":
        return <HostOnboarding onComplete={handleOnboardingComplete} />
      case "matching":
        return <MatchingInterface userType={userType === "property_testing" ? null : userType} onMatch={handleMatch} />
      case "property_testing":
        return (
          <PropertyTestingInterface 
            onMatch={handleMatch} 
            onBack={() => navigate("landing")} 
          />
        )
      case "chat":
        if (chatId) {
          const conversation = MOCK_CONVERSATIONS.find((c) => c.id === chatId)
          return conversation ? <ChatInterface conversation={conversation} onNavigate={navigate} /> : <ChatListPage />
        }
        return <ChatListPage />
      case "lease_planning":
        return <LeasePlanner onNavigate={navigate} />
      case "post_move_in":
        return <PostMoveInDashboard />
      case "profile":
        return <TrustSafetyModule />
      case "host_landing":
        return <HostLandingPage onStartListing={() => navigate("host_onboarding")} />
      default:
        return <LandingPage onChoice={handleLandingChoice} />
    }
  }

  return (
    <main className="bg-white dark:bg-gray-950 w-full overflow-x-hidden">
      <AnimatePresence>
        {showMatchModal && (
          <MatchModal
            onSendMessage={() => {
              setShowMatchModal(false)
              navigate("chat")
            }}
            onKeepSwiping={() => setShowMatchModal(false)}
          />
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.div
          key={appState + (chatId || "")}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {isAuthenticated ? (
            <AppShell onNavigate={navigate} activeState={appState}>
              {renderContent()}
            </AppShell>
          ) : appState === "property_testing" ? (
            <div className="min-h-screen bg-white dark:bg-gray-950">
              {renderContent()}
            </div>
          ) : (
            <div className="flex items-center justify-center min-h-screen">{renderContent()}</div>
          )}
        </motion.div>
      </AnimatePresence>
    </main>
  )
}

// Wrap the component in Suspense because useSearchParams can suspend
export default function Page() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Home />
    </React.Suspense>
  )
}
