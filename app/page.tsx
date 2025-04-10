"use client";

export default function Home() {
  return (
    <main>
      <button 
        onClick={async()=> { 
          await fetch("/api/emails", { method: "POST" });
        }}
      >
        Enviar Correo
      </button>
    </main>
  );
}