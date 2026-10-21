import type { Category } from "../../types/campus-event";

// Formdaki kategori seçenekleri
const categories: Category[] = ["Seminer", "Atölye", "Söyleşi"];

interface EventFormProps {
  onSubmit: () => void;
}

function EventForm({ onSubmit }: EventFormProps) {
  return (
    <>
      <p id="form-aciklama">
        Bu sprintte form sadece görünüm; kayıt yapılmaz.
      </p>

      <form
        className="form"
        id="etkinlik-formu"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
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
        <input type="number" id="capacity" name="capacity" min={1} max={1000} />

        <label htmlFor="description">Açıklama</label>
        <textarea id="description" name="description" rows={5} />

        <button type="submit">Kaydet</button>
      </form>
    </>
  );
}

export default EventForm;