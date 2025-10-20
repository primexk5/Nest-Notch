'use client'
import React, { useMemo } from 'react';
import ProductCard from '../molecules/Description';
import { useSearchParams } from 'next/navigation';
import { products } from '../data/products';

const ProductAdvertisement = () => {
  const adProducts = [...products.slice(0, 4), ...products.slice(0, 4)];

  return (
    <div className="mb-8 overflow-hidden">
      <h2 className="text-2xl font-bold text-center mb-4">Featured Products</h2>
      <div className="flex space-x-4 pb-4">
        <div className="flex space-x-4 animate-scroll">
          {adProducts.map((product, index) => (
            <div key={index} className="flex-shrink-0 w-28 sm:w-32 border border-black rounded-lg overflow-hidden transform transition-transform hover:scale-105">
              <img src={product.image} alt={product.name} className="w-full h-16 sm:h-20 object-cover" />
              <div className="p-2">
                <h3 className="text-xs font-semibold">{product.name}</h3>
                <p className="text-xs text-gray-500">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const page= () => {
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
    <div className="bg-white text-black min-h-screen">
      <div className="container mx-auto p-4 sm:p-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          {searchQuery ? `Results for "${searchQuery}"` : 'Shop All Products'}
        </h1>
        <ProductAdvertisement />
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-16">No products found matching your search.</p>
        )}
      </div>
    </div>
  );
};

export default page;
