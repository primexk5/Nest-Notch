'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { BsCart4 } from 'react-icons/bs'
import { FiMenu, FiX } from 'react-icons/fi'
import { useCart } from '@/app/context/CartContext'
import { useAuth } from '@/app/context/AuthContext'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { cartCount } = useCart()
  const { user, logout } = useAuth()

  return (
    <header className='fixed top-0 left-0 right-0 z-20 bg-white shadow-sm'>
      <nav className='container mx-auto flex justify-between items-center p-4 lg:px-8'>

        {/* Left Side: Logo and Desktop Links */}
        <div className='flex items-center gap-8'>
          <Link href="/" className='text-2xl border-r-4 border-gray-900 pr-4 font-extrabold text-gray-900'>
            NEST NOTCH
          </Link>
          <div className='hidden lg:flex items-center gap-6'>
            <Link className='text-gray-600 font-medium hover:text-gray-900 transition-colors' href='/'>Home</Link>
            <Link className='text-gray-600 font-medium hover:text-gray-900 transition-colors' href='/shop'>Shop</Link>
            <Link className='text-gray-600 font-medium hover:text-gray-900 transition-colors' href='/About'>About</Link>
            <Link className='text-gray-600 font-medium hover:text-gray-900 transition-colors' href='/Contact'>Contact</Link>
          </div>
        </div>


        {/* Right Side: Cart, Auth, Mobile Menu Toggle */}
        <div className='flex items-center gap-6'>
          
          {/* Desktop Auth */}
          <div className='hidden lg:flex items-center gap-4 border-r border-gray-200 pr-6'>
            {user ? (
              <div className='flex items-center gap-4'>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-sm">
                    {(user.username || user.email || 'U')[0].toUpperCase()}
                  </div>
                  <span className='font-medium text-gray-700 text-sm'>
                    {user.username || user.email.split('@')[0]}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className='text-sm text-red-500 font-medium hover:text-red-700 transition-colors'>
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login">
                  <button className='text-gray-600 font-medium hover:text-gray-900 text-sm'>Login</button>
                </Link>
                <Link href="/signup">
                  <button className='bg-gray-900 text-white py-2 px-5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors'>Sign up</button>
                </Link>
              </div>
            )}
          </div>

          {/* Cart Icon (Both Mobile & Desktop) */}
          <Link href="/Cart" className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-50 transition-colors" aria-label={`Cart with ${cartCount} items`}>
            <BsCart4 className='text-2xl text-gray-800' />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center border-2 border-white">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Toggle */}
          <div className='lg:hidden flex items-center'>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className='text-2xl text-gray-800 focus:outline-none p-1'
              aria-label='Toggle menu'
              aria-expanded={menuOpen}
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className='lg:hidden bg-white border-t border-gray-100 shadow-xl absolute w-full rounded-b-2xl animate-in slide-in-from-top-2 duration-200'>
          
          {/* Mobile Auth Header */}
          {user && (
            <div className="flex items-center gap-3 p-5 border-b border-gray-100 bg-gray-50/50">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-800 to-black text-white flex items-center justify-center font-bold text-lg shadow-inner">
                {(user.username || user.email || 'U')[0].toUpperCase()}
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Welcome back</span>
                <span className='font-bold text-gray-900'>
                  {user.username || user.email.split('@')[0]}
                </span>
              </div>
            </div>
          )}

          <div className='flex flex-col p-4'>
            <Link className='text-gray-700 font-medium hover:bg-gray-50 hover:text-gray-900 px-4 py-3 rounded-xl transition-colors' href='/' onClick={() => setMenuOpen(false)}>Home</Link>
            <Link className='text-gray-700 font-medium hover:bg-gray-50 hover:text-gray-900 px-4 py-3 rounded-xl transition-colors' href='/shop' onClick={() => setMenuOpen(false)}>Shop Collection</Link>
            <Link className='text-gray-700 font-medium hover:bg-gray-50 hover:text-gray-900 px-4 py-3 rounded-xl transition-colors' href='/About' onClick={() => setMenuOpen(false)}>About Us</Link>
            <Link className='text-gray-700 font-medium hover:bg-gray-50 hover:text-gray-900 px-4 py-3 rounded-xl transition-colors' href='/Contact' onClick={() => setMenuOpen(false)}>Contact</Link>
            
            <div className='border-t border-gray-100 mt-2 pt-4 px-2 pb-2 flex flex-col gap-3'>
              {user ? (
                <button
                  onClick={() => { logout(); setMenuOpen(false); }}
                  className='w-full bg-red-50 text-red-600 font-medium py-3 rounded-xl border border-red-100 hover:bg-red-100 transition-colors'>
                  Logout
                </button>
              ) : (
                <div className="flex gap-3">
                  <Link href="/login" className="flex-1" onClick={() => setMenuOpen(false)}>
                    <button className='w-full bg-gray-50 text-gray-900 font-medium py-3 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors'>Login</button>
                  </Link>
                  <Link href="/signup" className="flex-1" onClick={() => setMenuOpen(false)}>
                    <button className='w-full bg-gray-900 text-white font-medium py-3 rounded-xl border border-gray-900 hover:bg-gray-800 transition-colors'>Sign up</button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar