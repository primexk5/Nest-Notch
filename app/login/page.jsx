'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.emailOrUsername || !formData.password) {
      setError('Please fill in all fields.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(
      (u) =>
        (u.email === formData.emailOrUsername || u.username === formData.emailOrUsername) &&
        u.password === formData.password
    );

    if (user) {
      login(user); // Save to context / localStorage
      toast.success('Login successful!');
      router.push('/');
    } else {
      setError('Invalid email/username or password.');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex flex-col items-center font-bold">
          <p className="text-gray-900">WELCOME BACK</p>
          <h2 className="text-xs font-bold text-center text-gray-400 mb-6">Log in to your Account</h2>
        </div>
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-black text-sm font-semibold mb-2" htmlFor="emailOrUsername">
              Email
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-100"
              id="emailOrUsername"
              type="text"
              value={formData.emailOrUsername}
              onChange={handleChange}
              placeholder="Enter your email or username"
            />
          </div>
          <div className="mb-6">
            <label className="block text-black text-sm font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-100"
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors duration-300">
            Log In
          </button>
        </form>
        <p className="text-center text-gray-600 text-sm mt-6">
          Don't have an account?{' '}
          <Link href="/signup" className="text-black hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;