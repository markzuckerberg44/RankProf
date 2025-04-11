"use client";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState(""); // Estado para almacenar el correo
  const [message, setMessage] = useState(""); // Estado para almacenar el mensaje de respuesta

  const handleInputChange = (e) => {
    setEmail(e.target.value); // Actualiza el estado con el valor ingresado
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }), // Envía el correo al backend
      });

      if (response.ok) {
        const text = await response.text(); // Obtén el mensaje del backend
        setMessage(text); // Muestra el mensaje de éxito
      } else {
        const errorText = await response.text(); // Obtén el mensaje de error
        setMessage(errorText); // Muestra el mensaje de error
      }
    } catch (error) {
      setMessage("Ocurrió un error al enviar el correo."); // Mensaje genérico de error
    }
  };

  return (
    <main className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
      <div className="text-center w-full max-w-4xl flex flex-col items-center gap-4">
        <h1 className="text-3xl font-bold mb-4">⭐️ RankProf UCN ⭐️</h1>

        <input
          type="email"
          placeholder="Ingresa tu correo"
          className="large-input"
          value={email} // Vincula el valor del input al estado
          onChange={handleInputChange} // Maneja el cambio del input
        />

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleSubmit} // Llama a la función para enviar el correo
        >
          Enviar Correo
        </button>

        {/* Muestra el mensaje de confirmación o error */}
        {message && <p className="mt-4">{message}</p>}
      </div>
    </main>
  );
}
