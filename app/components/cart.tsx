"use client"

import { useState } from "react"
import type { Dispatch, SetStateAction } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Plus, Minus, X, CreditCard, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

interface CartProps {
  cart: CartItem[]
  setCart: Dispatch<SetStateAction<CartItem[]>>
}

// Enhanced Receipt Dialog Component
function ReceiptDialog({ isOpen, onClose, purchaseDetails }: {
  isOpen: boolean
  onClose: () => void
  purchaseDetails: CartItem[] | null
}) {
  if (!isOpen || !purchaseDetails) return null

  const total = purchaseDetails.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full max-h-[80vh] overflow-y-auto shadow-2xl border border-slate-200/50"
          >
            <div className="text-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg"
              >
                <CheckCircle className="w-8 h-8 text-white" />
              </motion.div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Order Complete!</h2>
              <p className="text-slate-600">Thank you for your purchase</p>
            </div>

            <div className="space-y-3 mb-6">
              {purchaseDetails.map((item, index) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex justify-between items-center py-3 border-b border-slate-100 last:border-b-0"
                >
                  <div>
                    <p className="font-medium text-slate-800">{item.name}</p>
                    <p className="text-sm text-slate-500">₱{item.price.toFixed(2)} × {item.quantity}</p>
                  </div>
                  <p className="font-bold text-slate-800">₱{(item.price * item.quantity).toFixed(2)}</p>
                </motion.div>
              ))}
            </div>

            <div className="border-t border-slate-200 pt-4 mb-6">
              <div className="flex justify-between items-center text-xl font-bold">
                <span className="text-slate-800">Total:</span>
                <span className="text-amber-600">₱{total.toFixed(2)}</span>
              </div>
            </div>

            <Button 
              onClick={onClose} 
              className="w-full bg-gradient-to-r from-amber-500 to-slate-600 hover:from-amber-600 hover:to-slate-700 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Close
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function Cart({ cart, setCart }: CartProps) {
  const [cartOpen, setCartOpen] = useState(false)
  const [lastPurchase, setLastPurchase] = useState<CartItem[] | null>(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const updateQuantity = (id: number, change: number) => {
    setCart((prevCart: CartItem[]) =>
      prevCart.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    )
  }

  const removeItem = (id: number) => {
    setCart((prevCart: CartItem[]) => prevCart.filter(item => item.id !== id));
    toast.success('Item removed from cart', {
      duration: 2000,
      style: {
        background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
        color: '#fff',
        borderRadius: '12px',
      },
    });
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const handleCheckout = async () => {
    setIsProcessing(true);
    
    toast.loading('Processing your order...', {
      duration: 2000,
      style: {
        background: 'linear-gradient(135deg, #334155 0%, #475569 100%)',
        color: '#fff',
        borderRadius: '12px',
        border: '1px solid #f59e0b',
      },
    });
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success(`Order Successful! ₱${getTotalPrice().toFixed(2)} charged`, {
      duration: 3000,
      style: {
        background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
        color: '#fff',
        borderRadius: '12px',
      },
    });

    setLastPurchase([...cart]);
    setCart([]);
    setCartOpen(false);
    setIsProcessing(false);
    setShowReceipt(true);
  }

  return (
    <>
      {/* Enhanced Cart Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCartOpen(!cartOpen)}
          className="relative hover:bg-slate-100 transition-all duration-300 rounded-xl"
        >
          <ShoppingCart className="h-5 w-5 text-slate-700" />
          <AnimatePresence>
            {getTotalItems() > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-2 -right-2"
              >
                <Badge className="h-6 w-6 flex items-center justify-center p-0 text-xs bg-gradient-to-r from-red-500 to-pink-500 text-white border-2 border-white shadow-lg">
                  <motion.span
                    key={getTotalItems()}
                    initial={{ scale: 1.5 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {getTotalItems()}
                  </motion.span>
                </Badge>
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>

      {/* Enhanced Cart Sidebar */}
      <AnimatePresence>
        {cartOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-hidden"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
              onClick={() => setCartOpen(false)} 
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-full max-w-md bg-white/95 backdrop-blur-xl shadow-2xl rounded-l-3xl"
            >
              <div className="flex flex-col h-full">
                {/* Enhanced Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-200/50 bg-gradient-to-r from-slate-50 to-amber-50/30 rounded-tl-3xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-slate-600 rounded-xl flex items-center justify-center shadow-md">
                      <ShoppingCart className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-800">Shopping Cart</h2>
                      <p className="text-sm text-slate-500">{getTotalItems()} items</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setCartOpen(false)}
                    className="w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center transition-colors duration-200"
                  >
                    <X className="w-4 h-4 text-slate-600" />
                  </motion.button>
                </div>
                
                {/* Enhanced Cart Items */}
                <div className="flex-1 overflow-y-auto p-6">
                  <AnimatePresence mode="popLayout">
                    {cart.length === 0 ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-16"
                      >
                        <div className="w-20 h-20 bg-gradient-to-br from-slate-200 to-amber-200 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
                          <ShoppingCart className="w-10 h-10 text-slate-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-700 mb-2">Your cart is empty</h3>
                        <p className="text-slate-500">Add some items to get started!</p>
                      </motion.div>
                    ) : (
                      <div className="space-y-4">
                        {cart.map((item, index) => (
                          <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300"
                          >
                            <div className="flex items-center gap-4">
                              <div className="relative">
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  width={64}
                                  height={64}
                                  className="w-16 h-16 rounded-xl object-cover border border-slate-200"
                                  unoptimized={item.image?.includes('placeholder.svg')}
                                />
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => removeItem(item.id)}
                                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center shadow-lg transition-colors duration-200"
                                >
                                  <X className="w-3 h-3 text-white" />
                                </motion.button>
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-slate-800 truncate">{item.name}</h3>
                                <p className="text-lg font-bold bg-gradient-to-r from-amber-600 to-slate-600 bg-clip-text text-transparent">
                                  ₱{item.price.toFixed(2)}
                                </p>
                                
                                <div className="flex items-center gap-3 mt-3">
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => updateQuantity(item.id, -1)}
                                    className="w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center transition-colors duration-200 shadow-sm"
                                  >
                                    <Minus className="w-4 h-4 text-slate-600" />
                                  </motion.button>
                                  
                                  <motion.span 
                                    key={item.quantity}
                                    initial={{ scale: 1.2 }}
                                    animate={{ scale: 1 }}
                                    className="text-lg font-bold text-slate-800 min-w-[2rem] text-center"
                                  >
                                    {item.quantity}
                                  </motion.span>
                                  
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => updateQuantity(item.id, 1)}
                                    className="w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center transition-colors duration-200 shadow-sm"
                                  >
                                    <Plus className="w-4 h-4 text-slate-600" />
                                  </motion.button>
                                </div>
                              </div>
                              
                              <div className="text-right">
                                <p className="text-xl font-bold text-slate-800">
                                  ₱{(item.price * item.quantity).toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* Enhanced Checkout Section */}
                <AnimatePresence>
                  {cart.length > 0 && (
                    <motion.div
                      initial={{ y: 100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 100, opacity: 0 }}
                      className="border-t border-slate-200/50 p-6 bg-gradient-to-r from-slate-50 to-amber-50/30 rounded-bl-3xl"
                    >
                      <div className="space-y-4">
                        {/* Total */}
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold text-slate-700">Total:</span>
                          <motion.span 
                            key={getTotalPrice()}
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-slate-600 bg-clip-text text-transparent"
                          >
                            ₱{getTotalPrice().toFixed(2)}
                          </motion.span>
                        </div>
                        
                        {/* Checkout Button */}
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button 
                            onClick={handleCheckout}
                            disabled={isProcessing}
                            className="w-full bg-gradient-to-r from-amber-500 to-slate-600 hover:from-amber-600 hover:to-slate-700 text-white font-semibold py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isProcessing ? (
                              <>
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                />
                                Processing...
                              </>
                            ) : (
                              <>
                                <CreditCard className="w-5 h-5" />
                                Checkout Now
                              </>
                            )}
                          </Button>
                        </motion.div>
                        
                        <p className="text-xs text-slate-500 text-center">
                          Secure checkout powered by PACSMIN
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ReceiptDialog
        isOpen={showReceipt}
        onClose={() => setShowReceipt(false)}
        purchaseDetails={lastPurchase}
      />
    </>
  )
}