import type { Metadata } from 'next';
// @ts-ignore
import './globals.css';

export const metadata: Metadata = {
  title: 'ครูณัฏฐกร สุขสะกาว PA',
  description: 'การประเมินปฏิบัติงานของข้าราชการครู และบุคลากรทางการศึกษาสายงานการสอน ตำแหน่ง ครู',
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body>
        {children}
      </body>
    </html>
  );
}
