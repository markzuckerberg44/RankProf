"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState(""); // Estado para almacenar el correo
  const [message, setMessage] = useState(""); // Estado para almacenar el mensaje de respuesta
  const [timer, setTimer] = useState(""); // Estado para añadir un temporizador al cambio de pagina
  const [disabler, switchButton] = useState(false);
  const router = useRouter(); //router para cambiar pagina

  function waiter() {
    return new Promise( resolve => setTimeout(resolve, 1000) );
  }

  const handleInputChange = (e) => {
    setEmail(e.target.value); // Actualiza el estado con el valor ingresado
  };

  const handleSubmit = async () => {
    try {
      switchButton(true);
      const response = await fetch("/api/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }), // Envía el correo al backend
      });

      if (response.ok) {
        const text = await response.text(); // Obtén el mensaje del backend
        let split = text.split("#");
        setMessage(split[0]); // Muestra el mensaje de éxito

        for(let i = 3; i > 0; i--){ // Timer para la redirección
          setTimer(String(i));
          await waiter();
        }
        router.push(`/pages/login?message=${encodeURIComponent(split[1])}`) //redirección a login para verificar

      } else {
        const errorText = await response.text(); // Obtén el mensaje de error
        setMessage(errorText); // Muestra el mensaje de error
        switchButton(false);

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
          className={`bg-blue-500 text-white px-4 py-2 rounded 
          ${disabler ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`}
          onClick={handleSubmit} // Llama a la función para enviar el correo
          disabled={disabler}
        >
          Enviar Correo
        </button>

        {/* Muestra el mensaje de confirmación o error */}
        {message && <p className="mt-4">{message}</p>}
        { /*Una vez se tiene exito en el envio del correo, 
          se le es redirigido a la pagina de verificación*/}
        {timer && <p className="mt-4">Redirigiendo: {timer}</p>}

      </div>
    </main>
  );
}
