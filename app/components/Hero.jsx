import React from 'react'
import { CiSearch } from "react-icons/ci";
import Search from '../atoms/Search';
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  return (
    <div className='h-screen bg-gradient-to-br mt-20  p-4'>
      {/* Search Bar */}
      <div className='pt-5 flex justify-center mt-20 items-center px-4'>
        <div className='flex items-center border border-gray-300 w-full max-w-md p-2 rounded-full shadow-sm bg-gray-100'>
          {/* <CiSearch className='text-2xl ml-4 text-gray-500' />
          <input className='text-lg font-mono text-gray-900 text-center focus:outline-none w-full p-1' type="text" placeholder='Search products...' /> */}
          <Search />
        </div>
      </div>

   
      <div className='grid md:grid-cols-2 items-center justify-center max-w-6xl mx-auto mt-10 md:mt-20 px-4'>
     
        <div className='text-center md:text-left'>
          <span className='text-sm font-bold text-gray-500'>NEST NOTCH</span>
          <h1 className='text-5xl font-bold text-gray-900 mt-2'>
            Step Up Your Style
          </h1>
          <p className='text-gray-600 mt-4 max-w-lg mx-auto md:mx-0'>
            Discover a world of quality products at unbeatable prices. From the latest tech gadgets to stylish fashion, Nest Notch has everything you need to elevate your lifestyle.
          </p>
          <Link href="/shop">
            <button className='mt-8 bg-gray-900 text-white py-3 px-8 rounded-lg hover:bg-gray-700 transition-colors duration-300'>
              Shop Now
            </button>
          </Link>
        </div>

      
        <div className='mt-10 md:mt-0 flex justify-center'>
          <Image
            className='transform -rotate-12 hover:rotate-0 transition-transform duration-500'
            src="/shoe.webp"
            alt="Featured shoe"
            width={450}
            height={450}
            priority
          />
        </div>
      </div>
    </div>
  )
}

export default Hero