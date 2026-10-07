// event-form.js — etkinlik-ekle.html ve etkinlik-guncelle.html için form işlemleri.
import { events } from "./data.js";

const form = document.querySelector("#etkinlik-formu");
const mesaj = document.querySelector("#form-mesaj");
const guncellemeMi = form.dataset.mode === "guncelle";

// ---------- Güncelleme sayfası: form id ile dolu gelsin ----------
let etkinlik;
let formGosteriliyor = true;

if (guncellemeMi) {
  const id = new URLSearchParams(location.search).get("id");
  etkinlik = events.find((e) => e.id === id);

  if (etkinlik) {
    // "12-10-2026" → "2026-10-12" (tarih kutusu bu biçimi ister)
    const [gun, ay, yil] = etkinlik.date.split("-");

    form.elements.ad.value = etkinlik.title;
    form.elements.kategori.value = etkinlik.category;
    form.elements.tarih.value = `${yil}-${ay}-${gun}`;
    form.elements.saat.value = etkinlik.time;
    form.elements.yer.value = etkinlik.location;
    form.elements.kontenjan.value = etkinlik.capacity;
    form.elements.aciklama.value = etkinlik.description;
  } else {
    document.querySelector("#form-aciklama").remove();
    form.outerHTML = `<div class="hata-kutusu">
        <p>Güncellenecek etkinlik seçilmedi. Önce listeden bir etkinlik seçin, detay sayfasındaki "Bu etkinliği güncelle" butonunu kullanın.</p>
      </div>
      <p><a class="buton" href="etkinlikler.html">Etkinliklere git</a></p>`;
    formGosteriliyor = false;
  }
}

// ---------- Doğrulama ve mesaj ----------

// Bir alanın altına hata yaz ve alanı kırmızı yap
function hataGoster(alan, metin) {
  document.querySelector(`#${alan}-hata`).textContent = metin;
  form.elements[alan].setAttribute("aria-invalid", "true");
}

// Düzeltilen alanların eski hatalarını temizle
function hatalariTemizle() {
  ["ad", "kategori", "tarih", "saat", "yer", "kontenjan"].forEach((alan) => {
    document.querySelector(`#${alan}-hata`).textContent = "";
    form.elements[alan].removeAttribute("aria-invalid");
  });
}

if (formGosteriliyor) {
  // Kaydet'e basılınca yakala
  form.addEventListener("submit", (e) => {
    // Sayfa yenilenmesin, yazılanlar kaybolmasın
    e.preventDefault();

    // Formdaki değerleri al (name'ler Türkçe)
    const fd = new FormData(form);
    const kontenjan = fd.get("kontenjan");

    // Tek nesnede topla (alan adları data.js gibi İngilizce)
    const data = {
      id: guncellemeMi ? etkinlik.id : `event-${events.length + 1}`,
      title: fd.get("ad").trim(),
      category: fd.get("kategori"),
      date: fd.get("tarih"),
      time: fd.get("saat"),
      location: fd.get("yer").trim(),
      capacity: kontenjan ? Number(kontenjan) : null,
      description: fd.get("aciklama").trim(),
    };

    // Kurallara göre kontrol et, hataları topla
    hatalariTemizle();
    const errors = {};

    if (data.title.length < 3) {
      errors.ad = "Etkinlik adı en az 3 karakter olmalı.";
    }
    if (data.category === "") {
      errors.kategori = "Bir kategori seçin.";
    }
    if (data.date === "") {
      errors.tarih = "Tarih seçin.";
    }
    if (data.time === "") {
      errors.saat = "Saat seçin.";
    }
    if (data.location === "") {
      errors.yer = "Yer bilgisini yazın.";
    }
    if (data.capacity !== null && (data.capacity < 1 || data.capacity > 1000)) {
      errors.kontenjan = "Kontenjan 1 ile 1000 arasında olmalı.";
    }

    // Hatalı alanların altına yaz, alanı kırmızı yap
    Object.keys(errors).forEach((alan) => hataGoster(alan, errors[alan]));

    // Hata varsa: genel mesaj ve dur
    if (Object.keys(errors).length > 0) {
      mesaj.className = "mesaj-hata";
      mesaj.textContent = "Formda hatalı alanlar var.";
      return;
    }

    // Hata yoksa: yeşil kutuda nesneyi göster
    console.log(data);
    const baslik = guncellemeMi
      ? "Etkinlik güncellendi (bu sprintte kaydedilmez):"
      : "Etkinlik oluşturuldu (bu sprintte kaydedilmez):";
    mesaj.className = "mesaj-basari";
    mesaj.innerHTML = `${baslik}<pre>${JSON.stringify(data, null, 2)}</pre>`;
  });
}