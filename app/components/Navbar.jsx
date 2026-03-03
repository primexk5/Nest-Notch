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

        <div className='flex items-center gap-8'>
          <Link href="/" className='text-2xl border-r-4 border-gray-900 p-2 font-extrabold text-gray-900'>
            NEST NOTCH
          </Link>
          <div className='hidden lg:flex items-center p-2 gap-6'>
            <Link className='text-gray-700 hover:text-gray-900' href='/'>Home</Link>
            <Link className='text-gray-700 hover:text-gray-900' href='/shop'>Shop</Link>
            <Link className='text-gray-700 hover:text-gray-900' href='/About'>About</Link>
            <Link className='text-gray-700 hover:text-gray-900' href='/Contact'>Contact</Link>
          </div>
        </div>


        <div className='flex items-center gap-4'>
          <Link href="/Cart" className="relative hover:text-gray-600" aria-label={`Cart with ${cartCount} items`}>
            <BsCart4 className='text-2xl text-gray-700 hover:text-gray-500' />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          <div className='hidden lg:flex items-center gap-4'>
            {user ? (
              <div className='flex items-center gap-4'>
                <span className='font-medium text-gray-700'>
                  {user.username || user.email}
                </span>
                <button
                  onClick={logout}
                  className='text-sm bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200'>
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link href="/login">
                  <button className='bg-white text-gray-900 py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-100'>Login</button>
                </Link>
                <Link href="/signup">
                  <button className='bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-700'>Sign up</button>
                </Link>
              </>
            )}
          </div>


          <div className='lg:hidden'>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className='text-3xl text-gray-700 focus:outline-none'
              aria-label='Toggle menu'
              aria-expanded={menuOpen}
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </nav>


      {menuOpen && (
        <div className='lg:hidden bg-white border-t border-gray-200'>
          <div className='flex flex-col gap-4 p-4'>
            <Link className='text-gray-700 hover:text-gray-900 py-2' href='/' onClick={() => setMenuOpen(false)}>Home</Link>
            <Link className='text-gray-700 hover:text-gray-900 py-2' href='/About' onClick={() => setMenuOpen(false)}>About</Link>
            <Link className='text-gray-700 hover:text-gray-900 py-2' href='/shop' onClick={() => setMenuOpen(false)}>Shop</Link>
            <Link className='text-gray-700 hover:text-gray-900 py-2' href='/Contact' onClick={() => setMenuOpen(false)}>Contact</Link>
            <div className='border-t border-gray-200 mt-4 pt-4 flex flex-col gap-4'>
              {user ? (
                <>
                  <span className='text-gray-700 px-2 py-1 bg-gray-50 rounded font-medium text-center'>
                    Logged in as {user.username || user.email}
                  </span>
                  <button
                    onClick={() => { logout(); setMenuOpen(false); }}
                    className='w-full bg-gray-100 text-gray-900 p-3 rounded-md border border-gray-300 hover:bg-gray-200'>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMenuOpen(false)}>
                    <button className='w-full bg-white text-gray-900 p-3 rounded-md border border-gray-300 hover:bg-gray-100'>Login</button>
                  </Link>
                  <Link href="/signup" onClick={() => setMenuOpen(false)}>
                    <button className='w-full bg-gray-900 text-white p-3 rounded-md hover:bg-gray-700'>Sign up</button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar