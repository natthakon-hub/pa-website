import type { Metadata } from 'next';
// @ts-ignore
import './globals.css';

export const metadata: Metadata = {
  title: 'ครูณัฏฐกร สุขสะกาว PA',
  description: 'แฟ้มสะสมผลงานอิเล็กทรอนิกส์ (E-Portfolio)',
};

export const runtime = 'edge';

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
