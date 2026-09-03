import { neon } from '@neondatabase/serverless';
import Link from 'next/link';

export default async function AdminDashboard() {
  let pages = [];
  try {
    if ((process.env.POSTGRES_URL || process.env.DATABASE_URL)) {
      const sql = neon((process.env.POSTGRES_URL || process.env.DATABASE_URL));
      pages = await sql\SELECT * FROM pages ORDER BY updated_at DESC\;
    }
  } catch(e) { console.error(e); }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">จัดการเนื้อหาเว็บไซต์</h2>
        <Link 
          href="/admin/pages/new" 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          + สร้างหน้าใหม่
        </Link>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="p-4 font-semibold text-gray-600">หัวข้อ</th>
              <th className="p-4 font-semibold text-gray-600">URL Slug</th>
              <th className="p-4 font-semibold text-gray-600">อัปเดตล่าสุด</th>
              <th className="p-4 font-semibold text-gray-600 text-right">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {pages.length === 0 ? (
              <tr><td colSpan={4} className="p-4 text-center text-gray-500">ยังไม่มีเนื้อหา</td></tr>
            ) : pages.map((page: any) => (
              <tr key={page.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-800">{page.title}</td>
                <td className="p-4 text-gray-500 text-sm">/{page.slug}</td>
                <td className="p-4 text-gray-500 text-sm">{new Date(page.updated_at).toLocaleDateString('th-TH')}</td>
                <td className="p-4 text-right space-x-2">
                  <Link 
                    href={\/admin/pages/edit/\\}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    แก้ไข
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}