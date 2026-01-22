import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '../../../lib/prisma'; // 3 szintet lépünk vissza

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return new NextResponse("Hiányzó adatok", { status: 400 });
    }

    // Felhasználó keresése
    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    });

    if (!user || !user.hashedPassword) {
      return new NextResponse("Nem található felhasználó", { status: 401 });
    }

    // JELSZÓ ELLENŐRZÉS (ITT VOLT A HIBA: password -> hashedPassword)
    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

    if (!isPasswordValid) {
      return new NextResponse("Hibás jelszó", { status: 401 });
    }

    // Sikeres belépés válasz (itt később majd cookie/token kell, de most elég ez)
    return NextResponse.json(user);

  } catch (error: any) {
    console.log("LOGIN_ERROR", error);
    return new NextResponse("Belső hiba: " + error.message, { status: 500 });
  }
}
