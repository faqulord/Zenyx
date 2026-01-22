import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '../../../lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, username, password } = body;

    if (!email || !username || !password) {
      return new NextResponse("Hiányzó adatok", { status: 400 });
    }

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

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        hashedPassword,
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
