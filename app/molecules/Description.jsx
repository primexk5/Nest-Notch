'use client'
import React from 'react';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const router = useRouter();
  const { addToCart } = useCart() || {};
  const { user } = useAuth() || {};

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      toast.error('Please log in to add items to your cart.', { duration: 4000 });
      router.push('/login');
      return;
    }
    if (product) {
      addToCart(product);
      toast.success(`${product.name} added to cart!`);
    }
  };


  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
      <Link href={`/products/${product.id}`} className="block relative overflow-hidden aspect-[4/5] bg-gray-50">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Floating Actions */}
        <div className="absolute top-4 right-4 flex flex-col space-y-3 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-out">
          <button className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white hover:scale-110 hover:text-red-500 transition-all text-gray-700">
            <FiHeart size={18} />
          </button>
        </div>
      </Link>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <Link href={`/products/${product.id}`}>
            <h2 className="text-lg font-bold text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-1">
              {product.name}
            </h2>
          </Link>
          <p className="text-lg font-semibold text-gray-900 whitespace-nowrap ml-2">
            {product.price}
          </p>
        </div>
        
        <p className="text-sm text-gray-500 line-clamp-2 mb-6 min-h-[40px]">
          {product.description}
        </p>
        
        <button 
          onClick={handleAddToCart} 
          className="w-full bg-gray-900 text-white py-3 px-4 rounded-xl flex items-center justify-center space-x-2 hover:bg-gray-800 transition-all duration-300 active:scale-[0.98] shadow-md hover:shadow-lg"
        >
          <FiShoppingCart size={18} />
          <span className="font-semibold text-sm tracking-wide">Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
