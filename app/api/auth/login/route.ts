import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma'; // JAVÍTVA
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const user = await prisma.user.findUnique({
      where: { email: email }
    });

    if (!user) {
      return NextResponse.json({ message: 'Nincs ilyen felhasználó!' }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Hibás jelszó!' }, { status: 401 });
    }

    return NextResponse.json({ 
      message: 'Sikeres belépés!',
      user: { id: user.id, username: user.username }
    }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Szerver hiba.' }, { status: 500 });
  }
}
