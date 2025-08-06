"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Calendar, GraduationCap, ShoppingCart, Bell, User, Search, Star, Plus, Minus, MapPin, Clock, Users, Award, TrendingUp } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

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
const [cartOpen, setCartOpen] = useState(false)

const merchItems: MerchItem[] = [
  {
    id: 1,
    name: "PACSMIN Chemistry Hoodie",
    price: 45.99,
    image: "/merch/hoodie.jpg",
    category: "Apparel",
    rating: 4.8,
    reviews: 124
  },
  {
    id: 2,
    name: "Periodic Table T-Shirt",
    price: 24.99,
    image: "/merch/periodic-table.jpg",
    category: "Apparel",
    rating: 4.6,
    reviews: 89
  },
  {
    id: 3,
    name: "Chemistry Lab Mug",
    price: 12.99,
    image: "/merch/chem-mug.avif",
    category: "Accessories",
    rating: 4.7,
    reviews: 156
  },
  {
    id: 4,
    name: "Lab Equipment Backpack",
    price: 89.99,
    image: "/merch/backpack.jpg",
    category: "Accessories",
    rating: 4.9,
    reviews: 203
  },
  {
    id: 5,
    name: "PACSMIN Chemistry Cap",
    price: 19.99,
    image: "/merch/cap.jpg",
    category: "Apparel",
    rating: 4.5,
    reviews: 67
  },
  {
    id: 6,
    name: "Molecular Structure Bottle",
    price: 16.99,
    image: "/merch/molecule.jpg",
    category: "Accessories",
    rating: 4.4,
    reviews: 91
  }
]

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

const updateQuantity = (id: number, change: number) => {
  setCart(prevCart =>
    prevCart.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(0, item.quantity + change) }
        : item
    ).filter(item => item.quantity > 0)
  )
}

const getTotalPrice = () => {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
}

const getTotalItems = () => {
  return cart.reduce((total, item) => total + item.quantity, 0)
}

return (
  <div className="min-h-screen bg-gradient-to-br from-navy-50 to-teal-50 font-sans">
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
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setCartOpen(!cartOpen)}
              className="relative hover:bg-navy-100 transition-colors"
            >
              <ShoppingCart className="h-5 w-5 text-navy-700" />
              {getTotalItems() > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-teal-500 text-white animate-bounce">
                  {getTotalItems()}
                </Badge>
              )}
            </Button>
            
            <Button variant="ghost" size="icon" className="hover:bg-navy-100 transition-colors">
              <User className="h-5 w-5 text-navy-700" />
            </Button>
          </div>
        </div>
      </div>
    </header>

    {/* Shopping Cart Sidebar */}
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
                        <p className="text-teal-600 font-semibold">₱{item.price}</p>
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
                <Button className="w-full bg-navy-700 text-white hover:bg-navy-800 transition-colors">Checkout</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    )}

    {/* Main Content */}
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-navy-50 border border-navy-100 rounded-lg p-1 shadow-sm">
          <TabsTrigger 
            value="dashboard" 
            className="data-[state=active]:bg-navy-700 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:border-navy-700 transition-all duration-300 ease-in-out hover:bg-navy-100 text-navy-700"
          >
            Dashboard
          </TabsTrigger>
          <TabsTrigger 
            value="courses" 
            className="data-[state=active]:bg-navy-700 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:border-navy-700 transition-all duration-300 ease-in-out hover:bg-navy-100 text-navy-700"
          >
            Courses
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
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6 animate-fade-in-slide-up">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-navy-700 to-navy-900 rounded-xl p-8 text-white shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0V0h2v34h-2zM0 0h2v34H0V0zm0 36h2v24H0V36zm36 0h2v24h-2V36zM24 0h2v4H24V0zm0 36h2v4H24V36zm12 0h2v4H12V0zm0 36h2v4H12V36zm0 24h4v2H0v-2zm36 0h4v2h-4v-2zm0 12h4v2H0v-2zm36 12h4v2h-4v-2zm12 24h4v2h-4v-2zm24 0h4v2h-4v-2zM0 0h24v2H0V0zm0 12h24v2H0v-2zm0 24h24v2H0v-2zm24 0h24v2H24v-2zm0 48h24v2H0v-2zm24 0h24v2H24v-2zm0 36h24v2H0v-2zm24 0h24v2H24v-2zm0 0h2v60H0V0zm12 0h2v60h-2V0zm24 0h2v60h-2V0zm12 0h2v60h-2V0zm-12 0h2v60h-2V0zm-12 0h2v60h-2V0z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
            <h2 className="text-3xl font-extrabold mb-2 drop-shadow-md">Welcome back, Abby!</h2>
            <p className="text-navy-200 text-lg">Ready to continue your chemistry journey?</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Quick Stats */}
            <Card className="group hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out border-navy-100 hover:border-teal-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-navy-900">Current GPA</CardTitle>
                <TrendingUp className="h-4 w-4 text-teal-600 group-hover:scale-125 transition-transform" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-navy-700">3.85</div>
                <p className="text-xs text-gray-500">+0.12 from last semester</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out border-navy-100 hover:border-teal-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-navy-900">Credits Completed</CardTitle>
                <Award className="h-4 w-4 text-teal-600 group-hover:rotate-12 transition-transform" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-navy-700">89/120</div>
                <p className="text-xs text-gray-500">74% complete</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out border-navy-100 hover:border-teal-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-navy-900">Active Courses</CardTitle>
                <BookOpen className="h-4 w-4 text-teal-600 group-hover:translate-x-1 transition-transform" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-navy-700">5</div>
                <p className="text-xs text-gray-500">Spring 2024</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Announcements */}
            <Card className="animate-fade-in-slide-up" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <CardTitle className="text-navy-900">Recent Announcements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3 group hover:bg-navy-50 p-2 rounded-md transition-colors cursor-pointer">
                  <div className="w-2 h-2 bg-navy-600 rounded-full mt-2 group-hover:scale-150 transition-transform"></div>
                  <div>
                    <p className="font-medium text-navy-900">Organic Chemistry Midterm Schedule</p>
                    <p className="text-sm text-gray-600">Check your course pages for exam dates</p>
                    <p className="text-xs text-gray-400">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 group hover:bg-navy-50 p-2 rounded-md transition-colors cursor-pointer">
                  <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 group-hover:scale-150 transition-transform"></div>
                  <div>
                    <p className="font-medium text-navy-900">New Lab Safety Protocols</p>
                    <p className="text-sm text-gray-600">Updated safety guidelines for all chemistry labs</p>
                    <p className="text-xs text-gray-400">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 group hover:bg-navy-50 p-2 rounded-md transition-colors cursor-pointer">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 group-hover:scale-150 transition-transform"></div>
                  <div>
                    <p className="font-medium text-navy-900">Chemistry Research Symposium</p>
                    <p className="text-sm text-gray-600">Annual research presentations March 20th</p>
                    <p className="text-xs text-gray-400">3 days ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card className="animate-fade-in-slide-up" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="text-navy-900">Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 group hover:bg-navy-50 p-2 rounded-md transition-colors cursor-pointer">
                  <Calendar className="h-5 w-5 text-navy-600 group-hover:text-teal-600 transition-colors" />
                  <div>
                    <p className="font-medium text-navy-900">CS 301 - Data Structures Quiz</p>
                    <p className="text-sm text-gray-600 flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-gray-400 group-hover:text-navy-600 transition-colors" />
                      Tomorrow, 2:00 PM
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 group hover:bg-navy-50 p-2 rounded-md transition-colors cursor-pointer">
                  <Calendar className="h-5 w-5 text-teal-600 group-hover:text-navy-600 transition-colors" />
                  <div>
                    <p className="font-medium text-navy-900">Study Group - Linear Algebra</p>
                    <p className="text-sm text-gray-600 flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-gray-400 group-hover:text-navy-600 transition-colors" />
                      Library Room 204, Friday 3:00 PM
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 group hover:bg-navy-50 p-2 rounded-md transition-colors cursor-pointer">
                  <Calendar className="h-5 w-5 text-purple-500 group-hover:text-navy-600 transition-colors" />
                  <div>
                    <p className="font-medium text-navy-900">Guest Lecture - AI Ethics</p>
                    <p className="text-sm text-gray-600 flex items-center">
                      <Users className="h-4 w-4 mr-1 text-gray-400 group-hover:text-navy-600 transition-colors" />
                      Auditorium A, Next Monday 1:00 PM
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Courses Tab */}
        <TabsContent value="courses" className="space-y-6 animate-fade-in-slide-up">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-navy-900">My Courses</h2>
            <Badge variant="secondary" className="bg-teal-100 text-teal-700 border-teal-200">Spring 2024</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="group hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out border-navy-100 hover:border-teal-300">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-navy-900">
                  CHEM 301
                  <Badge className="bg-green-100 text-green-800">A-</Badge>
                </CardTitle>
                <CardDescription className="text-gray-600">Organic Chemistry</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-navy-900">
                    <span>Progress</span>
                    <span>85%</span>
                  </div>
                  <div className="w-full bg-navy-100 rounded-full h-2">
                    <div className="bg-navy-700 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Next: Assignment 4 due Friday</p>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out border-navy-100 hover:border-teal-300">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-navy-900">
                  CHEM 250
                  <Badge className="bg-navy-50 text-navy-700 border-navy-200">B+</Badge>
                </CardTitle>
                <CardDescription className="text-gray-600">Analytical Chemistry</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-navy-900">
                    <span>Progress</span>
                    <span>78%</span>
                  </div>
                  <div className="w-full bg-navy-100 rounded-full h-2">
                    <div className="bg-navy-700 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Next: Midterm exam Monday</p>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out border-navy-100 hover:border-teal-300">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-navy-900">
                  CHEM 102
                  <Badge className="bg-green-100 text-green-800">A</Badge>
                </CardTitle>
                <CardDescription className="text-gray-600">General Chemistry II</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-navy-900">
                    <span>Progress</span>
                    <span>92%</span>
                  </div>
                  <div className="w-full bg-navy-100 rounded-full h-2">
                    <div className="bg-navy-700 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Next: Final project proposal</p>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out border-navy-100 hover:border-teal-300">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-navy-900">
                  CHEM 201
                  <Badge className="bg-yellow-100 text-yellow-800">B</Badge>
                </CardTitle>
                <CardDescription className="text-gray-600">Physical Chemistry</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-navy-900">
                    <span>Progress</span>
                    <span>70%</span>
                  </div>
                  <div className="w-full bg-navy-100 rounded-full h-2">
                    <div className="bg-navy-700 h-2 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Next: Lab report due Wednesday</p>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out border-navy-100 hover:border-teal-300">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-navy-900">
                  CHEM 150
                  <Badge className="bg-green-100 text-green-800">A-</Badge>
                </CardTitle>
                <CardDescription className="text-gray-600">Biochemistry</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-navy-900">
                    <span>Progress</span>
                    <span>88%</span>
                  </div>
                  <div className="w-full bg-navy-100 rounded-full h-2">
                    <div className="bg-navy-700 h-2 rounded-full" style={{ width: '88%' }}></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Next: Research paper outline</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Merch Store Tab */}
        <TabsContent value="merch" className="space-y-6 animate-fade-in-slide-up">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-navy-900">University Merch Store</h2>
            <div className="flex space-x-2">
              <Button variant="outline" className="border-navy-200 text-navy-700 hover:bg-navy-100 hover:border-navy-300 transition-colors">Apparel</Button>
              <Button variant="outline" className="border-navy-200 text-navy-700 hover:bg-navy-100 hover:border-navy-300 transition-colors">Accessories</Button>
              <Button variant="outline" className="border-navy-200 text-navy-700 hover:bg-navy-100 hover:border-navy-300 transition-colors">All Items</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {merchItems.map(item => (
              <Card key={item.id} className="overflow-hidden group hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out border-navy-100 hover:border-teal-300">
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-navy-900">{item.name}</h3>
                    <Badge variant="secondary" className="bg-teal-100 text-teal-700 border-teal-200">{item.category}</Badge>
                  </div>
                  <div className="flex items-center space-x-1 mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-navy-900">{item.rating}</span>
                    <span className="text-sm text-gray-500">({item.reviews})</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-teal-600">₱{item.price}</span>
                    <Button 
                      onClick={() => addToCart(item)}
                      className="bg-navy-700 text-white hover:bg-navy-800 hover:scale-[1.05] transition-all duration-200 ease-in-out"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6 animate-fade-in-slide-up">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1 group hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out border-navy-100 hover:border-teal-300">
              <CardHeader className="text-center">
                <div className="w-24 h-24 bg-navy-50 rounded-full mx-auto flex items-center justify-center border-2 border-navy-200 group-hover:border-teal-400 transition-colors">
                  <User className="h-12 w-12 text-navy-700 group-hover:text-teal-600 transition-colors" />
                </div>
                <CardTitle className="text-navy-900">Abby Bongcayao</CardTitle>
                <CardDescription className="text-gray-600">Chemistry Major</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Student ID</p>
                  <p className="text-sm text-navy-900">CS2024001</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Year</p>
                  <p className="text-sm text-navy-900">Junior (3rd Year)</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Expected Graduation</p>
                  <p className="text-sm text-navy-900">Spring 2025</p>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2 group hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out border-navy-100 hover:border-teal-300">
              <CardHeader>
                <CardTitle className="text-navy-900">Academic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Major</p>
                    <p className="text-sm text-navy-900">Chemistry</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Minor</p>
                    <p className="text-sm text-navy-900">Mathematics</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Advisor</p>
                    <p className="text-sm text-navy-900">Dr. Sarah Mitchell</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Department</p>
                    <p className="text-sm text-navy-900">Chemistry Department</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3 text-navy-900">Academic Progress</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1 text-navy-900">
                        <span>Overall Progress</span>
                        <span>74% (89/120 credits)</span>
                      </div>
                      <div className="w-full bg-navy-100 rounded-full h-2">
                        <div className="bg-navy-700 h-2 rounded-full" style={{ width: '74%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1 text-navy-900">
                        <span>Major Requirements</span>
                        <span>68% (41/60 credits)</span>
                      </div>
                      <div className="w-full bg-navy-100 rounded-full h-2">
                        <div className="bg-teal-600 h-2 rounded-full" style={{ width: '68%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  </div>
)
}
