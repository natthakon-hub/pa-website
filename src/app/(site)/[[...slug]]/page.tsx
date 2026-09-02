export function generateStaticParams() {
  return [
    { slug: [] }, // Home '/'
    { slug: ['about-pa'] },
    { slug: ['profile'] },
    { slug: ['component-1'] },
    { slug: ['component-1-1'] },
    { slug: ['component-1-2'] },
    { slug: ['component-1-3'] },
    { slug: ['component-1-4'] },
    { slug: ['component-1-5'] },
    { slug: ['component-1-6'] },
    { slug: ['component-1-7'] },
    { slug: ['component-1-8'] },
    { slug: ['component-2'] },
    { slug: ['component-2-1'] },
    { slug: ['component-2-2'] },
    { slug: ['component-3'] },
    { slug: ['agreement'] },
    { slug: ['certificates'] },
    { slug: ['student-works'] },
  ];
}

export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug: slugParam } = await params;
  const slug = slugParam ? slugParam.join('/') : 'home';
  
  const contentMap: Record<string, { title: string, content: string }> = {
    'home': {
      title: 'หน้าแรก',
      content: '<p>ยินดีต้อนรับสู่แฟ้มสะสมผลงาน (E-Portfolio) ของ ครูณัฏฐกร สุขสะกาว</p>'
    },
    'about-pa': {
      title: 'เกี่ยวกับข้อตกลงในการพัฒนางาน (PA)',
      content: '<p>ข้อมูลเกี่ยวกับข้อตกลงในการพัฒนางาน</p>'
    },
    'profile': {
      title: 'ข้อมูลผู้จัดทำ',
      content: '<p>ประวัติและข้อมูลส่วนตัวของครูณัฏฐกร สุขสะกาว</p>'
    },
    // Adding standard content for all others
  };

  const data = contentMap[slug] || {
    title: slug,
    content: '<p>เนื้อหาสำหรับ ' + slug + ' (กำลังอัปเดต)</p>'
  };

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
