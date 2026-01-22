import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content, imageUrl, isImportant } = body;

    // Slug generálása (a címből csinálunk linket: "Nagy Hír" -> "nagy-hir")
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const news = await prisma.newsPost.create({
      data: {
        title,
        content,
        imageUrl,
        isImportant: isImportant || false,
        slug: slug + '-' + Date.now(), // Hogy biztosan egyedi legyen
        published: true
      }
    });

    return NextResponse.json(news, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Hiba a mentéskor' }, { status: 500 });
  }
}

export async function GET() {
  // Ez adja vissza a híreket a felhasználóknak
  const news = await prisma.newsPost.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10 // Legutóbbi 10 hír
  });
  return NextResponse.json(news);
}
