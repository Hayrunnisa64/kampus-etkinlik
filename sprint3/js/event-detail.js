// event-detail.js — etkinlik-detay.html için ?id= ile doğru etkinliği gösterir.
import { events } from "./data.js";

// "12-10-2026" → "12 Ekim 2026"
function tarihiYaz(tarih) {
  const [gun, ay, yil] = tarih.split("-");
  const d = new Date(yil, ay - 1, gun);
  return d.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
}

const container = document.querySelector("#detay");
const baslik = document.querySelector("header h1");

// Adres çubuğundaki id'yi oku: etkinlik-detay.html?id=event-3 → "event-3"
const id = new URLSearchParams(location.search).get("id");

// Bu id'ye sahip etkinliği bul (bulamazsa undefined döner)
const event = events.find((e) => e.id === id);

// Önce kontrol, sonra yaz
if (!event) {
  document.title = "Etkinlik bulunamadı";
  baslik.textContent = "Etkinlik bulunamadı";

  const metin = id
    ? `"${id}" numaralı bir etkinlik yok. Listeden bir etkinlik seçin.`
    : "Adreste etkinlik numarası yok. Listeden bir etkinlik seçin.";

  container.innerHTML = `<div class="hata-kutusu">
      <p>${metin}</p>
    </div>
    <p><a class="buton" href="etkinlikler.html">← Listeye dön</a></p>`;
} else {
  document.title = event.title;
  baslik.textContent = event.title;

  // Afişi olan etkinlikte afiş solda, künye sağda
  let afis = "";
  if (event.image) {
    container.classList.add("afisli");
    afis = `<figure class="afis">
      <img src="${event.image}" alt="${event.title} etkinlik afişi">
      <figcaption>${event.title} afişi</figcaption>
    </figure>`;
  }

  container.innerHTML = `${afis}
    <section class="kunye">
      <h2>Etkinlik Künyesi</h2>
      <dl>
        <dt>Tarih</dt>
        <dd>${tarihiYaz(event.date)}, ${event.time}</dd>
        <dt>Yer</dt>
        <dd>${event.location}</dd>
        <dt>Kategori</dt>
        <dd>${event.category}</dd>
        <dt>Kontenjan</dt>
        <dd>${event.capacity} kişi</dd>
      </dl>
    </section>
    <section class="aciklama">
      <h2>Açıklama</h2>
      <p>${event.description}</p>
      <p class="butonlar">
        <a class="buton" href="etkinlikler.html">← Listeye dön</a>
        <a class="buton" href="etkinlik-guncelle.html?id=${event.id}">Bu etkinliği güncelle</a>
      </p>
    </section>`;
}