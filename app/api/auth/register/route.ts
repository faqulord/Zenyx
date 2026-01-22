import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma'; // JAVÍTVA: Itt keressük a mappádat!
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, username, password } = body;

    if (!email || !username || !password) {
      return NextResponse.json({ message: 'Minden mező kötelező!' }, { status: 400 });
    }

    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] }
    });

    if (existingUser) {
      return NextResponse.json({ message: 'Ez a név vagy email már foglalt.' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        virtualBalance: 10000,
        points: 500,
        referralCode: username + Math.floor(Math.random() * 999)
      },
    });

    return NextResponse.json({ message: 'Sikeres regisztráció!' }, { status: 201 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Szerver hiba történt.' }, { status: 500 });
  }
}
