"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, User, Search, Menu, X } from 'lucide-react'
import Image from "next/image"
import { Cart } from '@/app/components/cart'
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
  const [cart, setCart] = useState<CartItem[]>([])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
      {/* Header - Redesigned for better appearance */}
      <header className="sticky top-0 z-50 bg-white shadow-lg border-b border-navy-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Image
                src="/pacsmin.png"
                alt="PACSMIN Mindanao Logo"
                width={40}
                height={40}
                className="rounded-full animate-pulse-shadow"
              />
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-navy-900">PACSMIN Portal</h1>
                <p className="text-sm text-gray-500">Chemistry Student Hub</p>
              </div>
              <div className="sm:hidden">
                <h1 className="text-lg font-bold text-navy-900">PACSMIN</h1>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative group">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 group-focus-within:text-navy-700 transition-all duration-300 z-10" />
                  <Input
                    placeholder="Search courses, resources..."
                    className="pl-10 pr-4 py-2 w-64 border-2 border-navy-200 focus:border-navy-700 focus:ring-2 focus:ring-navy-700/20 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-all duration-300 text-navy-900 placeholder:text-gray-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-navy-50/50 to-gold-50/50 rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
              
              <Button variant="ghost" size="icon" className="hover:bg-navy-100 transition-colors">
                <Bell className="h-5 w-5 text-navy-700" />
              </Button>
              
              <Cart cart={cart} setCart={setCart} />
              
              <Button variant="ghost" size="icon" className="hover:bg-navy-100 transition-colors">
                <User className="h-5 w-5 text-navy-700" />
              </Button>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center space-x-2">
              <Cart cart={cart} setCart={setCart} />
              <Button 
                variant="ghost" 
                size="icon" 
                className="hover:bg-navy-100 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5 text-navy-700" /> : <Menu className="h-5 w-5 text-navy-700" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-navy-100 bg-white shadow-lg animate-slide-down">
              <div className="px-4 py-6 space-y-6">
                {/* Mobile Search */}
                <div className="relative group animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-navy-700 transition-all duration-300 z-10" />
                    <Input
                      placeholder="Search courses, resources..."
                      className="pl-12 pr-4 py-3 w-full border-2 border-navy-200 focus:border-navy-700 focus:ring-2 focus:ring-navy-700/20 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300 text-navy-900 placeholder:text-gray-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-navy-50/50 to-gold-50/50 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>
                
                {/* Quick Actions */}
                <div className="space-y-3 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      variant="ghost" 
                      className="flex flex-col items-center justify-center p-4 h-20 bg-gradient-to-br from-navy-50 to-navy-100 hover:from-navy-100 hover:to-navy-200 border border-navy-200 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-md"
                    >
                      <Bell className="h-6 w-6 text-navy-700 mb-2" />
                      <span className="text-xs font-medium text-navy-700">Notifications</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="flex flex-col items-center justify-center p-4 h-20 bg-gradient-to-br from-gold-50 to-gold-100 hover:from-gold-100 hover:to-gold-200 border border-gold-200 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-md"
                    >
                      <User className="h-6 w-6 text-gold-700 mb-2" />
                      <span className="text-xs font-medium text-gold-700">Profile</span>
                    </Button>
                  </div>
                </div>
                
                {/* Mobile Navigation Tabs */}
                <div className="space-y-2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Navigation</h3>
                  <div className="space-y-1">
                    <Button 
                      variant="ghost" 
                      className={`justify-start w-full text-left p-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] ${activeTab === "dashboard" ? "bg-navy-100 text-navy-900 shadow-sm" : "text-navy-700 hover:bg-navy-50"}`}
                      onClick={() => {
                        setActiveTab("dashboard")
                        setIsMobileMenuOpen(false)
                      }}
                    >
                      Dashboard
                    </Button>
                    <Button 
                      variant="ghost" 
                      className={`justify-start w-full text-left p-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] ${activeTab === "merch" ? "bg-navy-100 text-navy-900 shadow-sm" : "text-navy-700 hover:bg-navy-50"}`}
                      onClick={() => {
                        setActiveTab("merch")
                        setIsMobileMenuOpen(false)
                      }}
                    >
                      Merch Store
                    </Button>
                    <Button 
                      variant="ghost" 
                      className={`justify-start w-full text-left p-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] ${activeTab === "profile" ? "bg-navy-100 text-navy-900 shadow-sm" : "text-navy-700 hover:bg-navy-50"}`}
                      onClick={() => {
                        setActiveTab("profile")
                        setIsMobileMenuOpen(false)
                      }}
                    >
                      Profile
                    </Button>
                    <Button 
                      variant="ghost" 
                      className={`justify-start w-full text-left p-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] ${activeTab === "e-library" ? "bg-navy-100 text-navy-900 shadow-sm" : "text-navy-700 hover:bg-navy-50"}`}
                      onClick={() => {
                        setActiveTab("e-library")
                        setIsMobileMenuOpen(false)
                      }}
                    >
                      E-Library
                    </Button>
                    <Button 
                      variant="ghost" 
                      className={`justify-start w-full text-left p-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] ${activeTab === "about-us" ? "bg-navy-100 text-navy-900 shadow-sm" : "text-navy-700 hover:bg-navy-50"}`}
                      onClick={() => {
                        setActiveTab("about-us")
                        setIsMobileMenuOpen(false)
                      }}
                    >
                      About Us
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-8">
          {/* Desktop Navigation Tabs - Hidden on mobile */}
          <TabsList className="hidden md:flex justify-center bg-navy-50 border border-navy-100 rounded-full p-1 shadow-sm mx-auto w-full max-w-2xl">
            <TabsTrigger 
              value="dashboard"
              className="flex-1 min-w-0 data-[state=active]:bg-navy-700 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:border-navy-700 transition-all duration-300 ease-in-out hover:bg-navy-100 text-navy-700 rounded-full px-3 py-2 text-sm font-medium"
            >
              Dashboard
            </TabsTrigger>
            <TabsTrigger 
              value="merch"
              className="flex-1 min-w-0 data-[state=active]:bg-navy-700 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:border-navy-700 transition-all duration-300 ease-in-out hover:bg-navy-100 text-navy-700 rounded-full px-3 py-2 text-sm font-medium"
            >
              Merch Store
            </TabsTrigger>
            <TabsTrigger 
              value="profile" 
              className="flex-1 min-w-0 data-[state=active]:bg-navy-700 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:border-navy-700 transition-all duration-300 ease-in-out hover:bg-navy-100 text-navy-700 rounded-full px-3 py-2 text-sm font-medium"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger 
              value="e-library" 
              className="flex-1 min-w-0 data-[state=active]:bg-navy-700 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:border-navy-700 transition-all duration-300 ease-in-out hover:bg-navy-100 text-navy-700 rounded-full px-3 py-2 text-sm font-medium"
            >
              E-Library
            </TabsTrigger>
            <TabsTrigger 
              value="about-us" 
              className="flex-1 min-w-0 data-[state=active]:bg-navy-700 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:border-navy-700 transition-all duration-300 ease-in-out hover:bg-navy-100 text-navy-700 rounded-full px-3 py-2 text-sm font-medium"
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
