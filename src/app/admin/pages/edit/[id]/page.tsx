import PageEditor from '@/components/PageEditor';
import Link from 'next/link';

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center mb-6 gap-4">
        <Link href="/admin" className="text-gray-500 hover:text-gray-800">
          &larr; กลับ
        </Link>
        <h2 className="text-2xl font-bold text-gray-800">แก้ไขหน้าเว็บ</h2>
      </div>
      <PageEditor pageId={id} />
    </div>
  );
}
