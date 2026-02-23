import { NextRequest, NextResponse } from 'next/server'
import { searchLocations } from '@/lib/api/locations'

/**
 * GET /api/locations/search?q=istanbul
 * Lokasyon araması API endpoint'i
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q')

    if (!query || query.length < 2) {
      return NextResponse.json(
        { error: 'Arama sorgusu en az 2 karakter olmalıdır' },
        { status: 400 }
      )
    }

    const results = await searchLocations(query)

    return NextResponse.json(
      {
        success: true,
        data: results,
        count: results.length,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    )
  } catch (error) {
    console.error('Lokasyon API hatası:', error)

    return NextResponse.json(
      {
        error: 'Lokasyon araması başarısız oldu',
        success: false,
      },
      { status: 500 }
    )
  }
}
