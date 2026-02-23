// Nominatim API kullanarak gerçek lokasyonları getir
export interface Location {
  id: string
  name: string
  display_name: string
  lat: number
  lon: number
  type: string
}

const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org/search'

/**
 * Nominatim API'den lokasyon ara
 * OpenStreetMap verilerini kullanır, API anahtarı gerekmez
 */
export async function searchLocations(query: string): Promise<Location[]> {
  if (!query || query.length < 2) {
    return []
  }

  try {
    const params = new URLSearchParams({
      q: query,
      format: 'json',
      limit: '10',
      addressdetails: '1',
      countrycodes: 'tr,us,gb,de,fr,es,it,pt,nl,be,ch,at,cz,pl,gr,ae,eg,in,jp,cn,au,ca,mx,br,za', // Popüler ülkeler
    })

    const response = await fetch(
      `${NOMINATIM_BASE_URL}?${params.toString()}`,
      {
        headers: {
          'User-Agent': 'Rotaly-Hotel-Booking-App',
        },
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch locations')
    }

    const data = await response.json() as any[]

    return data.map((item, index) => ({
      id: `${item.lat}-${item.lon}-${index}`,
      name: item.address?.city || item.address?.town || item.address?.village || item.name,
      display_name: item.display_name,
      lat: parseFloat(item.lat),
      lon: parseFloat(item.lon),
      type: item.type,
    }))
  } catch (error) {
    console.error('Lokasyon arama hatası:', error)
    return []
  }
}

/**
 * Popüler turist destinasyonlarının önceden tanımlanmış listesi
 * (Offline kullanım veya hızlı erişim için)
 */
export const POPULAR_DESTINATIONS: Location[] = [
  {
    id: 'istanbul',
    name: 'İstanbul',
    display_name: 'İstanbul, Türkiye',
    lat: 41.0082,
    lon: 28.9784,
    type: 'city',
  },
  {
    id: 'ankara',
    name: 'Ankara',
    display_name: 'Ankara, Türkiye',
    lat: 39.9334,
    lon: 32.8597,
    type: 'city',
  },
  {
    id: 'izmir',
    name: 'İzmir',
    display_name: 'İzmir, Türkiye',
    lat: 38.4161,
    lon: 27.1386,
    type: 'city',
  },
  {
    id: 'antalya',
    name: 'Antalya',
    display_name: 'Antalya, Türkiye',
    lat: 36.9071,
    lon: 30.7133,
    type: 'city',
  },
  {
    id: 'london',
    name: 'London',
    display_name: 'London, United Kingdom',
    lat: 51.5074,
    lon: -0.1278,
    type: 'city',
  },
  {
    id: 'paris',
    name: 'Paris',
    display_name: 'Paris, France',
    lat: 48.8566,
    lon: 2.3522,
    type: 'city',
  },
  {
    id: 'barcelona',
    name: 'Barcelona',
    display_name: 'Barcelona, Spain',
    lat: 41.3851,
    lon: 2.1734,
    type: 'city',
  },
  {
    id: 'rome',
    name: 'Rome',
    display_name: 'Rome, Italy',
    lat: 41.9028,
    lon: 12.4964,
    type: 'city',
  },
  {
    id: 'dubai',
    name: 'Dubai',
    display_name: 'Dubai, United Arab Emirates',
    lat: 25.2048,
    lon: 55.2708,
    type: 'city',
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    display_name: 'Tokyo, Japan',
    lat: 35.6762,
    lon: 139.6503,
    type: 'city',
  },
]
