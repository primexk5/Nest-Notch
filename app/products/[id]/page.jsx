'use client';

import React, { useState } from 'react';
import { products } from '@/app/data/products';
import Image from 'next/image';
import { FiShoppingCart } from 'react-icons/fi';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useCart } from '@/app/context/CartContext';
import { useAuth } from '@/app/context/AuthContext';
import toast from 'react-hot-toast';

const ProductDetailPage = ({ params }) => {
  const router = useRouter();
  const unwrappedParams = React.use(params);
  const { id } = unwrappedParams;
  const product = products.find((p) => p.id === parseInt(id));
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    if (!user) {
      toast.error('Please log in to add items to your cart.', { duration: 4000 });
      router.push('/login');
      return;
    }
    addToCart(product, quantity);
    toast.success(`${quantity} ${product.name} added to cart!`);
  };

  return (
    <div className="bg-[#fafafa] text-black min-h-screen pt-28 pb-20 px-4 md:px-8 lg:px-16 xl:px-32">
      <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        {/* Back Button */}
        <div className="mb-10">
          <Link href="/shop" className="inline-flex items-center space-x-2 text-gray-500 hover:text-gray-900 transition-colors group px-2 py-1">
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium text-sm">Back to Collection</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Image Section */}
          <div className="relative bg-white rounded-3xl p-4 sm:p-8 border border-gray-100 shadow-sm group">
            <div className="aspect-[4/5] relative overflow-hidden rounded-2xl bg-gray-50 flex items-center justify-center">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
            </div>
            {/* Elegant decorative background blur */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-gray-100 to-transparent opacity-0 group-hover:opacity-50 blur-2xl transition-opacity duration-700 -z-10 rounded-[3rem]" />
          </div>

          {/* Details Section */}
          <div className="flex flex-col py-4 lg:py-12">
            <div className="mb-2">
              <span className="text-sm font-bold tracking-widest text-gray-400 uppercase">Premium Collection</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
              {product.name}
            </h1>
            
            <p className="text-3xl font-bold text-gray-900 mb-8 border-b border-gray-100 pb-8">
              {product.price}
            </p>
            
            <p className="text-lg text-gray-500 leading-relaxed mb-10">
              {product.description}
            </p>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-10">
              <div className="flex items-center space-x-4 bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  -
                </button>
                <div className="w-10 text-center font-semibold text-gray-900 text-lg">
                  {quantity}
                </div>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  +
                </button>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={handleAddToCart} 
                className="flex-1 bg-gray-900 text-white py-4 px-8 rounded-xl font-bold tracking-wide hover:bg-gray-800 hover:shadow-xl transition-all duration-300 active:scale-[0.98] flex items-center justify-center space-x-3"
              >
                <FiShoppingCart size={20} />
                <span>Add to Cart</span>
              </button>
              
              <button className="sm:w-16 h-14 sm:h-auto flex items-center justify-center bg-white border border-gray-200 text-gray-900 rounded-xl hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all duration-300">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
            
            {/* Trust Badges */}
            <div className="mt-12 flex items-center space-x-6 text-sm text-gray-500 border-t border-gray-100 pt-8">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" /></svg>
                <span>In Stock</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>Fast Shipping</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;