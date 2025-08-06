"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, User, Search } from 'lucide-react'
import Image from "next/image"
import { Cart } from '@/app/components/cart' // Import the new Cart component
import { DashboardContent } from '@/app/components/dashboard-content'
import { MerchStoreContent } from '@/app/components/merch-store-content'
import { ProfileContent } from '@/app/components/profile-content'
import { ELibraryContent } from '@/app/components/e-library-content'
import { AboutUsContent } from '@/app/components/about-us-content'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

interface MerchItem {
  id: number
  name: string
  price: number
  image: string
  category: string
  rating: number
  reviews: number
}

export default function UniversityPortal() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [cart, setCart] = useState<CartItem[]>([]) // Cart state remains here

  const addToCart = (item: MerchItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id)
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      } else {
        return [...prevCart, { ...item, quantity: 1 }]
      }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-50 to-navy-100 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-lg border-b border-navy-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Image
                src="/pacsmin.png"
                alt="TPACS Mindanao Logo"
                width={40}
                height={40}
                className="rounded-full animate-pulse-shadow"
              />
              <div>
                <h1 className="text-xl font-bold text-navy-900">PACSMIN Portal</h1>
                <p className="text-sm text-gray-500">Chemistry Student Hub</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 group-focus-within:text-navy-700 transition-colors" />
                <Input
                  placeholder="Search courses, resources..."
                  className="pl-10 w-64 border-navy-200 focus:border-navy-700 focus:ring-navy-700 transition-all duration-200"
                />
              </div>
              
              <Button variant="ghost" size="icon" className="hover:bg-navy-100 transition-colors">
                <Bell className="h-5 w-5 text-navy-700" />
              </Button>
              
              {/* Render the Cart component here */}
              <Cart cart={cart} setCart={setCart} />
              
              <Button variant="ghost" size="icon" className="hover:bg-navy-100 transition-colors">
                <User className="h-5 w-5 text-navy-700" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-navy-50 border border-navy-100 rounded-lg p-1 shadow-sm">
            <TabsTrigger 
              value="dashboard" 
              className="data-[state=active]:bg-navy-700 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:border-navy-700 transition-all duration-300 ease-in-out hover:bg-navy-100 text-navy-700"
            >
              Dashboard
            </TabsTrigger>
            <TabsTrigger 
              value="merch" 
              className="data-[state=active]:bg-navy-700 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:border-navy-700 transition-all duration-300 ease-in-out hover:bg-navy-100 text-navy-700"
            >
              Merch Store
            </TabsTrigger>
            <TabsTrigger 
              value="profile" 
              className="data-[state=active]:bg-navy-700 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:border-navy-700 transition-all duration-300 ease-in-out hover:bg-navy-100 text-navy-700"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger 
              value="e-library" 
              className="data-[state=active]:bg-navy-700 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:border-navy-700 transition-all duration-300 ease-in-out hover:bg-navy-100 text-navy-700"
            >
              E-Library
            </TabsTrigger>
            <TabsTrigger 
              value="about-us" 
              className="data-[state=active]:bg-navy-700 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:border-navy-700 transition-all duration-300 ease-in-out hover:bg-navy-100 text-navy-700"
            >
              About Us
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <DashboardContent />
          </TabsContent>

          <TabsContent value="merch">
            <MerchStoreContent addToCart={addToCart} />
          </TabsContent>

          <TabsContent value="profile">
            <ProfileContent />
          </TabsContent>

          <TabsContent value="e-library">
            <ELibraryContent />
          </TabsContent>

          <TabsContent value="about-us">
            <AboutUsContent />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
