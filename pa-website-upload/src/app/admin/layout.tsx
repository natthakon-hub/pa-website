import '@/app/globals.css';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-slate-900 text-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">ระบบจัดการเนื้อหา (Admin CMS)</h1>
          <nav>
            <Link href="/" className="text-sm bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded">
              กลับหน้าแรก
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
