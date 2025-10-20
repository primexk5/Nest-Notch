
'use client'
import React from 'react';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import Link from 'next/link';
import { useCart } from '@/app/molecules/CartContent';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigation
    addToCart(product);
    // Optionally, show a toast or confirmation message
  };


  return (
    <Link href={`/products/${product.id}`}>
        <div key={product.id} className="border border-black rounded-lg overflow-hidden cursor-pointer">
        <div className="relative">
            <img src={product.image} alt={product.name} className="w-full h-48 sm:h-64 object-cover" />
            <div className="absolute top-2 right-2 flex flex-col space-y-2">
            <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200">
                <FiHeart className="text-black" />
            </button>
            </div>
        </div>
        <div className="p-4">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.price}</p>
            <div className="mt-4">
            <button onClick={handleAddToCart} className="bg-black text-white w-full py-2 px-4 rounded-md flex items-center justify-center space-x-2 hover:bg-gray-800">
                <FiShoppingCart />
                <span>Add to Cart</span>
            </button>
            </div>
        </div>
        </div>
    </Link>
  );
};

export default ProductCard;
