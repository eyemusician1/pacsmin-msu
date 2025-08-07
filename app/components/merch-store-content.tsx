"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ShoppingBag, Search, Grid, List, Sparkles, Zap, TrendingUp, Filter, Heart, Eye } from 'lucide-react'
import { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

interface MerchItem {
  id: number
  name: string
  price: number
  image: string
  category: string
  rating: number
  reviews: number
  isNew?: boolean
  isTrending?: boolean
  originalPrice?: number
}

interface MerchStoreContentProps {
  addToCart: (item: MerchItem) => void;
}

const MERCH_ITEMS: MerchItem[] = [
  {
    id: 1,
    name: "PACSMIN Chemistry Hoodie",
    price: 999,
    originalPrice: 1299,
    image: "/merch/hoodie.jpg",
    category: "Apparel",
    rating: 4.8,
    reviews: 124,
    isNew: true,
    isTrending: true
  },
  {
    id: 2,
    name: "Periodic Table T-Shirt",
    price: 599,
    image: "/merch/periodic-table.jpg",
    category: "Apparel",
    rating: 4.6,
    reviews: 89,
    isTrending: true
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
    originalPrice: 999,
    image: "/merch/backpack.jpg",
    category: "Accessories",
    rating: 4.9,
    reviews: 203,
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
    reviews: 91,
    isTrending: true
  }
];

export function MerchStoreContent({ addToCart }: MerchStoreContentProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Items");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  const handleAddToCart = useCallback((item: MerchItem) => {
    addToCart(item);
    toast.success(
      <div className="flex items-center gap-2">
        <ShoppingBag className="h-4 w-4 text-gold-600" />
        <span className="font-medium">{item.name}</span> added to cart!
      </div>,
      {
        duration: 3000,
        style: {
          background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
          color: '#fff',
          borderRadius: '16px',
          border: '1px solid #ca8a04',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        },
      }
    );
  }, [addToCart]);

  const filteredAndSortedItems = useMemo(() => {
    const filtered = MERCH_ITEMS.filter(item => {
      const matchesCategory = selectedCategory === "All Items" || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    // Sort items
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        // Featured - prioritize trending and new items
        filtered.sort((a, b) => {
          const aScore = (a.isTrending ? 2 : 0) + (a.isNew ? 1 : 0);
          const bScore = (b.isTrending ? 2 : 0) + (b.isNew ? 1 : 0);
          return bScore - aScore;
        });
    }

    return filtered;
  }, [selectedCategory, searchQuery, sortBy]);

  const categories = ["All Items", "Apparel", "Accessories"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-navy-50/30 to-gold-50/20 relative overflow-hidden">
      {/* Animated Background Elements - Navy & Gold Theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            rotate: { duration: 50, repeat: Infinity, ease: "linear" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-navy-400/10 to-navy-600/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1.1, 1, 1.1],
          }}
          transition={{ 
            rotate: { duration: 40, repeat: Infinity, ease: "linear" },
            scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-tr from-gold-400/10 to-gold-600/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 space-y-8 animate-fade-in-slide-up px-6 py-8">
        {/* Enhanced Header with Navy & Gold Theme */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-navy-500/20 to-navy-600/20 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute -top-4 -right-8 w-20 h-20 bg-gradient-to-br from-gold-400/20 to-gold-600/20 rounded-full blur-xl animate-pulse delay-1000"></div>
          
          <div className="relative bg-white/90 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-navy-100/30 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-navy-500/5 via-navy-600/5 to-gold-500/5"></div>
            <div className="relative flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <motion.h1 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-navy-900 via-navy-700 to-gold-600 bg-clip-text text-transparent"
                  >
                    Merch Store
                  </motion.h1>
                  <motion.div
                    animate={{ 
                      rotate: 360,
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                      scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="w-10 h-10 bg-gradient-to-r from-gold-500 to-navy-600 rounded-2xl flex items-center justify-center shadow-lg"
                  >
                    <Sparkles className="w-5 h-5 text-white" />
                  </motion.div>
                </div>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-gray-700 text-lg max-w-2xl leading-relaxed"
                >
                  Discover premium PACSMIN merchandise crafted for chemistry enthusiasts and academic excellence
                </motion.p>
              </div>

              {/* Enhanced Search and Controls - Navy & Gold */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto"
              >
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-navy-600" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border border-navy-200/50 rounded-2xl focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 transition-all duration-300 w-full sm:w-72 shadow-lg hover:shadow-xl text-navy-700 placeholder-gray-400"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-navy-500/10 to-gold-500/10 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                
                <div className="flex gap-3">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'outline'}
                      size="icon"
                      onClick={() => setViewMode('grid')}
                      className={`rounded-2xl w-12 h-12 shadow-lg transition-all duration-300 ${
                        viewMode === 'grid' 
                          ? 'bg-gradient-to-r from-gold-500 to-navy-600 text-white shadow-gold-500/25' 
                          : 'bg-white/80 border-navy-200/50 hover:bg-navy-50 hover:shadow-xl text-navy-600'
                      }`}
                    >
                      <Grid className="w-5 h-5" />
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'outline'}
                      size="icon"
                      onClick={() => setViewMode('list')}
                      className={`rounded-2xl w-12 h-12 shadow-lg transition-all duration-300 ${
                        viewMode === 'list' 
                          ? 'bg-gradient-to-r from-gold-500 to-navy-600 text-white shadow-gold-500/25' 
                          : 'bg-white/80 border-navy-200/50 hover:bg-navy-50 hover:shadow-xl text-navy-600'
                      }`}
                    >
                      <List className="w-5 h-5" />
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Filter Bar - Navy & Gold */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="bg-white/80 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-navy-100/30 overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-navy-500/5 via-gold-500/5 to-navy-500/5"></div>
          <div className="relative flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between">
            {/* Enhanced Category Pills - Navy & Gold */}
            <div className="flex flex-wrap gap-3 w-full">
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCategoryChange(category)}
                  className={`relative px-8 py-4 rounded-2xl font-semibold transition-all duration-500 overflow-hidden group ${
                    selectedCategory === category
                      ? 'text-white shadow-2xl transform scale-105'
                      : 'text-navy-700 hover:text-navy-800 bg-white/60 hover:bg-navy-50 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {selectedCategory === category && (
                    <>
                      <motion.div
                        layoutId="categoryBackground"
                        className="absolute inset-0 bg-gradient-to-r from-gold-500 via-navy-600 to-navy-700"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.8 }}
                      />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-gold-400/50 to-navy-400/50 blur-xl"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </>
                  )}
                  <span className="relative z-10 flex items-center gap-3">
                    {category}
                    {category === "All Items" && <Sparkles className="w-4 h-4" />}
                    {category === "Apparel" && <div className="w-2 h-2 bg-current rounded-full animate-pulse" />}
                    {category === "Accessories" && <div className="w-2 h-2 bg-current rounded-full animate-pulse delay-500" />}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Enhanced Sort and Filter Controls - Navy & Gold */}
            <div className="flex items-center gap-4 w-full lg:w-auto">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="pl-10 pr-8 py-3 bg-white/80 backdrop-blur-sm border border-navy-200/50 rounded-2xl focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 transition-all duration-300 shadow-lg hover:shadow-xl text-navy-700 appearance-none cursor-pointer"
                >
                  <option value="featured">✨ Featured</option>
                  <option value="newest">🆕 Newest First</option>
                  <option value="price-low">💰 Price: Low to High</option>
                  <option value="price-high">💎 Price: High to Low</option>
                  <option value="rating">⭐ Highest Rated</option>
                </select>
              </div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="text-sm text-navy-700 bg-gradient-to-r from-gold-50 to-navy-50 px-4 py-3 rounded-2xl border border-gold-200/50 shadow-lg font-medium"
              >
                <span className="text-gold-600 font-bold">{filteredAndSortedItems.length}</span> items found
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Product Grid - Navy & Gold */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={`${selectedCategory}-${sortBy}-${searchQuery}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className={`grid gap-8 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1 max-w-5xl mx-auto'
            }`}
          >
            {filteredAndSortedItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -12, scale: 1.02 }}
                onHoverStart={() => setHoveredItem(item.id)}
                onHoverEnd={() => setHoveredItem(null)}
                className="group cursor-pointer"
              >
                <Card className={`overflow-hidden bg-white/90 backdrop-blur-xl border-0 shadow-2xl hover:shadow-3xl transition-all duration-700 relative ${
                  viewMode === 'grid' ? 'rounded-3xl' : 'rounded-2xl flex flex-col sm:flex-row'
                }`}>
                  {/* Enhanced Image Container - Navy & Gold */}
                  <div className={`relative overflow-hidden bg-gradient-to-br from-slate-100 via-navy-50/50 to-gold-50/50 ${
                    viewMode === 'grid' ? 'h-72' : 'h-56 w-full sm:w-56 flex-shrink-0'
                  }`}>
                    <motion.img
                      src={item.image || "/placeholder.svg?height=288&width=288&query=product"}
                      alt={item.name}
                      className="w-full h-full object-cover transition-all duration-700"
                      animate={{
                        scale: hoveredItem === item.id ? 1.1 : 1,
                        filter: hoveredItem === item.id ? 'brightness(1.1)' : 'brightness(1)'
                      }}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Floating Action Buttons - Navy & Gold */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ 
                        opacity: hoveredItem === item.id ? 1 : 0,
                        scale: hoveredItem === item.id ? 1 : 0.8
                      }}
                      className="absolute top-4 right-4 flex flex-col gap-2"
                    >
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
                      >
                        <Heart className="w-4 h-4 text-navy-600 group-hover/btn:text-red-500 transition-colors" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
                      >
                        <Eye className="w-4 h-4 text-navy-600 group-hover/btn:text-gold-600 transition-colors" />
                      </motion.button>
                    </motion.div>

                    {/* Enhanced Badges - Navy & Gold */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {item.isNew && (
                        <motion.div
                          initial={{ scale: 0, rotate: -10 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                          className="flex items-center gap-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg border border-white/20"
                        >
                          <Zap className="w-3 h-3" />
                          NEW
                        </motion.div>
                      )}
                      {item.isTrending && (
                        <motion.div
                          initial={{ scale: 0, rotate: 10 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.3, type: "spring", bounce: 0.5 }}
                          className="flex items-center gap-1 bg-gradient-to-r from-navy-600 to-navy-700 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg border border-white/20"
                        >
                          <TrendingUp className="w-3 h-3" />
                          TRENDING
                        </motion.div>
                      )}
                    </div>

                    {/* Enhanced Discount Badge */}
                    {item.originalPrice && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4, type: "spring", bounce: 0.6 }}
                        className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg border border-white/20"
                      >
                        -{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                      </motion.div>
                    )}
                  </div>

                  {/* Enhanced Product Info - Navy & Gold */}
                  <CardContent className="p-8 space-y-6 flex-1 relative">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <motion.h3 
                          className="font-bold text-xl text-navy-800 leading-tight group-hover:text-navy-700 transition-colors duration-300"
                          animate={{ x: hoveredItem === item.id ? 4 : 0 }}
                        >
                          {item.name}
                        </motion.h3>
                        <Badge className="bg-gradient-to-r from-navy-100 to-gold-100 text-navy-700 border border-navy-200 font-semibold px-3 py-1 rounded-full shadow-sm">
                          {item.category}
                        </Badge>
                      </div>

                      {/* Enhanced Rating - Navy & Gold */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ delay: 0.1 * i, type: "spring", bounce: 0.5 }}
                            >
                              <Star 
                                className={`w-4 h-4 transition-all duration-300 ${
                                  i < Math.floor(item.rating) 
                                    ? 'fill-gold-500 text-gold-500 drop-shadow-sm' 
                                    : 'fill-slate-200 text-slate-200'
                                }`}
                              />
                            </motion.div>
                          ))}
                        </div>
                        <span className="text-sm font-bold text-navy-700 bg-navy-100 px-2 py-1 rounded-lg">{item.rating}</span>
                        <span className="text-sm text-gray-500">({item.reviews} reviews)</span>
                      </div>

                      {/* Enhanced Price - Navy & Gold */}
                      <div className="flex items-center gap-4">
                        <motion.span 
                          className="text-3xl font-bold bg-gradient-to-r from-navy-700 via-navy-600 to-gold-600 bg-clip-text text-transparent"
                          animate={{ scale: hoveredItem === item.id ? 1.05 : 1 }}
                        >
                          ₱{item.price.toFixed(2)}
                        </motion.span>
                        {item.originalPrice && (
                          <span className="text-lg text-gray-400 line-through bg-slate-100 px-2 py-1 rounded-lg">
                            ₱{item.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Enhanced Add to Cart Button - Navy & Gold */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        onClick={() => handleAddToCart(item)}
                        className="w-full bg-gradient-to-r from-gold-500 via-navy-600 to-navy-700 hover:from-gold-600 hover:via-navy-700 hover:to-navy-800 text-white font-bold py-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 flex items-center justify-center gap-3 group/btn relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                        <motion.div
                          whileHover={{ rotate: 15, scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                          className="relative z-10"
                        >
                          <ShoppingBag className="w-5 h-5" />
                        </motion.div>
                        <span className="relative z-10">Add to Cart</span>
                        <motion.div
                          className="w-0 group-hover/btn:w-3 h-3 bg-white/30 rounded-full transition-all duration-300 relative z-10"
                        />
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Enhanced Empty State - Navy & Gold */}
        {filteredAndSortedItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-20"
          >
            <motion.div 
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="w-32 h-32 bg-gradient-to-br from-navy-200 via-gold-200 to-navy-200 rounded-full mx-auto mb-8 flex items-center justify-center shadow-2xl"
            >
              <Search className="w-16 h-16 text-navy-400" />
            </motion.div>
            <h3 className="text-3xl font-bold text-navy-700 mb-4">No products found</h3>
            <p className="text-gray-600 mb-8 text-lg">Try adjusting your search or filter criteria to discover amazing products</p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All Items");
                  setSortBy("featured");
                }}
                className="bg-gradient-to-r from-gold-500 to-navy-600 hover:from-gold-600 hover:to-navy-700 text-white px-10 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 font-bold text-lg"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Clear All Filters
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
