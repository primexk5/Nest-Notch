'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const SignupPage = () => {
  const router = useRouter();

  // Step Management
  // 'details' = Entering name/email/password
  // 'verify' = Waiting for email verification
  const [step, setStep] = useState('details');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

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

  const generateAndSendLink = async () => {
    let toastId;
    try {
      toastId = toast.loading('Securely dispatching verification email...');
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, formData }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.details || result.error || 'Failed to send verification email');
      }

      toast.success('Verification link sent to your email!', { id: toastId });
      setStep('verify');
    } catch (error) {
      console.error(error);
      toast.error(`Email Error: ${error.message || 'Check setup'}`, { id: toastId, duration: 6000 });
    }
  };

  const handleDetailsSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userExists = users.some(
        (user) => user.email === formData.email || user.username === formData.username
      );

      if (userExists) {
        setErrors({ form: 'User with this email or username already exists.' });
        toast.error('User already exists.');
        return;
      }

      // Proceed to generate and send real email
      await generateAndSendLink();
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center pt-20 pb-12">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <p className="text-xl font-extrabold text-gray-900 tracking-tight">NEST NOTCH</p>
          <h2 className="text-sm font-medium text-gray-500 mt-1">
            {step === 'details' ? 'Create an Account' : 'Verify Your Email'}
          </h2>
        </div>

        {step === 'details' && (
          <form onSubmit={handleDetailsSubmit}>
            {errors.form && <p className="text-red-500 text-sm text-center mb-4 bg-red-50 p-2 rounded">{errors.form}</p>}

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="name">
                Full Name
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 transition-shadow"
                id="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.name}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 transition-shadow"
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.email}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="username">
                Username
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 transition-shadow"
                id="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                placeholder="Choose a username"
              />
              {errors.username && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.username}</p>}
            </div>

            <div className="mb-8">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 transition-shadow"
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a strong password"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.password}</p>}
            </div>

            <button
              className="w-full bg-gray-900 text-white font-semibold py-3.5 rounded-xl shadow-md hover:bg-gray-800 transition-all duration-300 active:transform active:scale-[0.98]"
              type="submit"
            >
              Continue Sign Up
            </button>

            <p className="text-center text-gray-600 text-sm mt-6">
              Already have an account?{' '}
              <Link href="/login" className="text-gray-900 font-bold hover:underline">
                Log In
              </Link>
            </p>
          </form>
        )}

        {step === 'verify' && (
          <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>

            <p className="text-center text-gray-600 mb-6 text-sm">
              We've sent a magic link to <br />
              <span className="font-bold text-gray-900">{formData.email}</span>
            </p>

            <p className="text-center text-gray-600 text-sm mb-6 max-w-[260px]">
              Click the link in the email to verify your account and complete registration.
            </p>

            <div className="mt-4 text-center text-sm">
              <p className="text-gray-500 mb-2">Didn't receive the email?</p>
              <button
                type="button"
                onClick={generateAndSendLink}
                className="text-gray-900 font-bold hover:text-gray-600 transition-colors"
              >
                Resend Email
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default SignupPage;
