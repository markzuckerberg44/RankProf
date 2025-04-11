import Welcome from "@/emails/welcome";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// aqui mostramos la info del usuario al usuario (creo)

function verificar_estudiante(email: string) {
    // Aqui se puede agregar la logica para verificar el estudiante
    let list_email = email.split("@");
    if (list_email[1] == "alumnos.ucn.cl") {
      return true;
    }

    // si no cumple la condicion anterior entonces retornamos false
    return false;
}

export async function POST(request: Request) {
    const { email,firstName } = await request.json();

    let verificado = verificar_estudiante(email);

    if (verificado) {
      let nombre = "";// Se usa un valor por defecto para firstName

    if (email) {
      let list_nombreCompleto = email.split(".");
      nombre = list_nombreCompleto[0];
    }

    await resend.emails.send({
        from: 'test@resend.dev',
        to: email,
        subject: 'Codigo de verificación',
        react: Welcome({ nombre }),
      });

    return new Response('✅ Te enviamos un codigo de verificacion, revisa tu correo!');
    }

    else {
      return new Response('⚠️ Este email no pertenece a la UCN', { status: 400 });
    }

    
}



