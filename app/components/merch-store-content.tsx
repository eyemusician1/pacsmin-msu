"use client"

import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import { Star, ShoppingBag } from 'lucide-react'
import Image from "next/image"

interface MerchItem {
  id: number
  name: string
  price: number
  image: string
  category: string
  rating: number
  reviews: number
  isNew?: boolean
}

interface MerchStoreContentProps {
  addToCart: (item: MerchItem) => void;
}

export function MerchStoreContent({ addToCart }: MerchStoreContentProps) {
  const merchItems: MerchItem[] = [
    {
      id: 1,
      name: "PACSMIN Chemistry Hoodie",
      price: 999,
      image: "/merch/hoodie.jpg",
      category: "Apparel",
      rating: 4.8,
      reviews: 124,
      isNew: true
    },
    {
      id: 2,
      name: "Periodic Table T-Shirt",
      price: 599,
      image: "/merch/periodic-table.jpg",
      category: "Apparel",
      rating: 4.6,
      reviews: 89
    },
    {
      id: 3,
      name: "Chemistry Lab Mug",
      price: 299,
      image: "/merch/chem-mug.avif",
      category: "Accessories",
      rating: 4.7,
      reviews: 156
    },
    {
      id: 4,
      name: "Lab Equipment Backpack",
      price: 799,
        image: "/merch/backpack.jpg",
        category: "Accessories",
      rating: 4.9,
      reviews: 203,
      isNew: true
    },
    {
      id: 5,
      name: "PACSMIN Chemistry Cap",
      price: 199,
      image: "/merch/cap.jpg",
      category: "Apparel",
      rating: 4.5,
      reviews: 67
    },
    {
      id: 6,
      name: "Molecular Structure Bottle",
      price: 2999,
      image: "/merch/molecule.jpg",
      category: "Accessories",
      rating: 4.4,
      reviews: 91
    }
  ]

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in-slide-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 space-y-4 sm:space-y-0">
        <h2 className="text-xl sm:text-2xl font-bold text-navy-900">University Merch Store</h2>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="border-navy-200 text-navy-700 hover:bg-navy-100 hover:border-navy-300 transition-colors text-xs">Apparel</Button>
          <Button variant="outline" size="sm" className="border-navy-200 text-navy-700 hover:bg-navy-100 hover:border-navy-300 transition-colors text-xs">Accessories</Button>
          <Button variant="outline" size="sm" className="border-navy-200 text-navy-700 hover:bg-navy-100 hover:border-navy-300 transition-colors text-xs">All Items</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {merchItems.map(item => (
          <Card key={item.id} className="overflow-hidden group relative border-navy-100 hover:border-gold-300 transition-all duration-300 ease-in-out hover:shadow-lg">
            {item.isNew && (
              <Badge className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-gold-500 text-white z-10 text-xs px-2 py-1 rounded-full">New Arrival</Badge>
            )}
            {/* Changed from aspect-square to fixed height h-60 */}
            <div className="relative h-48 sm:h-60 overflow-hidden">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
              />
            </div>
            <CardContent className="p-3 sm:p-4 flex flex-col justify-between flex-grow"> {/* Added flex-grow */}
              <div className="mb-2 sm:mb-3">
                <h3 className="font-semibold text-base sm:text-lg text-navy-900 mb-1">{item.name}</h3>
                <Badge variant="secondary" className="bg-gold-100 text-gold-700 border-gold-200 text-xs">{item.category}</Badge>
              </div>
              <div className="flex items-center space-x-1 mb-2 sm:mb-3">
                <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-xs sm:text-sm font-medium text-navy-900">{item.rating}</span>
                <span className="text-xs sm:text-sm text-gray-500">({item.reviews} reviews)</span>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
                <span className="text-xl sm:text-2xl font-extrabold text-gold-600">₱{item.price.toFixed(2)}</span>
                <Button 
                  onClick={() => addToCart(item)}
                  className="bg-navy-700 text-white hover:bg-navy-800 transition-colors flex items-center gap-2 px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm w-full sm:w-auto"
                >
                  <ShoppingBag className="h-3 w-3 sm:h-4 sm:w-4" /> Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
