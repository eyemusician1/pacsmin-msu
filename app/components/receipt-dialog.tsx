'use client'

import { useState, useEffect, useRef } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Download, Share, Calendar, CreditCard, Package, Sparkles, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { cn } from "@/lib/utils"
import Image from "next/image"

// Enhanced BackgroundGradientAnimation matching dashboard
function BackgroundGradientAnimation({
  children,
  className,
  containerClassName,
}: {
  children?: React.ReactNode
  className?: string
  containerClassName?: string
}) {
  const interactiveRef = useRef<HTMLDivElement>(null)
  const [curX, setCurX] = useState(0)
  const [curY, setCurY] = useState(0)
  const [tgX, setTgX] = useState(0)
  const [tgY, setTgY] = useState(0)
  
  useEffect(() => {
    document.body.style.setProperty("--gradient-background-start", "#f0fdf4")
    document.body.style.setProperty("--gradient-background-end", "#fefce8")
    document.body.style.setProperty("--first-color", "34, 197, 94")
    document.body.style.setProperty("--second-color", "217, 119, 6")
    document.body.style.setProperty("--third-color", "255, 255, 255")
    document.body.style.setProperty("--fourth-color", "16, 185, 129")
    document.body.style.setProperty("--fifth-color", "15, 23, 42")
    document.body.style.setProperty("--pointer-color", "34, 197, 94")
    document.body.style.setProperty("--size", "70%")
    document.body.style.setProperty("--blending-value", "multiply")
  }, [])
  
  useEffect(() => {
    function move() {
      if (!interactiveRef.current) return
      setCurX(curX + (tgX - curX) / 25)
      setCurY(curY + (tgY - curY) / 25)
      interactiveRef.current.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`
    }
    move()
  }, [tgX, tgY, curX, curY])
  
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (interactiveRef.current) {
      const rect = interactiveRef.current.getBoundingClientRect()
      setTgX(event.clientX - rect.left)
      setTgY(event.clientY - rect.top)
    }
  }
  
  const [isSafari, setIsSafari] = useState(false)
  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent))
  }, [])
  
  return (
    <div
      className={cn(
        "relative overflow-hidden w-full rounded-3xl",
        containerClassName
      )}
      onMouseMove={handleMouseMove}
      style={{ minHeight: 'min(20rem, 50vw)' }}
    >
      <svg className="hidden">
        <defs>
          <filter id="blurMe">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 16 -7" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className={cn("relative z-10", className)}>{children}</div>
      <div
        className={cn(
          "gradients-container absolute inset-0 w-full h-full blur-lg -z-10 pointer-events-none",
          isSafari ? "blur-xl" : "[filter:url(#blurMe)_blur(30px)]"
        )}
      >
        <div className="absolute [background:radial-gradient(circle_at_center,_rgba(var(--first-color),_0.4)_0,_rgba(var(--first-color),_0)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] animate-[moveVertical_35s_ease_infinite] opacity-80" />
        <div className="absolute [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_0.3)_0,_rgba(var(--second-color),_0)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] animate-[moveInCircle_25s_reverse_infinite] opacity-70" />
        <div className="absolute [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.6)_0,_rgba(var(--third-color),_0)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] animate-[moveInCircle_45s_linear_infinite] opacity-90" />
        <div
          ref={interactiveRef}
          className="absolute [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.2)_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] w-full h-full -top-1/2 -left-1/2 opacity-60"
        />
      </div>
    </div>
  )
}

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

interface ReceiptDialogProps {
  isOpen: boolean
  onClose: () => void
  purchaseDetails: CartItem[] | null
}

export function ReceiptDialog({ isOpen, onClose, purchaseDetails }: ReceiptDialogProps) {
  const totalAmount = purchaseDetails?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0
  const totalItems = purchaseDetails?.reduce((sum, item) => sum + item.quantity, 0) || 0
  const orderNumber = `PACS-${Date.now().toString().slice(-6)}`
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  const handleDownload = () => {
    toast.success(
      <div className="flex items-center gap-2">
        <Download className="h-4 w-4 text-green-600" />
        <span className="font-medium">Receipt downloaded successfully!</span>
      </div>,
      {
        duration: 3000,
        style: {
          background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
          color: '#fff',
          borderRadius: '16px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        },
      }
    );
  }

  const handleShare = () => {
    toast.success(
      <div className="flex items-center gap-2">
        <Share className="h-4 w-4 text-amber-600" />
        <span className="font-medium">Receipt link copied to clipboard!</span>
      </div>,
      {
        duration: 3000,
        style: {
          background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
          color: '#fff',
          borderRadius: '16px',
          border: '1px solid #ca8a04',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        },
      }
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="sm:max-w-[600px] p-0 bg-transparent border-0 shadow-none overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative"
            >
              {/* Success Header with BackgroundGradientAnimation */}
              <BackgroundGradientAnimation containerClassName="mb-0">
                <div className="relative z-10 bg-white/95 backdrop-blur-xl rounded-t-3xl overflow-hidden shadow-2xl border border-slate-200/50 p-8 text-center text-slate-900">
                  {/* Floating success elements */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-full blur-xl animate-pulse" />
                  <div className="absolute -top-2 -right-6 w-8 h-8 bg-gradient-to-br from-amber-400/20 to-amber-600/20 rounded-full blur-lg animate-pulse delay-1000" />
                  
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                    className="relative z-10"
                  >
                    <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl">
                      <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-3xl font-black mb-3 text-slate-900">Order Successful!</h2>
                    <p className="text-lg text-slate-600 font-medium">Thank you for your purchase from PACSMIN</p>
                  </motion.div>
                </div>
              </BackgroundGradientAnimation>

              {/* Main Content */}
              <div className="bg-white/95 backdrop-blur-xl rounded-b-3xl shadow-2xl border-x border-b border-slate-200/50 p-8 space-y-8">
                {/* Order Details */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 space-y-6 shadow-xl border border-slate-100"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-slate-900 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <Package className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <span className="font-black text-xl text-slate-900">Order #{orderNumber}</span>
                        <p className="text-sm text-slate-500 font-medium">PACSMIN Official Store</p>
                      </div>
                    </div>
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full shadow-lg font-semibold">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Confirmed
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6 text-sm">
                    <div className="flex items-center gap-3 text-slate-600">
                      <Calendar className="w-5 h-5 text-slate-500" />
                      <div>
                        <p className="font-semibold text-slate-700">Order Date</p>
                        <p>{currentDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600">
                      <CreditCard className="w-5 h-5 text-slate-500" />
                      <div>
                        <p className="font-semibold text-slate-700">Payment Method</p>
                        <p>Card Payment</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Items List */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-6"
                >
                  <h3 className="font-black text-2xl text-slate-900 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <Package className="w-4 h-4 text-white" />
                    </div>
                    Items Purchased ({totalItems})
                  </h3>
                  <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                    {purchaseDetails && purchaseDetails.length > 0 ? (
                      purchaseDetails.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * index }}
                          className="flex items-center justify-between p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                          <Image
                            src={item.image || "/placeholder.svg?height=64&width=64&query=product"}
                            alt={item.name}
                            width={64}
                            height={64}
                            className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-200 shadow-md"
                          />
                          <div>
                            <p className="font-bold text-lg text-slate-900">{item.name}</p>
                            <p className="text-sm text-slate-500 font-medium">Qty: {item.quantity} × ₱{item.price.toFixed(2)}</p>
                          </div>
                          <span className="font-black text-xl text-slate-900">₱{(item.price * item.quantity).toFixed(2)}</span>
                        </motion.div>
                      ))
                    ) : (
                      <p className="text-slate-500 text-center py-8 text-lg">No items in this purchase.</p>
                    )}
                  </div>
                </motion.div>

                {/* Total */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="border-t-2 border-slate-200 pt-8"
                >
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-2xl font-black text-slate-900">Total Amount:</span>
                    <span className="text-4xl font-black bg-gradient-to-r from-slate-900 to-amber-600 bg-clip-text text-transparent">
                      ₱{totalAmount.toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200 flex items-center gap-3 shadow-lg">
                    <CheckCircle className="w-6 h-6 text-green-700" />
                    <div>
                      <p className="font-bold text-green-800">Payment processed successfully</p>
                      <p className="text-sm text-green-600">Your order is being prepared for delivery</p>
                    </div>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex gap-4"
                >
                  <Button
                    onClick={handleDownload}
                    variant="outline"
                    size="lg"
                    className="flex-1 border-2 border-slate-300 hover:border-slate-400 hover:bg-slate-50 rounded-2xl py-4 flex items-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
                  >
                    <Download className="w-5 h-5" />
                    Download Receipt
                  </Button>
                  <Button
                    onClick={handleShare}
                    variant="outline"
                    size="lg"
                    className="flex-1 border-2 border-slate-300 hover:border-amber-400 hover:bg-amber-50 rounded-2xl py-4 flex items-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
                  >
                    <Share className="w-5 h-5" />
                    Share Receipt
                  </Button>
                  <Button
                    onClick={onClose}
                    size="lg"
                    className="flex-1 bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 text-white rounded-2xl py-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-3 font-semibold"
                  >
                    Done
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </motion.div>

                {/* Footer Note */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-center pt-4 border-t border-slate-200"
                >
                  <p className="text-sm text-slate-500 font-medium">
                    A confirmation email has been sent to your registered email address.
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Order processing time: 1-2 business days
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  )
}
