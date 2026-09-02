import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug: slugParam } = await params;
  const slug = slugParam ? slugParam.join('/') : 'home';
  
  // Get Cloudflare D1 binding
  let data = null;
  try {
    const { env } = getRequestContext();
    const db = env.DB;
    
    // Fetch page content
    const stmt = db.prepare('SELECT title, content FROM pages WHERE slug = ?').bind(slug);
    data = await stmt.first();
  } catch (err) {
    console.error(err);
    // Fallback data if DB is not ready or setup correctly in dev
    data = { title: 'กำลังโหลดฐานข้อมูล...', content: '<p>ไม่สามารถเชื่อมต่อฐานข้อมูลได้ หรือหน้านี้ยังไม่มีเนื้อหา</p>' };
  }

  if (!data) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-sm min-h-[500px]">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">ไม่พบหน้านี้ (404)</h1>
        <div className="prose prose-blue max-w-none">
          <p>เนื้อหาที่คุณค้นหายังไม่ได้ถูกสร้างขึ้น</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm min-h-[500px]">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">{data.title as string}</h1>
      <div 
        className="prose prose-blue max-w-none"
        dangerouslySetInnerHTML={{ __html: data.content as string }}
      />
    </div>
  );
}
