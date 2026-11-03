import { useState } from "react";
import EventFilter from "../components/events/EventFilter";
import EventList from "../components/events/EventList";
import { useEvents } from "../context/EventsContext";
import type { Category } from "../types/campus-event";
import { filterByCategory, searchEvents } from "../utils/filter-events";

function EventsPage() {
  const { events } = useEvents();
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");
  const categories = [...new Set(events.map((e) => e.category))];
  const filtered = filterByCategory(searchEvents(events, searchText), category);

  return (
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
        emptyText="Aramanıza uygun etkinlik bulunamadı."
      />
    </>
  );
}
export default EventsPage;