import type { PageName } from "./types/page";
import "./App.css";
import { useEffect, useState } from "react";
import type { Category } from "./types/campus-event";
import { events } from "./data/events";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";
import {
  filterByCategory,
  findEventById,
  searchEvents,
} from "./utils/filter-events";


// Kategori seçenekleri veriden, her biri bir kez
const categories = [...new Set(events.map((e) => e.category))];

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

  return (
    <>
      <Header title={title} text={subtitle}>
        <Navigation current={page} onNavigate={go} />
      </Header>

      <main>
        {/* ---------- Ana sayfa ---------- */}
        {page === "home" && (
          <>
            <section>
              <h2>Yaklaşan 2 Etkinlik</h2>
              <EventList
                events={upcoming}
                onShowDetail={(id) => go("detail", id)}
              />
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
            <EventFilter
              searchText={searchText}
              category={category}
              categories={categories}
              onSearchChange={setSearchText}
              onCategoryChange={setCategory}
            />

            {filtered.length > 0 && (
              <p id="sonuc">{filtered.length} etkinlik listeleniyor.</p>
            )}

            <EventList
              events={filtered}
              onShowDetail={(id) => go("detail", id)}
              emptyText="Aramanıza uygun etkinlik bulunamadı."
            />
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
          <EventDetail
            event={selected}
            onBack={() => go("events")}
            onEdit={(id) => go("update", id)}
          />
        )}

        {/* ---------- Ekle ve Güncelle ---------- */}
        {(page === "add" || page === "update") && (
          <EventForm onSubmit={() => window.scrollTo(0, 0)} />
        )}
      </main>

    <Footer />
    </>
  );
}

export default App;