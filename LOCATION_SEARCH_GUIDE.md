# Lokasyon Arama Sistemi

Bu belgede Rotaly uygulamasının lokasyon arama ve seçim sisteminin nasıl çalıştığı anlatılmıştır.

## 📍 Özellikler

- **Gerçek Lokasyon Verileri**: OpenStreetMap/Nominatim API kullanarak dünya genelindeki şehirleri ve konumları arar
- **Otomatik Tamamlama**: Kullanıcı yazarken ilgili lokasyonları gösterir
- **Popüler Destinasyonlar**: Hızlı erişim için önceden seçilmiş popüler turist destinasyonları
- **Koordinat Desteği**: Seçilen lokasyonun enlem/boylam bilgisini arama parametrelerine ekler
- **Debounced Arama**: Ağ isteklerini azaltmak için yazma süresi kısaltılıyor
- **Hata Yönetimi**: Arama başarısız olursa popüler destinasyonlara geri döner

## 🏗️ Mimari

### Dosyalar

```
lib/api/locations.ts          # Lokasyon arama servisi
hooks/use-location-search.ts  # React hook (debounce, yükleme durumu)
app/api/locations/search      # API endpoint (opsiyonel)
components/search/search-box.tsx  # UI bileşeni
```

### Veri Akışı

```
User Types in Searchbox
    ↓
handleDestinationChange()
    ↓
useLocationSearch hook (debounced)
    ↓
searchLocations() - Nominatim API'sine sorgu gönder
    ↓
Lokasyon önerileri göster
    ↓
User tıklama/seç
    ↓
handleLocationSelect() - Seçimi kaydet
```

## 🔍 Nominatim API

OpenStreetMap projesi tarafından sağlanan ücretsiz lokasyon arama servisidir.

### Özellikleri

- **API Anahtarı Gerekmez**: Tamamen ücretsiz
- **Dünya Geneli Kapsama**: Tüm ülkeler, şehirler ve konumlar
- **Açık Veri**: OpenStreetMap açık haritası kullanır

### Rate Limiting

- Maksimum 1 istek/saniye
- Uyarımız zaten debouncing kullandığından sorun olmayacak

**User-Agent Zorunlu**: Header'a `User-Agent` ekledik (başlık gerekli)

## 💾 Popüler Destinasyonlar

Arama başarısız veya boş olması durumunda göçterilen önceden tanımlanmış listedir:

```typescript
// lib/api/locations.ts içinde
POPULAR_DESTINATIONS = [
  İstanbul, Ankara, İzmir, Antalya (Türkiye)
  London, Paris, Barcelona, Rome (Avrupa)
  Dubai, Tokyo (Uluslararası)
]
```

Listeyi genişletebilir veya özelleştirebilirsiniz.

## 🎣 Hook Kullanımı

### `useLocationSearch`

```typescript
const { query, setQuery, locations, isLoading, error } = useLocationSearch({
  debounceMs: 300  // Opsiyonel: debounce gecikmesi
})
```

**Dönen Değerler:**
- `query`: Mevcut arama sorgusu
- `setQuery`: Arama sorgusunu ayarla
- `locations`: Bulunan lokasyonlar
- `isLoading`: Arama yapılıyor mu?
- `error`: Hata mesajı (varsa)

## 📤 Arama Parametreleri

Arama URL'si şu parametreleri içerir:

```
/search?
  destination=İstanbul, Türkiye
  lat=41.0082
  lon=28.9784
  checkIn=2026-02-25T00:00:00.000Z
  checkOut=2026-02-27T00:00:00.000Z
  adults=2
  children=0
  rooms=1
```

## 🔒 CORS ve Güvenlik

Nominatim API'si genel erişime açıktır ve CORS sorunları yoktur. İstekler:

- Browser'dan doğrudan yapılır (CORS başarısız olmaz)
- NextJS API route'u üzerinden yapılabilir (sonradan cache için)

## 🚀 İleriye Dönük İyileştirmeler

### 1. **Supabase Entegrasyonu** (Opsiyonel)
```sql
CREATE TABLE locations (
  id UUID PRIMARY KEY,
  name VARCHAR,
  display_name VARCHAR,
  lat FLOAT,
  lon FLOAT
)
```

### 2. **Google Places API** (Premium)
Daha iyi filtreleme ve daha hızlı sonuçlar için:

```typescript
const response = await fetch(
  `https://places.googleapis.com/v1/places:searchText`,
  {
    headers: { 'X-Goog-Api-Key': process.env.GOOGLE_PLACES_API_KEY }
  }
)
```

### 3. **Lokasyon Önerileri Geçmişi**
Kullanıcının önceki aramalarını localStorage/Supabase'e kaydetmek

### 4. **Kategori Filtreleme**
Oteller, şehirler, ülkeler gibi filtreleme seçenekleri

## 🧪 Test

### Manuel Test
1. Sayfaya git
2. Destination input'a tıkla
3. Birkaç harf yaz (ör: "ist")
4. Önerileri gör ve birini seç
5. Arama parametrelerini kontrol et

### API Test
```bash
curl "http://localhost:3000/api/locations/search?q=istanbul"
```

## ⚠️ Hata Ayıklama

**Lokasyonlar görünmüyor:**
- Tarayıcı konsolunu kontrol et (Network tab)
- Nominatim API var mı?
- Rate limiting var mı?

**Arama çok yavaş:**
- debounceMs değeri artır
- `useLocationSearch({ debounceMs: 500 })`

**CORS hatası:**
- Nominatim açık erişimli olduğundan oluşmamalı
- VPN/Proxy kapalı mı kontrol et

## 📚 Kaynaklar

- [Nominatim Documentation](https://nominatim.org/release-docs/latest/api/Search/)
- [OpenStreetMap](https://www.openstreetmap.org/)
- [React Hooks Best Practices](https://react.dev/reference/react/hooks)
