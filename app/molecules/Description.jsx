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
    <div key={product.id} className="border border-black rounded-lg overflow-hidden cursor-pointer">
      <Link href={`/products/${product.id}`}>
        <div className="relative">
          <img src={product.image} alt={product.name} className="w-full h-48 sm:h-64 object-cover" />
          <div className="absolute top-2 right-2 flex flex-col space-y-2">
            <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200">
              <FiHeart className="text-black" />
            </button>
          </div>
        </div>
      </Link>
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
  );
};

export default ProductCard;
