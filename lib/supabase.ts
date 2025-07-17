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

// Image Upload Utilities
export const uploadPropertyImage = async (file: File, propertyId?: string): Promise<{ url: string; path: string } | null> => {
  if (!supabase) {
    console.error('❌ Supabase is not configured')
    console.error('❌ URL:', supabaseUrl ? 'Set' : 'Missing')
    console.error('❌ Key:', supabaseAnonKey ? 'Set' : 'Missing')
    return null
  }

  try {
    console.log('📤 Starting upload process...')
    console.log('📤 File details:', {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified
    })
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Tip de fișier neacceptat. Folosește JPEG, PNG, WebP sau GIF.')
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      throw new Error('Fișierul este prea mare. Dimensiunea maximă este 5MB.')
    }

    // Generate unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const fileExtension = file.name.split('.').pop()
    const fileName = `${propertyId || 'temp'}_${timestamp}_${randomString}.${fileExtension}`
    const filePath = `properties/${fileName}`

    console.log('📤 Generated file path:', filePath)
    console.log('📤 Uploading to bucket: property-images')

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from('property-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('❌ Supabase Storage upload error:', error)
      console.error('❌ Error details:', {
        message: error.message,
        name: error.name
      })
      
      // Provide user-friendly error messages based on error message
      if (error.message.includes('Invalid key') || error.message.includes('Invalid bucket')) {
        throw new Error('Configurația storage nu este corectă.')
      } else if (error.message.includes('413') || error.message.includes('too large')) {
        throw new Error('Fișierul este prea mare pentru a fi încărcat.')
      } else if (error.message.includes('401') || error.message.includes('unauthorized')) {
        throw new Error('Acces neautorizat la storage. Configurația nu este corectă.')
      } else if (error.message.includes('400') || error.message.includes('Bad Request')) {
        throw new Error('Eroare de validare. Verifică că fișierul este o imagine validă.')
      } else {
        throw new Error(`Eroare la încărcare: ${error.message}`)
      }
    }

    console.log('✅ Upload successful:', data)

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('property-images')
      .getPublicUrl(filePath)

    console.log('✅ Public URL generated:', urlData.publicUrl)

    return {
      url: urlData.publicUrl,
      path: filePath
    }
  } catch (error) {
    console.error('❌ Error uploading image:', error)
    if (error instanceof Error) {
      console.error('❌ Error message:', error.message)
      console.error('❌ Error stack:', error.stack)
    }
    throw error
  }
}

export const deletePropertyImage = async (filePath: string): Promise<boolean> => {
  if (!supabase) {
    console.error('Supabase is not configured')
    return false
  }

  try {
    const { error } = await supabase.storage
      .from('property-images')
      .remove([filePath])

    if (error) {
      console.error('❌ Delete error:', error)
      return false
    }

    console.log('✅ Image deleted successfully:', filePath)
    return true
  } catch (error) {
    console.error('❌ Error deleting image:', error)
    return false
  }
}

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