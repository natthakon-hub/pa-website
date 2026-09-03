'use client';

import { useState } from 'react';
import { loginAction } from '../actions';

export default function LoginPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const formData = new FormData(e.currentTarget);
    try {
      const result = await loginAction(formData);
      if (result?.error) {
        setError(result.error);
      }
    } catch (err) {
      // Redirects throw errors in next.js, so we ignore it if it redirects
    }
    setLoading(false);
  }

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">เข้าสู่ระบบผู้ดูแล</h2>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">รหัสผ่าน (Password)</label>
          <input 
            type="password" 
            name="password"
            required
            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="ใส่รหัสผ่าน..."
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors disabled:opacity-50"
        >
          {loading ? 'กำลังตรวจสอบ...' : 'เข้าสู่ระบบ'}
        </button>
      </form>
    </div>
  );
}
