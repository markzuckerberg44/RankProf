// app/api/rate/route.ts
import { NextResponse } from "next/server";

// Almacenamiento temporal de ratings.
const ratings: Array<{ teacher: string; rating: number }> = [];

export async function POST(request: Request) {
  try {
    const { teacher, rating } = await request.json();

    if (!teacher || rating === undefined) {
      return NextResponse.json(
        { error: "Los campos 'teacher' y 'rating' son obligatorios" },
        { status: 400 }
      );
    }

    // Verifica que la calificación esté entre 1 y 5
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "La calificación debe estar entre 1 y 5" },
        { status: 400 }
      );
    }

    ratings.push({ teacher, rating });

    return NextResponse.json({ message: "Calificación recibida correctamente" });
  } catch (error: any) {
    console.error("Error en /api/rate:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
