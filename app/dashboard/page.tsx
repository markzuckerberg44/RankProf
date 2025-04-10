// app/dashboard/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Verifica si el usuario está autenticado
    const isVerified = localStorage.getItem("verified") === "true";
    if (!isVerified) {
      router.push("/");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <main style={{ margin: "2rem" }}>
      <h1>Bienvenido a la App de Rating de Profes</h1>
      <p>Aquí podrás ver y enviar tus calificaciones.</p>
      <p>
        Para calificar a un profesor, visita la sección{" "}
        <a href="/rate">Calificar Profesor</a>.
      </p>
    </main>
  );
}
