// event-list.js — index.html ve etkinlikler.html için kartları üretir.
import { events } from "./data.js";

// "12-10-2026" → "12 Ekim 2026"
function tarihiYaz(tarih) {
  const [gun, ay, yil] = tarih.split("-");
  const d = new Date(yil, ay - 1, gun);
  return d.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
}

function createCard(event) {
  return `<article class="kart">
    <h3>${event.title}</h3>
    <p><span class="rozet">${event.category}</span></p>
    <p>Tarih: ${tarihiYaz(event.date)}, ${event.time}</p>
    <p>Yer: ${event.location}</p>
    <p>Kontenjan: ${event.capacity} kişi</p>
    <p>${event.description}</p>
    <a href="etkinlik-detay.html?id=${event.id}">Detayları gör</a>
  </article>`;
}

const list = document.querySelector("#etkinlik-listesi");

function render(dizi) {
  list.innerHTML = dizi.map(createCard).join("");
}

if (list.dataset.limit) {
  const yaklasan = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, Number(list.dataset.limit));
  render(yaklasan);
} else {
  render(events);
}

// ---------- Arama + kategori filtresi (sadece etkinlikler.html) ----------
const form = document.querySelector("#filtre-formu");

if (form) {
  const arama = document.querySelector("#arama");
  const kategoriSecimi = document.querySelector("#kategori-filtre");
  const sonucSatiri = document.querySelector("#sonuc");

  // Kategori seçeneklerini veriden üret, her biri bir kez
  const kategoriler = [...new Set(events.map((e) => e.category))];
  kategoriler.forEach((kategori) => {
    const option = document.createElement("option");
    option.value = kategori;
    option.textContent = kategori;
    kategoriSecimi.append(option);
  });

  function filtrele() {
    const aranan = arama.value.toLocaleLowerCase("tr-TR");
    const secilen = kategoriSecimi.value;

    const sonuc = events.filter((e) => {
      const metinUyuyor = e.title.toLocaleLowerCase("tr-TR").includes(aranan);
      const kategoriUyuyor = secilen === "" || e.category === secilen;
      return metinUyuyor && kategoriUyuyor;
    });

    render(sonuc);

    if (sonuc.length === 0) {
      sonucSatiri.textContent = "Aramanıza uygun etkinlik bulunamadı.";
    } else {
      sonucSatiri.textContent = `${sonuc.length} etkinlik listeleniyor.`;
    }
  }

  arama.addEventListener("input", filtrele);
  kategoriSecimi.addEventListener("change", filtrele);

  // Enter'a basınca sayfa yenilenmesin
  form.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  filtrele();
}