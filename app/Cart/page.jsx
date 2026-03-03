'use client';
import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiTrash2, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import Image from 'next/image';

const CartPage = () => {
  const { cart: cartItems, removeFromCart, updateQuantity, cartCount } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
    if (isMounted && !user) {
      router.push('/login');
    }
  }, [user, router, isMounted]);

  const calculateSubtotal = () => {
    return cartItems.reduce((total, product) => {
      const price = parseFloat(product.price.replace('$', ''));
      return total + price * product.quantity;
    }, 0).toFixed(2);
  };

  if (!isMounted || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-gray-200 rounded-full mb-4"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen pt-24 pb-16 md:pt-32 md:pb-24 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
            Your Cart
          </h1>
          {cartCount > 0 && (
            <p className="mt-4 text-gray-500 text-lg">
              You have {cartCount} item{cartCount > 1 ? 's' : ''} in your cart
            </p>
          )}
        </div>

        {cartCount > 0 ? (
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">

            {/* Cart Items List */}
            <div className="lg:col-span-8">
              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                <ul role="list" className="divide-y divide-gray-100">
                  {cartItems.map((product) => (
                    <li key={product.id} className="flex py-6 px-4 sm:px-6 hover:bg-gray-50 transition-colors duration-150">
                      <div className="flex-shrink-0 relative w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 rounded-xl overflow-hidden block">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text-lg font-bold text-gray-900">
                                <Link href={`/products/${product.id}`} className="hover:text-gray-600 transition-colors">
                                  {product.name}
                                </Link>
                              </h3>
                            </div>
                            <p className="mt-1 text-sm font-medium text-gray-900">{product.price}</p>
                          </div>

                          <div className="mt-4 sm:mt-0 sm:pr-9 flex items-center">
                            {/* Quantity Controls */}
                            <div className="flex items-center border border-gray-200 rounded-lg bg-white">
                              <button
                                onClick={() => updateQuantity(product.id, Math.max(1, product.quantity - 1))}
                                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-l-lg transition-colors"
                                aria-label="Decrease quantity"
                              >
                                -
                              </button>
                              <span className="w-10 text-center text-sm font-semibold text-gray-900">
                                {product.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(product.id, product.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-r-lg transition-colors"
                                aria-label="Increase quantity"
                              >
                                +
                              </button>
                            </div>

                            <div className="absolute top-0 right-0">
                              <button
                                onClick={() => removeFromCart(product.id)}
                                className="-m-2 p-2 inline-flex text-gray-400 hover:text-red-500 transition-colors"
                                aria-label={`Remove ${product.name} from cart`}
                              >
                                <FiTrash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 flex text-sm font-medium">
                          <p className="text-gray-900">
                            Line Total: <span className="font-bold">${(parseFloat(product.price.replace('$', '')) * product.quantity).toFixed(2)}</span>
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Order Summary */}
            <div className="mt-10 lg:mt-0 lg:col-span-4 lg:sticky lg:top-32">
              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 sm:p-8">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h2>

                <dl className="space-y-4 text-sm text-gray-600">
                  <div className="flex items-center justify-between">
                    <dt>Subtotal</dt>
                    <dd className="font-medium text-gray-900">${calculateSubtotal()}</dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <dt className="flex items-center">
                      <span>Shipping estimate</span>
                    </dt>
                    <dd className="font-medium text-green-600">Free</dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <dt className="text-base font-bold text-gray-900">Order total</dt>
                    <dd className="text-xl font-extrabold text-gray-900">${calculateSubtotal()}</dd>
                  </div>
                </dl>

                <div className="mt-8">
                  <button
                    className="w-full bg-gray-900 text-white font-semibold py-4 px-4 rounded-xl shadow hover:bg-gray-800 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 group"
                    aria-label="Proceed to checkout"
                  >
                    Proceed to Checkout
                    <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                <div className="mt-6 text-center text-sm text-gray-500">
                  <p>
                    or{' '}
                    <Link href="/shop" className="text-indigo-600 font-medium hover:text-indigo-500 hover:underline">
                      Continue Shopping<span aria-hidden="true"> &rarr;</span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>

          </div>
        ) : (
          /* Empty State */
          <div className="max-w-2xl mx-auto mt-16">
            <div className="bg-white border border-gray-100 rounded-3xl p-12 text-center shadow-sm">
              <div className="mx-auto w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <FiShoppingBag className="w-10 h-10 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Your cart is empty</h2>
              <p className="text-gray-500 mb-10 max-w-sm mx-auto">
                Looks like you haven't added anything to your cart yet. Discover our latest products and collections.
              </p>
              <Link href="/shop">
                <button className="bg-gray-900 text-white font-semibold py-3 px-8 rounded-full hover:bg-gray-800 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                  Start Shopping
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;