'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { BsCart4 } from "react-icons/bs";
import { FiMenu, FiX } from "react-icons/fi"; 

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className='fixed top-0 left-0 right-0 z-20 bg-white shadow-s'>
            <nav className='lg:px-50 flex justify-between border-b border-gray-200 p-4 items-center'>
      
        <div className='flex items-center gap-5'>
          <span className='text-2xl border-r-3 p-2 font-extrabold text-gray-900'>
            <p>NEST NOTCH</p>
          </span>
         
          <div className='hidden lg:flex gap-5'>
            <Link className='text-gray-700 hover:text-gray-500' href='/'>Home</Link>
            <Link className='text-gray-700 hover:text-gray-500' href='/shop'>Shop</Link>
            <Link className='text-gray-700 hover:text-gray-500' href='/About'>About</Link>
            <Link className='text-gray-700 hover:text-gray-500' href='/Contact'>Contact</Link>
            <Link className='text-gray-700 hover:text-gray-500' href='/signup'>Sign up</Link>
          </div>
        </div>

                <div className='gap-2 items-center flex hidden lg:flex'>
          <BsCart4 className='text-2xl text-gray-700 mr-6 hover:text-gray-500' />
          <Link href="/login">
            <button className='bg-white text-gray-900 p-2 w-24 rounded-lg border border-gray-400 hover:bg-gray-100 cursor-pointer '>Login</button>
          </Link>
          <Link href="/signup">
            <button className='bg-gray-900 text-white p-2 w-24 rounded-lg hover:bg-gray-600 cursor-pointer '>Sign up</button>
          </Link>
        </div>

        
                <div className='lg:hidden flex items-center'>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className='text-3xl text-gray-700 focus:outline-none'
            aria-label='Toggle menu'
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

   
      {menuOpen && (
        <div className='lg:hidden bg-white border-b border-gray-200 px-4 py-2'>
          <div className='flex flex-col gap-4'>
            <Link className='text-gray-700 hover:text-gray-500' href='/' onClick={() => setMenuOpen(false)}>Home</Link>
            <Link className='text-gray-700 hover:text-gray-500' href='/About' onClick={() => setMenuOpen(false)}>About</Link>
            <Link className='text-gray-700 hover:text-gray-500' href='/shop' onClick={() => setMenuOpen(false)}>Shop</Link>
            <Link className='text-gray-700 hover:text-gray-500' href='/Contact' onClick={() => setMenuOpen(false)}>Contact</Link>
            <Link className='text-gray-700 hover:text-gray-500' href='/signup' onClick={() => setMenuOpen(false)}>Sign up</Link>
            <div className='flex gap-2 mt-2'>
              <BsCart4 className='text-2xl text-gray-700 hover:text-gray-500' />
              <Link href="/login">
                <button className='bg-white text-gray-900 p-2 w-24 rounded-lg border border-gray-400 hover:bg-gray-100 cursor-pointer '>Login</button>
              </Link>
              <Link href="/signup">
                <button className='bg-gray-900 text-white p-2 w-24 rounded-lg hover:bg-gray-600 cursor-pointer '>Sign up</button>
              </Link>
            </div>
          </div>
        </div>
      )}
        </div>
    )
}

export default Navbar