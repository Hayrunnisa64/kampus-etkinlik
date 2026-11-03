https://hayrunnisaaltinkaya-frontend.vercel.app

# Kampüs Etkinlikleri — Sprint 6 (Vize)

Kampüs etkinliklerini listeleyen, arayan ve yöneten React uygulaması. React Router ile 10 sayfa, Context ile ortak veri; ekleme, güncelleme ve silme tüm sayfalarda görünür.

**Hazırlayan:** Hayrunnisa Altınkaya - 2416501087

## Sayfalar (10 route)

| Adres | Sayfa |
| --- | --- |
| `/` | Ana Sayfa: yaklaşan 2 etkinlik |
| `/events` | Etkinlikler: arama ve kategori filtresi |
| `/events/:id` | Etkinlik detayı |
| `/admin` | Yönetim: tablo, düzenle, sil (onaylı) |
| `/admin/new` | Etkinlik ekle |
| `/admin/:id/edit` | Etkinlik güncelle |
| `/login` | Giriş yap |
| `/register` | Kayıt ol |
| `/forgot-password` | Şifremi unuttum |
| `*` | Sayfa bulunamadı |

## Klasör yapısı

| Klasör | İçerik |
| --- | --- |
| `src/components/layout/` | Header, Navigation, Footer |
| `src/components/events/` | EventCard, EventList, EventFilter, EventDetail |
| `src/components/forms/` | EventForm |
| `src/context/` | EventsContext: etkinlik listesi, ekle, güncelle, sil |
| `src/pages/` | 10 sayfa |
| `src/data/` | Başlangıçtaki 6 etkinlik |
| `src/types/` | CampusEvent tipi |
| `src/utils/` | filter-events, format-date, validate-event |

## Özellikler

- Etkinlik ekleme, güncelleme ve silme (silmeden önce onay); değişiklik Ana Sayfa, Etkinlikler ve Detay'da görünür.
- Arama ve kategori filtresi birlikte çalışır.
- Form doğrulama: etkinlik formu, giriş, kayıt, şifremi unuttum.
- Telefonda yönetim tablosu kart görünümüne geçer.
- Veriler bellekte tutulur; sayfa yenilenince başlangıç verisine döner.

## Numaraya göre renk ve font

- `--no: 2416501087` → `--ton` = 2416501087 mod 360 = **7** (kırmızı tonları)
- Son hane **7** → `--font: "Palatino Linotype", serif`

## Çalıştırma

```bash
cd frontend
npm install
npm run dev
```