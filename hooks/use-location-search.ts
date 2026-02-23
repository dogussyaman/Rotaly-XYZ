import { useState, useCallback, useEffect } from 'react'
import { searchLocations, Location, POPULAR_DESTINATIONS } from '@/lib/api/locations'

interface UseLocationSearchOptions {
  debounceMs?: number
}

export function useLocationSearch(options: UseLocationSearchOptions = {}) {
  const { debounceMs = 300 } = options
  
  const [query, setQuery] = useState('')
  const [locations, setLocations] = useState<Location[]>(POPULAR_DESTINATIONS)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Debounced search
  useEffect(() => {
    // Boş sorgu → popüler destinasyonları göster
    if (!query || query.trim().length === 0) {
      setLocations(POPULAR_DESTINATIONS)
      setIsLoading(false)
      setError(null)
      return
    }

    // 2 karakterden az → arama yapma
    if (query.length < 2) {
      setLocations(POPULAR_DESTINATIONS)
      return
    }

    setIsLoading(true)
    setError(null)

    const timer = setTimeout(async () => {
      try {
        const results = await searchLocations(query)
        setLocations(results.length > 0 ? results : POPULAR_DESTINATIONS)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Lokasyon aranırken hata oluştu')
        setLocations(POPULAR_DESTINATIONS)
      } finally {
        setIsLoading(false)
      }
    }, debounceMs)

    return () => clearTimeout(timer)
  }, [query, debounceMs])

  const handleSearch = useCallback((value: string) => {
    setQuery(value)
  }, [])

  return {
    query,
    setQuery: handleSearch,
    locations,
    isLoading,
    error,
  }
}
