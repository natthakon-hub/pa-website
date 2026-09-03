import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    if (!(process.env.POSTGRES_URL || process.env.DATABASE_URL)) return NextResponse.json({ error: 'DB NOT CONNECTED' }, { status: 500 });
    const sql = neon((process.env.POSTGRES_URL || process.env.DATABASE_URL));
    const body = await request.json();
    
    await sql\
      UPDATE pages 
      SET title = \, content = \, updated_at = CURRENT_TIMESTAMP
      WHERE slug = \
    \;
    
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to update page' }, { status: 500 });
  }
}