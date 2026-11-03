import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Sekmede görünen sayfa adları
const pageNames: Record<string, string> = {
  "/": "Ana Sayfa",
  "/events": "Etkinlikler",
  "/admin": "Yönetim",
  "/admin/new": "Etkinlik Ekle",
  "/login": "Giriş Yap",
  "/register": "Kayıt Ol",
  "/forgot-password": "Şifremi Unuttum",
};

function Header() {
  const { pathname } = useLocation();

  let title = "Kampüs Etkinlikleri";
  let subtitle = "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.";
  if (pathname === "/events") {
    title = "Tüm Etkinlikler";
    subtitle = "Ekim ayında kampüste düzenlenen etkinlikler.";
  }

  // Sayfa değişince sekme adı da değişsin
  useEffect(() => {
    let name = pageNames[pathname];
    if (!name && pathname.endsWith("/edit")) name = "Etkinlik Güncelle";
    if (!name && pathname.startsWith("/events/")) name = "Etkinlik Detayı";
    document.title = `${name ?? "Sayfa bulunamadı"} — Kampüs Etkinlikleri`;
  }, [pathname]);

  return (
    <header className="site-baslik">
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </header>
  );
}

export default Header;