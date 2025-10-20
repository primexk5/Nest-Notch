'use client'
import React from 'react';
import Link from 'next/link';

const page = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <div className='flex flex-col items-center font-bold'>
              <p className='text-gray-900'>WELCOME TO NEST NOTCH</p>
        <h2 className="text-xs font-bold text-center text-gray-400 mb-6">Create an Account</h2>
      </div>
        <form>
          <div className="mb-4">
            <label className="block text-black text-sm font-semibold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-100"
              id="name"
              type="text"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black text-sm font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-100"
              id="email"
              type="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black text-sm font-semibold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-100"
              id="username"
              type="text"
              placeholder="Choose a username"
            />
          </div>
          <div className="mb-6">
            <label className="block text-black text-sm font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-100z  z"
              id="password"
              type="password"
              placeholder="Create a password"
            />
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
