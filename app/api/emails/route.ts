import Welcome from "@/emails/welcome";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// aqui mostramos la info del usuario al usuario (creo)

export async function POST(request: Request) {
    const { email, firstName } = await request.json();
    await resend.emails.send({
        from: 'test@resend.dev',
        to: email,
        subject: 'Codigo de verificación',
        react: Welcome({ firstName }),
      });

    return new Response('Email sent!');
}


