// app/api/verify-code/route.ts
import { NextResponse } from "next/server";
import { codes } from "../send-code/route";

export async function POST(request: Request) {
  try {
    const { email, code } = await request.json();

    if (!email || !code) {
      return NextResponse.json(
        { error: "Los campos 'email' y 'code' son obligatorios" },
        { status: 400 }
      );
    }

    // Busca el código almacenado para este correo.
    const storedCode = codes[email];

    if (!storedCode) {
      return NextResponse.json(
        { error: "No existe código para este correo o ya expiró" },
        { status: 400 }
      );
    }

    if (storedCode !== code) {
      return NextResponse.json({ error: "El código es inválido" }, { status: 400 });
    }

    console.log("Email recibido:", email);
    console.log("Code recibido:", code);
    console.log("codes en memoria:", codes);


    // Elimina el código luego de la verificación.
    delete codes[email];

    return NextResponse.json({ message: "Código verificado correctamente" });
  } catch (error: any) {
    console.error("Error en /api/verify-code:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
