'use client'
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

const VerifyPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState('verifying'); // 'verifying' | 'success' | 'invalid' | 'expired'

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setStatus('invalid');
      return;
    }

    const verify = async () => {
      try {
        const res = await fetch(`/api/verify-email?token=${token}`);
        const data = await res.json();

        if (!res.ok) {
          setStatus(data.error === 'expired' ? 'expired' : 'invalid');
          return;
        }

        // Save user to localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');

        // Guard: check if user already exists (e.g. double-click on link)
        const alreadyExists = users.some(
          (u) => u.email === data.formData.email || u.username === data.formData.username
        );
        if (!alreadyExists) {
          users.push(data.formData);
          localStorage.setItem('users', JSON.stringify(users));
        }

        setStatus('success');
        toast.success('Email verified! Redirecting to login...');
        setTimeout(() => router.push('/login'), 2000);
      } catch {
        setStatus('invalid');
      }
    };

    verify();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 w-full max-w-md text-center">
        <p className="text-xl font-extrabold text-gray-900 tracking-tight mb-2">NEST NOTCH</p>

        {status === 'verifying' && (
          <>
            <div className="w-14 h-14 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto my-8" />
            <p className="text-gray-600 text-sm">Verifying your email, please wait...</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto my-8">
              <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-gray-900 font-bold text-lg mb-2">Email Verified!</h2>
            <p className="text-gray-500 text-sm">Your account has been created. Redirecting to login...</p>
          </>
        )}

        {status === 'expired' && (
          <>
            <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mx-auto my-8">
              <svg className="w-8 h-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-gray-900 font-bold text-lg mb-2">Link Expired</h2>
            <p className="text-gray-500 text-sm mb-6">This verification link has expired (valid for 10 minutes). Please sign up again.</p>
            <Link href="/signup" className="inline-block bg-gray-900 text-white font-semibold py-3 px-8 rounded-xl hover:bg-gray-800 transition-colors">
              Try Again
            </Link>
          </>
        )}

        {status === 'invalid' && (
          <>
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto my-8">
              <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-gray-900 font-bold text-lg mb-2">Invalid Link</h2>
            <p className="text-gray-500 text-sm mb-6">This verification link is invalid or has already been used.</p>
            <Link href="/signup" className="inline-block bg-gray-900 text-white font-semibold py-3 px-8 rounded-xl hover:bg-gray-800 transition-colors">
              Sign Up Again
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyPage;
