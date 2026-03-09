'use client'
import React, { useMemo, Suspense } from 'react';
import ProductCard from '../molecules/Description';
import { useSearchParams } from 'next/navigation';
import { products } from '../data/products';

const ProductAdvertisement = () => {
  // Fixed duplicates here, used to be: [...products.slice(0,4), ...products.slice(0,4)]
  const adProducts = products.slice(0, 8);

  return (
    <div className="mb-16 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white pointer-events-none -translate-z-10 rounded-2xl" />
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8 border-l-4 border-gray-900 pl-4 ml-2">
        Featured Highlights
      </h2>
      <div className="flex overflow-x-auto pb-6 pt-2 hide-scroll-bar snap-x snap-mandatory px-2">
        <div className="flex space-x-6 w-max">
          {adProducts.map((product, index) => (
            <div 
              key={index} 
              className="snap-start flex-shrink-0 w-[280px] group bg-white border border-gray-100/50 shadow-sm rounded-2xl overflow-hidden transform transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-xl cursor-pointer"
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 truncate">{product.name}</h3>
                <p className="text-sm text-gray-500 mt-1 font-medium">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ShopContent = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q');

  const filteredProducts = useMemo(() => {
    if (!searchQuery) {
      return products;
    }
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="bg-[#fafafa] text-black min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            {searchQuery ? `Results for "${searchQuery}"` : 'The Collection'}
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            {searchQuery ? 'Discover exactly what you are looking for.' : 'Explore our curated selection of premium products designed for modern living.'}
          </p>
        </div>

        {!searchQuery && <ProductAdvertisement />}

        <div className="border-t border-gray-200/60 pt-12">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
              {filteredProducts.map((product, i) => (
                <div 
                  key={product.id}
                  className="animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-gray-300">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500">We couldn't find anything matching "{searchQuery}". Try a different keyword.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ShopPage = () => {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fafafa] flex items-center justify-center"><div className="w-8 h-8 border-4 border-gray-900 border-t-transparent rounded-full animate-spin"></div></div>}>
      <ShopContent />
    </Suspense>
  )
}

export default ShopPage;
