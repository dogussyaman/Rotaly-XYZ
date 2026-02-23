# Lokasyon Arama - Hızlı Referans

## 🎯 Ne Yapıldı?

Rotaly arama kutusunun lokasyon seçim alanına **gerçek dünya lokasyon verileri** bağlanmıştır.

## 📂 Yeni Dosyalar

| Dosya | Amaç |
|-------|------|
| `lib/api/locations.ts` | Nominatim API ve popüler destinasyonlar |
| `hooks/use-location-search.ts` | Debounced arama hook'u |
| `app/api/locations/search/route.ts` | Server-side API endpoint |

## ✨ Eklenen Özellikler

### Search-Box Component

**Eski:** Sadece text input  
**Yeni:** 
- ✅ Gerçek lokasyon önerileri
- ✅ OpenStreetMap verileri
- ✅ Yükleme göstergesi
- ✅ Popüler destinasyonlar fallback'i
- ✅ Konum koordinatları (lat/lon)

## 🔌 Nasıl Kullanılır?

```typescript
import { useLocationSearch } from '@/hooks/use-location-search'

// Component'te
const { query, setQuery, locations, isLoading, error } = useLocationSearch()

// Kullanıcı yazıyor
onChange={(e) => setQuery(e.target.value)}

// Lokasyonlar otomatik güncellenir
{locations.map(loc => (
  <div key={loc.id}>
    {loc.name} - {loc.display_name}
  </div>
))}
```

## 🌐 Nominatim API Nedir?

OpenStreetMap'in ücretsiz lokasyon arama servisi:
- ✅ API anahtarı yok
- ✅ Dünya geneli veri
- ✅ CORS sorun yok
- ✅ Rate limit: 1 istek/saniye (debounce ile halloldu)

## ⚙️ Yapılandırma

### Ülkeleri Filtrele
`lib/api/locations.ts` → `searchLocations()` → `countrycodes`

```typescript
countrycodes: 'tr,us,gb'  // Sadece Türkiye, ABD, İngiltere
```

### Debounce Süresini Değiştir
`hooks/use-location-search.ts` kullanılırken:

```typescript
useLocationSearch({ debounceMs: 500 })  // Varsayılan 300ms
```

### Popüler Destinasyonları Ekle/Sil
`lib/api/locations.ts` → `POPULAR_DESTINATIONS` array

## 🧪 Test Etme

```bash
# 1. Dev sunucuyu başlat
npm run dev

# 2. Tarayıcıda
# http://localhost:3000 → Arama kutusunun destination alanına tıkla

# 3. Yaz ve öneri al
# Örn: "ist", "par", "toki"

# 4. API endpoint'i test et
curl "http://localhost:3000/api/locations/search?q=istanbul"
```

## 📤 Arama URL'leri

Lokasyon seçildikten sonra oluşan URL:

```
/search?
  destination=İstanbul, Türkiye
  lat=41.0082
  lon=28.9784
  checkIn=2026-02-25T00:00:00Z
  checkOut=2026-02-27T00:00:00Z
  adults=2
  children=0
  rooms=1
```

## 🚨 Hata Ayıklama

| Sorun | Çözüm |
|-------|------|
| Lokasyon görmüyorum | Tarayıcı konsolunu aç (F12) |
| Çok yavaş | debounceMs artır (500-1000) |
| CORS hatası | Nominatim açık erişimli, proxy yok |
| Aynı okasyonlar | Arama sorgusunu temizle |

## 📋 Dosya Yapısı

```
Rotaly/
├── lib/
│   ├── api/
│   │   └── locations.ts         ← Lokasyon arama servisi
│   └── utils.ts                 (değiştirilmedi)
├── hooks/
│   ├── use-location-search.ts   ← Arama hook'u
│   └── use-toast.ts             (değiştirilmedi)
├── app/
│   ├── api/
│   │   └── locations/
│   │       └── search/
│   │           └── route.ts     ← API endpoint
│   └── ...
├── components/
│   └── search/
│       └── search-box.tsx       ← Güncellenmiş
└── LOCATION_SETUP.md            ← Detaylı kılavuz
```

## 🎨 UI Özellikleri

```tsx
{isLoading && <Loader2 className="animate-spin" />}  // Yükleme spinner
{locations.map(loc => ...)}      // Öneriler listesi
{error && <div>{error}</div>}    // Hata mesajı
```

## 🔐 CORS & Güvenlik

✅ Nominatim API CORS açık  
✅ User-Agent header eklendi (gerekli)  
✅ Rate limiting Nominatim'de (debounce ile optimizasyon)  

## 📞 İletişim HALERİ

- **API İşlemez?** → Nominatim'in status'unu kontrol et
- **Öneriler yok?** → POPULAR_DESTINATIONS'a dek görecek
- **Koordinatlar yanlış?** → Nominatim'nin verisinden kaynaklanabilir

## 🚀 Sonraki Adımlar (Opsiyonel)

1. **Search sayfasını güncelle** - Gelen lat/lon parametrelerini kullan
2. **Harita preview ekle** - Mapbox ile konumları göster
3. **Supabase cache** - Sık aramalan sakla
4. **İstatistikler** - En çok aranan lokasyonlar

---

**Kısa özet:** "Destination" alanı artık gerçek lokasyon verileri göster. Nominatim API'den otomatik öneriler gelir. Popüler destinasyonlar fallback olarak çalışır. 🎉
