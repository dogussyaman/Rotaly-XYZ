'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'
import { tr, enUS } from 'date-fns/locale'
import { CalendarIcon, MapPin, Users, Search, Minus, Plus, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { useLocationSearch } from '@/hooks/use-location-search'
import type { DateRange } from 'react-day-picker'
import type { Location } from '@/lib/api/locations'

interface GuestCount {
  adults: number
  children: number
  rooms: number
}

interface SearchBoxProps {
  variant?: 'default' | 'glass'
}

export function SearchBox({ variant = 'default' }: SearchBoxProps) {
  const isGlass = variant === 'glass'
  const router = useRouter()
  const { t, locale } = useI18n()
  const dateLocale = locale === 'tr' ? tr : enUS

  const [destination, setDestination] = useState('')
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [guests, setGuests] = useState<GuestCount>({
    adults: 1,
    children: 0,
    rooms: 1,
  })
  const [guestsOpen, setGuestsOpen] = useState(false)
  const [destinationOpen, setDestinationOpen] = useState(false)
  const destinationInputRef = useRef<HTMLInputElement>(null)

  // Location search hook'unu kullan
  const { query, setQuery, locations, isLoading, error } = useLocationSearch()

  const handleSearch = () => {
    const params = new URLSearchParams()
    
    // Lokasyon parametresi olarak seçilen lokasyonun koordinatlarını veya adını kullan
    const destinationValue = selectedLocation ? selectedLocation.display_name : destination
    if (destinationValue) params.set('destination', destinationValue)
    
    if (selectedLocation) {
      params.set('lat', selectedLocation.lat.toString())
      params.set('lon', selectedLocation.lon.toString())
    }
    
    if (dateRange?.from) params.set('checkIn', dateRange.from.toISOString())
    if (dateRange?.to) params.set('checkOut', dateRange.to.toISOString())
    params.set('adults', guests.adults.toString())
    params.set('children', guests.children.toString())
    params.set('rooms', guests.rooms.toString())

    router.push(`/search?${params.toString()}`)
  }

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location)
    setDestination(location.display_name)
    setDestinationOpen(false)
    setQuery('') // Arama sorgusunu temizle
  }

  const handleDestinationChange = (value: string) => {
    setDestination(value)
    setQuery(value) // Hook'ün debounced aramasını tetikle
    setSelectedLocation(null) // Manual yazı girildiyse seçimi temizle
  }

  const updateGuests = (type: keyof GuestCount, delta: number) => {
    setGuests((prev) => {
      const newValue = prev[type] + delta
      const min = type === 'adults' ? 1 : type === 'rooms' ? 1 : 0
      const max = type === 'rooms' ? 10 : 20
      return {
        ...prev,
        [type]: Math.max(min, Math.min(max, newValue)),
      }
    })
  }

  const formatGuestsLabel = () => {
    const parts = []
    parts.push(`${guests.adults} ${t('search.adult')}`)
    if (guests.children > 0) {
      parts.push(`${guests.children} ${t('search.child')}`)
    }
    return parts.join(', ')
  }

  return (
    <div className="relative w-full">
      {/* Main Container — glass variant wraps externally, default keeps its own card */}
      <div className={isGlass ? '' : 'relative'}>
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr_1fr_auto] gap-4 items-end">
          {/* Destination */}
          <Popover open={destinationOpen} onOpenChange={setDestinationOpen}>
            <PopoverTrigger asChild>
              <div className="space-y-2">
                <label className={`text-sm font-medium ${isGlass ? 'text-white/80' : 'text-muted-foreground'}`}>{t('search.destination')}</label>
                <div className="relative group">
                  <MapPin className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors ${isGlass ? 'text-white/60 group-focus-within:text-white' : 'text-muted-foreground group-focus-within:text-primary'}`} />
                  <Input
                    ref={destinationInputRef}
                    placeholder={t('search.destinationPlaceholder')}
                    value={destination}
                    onChange={(e) => handleDestinationChange(e.target.value)}
                    className={`pl-12 h-14 rounded-xl text-base ${isGlass ? 'bg-white/10 border-white/20 text-white placeholder:text-white/50 hover:border-white/40 focus-visible:ring-1 focus-visible:ring-white/60' : 'bg-secondary/50 border-border/50 hover:border-primary/50 focus-visible:ring-1 focus-visible:ring-primary'}`}
                  />
                  {isLoading && (
                    <Loader2 className={`absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 animate-spin ${isGlass ? 'text-white/60' : 'text-muted-foreground'}`} />
                  )}
                </div>
              </div>
            </PopoverTrigger>

            <PopoverContent className="w-96 rounded-xl border-border/50 p-0" align="start" side="bottom">
              <div className="max-h-96 overflow-y-auto">
                {locations && locations.length > 0 ? (
                  <ul className="p-2 space-y-1">
                    {locations.map((location) => (
                      <li key={location.id}>
                        <button
                          onClick={() => handleLocationSelect(location)}
                          className={cn(
                            'w-full text-left px-3 py-2 rounded-lg transition-colors',
                            isGlass
                              ? 'hover:bg-white/10'
                              : 'hover:bg-secondary/50'
                          )}
                        >
                          <p className={`font-medium ${isGlass ? 'text-white' : 'text-foreground'}`}>
                            {location.name}
                          </p>
                          <p className={`text-sm ${isGlass ? 'text-white/60' : 'text-muted-foreground'}`}>
                            {location.display_name}
                          </p>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : error ? (
                  <div className="p-4 text-center text-sm text-destructive">
                    {error}
                  </div>
                ) : (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    {t('search.noResults')}
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>

          {/* Check-in Date */}
          <div className="space-y-2">
            <label className={`text-sm font-medium ${isGlass ? 'text-white/80' : 'text-muted-foreground'}`}>{t('search.checkIn')}</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    `w-full h-14 justify-start text-left font-normal rounded-xl text-base ${isGlass ? 'bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/40' : 'bg-secondary/50 border-border/50 hover:border-primary/50 hover:bg-secondary/70'}`,
                    !dateRange?.from && (isGlass ? 'text-white/50' : 'text-muted-foreground')
                  )}
                >
                  <CalendarIcon className={`mr-3 h-5 w-5 ${isGlass ? 'text-white/60' : 'text-muted-foreground'}`} />
                  {dateRange?.from ? (
                    format(dateRange.from, "d MMM yyyy", { locale: dateLocale })
                  ) : (
                    t('dates.selectDate')
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 rounded-xl border-border/50" align="start">
                <div className="p-4 border-b border-border/50 bg-secondary/30">
                  <p className="text-sm font-medium text-center">{t('search.selectDates')}</p>
                </div>
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                  disabled={{ before: new Date() }}
                  locale={dateLocale}
                  className="p-3"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Check-out Date */}
          <div className="space-y-2">
            <label className={`text-sm font-medium ${isGlass ? 'text-white/80' : 'text-muted-foreground'}`}>{t('search.checkOut')}</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    `w-full h-14 justify-start text-left font-normal rounded-xl text-base ${isGlass ? 'bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/40' : 'bg-secondary/50 border-border/50 hover:border-primary/50 hover:bg-secondary/70'}`,
                    !dateRange?.to && (isGlass ? 'text-white/50' : 'text-muted-foreground')
                  )}
                >
                  <CalendarIcon className={`mr-3 h-5 w-5 ${isGlass ? 'text-white/60' : 'text-muted-foreground'}`} />
                  {dateRange?.to ? (
                    format(dateRange.to, "d MMM yyyy", { locale: dateLocale })
                  ) : (
                    t('dates.selectDate')
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 rounded-xl border-border/50" align="start">
                <div className="p-4 border-b border-border/50 bg-secondary/30">
                  <p className="text-sm font-medium text-center">{t('search.selectDates')}</p>
                </div>
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                  disabled={{ before: new Date() }}
                  locale={dateLocale}
                  className="p-3"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Guests */}
          <div className="space-y-2">
            <label className={`text-sm font-medium ${isGlass ? 'text-white/80' : 'text-muted-foreground'}`}>{t('search.guests')}</label>
            <Popover open={guestsOpen} onOpenChange={setGuestsOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full h-14 justify-start text-left font-normal rounded-xl text-base ${isGlass ? 'bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/40' : 'bg-secondary/50 border-border/50 hover:border-primary/50 hover:bg-secondary/70'}`}
                >
                  <Users className={`mr-3 h-5 w-5 ${isGlass ? 'text-white/60' : 'text-muted-foreground'}`} />
                  {formatGuestsLabel()}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 rounded-xl border-border/50 p-0" align="start">
                <div className="p-4 border-b border-border/50 bg-secondary/30">
                  <p className="text-sm font-medium">{t('search.guests')}</p>
                </div>
                <div className="p-4 space-y-5">
                  {/* Adults */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{t('search.adults')}</p>
                      <p className="text-sm text-muted-foreground">18+</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10 rounded-full bg-transparent border-border/50 hover:border-primary/50"
                        onClick={() => updateGuests('adults', -1)}
                        disabled={guests.adults <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-10 text-center font-semibold text-lg">{guests.adults}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10 rounded-full bg-transparent border-border/50 hover:border-primary/50"
                        onClick={() => updateGuests('adults', 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Children */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{t('search.children')}</p>
                      <p className="text-sm text-muted-foreground">0-17</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10 rounded-full bg-transparent border-border/50 hover:border-primary/50"
                        onClick={() => updateGuests('children', -1)}
                        disabled={guests.children <= 0}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-10 text-center font-semibold text-lg">{guests.children}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10 rounded-full bg-transparent border-border/50 hover:border-primary/50"
                        onClick={() => updateGuests('children', 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Rooms */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{t('search.rooms')}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10 rounded-full bg-transparent border-border/50 hover:border-primary/50"
                        onClick={() => updateGuests('rooms', -1)}
                        disabled={guests.rooms <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-10 text-center font-semibold text-lg">{guests.rooms}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10 rounded-full bg-transparent border-border/50 hover:border-primary/50"
                        onClick={() => updateGuests('rooms', 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Search Button */}
          <Button
            size="lg"
            className="h-14 w-full px-14 rounded-xl bg-gradient-to-r from-primary to-blue-600 hover:opacity-90 transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 group"
            onClick={handleSearch}
          >
            <Search className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
            {t('search.searchButton')}
          </Button>
        </div>
      </div>
    </div>
  )

}
