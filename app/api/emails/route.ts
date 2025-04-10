import Welcome from "@/emails/welcome";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    await resend.emails.send({
        from: 'test@resend.dev',
        to: 'julian.honores@alumnos.ucn.cl',
        subject: 'Codigo de verificación',
        react: Welcome(),
      });

    return new Response('Email sent!');
}


