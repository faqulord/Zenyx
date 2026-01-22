import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';  // JAVÍTVA: Relatív útvonal (2 db pont-pont)

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content, imageUrl, isImportant } = body;

    // Slug generálása
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
        slug: slug + '-' + Date.now(),
        published: true
      }
    });

    return NextResponse.json(news, { status: 201 });
  } catch (error) {
    console.error("News hiba:", error);
    return NextResponse.json({ message: 'Hiba a mentéskor' }, { status: 500 });
  }
}

export async function GET() {
  const news = await prisma.newsPost.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10
  });
  return NextResponse.json(news);
}
