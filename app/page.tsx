"use client";
// por aqui recibimos la informacion del usuario

export default function Home() {
  return (
    <main>
      <button 
        onClick={async()=> { 
          await fetch("/api/emails", { 
            method: "POST",
            body: JSON.stringify({
              email: "julian.honores@alumnos.ucn.cl",
              firstName: "Julian",
            }),
          });
        }}
      >
        Enviar Correo
      </button>
    </main>
  );
}