"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const router = useRouter();

  const handleSendCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("");

    try {
      // 1. Llamamos a nuestro endpoint que envía el código
      const res = await fetch("/api/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus(`✅ ${data.message}`);
        // 2. Guardamos el correo en localStorage para que no tenga que reingresarlo
        localStorage.setItem("email", email);
        // 3. Redirigimos a la pantalla de verificación
        router.push("/verify");
      } else {
        setStatus(`❌ Error: ${data.error}`);
      }
    } catch (error: any) {
      setStatus(`❌ Error al enviar: ${error.message}`);
    }
  };

  return (
    <main style={{ margin: "2rem" }}>
      <h1>Ingresa tu correo</h1>
      <p>Te enviaremos un código de verificación para acceder a la aplicación de rating.</p>
      <form onSubmit={handleSendCode}>
        <label>
          Correo:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ margin: "0 1rem" }}
          />
        </label>
        <button type="submit">Enviar Código</button>
      </form>
      {status && <p style={{ marginTop: "1rem" }}>{status}</p>}
    </main>
  );
}
