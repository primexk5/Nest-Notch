'use client';
import React, { useState } from 'react';
import { products } from '../../data/products';
import Image from 'next/image';
import { FiShoppingCart } from 'react-icons/fi';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { useCart } from '@/app/molecules/CartContent';

const ProductDetailPage = ({ params }) => {
  const { id } = params;
  const product = products.find((p) => p.id === parseInt(id));
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    // Optionally, show a confirmation message
  };

  return (
    <div className="bg-white text-black min-h-screen mt-20 py-20 px-4 md:px-16 lg:px-32">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link href="/shop">
            <button className="bg-gray-200 text-black py-2 px-4 rounded-md flex items-center justify-center space-x-2 hover:bg-gray-300">
              <FaArrowLeft />
              <span>Back to Shop</span>
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <Image
              src={product.image}
              alt={product.name}
              width={500}
              height={500}
              className="rounded-lg"
            />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-2xl text-gray-700 mb-6">{product.price}</p>
            <p className="text-lg text-gray-600 mb-8">{product.description}</p>
            <div className="flex items-center mb-8">
              <label htmlFor="quantity" className="mr-4 font-medium">Quantity:</label>
              <input 
                type="number" 
                id="quantity" 
                name="quantity" 
                min="1" 
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                className="w-20 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900" />
            </div>
            <button onClick={handleAddToCart} className="w-full bg-gray-900 text-white p-3 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2">
              <FiShoppingCart />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
