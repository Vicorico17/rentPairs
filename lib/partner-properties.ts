import { supabase, isSupabaseConfigured } from './supabase'
import type { PartnerLead, PartnerProperty } from './types'

// Fetch partner leads from Supabase
export async function fetchPartnerLeads(): Promise<PartnerLead[]> {
  // Return empty array if Supabase is not configured (during build time)
  if (!isSupabaseConfigured() || !supabase) {
    console.warn('Supabase not configured, returning empty partner leads')
    return []
  }

  const { data, error } = await supabase
    .from('partner_leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching partner leads:', error)
    throw new Error('Failed to fetch partner properties')
  }

  return data || []
}

// Transform partner lead into displayable property
export function transformPartnerLead(lead: PartnerLead): PartnerProperty {
  const { id, name, address, size, created_at } = lead

  // Generate a display title from address and size
  const displayTitle = generatePropertyTitle(address, size)
  
  // Estimate rent based on size and location (basic logic)
  const estimatedRent = estimateRent(size, address)
  
  // Generate placeholder photos
  const photos = generatePlaceholderPhotos(size)
  
  // Format contact info
  const contactInfo = formatContactInfo(name)

  return {
    id: id.toString(),
    name,
    address,
    size,
    created_at,
    displayTitle,
    estimatedRent,
    photos,
    contactInfo
  }
}

// Transform multiple partner leads
export function transformPartnerLeads(leads: PartnerLead[]): PartnerProperty[] {
  return leads.map(transformPartnerLead)
}

// Generate a property title from address and size
function generatePropertyTitle(address: string, size: string): string {
  const sizeNum = extractSizeNumber(size)
  const location = extractCityFromAddress(address)
  
  if (sizeNum) {
    const roomText = sizeNum === 1 ? 'cameră' : 'camere'
    return `${sizeNum} ${roomText} în ${location}`
  }
  
  return `Proprietate în ${location}`
}

// Extract numeric size from size string
function extractSizeNumber(size: string): number | null {
  const match = size.match(/\d+/)
  return match ? parseInt(match[0], 10) : null
}

// Extract city name from address
function extractCityFromAddress(address: string): string {
  // Look for common Romanian city patterns
  const cities = ['bucurești', 'bucure ti', 'constanta', 'constanța', 'cluj', 'timișoara', 'timisoara', 'iași', 'iasi', 'craiova', 'brașov', 'brasov', 'galați', 'galati', 'ploiești', 'ploiesti', 'oradea', 'sibiu', 'târgu-mureș', 'targu mures']
  
  const addressLower = address.toLowerCase()
  
  for (const city of cities) {
    if (addressLower.includes(city)) {
      return city.charAt(0).toUpperCase() + city.slice(1)
    }
  }
  
  // Fallback - try to extract last meaningful part of address
  const parts = address.split(',').map(part => part.trim())
  if (parts.length > 1) {
    return parts[parts.length - 1]
  }
  
  return address.split(' ')[0] || 'România'
}

// Estimate rent based on size and location
function estimateRent(size: string, address: string): number | undefined {
  const sizeNum = extractSizeNumber(size)
  const city = extractCityFromAddress(address).toLowerCase()
  
  if (!sizeNum) return undefined
  
  // Basic rent estimation (in RON) based on Romanian market averages
  const baseRentByCity: Record<string, number> = {
    'bucurești': 1800,
    'constanta': 1200,
    'constanța': 1200,
    'cluj': 1600,
    'timișoara': 1400,
    'timisoara': 1400,
    'iași': 1100,
    'iasi': 1100,
    'brașov': 1300,
    'brasov': 1300,
    'craiova': 1000,
    'ploiești': 1100,
    'ploiesti': 1100,
    'oradea': 1000,
    'sibiu': 1200
  }
  
  const baseRent = baseRentByCity[city] || 1000 // Default for smaller cities
  
  // Adjust based on number of rooms
  const multiplier = Math.max(0.5, sizeNum * 0.4)
  
  return Math.round(baseRent * multiplier)
}

// Generate placeholder photos based on property size
function generatePlaceholderPhotos(size: string): string[] {
  const sizeNum = extractSizeNumber(size) || 2
  
  // Use different placeholder images based on size
  const basePhotos = [
    '/placeholder.svg?height=400&width=600&text=Proprietate+Disponibilă',
    '/placeholder.svg?height=400&width=600&text=Interior+Spațios',
    '/placeholder.svg?height=400&width=600&text=Zonă+Frumoasă'
  ]
  
  // Return more photos for larger properties
  return basePhotos.slice(0, Math.min(sizeNum, 3))
}

// Format contact information
function formatContactInfo(name: string): { name: string; displayContact: string } {
  // Check if name looks like an email
  const isEmail = name.includes('@')
  
  if (isEmail) {
    return {
      name: 'Proprietar',
      displayContact: name
    }
  }
  
  // Clean up the name
  const cleanName = name.trim()
  
  return {
    name: cleanName,
    displayContact: `Contactează pe ${cleanName}`
  }
}

// Fetch properties from the properties table (host onboarding submissions)
export async function fetchHostProperties(): Promise<PartnerProperty[]> {
  console.log('🏠 Fetching host properties from properties table...')
  
  // Return empty array if Supabase is not configured (during build time)
  if (!isSupabaseConfigured() || !supabase) {
    console.warn('Supabase not configured, returning empty host properties')
    return []
  }

  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('❌ Error fetching host properties:', error)
    throw new Error('Failed to fetch host properties')
  }

  console.log(`✅ Fetched ${data?.length || 0} host properties:`, data)

  // Transform properties table data to PartnerProperty format
  return (data || []).map((property): PartnerProperty => {
    const displayTitle = `${property.property_type || 'Proprietate'} în ${property.city}`
    return {
      id: `host-${property.id}`,
      name: `Proprietar ${property.city}`, // Since we don't have host name, use city
      address: property.full_address || `${property.street_address}, ${property.city}, ${property.state}`,
      size: property.bedrooms ? `${property.bedrooms} camere` : (property.square_feet ? `${property.square_feet} mp` : 'Necunoscut'),
      created_at: property.created_at,
      displayTitle,
      estimatedRent: property.monthly_rent,
      photos: property.photos || ['/placeholder.jpg'],
      contactInfo: {
        name: `Proprietar ${property.city}`,
        displayContact: 'Contact disponibil după înregistrare'
      }
    }
  })
}

// Fetch and transform partner properties (main function)
export async function getPartnerProperties(): Promise<PartnerProperty[]> {
  try {
    console.log('🔄 Getting all properties (partner leads + host submissions)...')
    
    // Fetch both partner leads and host properties
    const [partnerLeads, hostProperties] = await Promise.all([
      fetchPartnerLeads(),
      fetchHostProperties()
    ])
    
    console.log(`📊 Found ${partnerLeads.length} partner leads and ${hostProperties.length} host properties`)
    
    const transformedPartnerLeads = transformPartnerLeads(partnerLeads)
    
    // Combine both sources
    const allProperties = [...transformedPartnerLeads, ...hostProperties]
    
    console.log(`🎯 Total properties to display: ${allProperties.length}`)
    
    return allProperties
  } catch (error) {
    console.error('❌ Error getting partner properties:', error)
    return []
  }
} 