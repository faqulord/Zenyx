import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma'; // JAVÍTVA: Relatív útvonal
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // Keresés
    const user = await prisma.user.findUnique({
      where: { email: email }
    });

    if (!user) {
      return NextResponse.json({ message: 'Nincs ilyen felhasználó!' }, { status: 401 });
    }

    // Jelszó ellenőrzés
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Hibás jelszó!' }, { status: 401 });
    }

    return NextResponse.json({ 
      message: 'Sikeres belépés!',
      user: { id: user.id, username: user.username }
    }, { status: 200 });

  } catch (error) {
    console.error("Login hiba:", error);
    return NextResponse.json({ message: 'Szerver hiba.' }, { status: 500 });
  }
}
