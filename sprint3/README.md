https://kampus-etkinlik-plum.vercel.app

# Kampüs Etkinlikleri

Kampüste düzenlenen etkinlikleri listelemek, aramak, detaylarını göstermek ve yeni etkinlik eklemek için hazırlanmış bir web projesidir.

**Hazırlayan:** Hayrunnisa Altınkaya - 2416501087

## Sprint 3 — JavaScript ve DOM

Sprint 2'deki sayfalar `sprint3` klasörüne kopyalandı. Etkinlikler artık HTML'e elle yazılmıyor; tek bir veri dosyasından JavaScript ile üretiliyor. Framework, jQuery ve localStorage kullanılmadı. Modüller `type="module"` ile yüklendiği için sayfalar bir sunucudan (Live Server veya Vercel) açılmalıdır.

| Sayfa | Modül | Ne yapıyor? |
| --- | --- | --- |
| `index.html` | `event-list.js` | Tarihi en yakın 2 etkinliği gösterir (`data-limit="2"`) |
| `etkinlikler.html` | `event-list.js` | 6 etkinliği listeler; arama ve kategori filtresi birlikte çalışır |
| `etkinlik-detay.html` | `event-detail.js` | Adresteki `?id=` ile doğru etkinliği açar; geçersiz id'de hata kutusu gösterir |
| `etkinlik-ekle.html` | `event-form.js` | Formu doğrular; hatalı alanları kırmızı gösterir, doğruysa oluşan nesneyi yeşil kutuda yazar |
| `etkinlik-guncelle.html` | `event-form.js` | Detaydaki "Bu etkinliği güncelle" butonuyla, o etkinliğin bilgileriyle dolu açılır |

### Modüller

- `js/data.js` — 6 etkinlik tek bir dizide (`export const events`). HTML'e bağlanmaz, diğer modüller `import` eder.
- `js/event-list.js` — Kartları `createCard` ile üretir, ana sayfada ilk 2'yi gösterir, arama + kategori filtresini çalıştırır.
- `js/event-detail.js` — `URLSearchParams` ve `find` ile etkinliği bulur; başlığı, sekme adını ve künyeyi doldurur.
- `js/event-form.js` — `FormData` ile formu nesneye çevirir, kuralları kontrol eder, güncelleme sayfasında formu doldurur.

### Form kuralları

| Alan | Hata sayılır |
| --- | --- |
| Etkinlik adı | 3 karakterden kısa |
| Kategori | seçilmemiş |
| Tarih, saat | boş |
| Yer | boş |
| Kontenjan | girildiyse 1–1000 dışı |

Bu sprintte veri kaydedilmez; kalıcı kayıt backend sprintlerinde gelecek.

## Sprint 2 — CSS ve Telefon Uyumu

Sprint 1'deki sayfalar `sprint2` klasörüne kopyalandı ve CSS eklendi. Tasarım önce telefon için yazıldı, geniş ekranda `@media` ile birden fazla sütuna geçiyor.

| Sayfa | İçerik |
| --- | --- |
| `index.html` | Kısa tanıtım ve yaklaşan 2 etkinlik kartı |
| `etkinlikler.html` | Tüm etkinlikler kart olarak (telefonda tek sütun) |
| `etkinlik-detay.html` | Afiş solda, künye (`dl`) sağda; telefonda alt alta |
| `etkinlik-ekle.html` | Label üstte form; boş bırakılan alan kırmızı görünür |
| `etkinlik-guncelle.html` | Aynı form, alanlar dolu gelir |

### Numaraya göre renk ve font

Stil dosyası: `css/2416501087.css`

- `--no: 2416501087` → `--ton` = 2416501087 mod 360 = **7** (kırmızı tonları)
- Numaranın son hanesi **7** → `--font: "Palatino Linotype", serif`
- Dosyadaki bütün renk ve boşluklar `var(--...)` ile yazıldı.

## Sprint 1 — HTML

Sadece HTML kullanıldı, CSS ve JavaScript yoktur. Hocanın izniyle `index.html` ve etkinlikler sayfası tek sayfada birleştirildi. Sprint 2'de bu iki sayfa tekrar ayrıldı.

| Sayfa | İçerik |
| --- | --- |
| `index.html` | Uygulamanın amacı, etkinlik listesi ve Ayın Programı tablosu |
| `etkinlik-detay.html` | Afiş, künye bilgileri ve açıklama |
| `etkinlik-ekle.html` | Yeni etkinlik ekleme formu |
| `etkinlik-guncelle.html` | Bilgileri dolu gelen güncelleme formu |

## Klasör Yapısı

```
kampus-etkinlik
├── sprint1
│   ├── index.html
│   ├── etkinlik-detay.html
│   ├── etkinlik-ekle.html
│   ├── etkinlik-guncelle.html
│   └── afis.jpg
├── sprint2
│   ├── css
│   │   └── 2416501087.css
│   ├── index.html
│   ├── etkinlikler.html
│   ├── etkinlik-detay.html
│   ├── etkinlik-ekle.html
│   ├── etkinlik-guncelle.html
│   └── afis.jpg
├── sprint3
│   ├── css
│   │   └── 2416501087.css
│   ├── js
│   │   ├── data.js
│   │   ├── event-list.js
│   │   ├── event-detail.js
│   │   └── event-form.js
│   ├── index.html
│   ├── etkinlikler.html
│   ├── etkinlik-detay.html
│   ├── etkinlik-ekle.html
│   ├── etkinlik-guncelle.html
│   ├── afis.jpg
│   └── robotik.jpg
├── .gitignore
└── README.md
```

## Çalıştırma

- **Sprint 1 ve 2:** İlgili klasördeki `index.html` dosyasını tarayıcıda açmak yeterlidir.
- **Sprint 3:** VS Code'da `sprint3/index.html` dosyasına sağ tıklayıp **Open with Live Server** seçilmelidir (`http://127.0.0.1:5500/sprint3/`). Dosyaya çift tıklayarak (`file://`) açılırsa modüller çalışmaz.

## Etiketler

- `sprint-02` — Sprint 2 teslimi
- `sprint-03` — Sprint 3 teslimi