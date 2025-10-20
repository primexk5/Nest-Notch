'use client';
import React from 'react';
import { useCart } from '@/app/molecules/CartContent';
import Link from 'next/link';
import { FiTrash2 } from 'react-icons/fi';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, cartCount } = useCart();

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', ''));
      return total + price * item.quantity;
    }, 0).toFixed(2);
  };

  return (
    <div className="bg-white text-black min-h-screen py-20 mt-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-10">Your Cart</h1>
        {cartCount > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b border-gray-300 py-4">
                  <div className="flex items-center space-x-4">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                    <div>
                      <h2 className="text-lg font-semibold">{item.name}</h2>
                      <p className="text-gray-600">{item.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="bg-gray-200 text-black px-3 py-1 rounded-l-md hover:bg-gray-300">-</button>
                      <span className="px-4 py-1 bg-gray-100">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="bg-gray-200 text-black px-3 py-1 rounded-r-md hover:bg-gray-300">+</button>
                    </div>
                    <p className="font-semibold w-20 text-right">${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}</p>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                      <FiTrash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md h-fit">
              <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${calculateSubtotal()}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t border-gray-300 pt-4 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${calculateSubtotal()}</span>
              </div>
              <button className="w-full bg-black text-white py-3 rounded-lg mt-6 hover:bg-gray-800 transition-colors">
                Proceed to Checkout
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
            <Link href="/shop">
              <button className="bg-black text-white py-3 px-8 rounded-lg hover:bg-gray-700 transition-colors">
                Continue Shopping
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;