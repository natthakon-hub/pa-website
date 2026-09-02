import Link from 'next/link';


export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const menuItems = [
    { title: '🏠 หน้าแรก', href: '/' },
    { title: '🗂️ ข้อมูลเกี่ยวกับเว็บไซต์ PA', href: '/about-pa' },
    { title: '🧑‍💻 ข้อมูลส่วนตัว', href: '/profile' },
    { title: '📒 องค์ประกอบที่ 1', href: '/component-1' },
    { title: '  - 1.สร้างและหรือพัฒนาหลักสูตร', href: '/component-1-1' },
    { title: '  - 2.การออกแบบการจัดการเรียนรู้', href: '/component-1-2' },
    { title: '  - 3.การจัดกิจกรรมการเรียนรู้', href: '/component-1-3' },
    { title: '  - 4.สร้างและพัฒนาสื่อ', href: '/component-1-4' },
    { title: '  - 5.การวัดและประเมินผล', href: '/component-1-5' },
    { title: '  - 6.การศึกษาและวิเคราะห์', href: '/component-1-6' },
    { title: '  - 7.จัดบรรยากาศที่ส่งเสริม', href: '/component-1-7' },
    { title: '  - 8.การอบรมและพัฒนาคุณลักษณะ', href: '/component-1-8' },
    { title: '📒 องค์ประกอบที่ 2', href: '/component-2' },
    { title: '  - จัดทำข้อมูลสารสนเทศ', href: '/component-2-1' },
    { title: '  - ปฏิบัติงานวิชาการ', href: '/component-2-2' },
    { title: '📒 องค์ประกอบที่ 3', href: '/component-3' },
    { title: '📈 ข้อตกลงในการพัฒนางาน', href: '/agreement' },
    { title: '💾 เกียรติบัตร', href: '/certificates' },
    { title: '📜 🧑‍🎓ผลงานนักเรียน', href: '/student-works' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <div className="w-72 bg-blue-900 text-white flex-shrink-0 flex flex-col shadow-xl">
        <div className="p-6">
          <h1 className="text-xl font-bold tracking-wider">ครูณัฏฐกร สุขสะกาว PA</h1>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1 custom-scrollbar">
          {menuItems.map((item, idx) => (
            <Link 
              key={idx} 
              href={item.href}
              className="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors"
            >
              {item.title}
            </Link>
          ))}
        </div>
        <div className="p-4 bg-blue-950 text-xs text-center text-blue-300">
          <Link href="/admin" className="hover:text-white">Admin Login</Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="px-8 py-4">
            <h2 className="text-gray-800 font-semibold text-lg">แฟ้มสะสมผลงานอิเล็กทรอนิกส์ (E-Portfolio)</h2>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8 max-w-5xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
