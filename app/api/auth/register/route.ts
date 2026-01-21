import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, username, password } = body;

    // 1. Ellenőrzés: minden mező ki van töltve?
    if (!email || !username || !password) {
      return NextResponse.json({ message: 'Minden mező kötelező!' }, { status: 400 });
    }

    // 2. Ellenőrzés: Foglalt-e már?
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email },
          { username: username }
        ]
      }
    });

    if (existingUser) {
      return NextResponse.json({ message: 'Ez a név vagy email már foglalt.' }, { status: 400 });
    }

    // 3. Jelszó titkosítása
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Létrehozás (10.000 USD kezdőpénzzel)
    await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        virtualBalance: 10000,
        points: 500, // Kezdő bónusz
        tier: 'STANDARD',
        referralCode: username + Math.floor(Math.random() * 999)
      },
    });

    return NextResponse.json({ message: 'Sikeres regisztráció!' }, { status: 201 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Szerver hiba történt.' }, { status: 500 });
  }
}
