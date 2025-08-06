"use client"

import { useState } from "react"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { ShoppingCart, Plus, Minus } from 'lucide-react'
import Image from "next/image"
import { ReceiptDialog } from '@/app/components/receipt-dialog'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

interface CartProps {
  cart: CartItem[]
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>
}

export function Cart({ cart, setCart }: CartProps) {
  const [cartOpen, setCartOpen] = useState(false)
  const [lastPurchase, setLastPurchase] = useState<CartItem[] | null>(null);
  const [showReceipt, setShowReceipt] = useState(false);

  const updateQuantity = (id: number, change: number) => {
    setCart((prevCart: CartItem[]) =>
      prevCart.map((item: CartItem) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter((item: CartItem) => item.quantity > 0)
    )
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const handleCheckout = () => {
    setLastPurchase([...cart]); // Save current cart items
    setCart([]); // Clear the cart
    setCartOpen(false); // Close the cart sidebar
    setShowReceipt(true); // Open the receipt dialog
  }

  return (
    <>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => setCartOpen(!cartOpen)}
        className="relative hover:bg-navy-100 transition-colors"
      >
        <ShoppingCart className="h-5 w-5 text-navy-700" />
        {getTotalItems() > 0 && (
          <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-gold-500 text-white animate-bounce">
            {getTotalItems()}
          </Badge>
        )}
      </Button>

      {cartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setCartOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl animate-fade-in-slide-up">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-navy-100">
                <h2 className="text-lg font-semibold text-navy-900">Shopping Cart</h2>
                <Button variant="ghost" size="icon" onClick={() => setCartOpen(false)} className="hover:bg-navy-100 transition-colors">
                  ×
                </Button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4">
                {cart.length === 0 ? (
                  <p className="text-gray-500 text-center mt-8">Your cart is empty</p>
                ) : (
                  <div className="space-y-4">
                    {cart.map(item => (
                      <div key={item.id} className="flex items-center space-x-3 p-3 border border-navy-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={60}
                          height={60}
                          className="rounded-md object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-sm text-navy-900">{item.name}</h3>
                          <p className="text-gold-600 font-semibold">₱{item.price}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-6 w-6 border-navy-200 text-navy-700 hover:bg-navy-100 hover:border-navy-300 transition-all"
                              onClick={() => updateQuantity(item.id, -1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-sm font-medium text-navy-900">{item.quantity}</span>
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-6 w-6 border-navy-200 text-navy-700 hover:bg-navy-100 hover:border-navy-300 transition-all"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {cart.length > 0 && (
                <div className="border-t border-navy-100 p-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold text-navy-900">Total: ₱{getTotalPrice().toFixed(2)}</span>
                  </div>
                  <Button 
                    className="w-full bg-navy-700 text-white hover:bg-navy-800 transition-colors"
                    onClick={handleCheckout}
                  >
                    Checkout
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <ReceiptDialog
        isOpen={showReceipt}
        onClose={() => setShowReceipt(false)}
        purchaseDetails={lastPurchase}
      />
    </>
  )
}
