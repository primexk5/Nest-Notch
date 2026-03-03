'use client'

import React, { createContext, useContext, useMemo, useState } from 'react'

const defaultValue = {
  cart: [],
  cartCount: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
}

const CartContext = createContext(defaultValue)

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    if (!product) return
    setCart((prev = []) => {
      const found = prev.find((p) => p.id === product.id)
      if (found) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: (p.quantity || 1) + 1 } : p
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId) =>
    setCart((prev = []) => prev.filter((p) => p.id !== productId))

  const updateQuantity = (productId, quantity) =>
    setCart((prev = []) =>
      prev.map((p) => (p.id === productId ? { ...p, quantity } : p))
    )

  const clearCart = () => setCart([])

  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 0), 0)

  const value = useMemo(
    () => ({ cart, cartCount, addToCart, removeFromCart, updateQuantity, clearCart }),
    [cart]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) {
    // defensive: return defaultValue and log so app doesn't crash with .map on undefined
    console.warn('useCart: no CartProvider found in tree — returning defaults')
    return defaultValue
  }
  return ctx
}