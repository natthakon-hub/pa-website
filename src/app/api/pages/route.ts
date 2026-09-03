import { getRequestContext } from '@cloudflare/next-on-pages';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const { title, slug, content } = await request.json();
    const id = Date.now().toString(); // simple ID

    const { env } = getRequestContext();
    const db = env.DB;

    await db.prepare('INSERT INTO pages (id, slug, title, content) VALUES (?, ?, ?, ?)')
      .bind(id, slug, title, content)
      .run();

    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, title, slug, content } = await request.json();

    const { env } = getRequestContext();
    const db = env.DB;

    await db.prepare('UPDATE pages SET title = ?, slug = ?, content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
      .bind(title, slug, content, id)
      .run();

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
