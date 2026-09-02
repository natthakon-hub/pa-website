'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAction(formData: FormData) {
  const password = formData.get('password');
  
  if (password === 'Flat285789') {
    const cookieStore = await cookies();
    cookieStore.set('admin_auth', 'true', { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    });
    redirect('/admin');
  }
  
  return { error: 'รหัสผ่านไม่ถูกต้อง' };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_auth');
  redirect('/admin/login');
}
