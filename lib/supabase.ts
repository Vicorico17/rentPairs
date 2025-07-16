import { createClient } from '@supabase/supabase-js'

// Handle missing environment variables gracefully during build time
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Only create client if both URL and key are available
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Helper function to check if Supabase is available
export const isSupabaseConfigured = () => Boolean(supabaseUrl && supabaseAnonKey)

// Database types for better TypeScript support
export type Database = {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          user_id: string
          created_at: string
          updated_at: string
          user_type: 'tenant' | 'host' | 'both'
          email: string
          phone: string | null
          is_verified: boolean
          is_active: boolean
          last_login: string | null
        }
        Insert: {
          id?: string
          user_id: string
          created_at?: string
          updated_at?: string
          user_type: 'tenant' | 'host' | 'both'
          email: string
          phone?: string | null
          is_verified?: boolean
          is_active?: boolean
          last_login?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          created_at?: string
          updated_at?: string
          user_type?: 'tenant' | 'host' | 'both'
          email?: string
          phone?: string | null
          is_verified?: boolean
          is_active?: boolean
          last_login?: string | null
        }
      }
      partner_leads: {
        Row: {
          id: number
          name: string
          address: string
          size: string
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          address: string
          size: string
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          address?: string
          size?: string
          created_at?: string
        }
      }
      tenant_profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user_id: string
          first_name: string
          last_name: string
          age: number | null
          profile_photo: string | null
          bio: string | null
          preferred_neighborhoods: string[] | null
          work_location: string | null
          max_commute_minutes: number | null
          rent_budget: number
          willing_to_share_room: boolean | null
          furnished_only: boolean | null
          wake_time: number | null
          sleep_time: number | null
          guest_frequency: 'Rar' | 'Uneori' | 'Des' | null
          home_vibe_preference: 'Social' | 'Quiet' | null
          cleanliness_level: number | null
          dealbreakers: string[] | null
          housing_situation: 'new_city' | 'co_living' | 'relocating' | 'long_term' | null
          stay_duration: 'Termen scurt (1-3 luni)' | 'Termen mediu (4-8 luni)' | 'Termen lung (9+ luni)' | null
          move_in_date: string | null
          occupation: string | null
          annual_income: number | null
          linkedin_url: string | null
          id_verified: boolean | null
          reference_letter_url: string | null
          social_profile_url: string | null
          verification_status: 'pending' | 'verified' | 'rejected' | null
          is_active: boolean | null
          onboarding_completed: boolean | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id: string
          first_name: string
          last_name: string
          age?: number | null
          profile_photo?: string | null
          bio?: string | null
          preferred_neighborhoods?: string[] | null
          work_location?: string | null
          max_commute_minutes?: number | null
          rent_budget: number
          willing_to_share_room?: boolean | null
          furnished_only?: boolean | null
          wake_time?: number | null
          sleep_time?: number | null
          guest_frequency?: 'Rar' | 'Uneori' | 'Des' | null
          home_vibe_preference?: 'Social' | 'Quiet' | null
          cleanliness_level?: number | null
          dealbreakers?: string[] | null
          housing_situation?: 'new_city' | 'co_living' | 'relocating' | 'long_term' | null
          stay_duration?: 'Termen scurt (1-3 luni)' | 'Termen mediu (4-8 luni)' | 'Termen lung (9+ luni)' | null
          move_in_date?: string | null
          occupation?: string | null
          annual_income?: number | null
          linkedin_url?: string | null
          id_verified?: boolean | null
          reference_letter_url?: string | null
          social_profile_url?: string | null
          verification_status?: 'pending' | 'verified' | 'rejected' | null
          is_active?: boolean | null
          onboarding_completed?: boolean | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string
          first_name?: string
          last_name?: string
          age?: number | null
          profile_photo?: string | null
          bio?: string | null
          preferred_neighborhoods?: string[] | null
          work_location?: string | null
          max_commute_minutes?: number | null
          rent_budget?: number
          willing_to_share_room?: boolean | null
          furnished_only?: boolean | null
          wake_time?: number | null
          sleep_time?: number | null
          guest_frequency?: 'Rar' | 'Uneori' | 'Des' | null
          home_vibe_preference?: 'Social' | 'Quiet' | null
          cleanliness_level?: number | null
          dealbreakers?: string[] | null
          housing_situation?: 'new_city' | 'co_living' | 'relocating' | 'long_term' | null
          stay_duration?: 'Termen scurt (1-3 luni)' | 'Termen mediu (4-8 luni)' | 'Termen lung (9+ luni)' | null
          move_in_date?: string | null
          occupation?: string | null
          annual_income?: number | null
          linkedin_url?: string | null
          id_verified?: boolean | null
          reference_letter_url?: string | null
          social_profile_url?: string | null
          verification_status?: 'pending' | 'verified' | 'rejected' | null
          is_active?: boolean | null
          onboarding_completed?: boolean | null
        }
      }
      properties: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          host_id: string
          street_address: string
          city: string
          state: string
          full_address: string
          monthly_rent: number
          security_deposit: number
          available_from: string
          available_to: string | null
          property_type: 'apartment' | 'house' | 'studio' | 'shared-room' | null
          furnishing_status: 'furnished' | 'unfurnished' | null
          pets_allowed: boolean | null
          smoking_allowed: boolean | null
          bedrooms: number | null
          bathrooms: number | null
          square_feet: number | null
          photos: string[] | null
          description: string | null
          amenities: string[] | null
          is_active: boolean | null
          verification_status: 'pending' | 'verified' | 'rejected' | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          host_id: string
          street_address: string
          city: string
          state: string
          monthly_rent: number
          security_deposit: number
          available_from: string
          available_to?: string | null
          property_type?: 'apartment' | 'house' | 'studio' | 'shared-room' | null
          furnishing_status?: 'furnished' | 'unfurnished' | null
          pets_allowed?: boolean | null
          smoking_allowed?: boolean | null
          bedrooms?: number | null
          bathrooms?: number | null
          square_feet?: number | null
          photos?: string[] | null
          description?: string | null
          amenities?: string[] | null
          is_active?: boolean | null
          verification_status?: 'pending' | 'verified' | 'rejected' | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          host_id?: string
          street_address?: string
          city?: string
          state?: string
          monthly_rent?: number
          security_deposit?: number
          available_from?: string
          available_to?: string | null
          property_type?: 'apartment' | 'house' | 'studio' | 'shared-room' | null
          furnishing_status?: 'furnished' | 'unfurnished' | null
          pets_allowed?: boolean | null
          smoking_allowed?: boolean | null
          bedrooms?: number | null
          bathrooms?: number | null
          square_feet?: number | null
          photos?: string[] | null
          description?: string | null
          amenities?: string[] | null
          is_active?: boolean | null
          verification_status?: 'pending' | 'verified' | 'rejected' | null
        }
      }
      matches: {
        Row: {
          id: string
          created_at: string
          tenant_id: string
          property_id: string
          action: 'like' | 'dislike' | 'super_like'
        }
        Insert: {
          id?: string
          created_at?: string
          tenant_id: string
          property_id: string
          action: 'like' | 'dislike' | 'super_like'
        }
        Update: {
          id?: string
          created_at?: string
          tenant_id?: string
          property_id?: string
          action?: 'like' | 'dislike' | 'super_like'
        }
      }
      conversations: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          tenant_id: string
          host_id: string
          property_id: string
          status: 'active' | 'ended' | 'expired' | null
          expires_at: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          tenant_id: string
          host_id: string
          property_id: string
          status?: 'active' | 'ended' | 'expired' | null
          expires_at?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          tenant_id?: string
          host_id?: string
          property_id?: string
          status?: 'active' | 'ended' | 'expired' | null
          expires_at?: string | null
        }
      }
      messages: {
        Row: {
          id: string
          created_at: string
          conversation_id: string
          sender_id: string
          message_text: string
          is_read: boolean | null
          read_at: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          conversation_id: string
          sender_id: string
          message_text: string
          is_read?: boolean | null
          read_at?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          conversation_id?: string
          sender_id?: string
          message_text?: string
          is_read?: boolean | null
          read_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 