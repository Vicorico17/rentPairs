export interface TenantProfile {
  id: string
  name: string
  age: number
  photo: string
  budget: { min: number; max: number }
  location: string[]
  moveInDate: Date
  leaseDuration: number // in months
  occupation: string
  income: number
  pets: boolean
  smoker: boolean
  lifestyle: string[]
  creditScore?: number
  intro: string
}

export interface Property {
  id: string
  hostId: string
  title: string
  type: "Apartment" | "House" | "Studio" | "Shared Room"
  rent: number
  deposit: number
  location: string
  availability: Date
  furnished: boolean
  rules: {
    pets: boolean
    smoking: boolean
  }
  photos: string[]
  description: string
  amenities: string[]
  details: {
    beds: number
    baths: number
    sqft: number
  }
  matchScore?: {
    score: number
    summary: string
  }
}

export interface Message {
  id: string
  senderId: string
  text: string
  timestamp: Date
}

export interface Conversation {
  id: string
  participant: {
    id: string
    name: string
    avatar: string
  }
  messages: Message[]
  lastMessage: string
  lastMessageTimestamp: string
  status: "active" | "ended" | "expiring"
  expiresIn?: string
}
