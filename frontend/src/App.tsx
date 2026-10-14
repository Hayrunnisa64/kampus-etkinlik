import "./App.css";
import { useEffect, useState } from "react";
import type { CampusEvent, Category } from "./types/campus-event";
import { events } from "./data/events";
import {
  filterByCategory,
  findEventById,
  searchEvents,
} from "./utils/filter-events";

// Sayfa adları (Router yok, açık sayfayı state tutar)
type PageName = "home" | "events" | "detail" | "add" | "update";

// Menüde görünen sayfalar (Detay ve Güncelle menüde yok)
const menuItems: { page: PageName; label: string }[] = [
  { page: "home", label: "Ana Sayfa" },
  { page: "events", label: "Etkinlikler" },
  { page: "add", label: "Ekle" },
];

// Kategori seçenekleri veriden, her biri bir kez
const categories = [...new Set(events.map((e) => e.category))];

// "12-10-2026" → "12 Ekim 2026"
const formatDate = (d: string) => new Date(d.split("-").reverse().join("-") + "T00:00").toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  // Sayfa değiştiren tek fonksiyon
  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  // Ana sayfa: tarihi en yakın 2 etkinlik
  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  // Etkinlikler: filtreli liste state değil, her çizimde hesaplanır
  const filtered = filterByCategory(searchEvents(events, searchText), category);

  // Detay: seçili id'den etkinlik
  const selected = selectedId
    ? findEventById(events, selectedId)
    : undefined;

  // Sayfaya göre başlık ve alt başlık
  let title = "Kampüs Etkinlikleri";
  let subtitle = "";
  if (page === "home") {
    subtitle = "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.";
  } else if (page === "events") {
    title = "Tüm Etkinlikler";
    subtitle = "Ekim ayında kampüste düzenlenen etkinlikler.";
  } else if (page === "detail") {
    title = selected ? selected.title : "Etkinlik bulunamadı";
  } else if (page === "add") {
    title = "Etkinlik Ekle";
  } else if (page === "update") {
    title = "Etkinlik Güncelle";
  }

  // Başlık değişince sekme adı da değişsin
  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${title}`;
  }, [title]);

  // Kart: ana sayfada ve Etkinlikler sayfasında kullanılır
  function renderCard(event: CampusEvent) {
    return (
      <article className="kart" key={event.id}>
        <h3>{event.title}</h3>
        <p>
          <span className="rozet">{event.category}</span>
        </p>
        <p>
          Tarih: {formatDate(event.date)}, {event.time}
        </p>
        <p>Yer: {event.location}</p>
        <p>Kontenjan: {event.capacity} kişi</p>
        <p>{event.description}</p>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            go("detail", event.id);
          }}
        >
          Detayları gör
        </a>
      </article>
    );
  }

  return (
    <>
      <header className="site-baslik">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
        <nav className="menu">
          {menuItems.map((item) => (
            <a
              key={item.page}
              href="#"
              aria-current={page === item.page ? "page" : undefined}
              onClick={(e) => {
                e.preventDefault();
                go(item.page);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        {/* ---------- Ana sayfa ---------- */}
        {page === "home" && (
          <>
            <section>
              <h2>Yaklaşan 2 Etkinlik</h2>
              <section className="etkinlik-listesi kartlar">
                {upcoming.map(renderCard)}
              </section>
            </section>
            <p>
              <a
                className="buton"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  go("events");
                }}
              >
                Tüm etkinlikleri gör
              </a>
            </p>
          </>
        )}

        {/* ---------- Etkinlikler ---------- */}
        {page === "events" && (
          <>
            <form className="filtre" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="arama">Etkinlik ara</label>
              <input
                type="search"
                id="arama"
                placeholder="Örn. atölye, kariyer"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <label htmlFor="kategori-filtre">Kategori</label>
              <select
                id="kategori-filtre"
                value={category}
                onChange={(e) => setCategory(e.target.value as Category | "")}
              >
                <option value="">Tümü</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </form>

            <p id="sonuc">
              {filtered.length === 0
                ? "Aramanıza uygun etkinlik bulunamadı."
                : `${filtered.length} etkinlik listeleniyor.`}
            </p>

            <section className="etkinlik-listesi kartlar">
              {filtered.map(renderCard)}
            </section>
          </>
        )}

        {/* ---------- Detay: bulunamadı ---------- */}
        {page === "detail" && !selected && (
          <>
            <div className="hata-kutusu">
              <p>Etkinlik bulunamadı. Listeden bir etkinlik seçin.</p>
            </div>
            <p>
              <a
                className="buton"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  go("events");
                }}
              >
                ← Listeye dön
              </a>
            </p>
          </>
        )}

        {/* ---------- Detay ---------- */}
        {page === "detail" && selected && (
          <article className={selected.image ? "detay afisli" : "detay"}>
            {selected.image && (
              <figure className="afis">
                <img
                  src={selected.image}
                  alt={`${selected.title} etkinlik afişi`}
                />
                <figcaption>{selected.title} afişi</figcaption>
              </figure>
            )}

            <section className="kunye">
              <h2>Etkinlik Künyesi</h2>
              <dl>
                <dt>Tarih</dt>
                <dd>
                  {formatDate(selected.date)}, {selected.time}
                </dd>
                <dt>Yer</dt>
                <dd>{selected.location}</dd>
                <dt>Kategori</dt>
                <dd>{selected.category}</dd>
                <dt>Kontenjan</dt>
                <dd>{selected.capacity} kişi</dd>
              </dl>
            </section>

            <section className="aciklama">
              <h2>Açıklama</h2>
              <p>{selected.description}</p>
              <p className="butonlar">
                <a
                  className="buton"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    go("events");
                  }}
                >
                  ← Listeye dön
                </a>
                <a
                  className="buton"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    go("update", selected.id);
                  }}
                >
                  Bu etkinliği güncelle
                </a>
              </p>
            </section>
          </article>
        )}

        {/* ---------- Ekle ve Güncelle (sadece görünüm) ---------- */}
        {(page === "add" || page === "update") && (
          <>
            <p id="form-aciklama">
              Bu sprintte form sadece görünüm; kayıt yapılmaz.
            </p>

            <form
              className="form"
              id="etkinlik-formu"
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor="title">Etkinlik Adı</label>
              <input
                type="text"
                id="title"
                name="title"
                maxLength={80}
                placeholder="Örn. Kariyer Günleri 2026"
              />

              <label htmlFor="category">Kategori</label>
              <select id="category" name="category" defaultValue="">
                <option value="">Seçiniz</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <label htmlFor="date">Tarih</label>
              <input type="date" id="date" name="date" />

              <label htmlFor="time">Saat</label>
              <input type="time" id="time" name="time" />

              <label htmlFor="location">Yer</label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="Örn. A Blok Konferans Salonu"
              />

              <label htmlFor="capacity">Kontenjan</label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                min={1}
                max={1000}
              />

              <label htmlFor="description">Açıklama</label>
              <textarea id="description" name="description" rows={5} />

              <button type="submit">
                {page === "add" ? "Kaydet" : "Güncelle"}
              </button>
            </form>
          </>
        )}
      </main>

      <footer>
        <p>Hayrunnisa Altınkaya &middot; 2416501087 &middot; 2026</p>
      </footer>
    </>
  );
}

export default App;