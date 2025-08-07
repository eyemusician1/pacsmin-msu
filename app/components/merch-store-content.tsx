"use client"

import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import { Star, ShoppingBag } from 'lucide-react'
import Image from "next/image"
import { useState, useCallback } from 'react'

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
  const [selectedCategory, setSelectedCategory] = useState<string>("All Items");

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

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

  const filteredItems = merchItems.filter(item => 
    selectedCategory === "All Items" ? true : item.category === selectedCategory
  );

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in-slide-up px-6 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0 relative">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 relative">
              Merch Store
              <span className="absolute -top-1 -right-4 w-2 h-2 bg-gold-400 rounded-full animate-ping"></span>
            </h2>
            <div className="hidden sm:block w-px h-8 bg-gradient-to-b from-navy-200 to-gold-200"></div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative flex items-center bg-white/80 backdrop-blur-md rounded-xl shadow-sm border border-navy-100/50 p-1">
            {["All Items", "Apparel", "Accessories"].map((category) => (
              <Button
                key={category}
                variant="ghost"
                size="sm"
                onClick={() => handleCategoryChange(category)}
                className={`relative text-sm px-5 py-2 rounded-lg transition-all duration-500 ${
                  selectedCategory === category
                    ? 'text-white shadow-sm font-medium'
                    : 'text-navy-600 hover:text-navy-900'
                }`}
              >
                {selectedCategory === category && (
                  <span className="absolute inset-0 bg-gradient-to-r from-navy-600 to-gold-500 rounded-lg transition-all duration-500" />
                )}
                <span className="relative z-10">{category}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredItems.map((item, index) => (
          <Card 
            key={item.id} 
            className="overflow-hidden group relative border border-navy-100/50 hover:border-gold-300 transition-all duration-500 ease-out hover:shadow-lg hover:shadow-navy-100/20 rounded-xl bg-white/80 backdrop-blur-sm transform hover:-translate-y-1"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            {item.isNew && (
              <Badge className="absolute top-3 left-3 bg-gradient-to-r from-gold-500 to-gold-400 text-white z-10 text-xs px-3 py-1 rounded-full shadow-sm backdrop-blur-sm">
                ⚡ New Arrival
              </Badge>
            )}
            <div className="relative h-52 sm:h-64 overflow-hidden bg-gradient-to-br from-navy-50 to-transparent">
              <div className="absolute inset-0 bg-navy-900/5 group-hover:bg-navy-900/0 transition-colors duration-500 z-10"></div>
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                fill
                className="object-cover transform group-hover:scale-110 transition-all duration-700 ease-out"
                quality={90}
              />
            </div>
            <CardContent className="p-5 sm:p-6 flex flex-col justify-between flex-grow space-y-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold text-base sm:text-lg text-navy-900 leading-tight group-hover:text-navy-700 transition-colors duration-300">{item.name}</h3>
                  <Badge 
                    variant="secondary" 
                    className="bg-gradient-to-r from-navy-50 to-gold-50 text-navy-700 border border-navy-200 text-xs font-medium px-2.5 whitespace-nowrap shadow-sm"
                  >
                    {item.category}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-3.5 w-3.5 ${i < Math.floor(item.rating) ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'} transition-colors duration-300`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-medium text-navy-700">{item.rating}</span>
                  <span className="text-xs text-navy-500">({item.reviews})</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gold-600 to-navy-600 bg-clip-text text-transparent">₱{item.price.toFixed(2)}</span>
                </div>
                <Button 
                  onClick={() => addToCart(item)}
                  className="bg-gradient-to-r from-navy-600 to-navy-700 text-white hover:from-navy-700 hover:to-navy-800 transition-all duration-300 flex items-center gap-2 px-4 py-2.5 rounded-full text-sm w-full sm:w-auto shadow-sm hover:shadow-md group/btn"
                >
                  <ShoppingBag className="h-4 w-4 transition-transform duration-300 group-hover/btn:scale-110" /> 
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}