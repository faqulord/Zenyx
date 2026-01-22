import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Itt használjuk az új stabilizátort!
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // 1. Felhasználó keresése
    const user = await prisma.user.findUnique({
      where: { email: email }
    });

    if (!user) {
      return NextResponse.json({ message: 'Nincs ilyen felhasználó!' }, { status: 401 });
    }

    // 2. Jelszó ellenőrzés
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Hibás jelszó!' }, { status: 401 });
    }

    return NextResponse.json({ message: 'Sikeres belépés!' }, { status: 200 });

  } catch (error) {
    console.error("Login hiba:", error); // Ez segít látni a hibát a logokban
    return NextResponse.json({ message: 'Szerver hiba történt.' }, { status: 500 });
  }
}
