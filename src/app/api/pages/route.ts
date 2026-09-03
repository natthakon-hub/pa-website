import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    if (!(process.env.POSTGRES_URL || process.env.DATABASE_URL)) return NextResponse.json({ error: 'DB NOT CONNECTED' }, { status: 500 });
    const sql = neon((process.env.POSTGRES_URL || process.env.DATABASE_URL));
    const rows = await sql\SELECT * FROM pages ORDER BY updated_at DESC\;
    return NextResponse.json(rows);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch pages' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!(process.env.POSTGRES_URL || process.env.DATABASE_URL)) return NextResponse.json({ error: 'DB NOT CONNECTED' }, { status: 500 });
    const sql = neon((process.env.POSTGRES_URL || process.env.DATABASE_URL));
    const body = await request.json();
    
    await sql\
      INSERT INTO pages (id, slug, title, content)
      VALUES (\, \, \, \)
    \;
    
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to create page' }, { status: 500 });
  }
}