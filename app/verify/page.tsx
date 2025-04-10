"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function VerifyPage() {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  // Al montar el componente, recuperamos el correo guardado
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    // Si no hay correo almacenado, redirigimos al inicio
    if (!storedEmail) {
      router.push("/");
    } else {
      setEmail(storedEmail);
    }
  }, [router]);

  const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("");

    try {
      // Llamamos al endpoint de verificación
      const res = await fetch("/api/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus(`✅ ${data.message}`);
        // Guardamos un flag "verified" para saber que el usuario está verificado
        localStorage.setItem("verified", "true");
        // Redirigimos al dashboard o donde quieras
        router.push("/dashboard");
      } else {
        setStatus(`❌ Error: ${data.error}`);
      }
    } catch (error: any) {
      setStatus(`❌ Error al verificar: ${error.message}`);
    }
  };

  return (
    <div style={{ margin: "2rem" }}>
      <h1>Verificar Código</h1>
      <form onSubmit={handleVerify}>
        {/* Si quieres, puedes mostrar el correo para confirmación. */}
        <p>Correo: <strong>{email}</strong></p>

        <div style={{ marginBottom: "1rem" }}>
          <label>
            Código:
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              style={{ marginLeft: "0.5rem" }}
            />
          </label>
        </div>
        <button type="submit">Verificar</button>
      </form>

      {status && <p style={{ marginTop: "1rem" }}>{status}</p>}
    </div>
  );
}

