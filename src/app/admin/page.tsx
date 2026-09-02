import { getRequestContext } from '@cloudflare/next-on-pages';
import Link from 'next/link';
import { logoutAction } from './actions';

export const runtime = 'edge';

export default async function AdminDashboard() {
  let pages = [];
  try {
    const { env } = getRequestContext();
    const db = env.DB;
    const { results } = await db.prepare('SELECT * FROM pages ORDER BY slug ASC').all();
    pages = results;
  } catch (err) {
    console.error(err);
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">จัดการหน้าเว็บ (Pages)</h2>
        <div className="space-x-4">
          <Link href="/admin/pages/new" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            + สร้างหน้าใหม่
          </Link>
          <form action={logoutAction} className="inline">
            <button type="submit" className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
              ออกจากระบบ
            </button>
          </form>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ชื่อเรื่อง (Title)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug (URL)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">จัดการ</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pages.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                  ไม่พบข้อมูลหน้าเว็บ หรือไม่ได้เชื่อมต่อฐานข้อมูล
                </td>
              </tr>
            ) : (
              pages.map((page: any) => (
                <tr key={page.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{page.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">/{page.slug === 'home' ? '' : page.slug}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link href={`/admin/pages/edit/${page.id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">แก้ไข</Link>
                    {/* Optionally add delete here */}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
