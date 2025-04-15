"use client";
import { useSearchParams} from "next/navigation";
import { useState } from "react";

export default function Page() {
    const router = useSearchParams();
    const [codigo, setCodigo] = useState("");
    const [disabler, switchButton] = useState(false);
    const [message, setMessage] = useState("");
    const code = router.get("message");

    const handleInputChange = (e) => {
      setCodigo(e.target.value); // Actualiza el estado con el valor ingresado
    };

    const handleSubmit = async () => {
      switchButton(true);
      if(codigo == code) {
        setMessage("AYYYY BRUV YU GOT ET 🗣");
      } else {
        setMessage("NAAAAAHHHHH ON FOENEM THIS BIH GOT NO CODES 💀");
        switchButton(false);
      }
    }


    return (
        <main className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
      <div className="text-center w-full max-w-4xl flex flex-col items-center gap-4">
        <h1 className="text-3xl font-bold mb-4">ingresa el codigo de verificación 🔒</h1>
        <input
          type="email"
          placeholder="XXXXXX"
          className="large-input width-400px"
          value={codigo} // Vincula el valor del input al estado
          onChange={handleInputChange} // Maneja el cambio del input
        />

        <button
          className={`bg-blue-500 text-white px-4 py-2 rounded 
          ${disabler ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`}
          onClick={handleSubmit} // Llama a la función para enviar el correo
          disabled={disabler}
        >Verificar</button>
        {code && <p className="mt-4">{message}</p>}
      </div>
    </main>
    );
}