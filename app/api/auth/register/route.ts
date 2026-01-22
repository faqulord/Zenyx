import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/app/lib/prisma'; // JAVÍTVA: Helyes útvonal

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, username, password } = body;

    // 1. Validáció: Minden mező ki van töltve?
    if (!email || !username || !password) {
      return new NextResponse("Hiányzó adatok", { status: 400 });
    }

    // 2. Ellenőrzés: Létezik már ilyen felhasználó?
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email },
          { username: username }
        ]
      }
    });

    if (existingUser) {
      return new NextResponse("Ez az email vagy felhasználónév már foglalt", { status: 409 });
    }

    // 3. Jelszó titkosítása
    const hashedPassword = await bcrypt.hash(password, 12);

    // 4. Létrehozás az adatbázisban (Javított mezőnevekkel!)
    const user = await prisma.user.create({
      data: {
        email,
        username,
        hashedPassword, // A Schema-ban így hívják!
        virtualBalance: 0,
        points: 0,
        role: "USER",
        referralCode: username + Math.floor(Math.random() * 9999).toString(),
      },
    });

    return NextResponse.json(user);

  } catch (error: any) {
    console.log("REGISTRATION_ERROR", error);
    return new NextResponse("Belső hiba: " + error.message, { status: 500 });
  }
}
