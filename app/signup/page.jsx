'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required.';
    if (!formData.email) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid.';
    }
    if (!formData.username) newErrors.username = 'Username is required.';
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage('');
    if (validateForm()) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userExists = users.some(
        (user) => user.email === formData.email || user.username === formData.username
      );

      if (userExists) {
        setErrors({ form: 'User with this email or username already exists.' });
        return;
      }

      users.push(formData);
      localStorage.setItem('users', JSON.stringify(users));
      setSuccessMessage('Registration successful! Redirecting to login...');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <div className='flex flex-col items-center font-bold'>
              <p className='text-gray-900'>WELCOME TO NEST NOTCH</p>
        <h2 className="text-xs font-bold text-center text-gray-400 mb-6">Create an Account</h2>
      </div>
        {errors.form && <p className="text-red-500 text-sm text-center mb-4">{errors.form}</p>}
        {successMessage && <p className="text-green-500 text-sm text-center mb-4">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-black text-sm font-semibold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-100"
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-black text-sm font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-100"
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-black text-sm font-semibold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-100"
              id="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username"
            />
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
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
              placeholder="Create a password"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>
          <button
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors duration-300"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-gray-600 text-sm mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-black hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default page;
