import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found: { email?: string; password?: string } = {};
    if (!email.includes("@")) found.email = "Geçerli bir e-posta girin.";
    if (password.length < 6) found.password = "Şifre en az 6 karakter olmalı.";
    setErrors(found);
    setSent(Object.keys(found).length === 0);
  }

  return (
    <>
      <h2 className="bolum-baslik">Giriş Yap</h2>

      {sent && (
        <p className="mesaj mesaj-basari">
          Form geçerli. Gerçek giriş Sprint 10'da eklenecek.
        </p>
      )}

      <form className="form" noValidate onSubmit={handleSubmit}>
        <label htmlFor="email">E-posta</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={errors.email ? true : undefined}
        />
        <span className="hata-metni">{errors.email}</span>

        <label htmlFor="password">Şifre</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-invalid={errors.password ? true : undefined}
        />
        <span className="hata-metni">{errors.password}</span>

        <button type="submit">Giriş yap</button>
      </form>

      <p className="butonlar">
        <Link to="/forgot-password">Şifremi unuttum</Link>
        <Link to="/register">Hesabın yok mu? Kayıt ol</Link>
      </p>
    </>
  );
}

export default LoginPage;