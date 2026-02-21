'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useI18n } from '@/lib/i18n'
import { SearchBox } from '@/components/search/search-box'
import { cn } from '@/lib/utils'

// Single static hero image
const heroImage =
  'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1920&h=1080&fit=crop&q=90'

export function HeroSection() {
  const { locale } = useI18n()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative w-full" style={{ marginTop: '-72px' }}>
      {/* Hero image container with curved bottom */}
      <div className="relative w-full" style={{ minHeight: '85svh' }}>
        {/* Background image */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={heroImage}
            alt="Hero background"
            fill
            priority
            className="object-cover"
          />
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Left vignette */}
        <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black/50 to-transparent pointer-events-none z-10" />

        {/* Content */}
        <div className="relative z-20 flex flex-col justify-center h-full" style={{ minHeight: '85svh', paddingTop: '72px' }}>
          <div className="container mx-auto px-4 pb-16 md:pb-24">
            {/* Hero headline — static, no typewriter */}
            <div
              className={cn(
                'max-w-2xl mb-10 transition-all duration-1000',
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
                {locale === 'tr' ? (
                  <>
                    Dinlenmek İçin<br />
                    <span className="text-white/90">Tasarlandı.</span>
                  </>
                ) : (
                  <>
                    Designed for rest.<br />
                    <span className="text-white/90">Styled for you.</span>
                  </>
                )}
              </h1>
              <p className="text-white/70 text-lg md:text-xl leading-relaxed drop-shadow max-w-lg">
                {locale === 'tr'
                  ? 'Mahremiyet, konfor ve doğayla derin bir bağ arayanlar için tasarlanmış butik konaklama koleksiyonumuzu keşfedin.'
                  : 'We offer a curated collection of boutique apartments designed for those who seek privacy, comfort, and a deeper connection with nature.'}
              </p>
            </div>

            {/* CTA Button */}
            <div
              className={cn(
                'transition-all duration-1000 delay-300',
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
            >
              <a
                href="#properties"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-white/60 text-white font-medium text-lg hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm bg-white/5"
              >
                <span className="w-2 h-2 rounded-full bg-white" />
                {locale === 'tr' ? 'Odalarımızı keşfedin' : 'Explore our rooms'}
                <span className="w-2 h-2 rounded-full bg-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Curved bottom edge — white wave shape */}
        <div className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full block"
            preserveAspectRatio="none"
            style={{ height: '120px' }}
          >
            <path
              d="M0,120 L0,60 Q360,0 720,60 Q1080,120 1440,60 L1440,120 Z"
              className="fill-background"
            />
          </svg>
        </div>
      </div>

      {/* Search box positioned over the curved transition */}
      <div className="relative z-40 -mt-28 md:-mt-24">
        <div className="container mx-auto px-4">
          <div
            className={cn(
              'transition-all duration-1000 delay-500',
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            <SearchBoxGlass />
          </div>
        </div>
      </div>
    </section>
  )
}

// Inline glass wrapper for the SearchBox
function SearchBoxGlass() {
  return (
    <div className="relative max-w-6xl mx-auto">
      {/* Glow ring */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary/30 via-sky-400/20 to-primary/30 blur-xl opacity-80" />
      {/* Glass container */}
      <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl backdrop-blur-xl bg-white/80 dark:bg-black/40 p-5 md:p-6">
        <SearchBox variant="default" />
      </div>
    </div>
  )
}
