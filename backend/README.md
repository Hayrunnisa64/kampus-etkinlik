# Kampüs Etkinlikleri — Backend (Sprint 7)

**Hazırlayan:** Hayrunnisa Altınkaya - 2416501087

Kampüs etkinliklerini JSON olarak sunan Node + Express API'si. Veri şimdilik bellekte tutulur; sunucu yeniden başlayınca POST ile eklenen kayıtlar kaybolur.

## Çalıştırma

```
cd backend
npm install
npm run dev
```

Sunucu http://localhost:3000 adresinde açılır. `npm run dev` dosya değişince sunucuyu yeniden başlatır, `npm start` ise bir kez çalıştırır.

## Ortam değişkenleri

| Değişken | Açıklama |
| --- | --- |
| `PORT` | Sunucunun dinleyeceği port (varsayılan 3000) |

`.env.example` dosyasını `.env` adıyla kopyalayıp PORT değerini yaz. `.env` GitHub'a gönderilmez.

## REST Sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
| --- | --- | --- | --- | --- | --- |
| GET | `/events` | Listeyi getir | 200 | — | Bu sprint |
| GET | `/events/:id` | Tek etkinlik | 200 | 404 | Bu sprint |
| POST | `/events` | Yeni etkinlik | 201 | 400 | Bu sprint |
| PATCH | `/events/:id` | Güncelle | 200 | 400, 404 | Sprint 9 |
| DELETE | `/events/:id` | Sil | 204 | 404 | Sprint 9 |

## Status code'lar

200 tamam · 201 oluşturuldu · 204 içerik yok · 400 eksik/yanlış veri · 404 bulunamadı

## Hata biçimi

Bütün hatalar aynı biçimde döner:

```json
{ "error": { "message": "Event not found" } }
```