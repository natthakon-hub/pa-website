'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PageEditor({ pageId }: { pageId?: string }) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [driveUrl, setDriveUrl] = useState('');

  useEffect(() => {
    if (pageId) {
      setLoading(true);
      fetch(`/api/pages/${pageId}`)
        .then(res => res.json())
        .then(data => {
          setTitle(data.title);
          setSlug(data.slug);
          setContent(data.content);
          setLoading(false);
        });
    }
  }, [pageId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const method = pageId ? 'PUT' : 'POST';
    const body = JSON.stringify({ id: pageId, title, slug, content });

    const res = await fetch('/api/pages', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body,
    });

    if (res.ok) {
      router.push('/admin');
      router.refresh();
    } else {
      alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
      setLoading(false);
    }
  };

  const insertDriveEmbed = () => {
    if (!driveUrl) return;
    // Extract ID from drive URL
    // Examples: 
    // https://drive.google.com/file/d/1XyZ.../view
    // https://drive.google.com/drive/folders/14qM5Rx...
    let fileId = '';
    const fileMatch = driveUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
    const folderMatch = driveUrl.match(/folders\/([a-zA-Z0-9_-]+)/);
    
    if (fileMatch) fileId = fileMatch[1];
    else if (folderMatch) fileId = folderMatch[1];
    else fileId = driveUrl; // Fallback

    const isFolder = !!folderMatch;
    
    const embedCode = isFolder 
      ? `<iframe src="https://drive.google.com/embeddedfolderview?id=${fileId}#grid" width="100%" height="600" frameborder="0"></iframe>`
      : `<iframe src="https://drive.google.com/file/d/${fileId}/preview" width="100%" height="600" allow="autoplay"></iframe>`;
      
    setContent(content + '\n' + embedCode);
    setDriveUrl('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">ชื่อเรื่อง (Title)</label>
          <input 
            type="text" required value={title} onChange={e => setTitle(e.target.value)}
            className="mt-1 w-full px-4 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Slug (เช่น about-me)</label>
          <input 
            type="text" required value={slug} onChange={e => setSlug(e.target.value)}
            className="mt-1 w-full px-4 py-2 border rounded"
          />
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
        <h4 className="font-medium text-blue-800 mb-2">ฝังไฟล์จาก Google Drive</h4>
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="วางลิงก์ Google Drive (ไฟล์ หรือ โฟลเดอร์)" 
            value={driveUrl}
            onChange={e => setDriveUrl(e.target.value)}
            className="flex-1 px-4 py-2 border rounded text-sm"
          />
          <button 
            type="button" 
            onClick={insertDriveEmbed}
            className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
          >
            แทรก Iframe ลงเนื้อหา
          </button>
        </div>
        <p className="text-xs text-blue-600 mt-2">
          ตัวอย่างลิงก์: https://drive.google.com/drive/folders/14qM5RxOceraDizIkkBtaAPC6f2N_d7tZ
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">เนื้อหา (รองรับ HTML)</label>
        <textarea 
          required value={content} onChange={e => setContent(e.target.value)}
          rows={15}
          className="w-full px-4 py-2 border rounded font-mono text-sm"
        />
      </div>

      <button 
        type="submit" disabled={loading}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-medium"
      >
        {loading ? 'กำลังบันทึก...' : 'บันทึกข้อมูล'}
      </button>
    </form>
  );
}
