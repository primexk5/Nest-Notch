'use client';

import React, { useState, Suspense } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useRouter, useSearchParams } from 'next/navigation';

const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      router.push('/shop');
    }
  };

  return (
    <form onSubmit={handleSearch} className='flex items-center border border-gray-400 w-full max-w-md p-2 rounded-full shadow-sm bg-white relative'>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search products..."
        className='text-lg font-mono text-gray-900 text-center focus:outline-none w-full p-1'
      />
      <button type="submit" className="absolute right-0 top-0 bottom-0 pr-4 flex items-center text-gray-500 hover:text-black">
        <FiSearch size={20} />
      </button>
    </form>
  );
};

const Search = () => {
  return (
    <Suspense fallback={<div className="w-full max-w-md p-2 h-12 rounded-full bg-gray-100 animate-pulse"></div>}>
      <SearchInput />
    </Suspense>
  );
}

export default Search;