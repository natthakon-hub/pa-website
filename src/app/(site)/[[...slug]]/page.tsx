import { neon } from '@neondatabase/serverless';
import Link from 'next/link';

export default async function Page({ params }: { params: { slug?: string[] } }) {
  const slugParam = params?.slug;
  const slug = slugParam ? slugParam.join('/') : 'home';
  
  let data = null;
  try {
    if ((process.env.POSTGRES_URL || process.env.DATABASE_URL)) {
      const sql = neon((process.env.POSTGRES_URL || process.env.DATABASE_URL));
      await sql\CREATE TABLE IF NOT EXISTS pages ( slug VARCHAR(255) PRIMARY KEY, title VARCHAR(255) NOT NULL, content TEXT NOT NULL, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP )\;
      
      const rows = await sql\SELECT title, content FROM pages WHERE slug = \\;
      if (rows.length > 0) {
        data = rows[0];
      }
    }
  } catch (err) {
    console.error('DB Error:', err);
  }

  if (!data) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-sm min-h-[500px]">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">ไม่พบหน้าเนื้อหา (404)</h1>
        <div className="prose prose-blue max-w-none">
          <p>เนื้อหานี้ยังไม่ได้ถูกสร้างขึ้น กรุณาเข้าสู่ระบบแอดมินเพื่อเพิ่มเนื้อหา</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm min-h-[500px]">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">{data.title}</h1>
      <div 
        className="prose prose-blue max-w-none"
        dangerouslySetInnerHTML={{ __html: data.content }}
      />
    </div>
  );
}