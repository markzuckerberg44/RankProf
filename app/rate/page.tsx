// app/rate/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RatePage() {
  const [teacher, setTeacher] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Aseguramos que solo usuarios verificados accedan aquí.
    const isVerified = localStorage.getItem("verified") === "true";
    if (!isVerified) {
      router.push("/");
    }
  }, [router]);

  const handleRating = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("/api/rate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teacher, rating }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("¡Gracias por calificar!");
        // Reinicia el formulario
        setTeacher("");
        setRating(0);
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error: any) {
      setMessage(`Error al enviar la calificación: ${error.message}`);
    }
  };

  return (
    <main style={{ margin: "2rem" }}>
      <h1>Califica a un Profesor</h1>
      <form onSubmit={handleRating}>
        <div style={{ marginBottom: "1rem" }}>
          <label>
            Profesor:
            <input
              type="text"
              value={teacher}
              onChange={(e) => setTeacher(e.target.value)}
              required
              placeholder="Nombre del profesor"
              style={{ marginLeft: "0.5rem" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>
            Calificación (1-5):
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              required
              style={{ marginLeft: "0.5rem" }}
            >
              <option value={0}>Selecciona</option>
              <option value={1}>1 Estrella</option>
              <option value={2}>2 Estrellas</option>
              <option value={3}>3 Estrellas</option>
              <option value={4}>4 Estrellas</option>
              <option value={5}>5 Estrellas</option>
            </select>
          </label>
        </div>
        <button type="submit">Enviar Calificación</button>
      </form>
      {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
    </main>
  );
}
