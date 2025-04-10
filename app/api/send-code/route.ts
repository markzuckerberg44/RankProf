// app/api/send-code/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

// Asegúrate de tener definida la variable de entorno RESEND_API_KEY.
const resend = new Resend(process.env.RESEND_API_KEY);

// Almacenamiento temporal en memoria (NO usar en producción)
const codes: Record<string, string> = {};

export async function POST(request: Request) {
  try { 
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "El campo 'email' es obligatorio" },
        { status: 400 }
      );
    }

    // Genera un código de 6 dígitos
    const confirmationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Envía el correo usando Resend
    const response = await resend.emails.send({
      from: "test@resend.dev", // Reemplaza con un correo verificado en Resend
      to: email,
      subject: "Tu código de confirmación",
      html: `
        <p>Hola,</p>
        <p>Tu código de confirmación es: <strong>${confirmationCode}</strong></p>
        <p>¡Úsalo para completar tu registro!</p>
      `,
    });

    // Almacena el código en memoria asociado al email.
    codes[email] = confirmationCode;

    return NextResponse.json({
      message: "Correo enviado exitosamente",
      emailId: response.id,
    });
  } catch (error: any) {
    console.error("Error en /api/send-code:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Exporta "codes" para poder acceder a él desde el endpoint de verificación.
export { codes };
