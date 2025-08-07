'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../../components/ui/dialog"
import { Button } from "../../components/ui/button"
import Image from "next/image"

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-6">
        <DialogHeader>
          <DialogTitle className="text-navy-900">Purchase Receipt</DialogTitle>
          <DialogDescription className="text-gray-600">
            Thank you for your purchase from the PACSMIN Merch Store!
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-3">
          {purchaseDetails && purchaseDetails.length > 0 ? (
            purchaseDetails.map((item) => (
              <div key={item.id} className="flex items-center justify-between text-sm text-navy-900">
                <div className="flex items-center space-x-2">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={40}
                    height={40}
                    className="rounded-md object-cover"
                  />
                  <span>{item.name} (x{item.quantity})</span>
                </div>
                <span className="font-semibold text-gold-600">₱{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No items in this purchase.</p>
          )}
          <div className="border-t border-navy-100 pt-3 mt-3 flex justify-between items-center text-lg font-bold text-navy-900">
            <span>Total:</span>
            <span>₱{totalAmount.toFixed(2)}</span>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose} className="bg-navy-700 text-white hover:bg-navy-800">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
