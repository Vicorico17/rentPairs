import type { TenantProfile, Property, Conversation } from "./types"

export const MOCK_HOST_ID = "host123"

export const MOCK_TENANTS: TenantProfile[] = [
  {
    id: "tenant1",
    name: "Alex",
    age: 28,
    photo: "/placeholder.svg?height=400&width=400",
    budget: { min: 1800, max: 2500 },
    location: ["Downtown", "North Park"],
    moveInDate: new Date("2025-09-01"),
    leaseDuration: 12,
    occupation: "Software Engineer",
    income: 90000,
    pets: true,
    smoker: false,
    lifestyle: ["Quiet", "Remote Work", "Clean"],
    creditScore: 750,
    intro: "Respectful and clean professional looking for a quiet space to work and relax.",
  },
  {
    id: "tenant2",
    name: "Brenda",
    age: 24,
    photo: "/placeholder.svg?height=400&width=400",
    budget: { min: 1500, max: 2200 },
    location: ["North Park", "East Village"],
    moveInDate: new Date("2025-08-15"),
    leaseDuration: 6,
    occupation: "Graphic Designer",
    income: 72000,
    pets: false,
    smoker: false,
    lifestyle: ["Sociable", "Creative", "Night Owl"],
    creditScore: 710,
    intro: "Creative spirit who loves exploring the city and meeting new people. I'm tidy and easygoing.",
  },
  {
    id: "tenant3",
    name: "Carlos",
    age: 31,
    photo: "/placeholder.svg?height=400&width=400",
    budget: { min: 2000, max: 2800 },
    location: ["Downtown"],
    moveInDate: new Date("2025-09-15"),
    leaseDuration: 12,
    occupation: "Doctor",
    income: 120000,
    pets: false,
    smoker: false,
    lifestyle: ["Quiet", "Early Riser"],
    creditScore: 800,
    intro: "I work long hours at the hospital, so I value a quiet and peaceful home environment.",
  },
]

// Export a single mock tenant profile, for example, the first one
export const MOCK_TENANT_PROFILE: TenantProfile = MOCK_TENANTS[0]

export const MOCK_PROPERTIES: Property[] = [
  {
    id: "prop1",
    hostId: MOCK_HOST_ID,
    title: "Sunny Downtown Loft",
    type: "Apartment",
    rent: 2400,
    deposit: 2400,
    location: "Downtown",
    availability: new Date("2025-08-15"),
    furnished: true,
    rules: { pets: true, smoking: false },
    photos: [
      "/placeholder.svg?height=320&width=400",
      "/placeholder.svg?height=320&width=400",
      "/placeholder.svg?height=320&width=400",
    ],
    description: "A beautiful and sunny loft in the heart of downtown.",
    amenities: ["Wi-Fi", "Kitchen", "Elevator", "Parking"],
    details: { beds: 1, baths: 1, sqft: 750 },
  },
  {
    id: "prop2",
    hostId: "host456",
    title: "Cozy North Park Bungalow",
    type: "House",
    rent: 2800,
    deposit: 2800,
    location: "North Park",
    availability: new Date("2025-09-01"),
    furnished: false,
    rules: { pets: true, smoking: false },
    photos: [
      "/placeholder.svg?height=320&width=400",
      "/placeholder.svg?height=320&width=400",
      "/placeholder.svg?height=320&width=400",
    ],
    description: "Charming bungalow with a spacious backyard.",
    amenities: ["Parking", "Kitchen", "Washer/Dryer"],
    details: { beds: 2, baths: 1, sqft: 1100 },
  },
  {
    id: "prop3",
    hostId: MOCK_HOST_ID,
    title: "Modern Studio near Tech Hub",
    type: "Studio",
    rent: 2000,
    deposit: 2000,
    location: "East Village",
    availability: new Date("2025-08-01"),
    furnished: true,
    rules: { pets: false, smoking: false },
    photos: ["/placeholder.svg?height=320&width=400", "/placeholder.svg?height=320&width=400"],
    description: "Sleek and modern studio, perfect for a young professional.",
    amenities: ["Wi-Fi", "Kitchen", "Gym"],
    details: { beds: 1, baths: 1, sqft: 500 },
  },
]

// Simulate tenants liking properties
export const MOCK_LIKES = [
  { tenantId: "tenant2", propertyId: "prop1" },
  { tenantId: "tenant3", propertyId: "prop1" },
  { tenantId: "tenant1", propertyId: "prop2" }, // This won't show for our host
]

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: "convo1",
    participant: { id: "tenant2", name: "Summer", avatar: "/placeholder.svg?height=64&width=64" },
    messages: [{ id: "msg1", senderId: "tenant2", text: "Hi! How are you? X", timestamp: new Date() }],
    lastMessage: "Hi! How are you? X",
    lastMessageTimestamp: "Yesterday",
    status: "expiring",
    expiresIn: "23 hours",
  },
  {
    id: "convo2",
    participant: { id: "tenant3", name: "Aimee", avatar: "/placeholder.svg?height=64&width=64" },
    messages: [{ id: "msg2", senderId: "tenant3", text: "Love the shirt!", timestamp: new Date() }],
    lastMessage: "Love the shirt!",
    lastMessageTimestamp: "Mon 10:42",
    status: "active",
  },
  {
    id: "convo3",
    participant: { id: "tenant4", name: "Kate", avatar: "/placeholder.svg?height=64&width=64" },
    messages: [],
    lastMessage: "Last message: Tue 15:34",
    lastMessageTimestamp: "Tue 15:34",
    status: "ended",
  },
]

export const MOCK_MATCH_QUEUE = [
  { id: "match1", name: "Jess", avatar: "/placeholder.svg?height=64&width=64", newMessages: 12 },
  { id: "match2", name: "Mia", avatar: "/placeholder.svg?height=64&width=64", newMessages: 0 },
  { id: "match3", name: "Chloe", avatar: "/placeholder.svg?height=64&width=64", newMessages: 0 },
  { id: "match4", name: "Zoe", avatar: "/placeholder.svg?height=64&width=64", newMessages: 0 },
]
