import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // 1. Megkeressük a felhasználót email alapján
    const user = await prisma.user.findUnique({
      where: { email: email }
    });

    if (!user) {
      return NextResponse.json({ message: 'Nincs ilyen felhasználó!' }, { status: 401 });
    }

    // 2. Összehasonlítjuk a jelszót a titkosítottal
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Hibás jelszó!' }, { status: 401 });
    }

    // 3. HA SIKERES:
    // Itt a valóságban egy "Sütit" (Cookie) küldenénk, de most egyszerűsítve
    // visszaküldjük, hogy OK, és a felhasználó adatait (kivéve a jelszót).
    
    return NextResponse.json({ 
      message: 'Sikeres belépés!',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: 'Szerver hiba.' }, { status: 500 });
  }
}
