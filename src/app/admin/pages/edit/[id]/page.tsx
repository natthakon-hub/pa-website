import PageEditor from '../../../../components/PageEditor';
import { neon } from '@neondatabase/serverless';

export default async function EditPage({ params }: { params: { id: string } }) {
  let page = null;
  
  if ((process.env.POSTGRES_URL || process.env.DATABASE_URL)) {
    try {
      const sql = neon((process.env.POSTGRES_URL || process.env.DATABASE_URL));
      const rows = await sql\SELECT * FROM pages WHERE slug = \\;
      if (rows.length > 0) {
        page = rows[0];
      }
    } catch (err) {
      console.error(err);
    }
  }

  if (!page) {
    return <div>ไม่พบหน้าเนื้อหานี้</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">แก้ไข: {page.title}</h2>
      <PageEditor initialData={page} />
    </div>
  );
}