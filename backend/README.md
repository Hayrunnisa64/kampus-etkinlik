# Kampüs Etkinlikleri — Backend (Sprint 9)

**Hazırlayan:** Hayrunnisa Altınkaya - 2416501087

Kampüs etkinliklerini JSON olarak sunan Node + Express API'si. Veriler MongoDB Atlas'ta tutulur; sunucu yeniden başlasa da kayıtlar kalır.

## Çalıştırma

```
cd backend
npm install
npm run seed
npm run dev
```

Sunucu http://localhost:3000 adresinde açılır. `npm run dev` dosya değişince sunucuyu yeniden başlatır, `npm start` ise bir kez çalıştırır. `npm run seed` örnek etkinlikleri veritabanına yükler.

## Ortam değişkenleri

| Değişken | Açıklama |
| --- | --- |
| `PORT` | Sunucunun dinleyeceği port (varsayılan 3000) |
| `MONGODB_URI` | MongoDB bağlantı adresi |

`.env.example` dosyasını `.env` adıyla kopyalayıp değerleri yaz. `.env` GitHub'a gönderilmez.

## REST Sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
| --- | --- | --- | --- | --- | --- |
| GET | `/events` | Listeyi getir (`?search=` ve `?category=` ile süz) | 200 | — | Bu sprint |
| GET | `/events/upcoming` | Yaklaşan etkinlikler, tarihe göre sıralı | 200 | — | çalışıyor |
| GET | `/events/:id` | Tek etkinlik | 200 | 404 | Bu sprint |
| POST | `/events` | Yeni etkinlik | 201 | 400 | Bu sprint |
| PATCH | `/events/:id` | Güncelle | 200 | 400, 404 | çalışıyor |
| DELETE | `/events/:id` | Sil | 204 | 404 | çalışıyor |

## Status code'lar

200 tamam · 201 oluşturuldu · 204 içerik yok · 400 eksik/yanlış veri · 404 bulunamadı

## Hata biçimi

Bütün hatalar aynı biçimde döner:

```json
{ "error": { "message": "Event not found" } }
```