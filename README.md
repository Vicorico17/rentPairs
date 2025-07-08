# 🏠 rentPairs - Smart Rental Matching Platform

A modern, AI-powered rental matching platform that connects property hosts with ideal tenants through intelligent matching algorithms and streamlined onboarding flows.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/vicorico17s-projects/v0-rental-match-web-app)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js%2015-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Database](https://img.shields.io/badge/Database-Supabase-green?style=for-the-badge&logo=supabase)](https://supabase.com/)

## 🌟 Overview

**rentPairs** is a comprehensive rental matching platform that revolutionizes how tenants find properties and hosts find ideal renters. Using smart matching algorithms based on lifestyle compatibility, budget alignment, and location preferences, we create meaningful connections in the rental market.

### ✨ Key Features

- **🎯 Smart Matching Algorithm** - AI-powered compatibility scoring based on 30+ data points
- **📱 Tinder-Style Swiping** - Intuitive property discovery for tenants
- **💬 Real-Time Chat** - Instant messaging between hosts and tenants
- **📝 Comprehensive Onboarding** - Detailed preference and lifestyle profiling
- **🏡 Property Management** - Full-featured property listing and management
- **🔒 Trust & Safety** - Identity verification and reference checking
- **📅 Lease Planning** - Integrated lease agreement management
- **📊 Match Analytics** - Detailed compatibility insights

## 🛠 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with Server Components
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Smooth animations and transitions

### Backend & Database
- **Supabase** - PostgreSQL database with real-time features
- **Row Level Security (RLS)** - Database-level security
- **Real-time Subscriptions** - Live chat and notifications
- **Supabase Auth** - Authentication and user management

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Git** - Version control

## 📊 Database Schema

Our database is designed for scalability and performance with comprehensive relationships:

```mermaid
erDiagram
    auth_users {
        uuid id PK
        string email
        string phone
        timestamp created_at
    }

    user_profiles {
        uuid id PK
        uuid user_id FK
        timestamp created_at
        timestamp updated_at
        enum user_type "tenant|host|both"
        string email
        string phone
        boolean is_verified
        boolean is_active
        timestamp last_login
    }

    tenant_profiles {
        uuid id PK
        uuid user_id FK
        timestamp created_at
        timestamp updated_at
        string first_name
        string last_name
        integer age
        string profile_photo
        text bio
        array preferred_neighborhoods
        string work_location
        integer max_commute_minutes
        integer rent_budget "in cents"
        boolean willing_to_share_room
        boolean furnished_only
        integer wake_time "0-23"
        integer sleep_time "0-23"
        enum guest_frequency "Rar|Uneori|Des"
        enum home_vibe_preference "Social|Quiet"
        integer cleanliness_level "1-5"
        array dealbreakers
        enum housing_situation "new_city|co_living|relocating|long_term"
        enum stay_duration "short|medium|long term"
        date move_in_date
        string occupation
        integer annual_income "in cents"
        string linkedin_url
        boolean id_verified
        string reference_letter_url
        string social_profile_url
        enum verification_status "pending|verified|rejected"
        boolean is_active
        boolean onboarding_completed
    }

    properties {
        uuid id PK
        uuid host_id FK
        timestamp created_at
        timestamp updated_at
        string street_address
        string city
        string state
        string full_address "generated"
        integer monthly_rent "in cents"
        integer security_deposit "in cents"
        date available_from
        date available_to
        enum property_type "apartment|house|studio|shared-room"
        enum furnishing_status "furnished|unfurnished"
        boolean pets_allowed
        boolean smoking_allowed
        integer bedrooms
        decimal bathrooms
        integer square_feet
        array photos "image URLs"
        text description
        array amenities
        boolean is_active
        enum verification_status "pending|verified|rejected"
    }

    matches {
        uuid id PK
        uuid tenant_id FK
        uuid property_id FK
        timestamp created_at
        enum action "like|dislike|super_like"
    }

    conversations {
        uuid id PK
        uuid tenant_id FK
        uuid host_id FK
        uuid property_id FK
        timestamp created_at
        timestamp updated_at
        enum status "active|ended|expired"
        timestamp expires_at "auto 7 days"
    }

    messages {
        uuid id PK
        uuid conversation_id FK
        uuid sender_id FK
        timestamp created_at
        text message_text
        boolean is_read
        timestamp read_at
    }

    %% Relationships
    auth_users ||--|| user_profiles : "user_id"
    auth_users ||--|| tenant_profiles : "user_id"
    auth_users ||--o{ properties : "host_id"
    auth_users ||--o{ conversations : "host_id"
    auth_users ||--o{ messages : "sender_id"
    
    tenant_profiles ||--o{ matches : "tenant_id"
    tenant_profiles ||--o{ conversations : "tenant_id"
    
    properties ||--o{ matches : "property_id"
    properties ||--o{ conversations : "property_id"
    
    conversations ||--o{ messages : "conversation_id"
```

### Database Tables Overview

| Table | Purpose | Key Features |
|-------|---------|--------------|
| `auth_users` | Supabase authentication | Built-in user management |
| `user_profiles` | Base user information | User type (tenant/host/both) |
| `tenant_profiles` | Tenant onboarding data | 32 fields covering preferences, lifestyle, verification |
| `properties` | Property listings | Complete property details, photos, amenities |
| `matches` | Tenant-Property interactions | Likes, dislikes, super likes |
| `conversations` | Chat sessions | Auto-expiring conversations (7 days) |
| `messages` | Real-time messaging | Read receipts, timestamps |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Vicorico17/rentPairs.git
   cd rentPairs
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Set up environment variables**
   
   Create `.env.local` in the project root:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Database Setup

The database schema is already configured in Supabase with:
- ✅ Row Level Security (RLS) policies
- ✅ Real-time subscriptions for messaging
- ✅ Helper functions for match scoring
- ✅ Auto-expiring conversations
- ✅ Comprehensive indexes for performance

## 📁 Project Structure

```
rentPairs/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── loading.tsx        # Loading UI
│   └── page.tsx           # Home page with routing
├── components/            # React components
│   ├── ui/               # Reusable UI components (Radix + Tailwind)
│   ├── onboarding/       # Tenant onboarding flow
│   ├── onboarding-host/  # Host onboarding flow
│   ├── auth-page.tsx     # Authentication
│   ├── chat-interface.tsx # Real-time messaging
│   ├── matching-interface.tsx # Property swiping
│   └── ...               # Other feature components
├── lib/                  # Utility functions and configurations
│   ├── supabase.ts      # Supabase client and types
│   ├── types.ts         # TypeScript type definitions
│   ├── utils.ts         # Helper functions
│   └── data.ts          # Mock data for development
├── hooks/               # Custom React hooks
├── public/             # Static assets
└── styles/             # Additional stylesheets
```

## 🎯 User Flows

### Tenant Journey
1. **Landing Page** - Choose "Looking for a place"
2. **Onboarding** - 7-step process:
   - Location preferences
   - Budget and room sharing
   - Lifestyle (sleep schedule, cleanliness, social preferences)
   - Dealbreakers
   - Housing situation and timeline
   - Community preferences
   - Verification and profile building
3. **Matching** - Swipe through compatible properties
4. **Chat** - Connect with interested hosts
5. **Lease Planning** - Move forward with agreements

### Host Journey
1. **Landing Page** - Choose "I have a place to rent"
2. **Property Listing** - 5-step process:
   - Property address
   - Pricing and availability
   - Property details and rules
   - Photo uploads and description
   - Review and publish
3. **Tenant Review** - See tenant profiles who liked your property
4. **Chat** - Connect with potential tenants
5. **Lease Management** - Handle agreements and move-ins

## 🔒 Security Features

- **Row Level Security (RLS)** - Database-level access control
- **Authentication** - Supabase Auth integration
- **Data Validation** - Comprehensive input validation
- **Privacy Controls** - Granular data sharing permissions
- **Verification System** - Identity and reference verification

## 🚀 Deployment

The application is configured for easy deployment on Vercel:

1. **Environment Variables** - Set up in Vercel dashboard
2. **Database** - Already configured in Supabase
3. **Build Settings** - Optimized for Next.js 15

**Live Demo:** [https://vercel.com/vicorico17s-projects/v0-rental-match-web-app](https://vercel.com/vicorico17s-projects/v0-rental-match-web-app)

## 📈 Performance Optimizations

- **Next.js 15 App Router** - Server Components and streaming
- **Database Indexes** - Optimized queries for matching algorithms
- **Image Optimization** - Next.js automatic image optimization
- **Code Splitting** - Lazy loading of components
- **Caching** - Strategic caching of API responses

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- 📧 Email: [support@rentpairs.com](mailto:support@rentpairs.com)
- 💬 GitHub Issues: [Create an issue](https://github.com/Vicorico17/rentPairs/issues)

---

**Built with ❤️ using Next.js, Supabase, and modern web technologies**