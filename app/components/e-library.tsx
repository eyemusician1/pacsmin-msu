"use client"

import { useState, useEffect, useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, BookOpen, Download, Bookmark, Star, Grid, List, Clock, TrendingUp, Users, Eye, Heart, Sparkles, FlaskConical, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from "@/lib/utils"

// Enhanced BackgroundGradientAnimation
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
    document.body.style.setProperty("--gradient-background-start", "#f1f5f9")
    document.body.style.setProperty("--gradient-background-end", "#fef3c7")
    document.body.style.setProperty("--first-color", "51, 65, 85")
    document.body.style.setProperty("--second-color", "245, 158, 11")
    document.body.style.setProperty("--third-color", "255, 255, 255")
    document.body.style.setProperty("--fourth-color", "217, 119, 6")
    document.body.style.setProperty("--fifth-color", "30, 41, 59")
    document.body.style.setProperty("--pointer-color", "245, 158, 11")
    document.body.style.setProperty("--size", "75%")
    document.body.style.setProperty("--blending-value", "soft-light")
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
        "relative overflow-hidden w-full rounded-2xl sm:rounded-3xl",
        containerClassName
      )}
      onMouseMove={handleMouseMove}
      style={{ minHeight: 'min(24rem, 60vw)' }}
    >
      <svg className="hidden">
        <defs>
          <filter id="blurMe">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className={cn("relative z-10", className)}>{children}</div>
      <div
        className={cn(
          "gradients-container absolute inset-0 w-full h-full blur-lg -z-10 pointer-events-none",
          isSafari ? "blur-2xl" : "[filter:url(#blurMe)_blur(40px)]"
        )}
      >
        <div className="absolute [background:radial-gradient(circle_at_center,_rgba(var(--first-color),_0.8)_0,_rgba(var(--first-color),_0)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] animate-[moveVertical_30s_ease_infinite] opacity-100" />
        <div className="absolute [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_0.8)_0,_rgba(var(--second-color),_0)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] animate-[moveInCircle_20s_reverse_infinite] opacity-100" />
        <div className="absolute [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.8)_0,_rgba(var(--third-color),_0)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] animate-[moveInCircle_40s_linear_infinite] opacity-100" />
        <div className="absolute [background:radial-gradient(circle_at_center,_rgba(var(--fourth-color),_0.8)_0,_rgba(var(--fourth-color),_0)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] animate-[moveHorizontal_40s_ease_infinite] opacity-70" />
        <div className="absolute [background:radial-gradient(circle_at_center,_rgba(var(--fifth-color),_0.8)_0,_rgba(var(--fifth-color),_0)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] animate-[moveInCircle_20s_ease_infinite] opacity-100" />
        <div
          ref={interactiveRef}
          className="absolute [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.8)_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] w-full h-full -top-1/2 -left-1/2 opacity-70"
        />
      </div>
    </div>
  )
}

interface Book {
  id: number
  title: string
  author: string
  category: string
  description: string
  image: string
  rating: number
  downloads: number
  pages: number
  year: number
  isNew?: boolean
  isTrending?: boolean
  readingTime: string
}

interface Journal {
  id: number
  title: string
  publisher: string
  volume: string
  issue: string
  description: string
  image: string
  impactFactor: number
  articles: number
  isNew?: boolean
}

export function ELibraryContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [activeTab, setActiveTab] = useState('books')
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)

  const categories = ["All", "Organic Chemistry", "Physical Chemistry", "Analytical Chemistry", "Biochemistry", "Materials Science"]

  const books: Book[] = [
    {
      id: 1,
      title: "Organic Chemistry",
      author: "Jonathan Clayden",
      category: "Organic Chemistry",
      description: "A comprehensive guide to organic chemistry principles, mechanisms, and synthesis strategies.",
      image: "/library/organic-clayden.jpg",
      rating: 4.8,
      downloads: 15420,
      pages: 1234,
      year: 2012,
      isNew: false,
      isTrending: true,
      readingTime: "45 hours"
    },
    {
      id: 2,
      title: "Physical Chemistry",
      author: "Peter Atkins",
      category: "Physical Chemistry",
      description: "The definitive textbook covering thermodynamics, quantum mechanics, and chemical kinetics.",
      image: "/library/physical-atkins.jpg",
      rating: 4.7,
      downloads: 12890,
      pages: 1016,
      year: 2018,
      isNew: true,
      isTrending: true,
      readingTime: "38 hours"
    },
    {
      id: 3,
      title: "Analytical Chemistry",
      author: "Gary Christian",
      category: "Analytical Chemistry",
      description: "Modern analytical techniques and instrumentation for quantitative analysis.",
      image: "/library/analytical-christian.jpg",
      rating: 4.6,
      downloads: 9876,
      pages: 828,
      year: 2020,
      isNew: true,
      isTrending: false,
      readingTime: "32 hours"
    },
    {
      id: 4,
      title: "Biochemistry",
      author: "Jeremy Berg",
      category: "Biochemistry",
      description: "Exploring the molecular basis of life through biochemical processes and pathways.",
      image: "/library/biochemistry-berg.jpg",
      rating: 4.9,
      downloads: 18750,
      pages: 1152,
      year: 2019,
      isNew: false,
      isTrending: true,
      readingTime: "42 hours"
    }
  ]

  const journals: Journal[] = [
    {
      id: 1,
      title: "Journal of Chemical Education",
      publisher: "American Chemical Society",
      volume: "Vol 101",
      issue: "Issue 5",
      description: "Peer-reviewed articles on chemical education, research methodologies, and pedagogical innovations.",
      image: "/library/jce.jpg",
      impactFactor: 2.8,
      articles: 156,
      isNew: true
    },
    {
      id: 2,
      title: "Nature Chemistry",
      publisher: "Nature Publishing Group",
      volume: "Vol 16",
      issue: "Issue 4",
      description: "High-quality research across all disciplines of chemistry and chemical biology.",
      image: "/library/nature-chem.jpg",
      impactFactor: 21.8,
      articles: 89,
      isNew: false
    },
    {
      id: 3,
      title: "Chemical Reviews",
      publisher: "American Chemical Society",
      volume: "Vol 124",
      issue: "Issue 8",
      description: "Comprehensive reviews covering recent advances in all areas of chemistry.",
      image: "/library/chem-reviews.jpg",
      impactFactor: 62.1,
      articles: 234,
      isNew: true
    }
  ]

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || book.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const filteredJournals = journals.filter(journal => {
    const matchesSearch = journal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         journal.publisher.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100/30 to-amber-50/20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            rotate: { duration: 60, repeat: Infinity, ease: "linear" },
            scale: { duration: 10, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-slate-400/10 to-slate-600/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1.1, 1, 1.1],
          }}
          transition={{ 
            rotate: { duration: 45, repeat: Infinity, ease: "linear" },
            scale: { duration: 7, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-tr from-amber-400/10 to-amber-600/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 space-y-8 px-6 py-8">
        {/* Enhanced Header */}
        <BackgroundGradientAnimation containerClassName="mb-8">
          <div className="relative z-10 bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-slate-200/50 p-6 sm:p-8 md:p-12">
            {/* Floating Book Illustration */}
            <motion.div 
              className="absolute -top-8 -left-8 sm:-top-12 sm:-left-12 z-20"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="20" y="15" width="40" height="50" rx="4" fill="#334155" stroke="#f59e0b" strokeWidth="2"/>
                <rect x="22" y="17" width="36" height="46" rx="2" fill="#f8fafc"/>
                <line x1="26" y1="25" x2="54" y2="25" stroke="#334155" strokeWidth="1"/>
                <line x1="26" y1="30" x2="50" y2="30" stroke="#334155" strokeWidth="1"/>
                <line x1="26" y1="35" x2="52" y2="35" stroke="#334155" strokeWidth="1"/>
                <circle cx="30" cy="45" r="8" fill="#f59e0b" opacity="0.3"/>
                <path d="M26 45 L30 49 L34 41" stroke="#334155" strokeWidth="2" fill="none"/>
              </svg>
            </motion.div>

            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="flex-1 text-center lg:text-left">
                <motion.h1 
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight text-slate-800"
                >
                  PACSMIN <span className="relative text-amber-600 underline decoration-wavy underline-offset-4">E-Library</span>
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 mb-6 text-slate-600"
                >
                  Access thousands of chemistry textbooks, journals, and research papers. Your gateway to academic excellence.
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="italic text-amber-700 text-sm sm:text-base mb-6"
                >
                  &ldquo;A library is not a luxury but one of the necessities of life.&rdquo; – Henry Ward Beecher
                </motion.p>
              </div>

              {/* Quick Stats */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="grid grid-cols-2 gap-4 lg:gap-6"
              >
                <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/50">
                  <div className="text-2xl font-bold text-slate-700">2,500+</div>
                  <div className="text-sm text-slate-600">Books</div>
                </div>
                <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/50">
                  <div className="text-2xl font-bold text-amber-600">150+</div>
                  <div className="text-sm text-slate-600">Journals</div>
                </div>
                <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/50">
                  <div className="text-2xl font-bold text-slate-700">50K+</div>
                  <div className="text-sm text-slate-600">Downloads</div>
                </div>
                <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/50">
                  <div className="text-2xl font-bold text-amber-600">24/7</div>
                  <div className="text-sm text-slate-600">Access</div>
                </div>
              </motion.div>
            </div>
          </div>
        </BackgroundGradientAnimation>

        {/* Enhanced Search and Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="bg-white/95 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-slate-200/50"
        >
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            {/* Enhanced Search Bar */}
            <div className="relative group flex-1 max-w-2xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 transition-colors group-focus-within:text-slate-600" />
              <Input
                placeholder="Search books, journals, authors, topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 bg-white/90 backdrop-blur-sm border border-slate-200/50 rounded-2xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-300 shadow-lg hover:shadow-xl text-slate-700 placeholder-slate-400 text-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-500/10 to-amber-500/10 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                  className={`rounded-2xl w-12 h-12 shadow-lg transition-all duration-300 ${
                    viewMode === 'grid' 
                      ? 'bg-gradient-to-r from-amber-500 to-slate-600 text-white shadow-amber-500/25' 
                      : 'bg-white/90 border-slate-200/50 hover:bg-slate-50 hover:shadow-xl text-slate-600'
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
                      ? 'bg-gradient-to-r from-amber-500 to-slate-600 text-white shadow-amber-500/25' 
                      : 'bg-white/90 border-slate-200/50 hover:bg-slate-50 hover:shadow-xl text-slate-600'
                  }`}
                >
                  <List className="w-5 h-5" />
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mt-6">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`relative px-6 py-3 rounded-2xl font-semibold transition-all duration-500 overflow-hidden group ${
                  selectedCategory === category
                    ? 'text-white shadow-2xl transform scale-105'
                    : 'text-slate-700 hover:text-slate-800 bg-white/60 hover:bg-slate-50 shadow-lg hover:shadow-xl'
                }`}
              >
                {selectedCategory === category && (
                  <motion.div
                    layoutId="categoryBackground"
                    className="absolute inset-0 bg-gradient-to-r from-amber-500 via-slate-600 to-slate-700"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.8 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {category}
                  {category === "All" && <Sparkles className="w-4 h-4" />}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center"
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-2 shadow-lg border border-slate-200/50">
            <div className="flex gap-2">
              {[
                { id: 'books', label: 'Textbooks', icon: BookOpen },
                { id: 'journals', label: 'Journals', icon: FlaskConical },
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 ${
                    activeTab === tab.id
                      ? 'text-white shadow-lg'
                      : 'text-slate-700 hover:text-slate-800 hover:bg-white/50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-amber-500 to-slate-600 rounded-xl"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <tab.icon className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">{tab.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'books' && (
              <div className={`grid gap-8 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1 max-w-4xl mx-auto'
              }`}>
                {filteredBooks.map((book, index) => (
                  <motion.div
                    key={book.id}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    onHoverStart={() => setHoveredItem(book.id)}
                    onHoverEnd={() => setHoveredItem(null)}
                    className="group cursor-pointer"
                  >
                    <Card className={`overflow-hidden bg-white/95 backdrop-blur-xl border-0 shadow-2xl hover:shadow-3xl transition-all duration-700 relative ${
                      viewMode === 'grid' ? 'rounded-3xl h-full' : 'rounded-2xl flex flex-row'
                    }`}>
                      {/* Book Cover */}
                      <div className={`relative overflow-hidden bg-gradient-to-br from-slate-100 via-slate-50/50 to-amber-50/50 ${
                        viewMode === 'grid' ? 'h-64' : 'h-48 w-48 flex-shrink-0'
                      }`}>
                        <motion.img
                          src={book.image || "/placeholder.svg?height=256&width=192&query=chemistry+textbook"}
                          alt={book.title}
                          className="w-full h-full object-cover transition-all duration-700"
                          animate={{
                            scale: hoveredItem === book.id ? 1.1 : 1,
                            filter: hoveredItem === book.id ? 'brightness(1.1)' : 'brightness(1)'
                          }}
                        />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        {/* Floating Actions */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ 
                            opacity: hoveredItem === book.id ? 1 : 0,
                            scale: hoveredItem === book.id ? 1 : 0.8
                          }}
                          className="absolute top-4 right-4 flex flex-col gap-2"
                        >
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
                          >
                            <Heart className="w-4 h-4 text-slate-600 group-hover/btn:text-red-500 transition-colors" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
                          >
                            <Bookmark className="w-4 h-4 text-slate-600 group-hover/btn:text-amber-600 transition-colors" />
                          </motion.button>
                        </motion.div>

                        {/* Badges */}
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                          {book.isNew && (
                            <motion.div
                              initial={{ scale: 0, rotate: -10 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                              className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
                            >
                              NEW
                            </motion.div>
                          )}
                          {book.isTrending && (
                            <motion.div
                              initial={{ scale: 0, rotate: 10 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ delay: 0.3, type: "spring", bounce: 0.5 }}
                              className="bg-gradient-to-r from-slate-600 to-slate-700 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1"
                            >
                              <TrendingUp className="w-3 h-3" />
                              TRENDING
                            </motion.div>
                          )}
                        </div>
                      </div>

                      {/* Book Info */}
                      <CardContent className="p-6 space-y-4 flex-1">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between gap-3">
                            <motion.h3 
                              className="font-bold text-lg text-slate-800 leading-tight group-hover:text-slate-700 transition-colors duration-300 line-clamp-2"
                              animate={{ x: hoveredItem === book.id ? 4 : 0 }}
                            >
                              {book.title}
                            </motion.h3>
                            <Badge className="bg-gradient-to-r from-slate-100 to-amber-100 text-slate-700 border border-slate-200 font-medium px-2 py-1 rounded-full text-xs">
                              {book.year}
                            </Badge>
                          </div>
                          
                          <p className="text-slate-600 font-medium">{book.author}</p>
                          <p className="text-sm text-slate-600 line-clamp-2">{book.description}</p>
                          
                          {/* Stats */}
                          <div className="flex items-center gap-4 text-sm text-slate-500">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                              <span className="font-medium">{book.rating}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Download className="w-4 h-4" />
                              <span>{book.downloads.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{book.readingTime}</span>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-2">
                          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                            <Button className="w-full bg-gradient-to-r from-amber-500 to-slate-600 hover:from-amber-600 hover:to-slate-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2">
                              <BookOpen className="w-4 h-4" />
                              Read Now
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button variant="outline" size="icon" className="rounded-xl border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-700">
                              <Download className="w-4 h-4" />
                            </Button>
                          </motion.div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'journals' && (
              <div className={`grid gap-8 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1 max-w-4xl mx-auto'
              }`}>
                {filteredJournals.map((journal, index) => (
                  <motion.div
                    key={journal.id}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group cursor-pointer"
                  >
                    <Card className="overflow-hidden bg-white/95 backdrop-blur-xl border-0 shadow-2xl hover:shadow-3xl transition-all duration-700 rounded-3xl h-full">
                      {/* Journal Cover */}
                      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-100 via-slate-50/50 to-amber-50/50">
                        <motion.img
                          src={journal.image || "/placeholder.svg?height=192&width=256&query=chemistry+journal"}
                          alt={journal.title}
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                        />
                        
                        {/* Impact Factor Badge */}
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                          IF: {journal.impactFactor}
                        </div>
                        
                        {journal.isNew && (
                          <div className="absolute top-4 left-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                            NEW ISSUE
                          </div>
                        )}
                      </div>

                      {/* Journal Info */}
                      <CardContent className="p-6 space-y-4">
                        <div className="space-y-3">
                          <h3 className="font-bold text-lg text-slate-800 leading-tight group-hover:text-slate-700 transition-colors duration-300">
                            {journal.title}
                          </h3>
                          <p className="text-slate-600 font-medium">{journal.publisher}</p>
                          <p className="text-sm text-amber-600 font-semibold">{journal.volume}, {journal.issue}</p>
                          <p className="text-sm text-slate-600 line-clamp-2">{journal.description}</p>
                          
                          {/* Stats */}
                          <div className="flex items-center gap-4 text-sm text-slate-500">
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              <span>{journal.articles} articles</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              <span>Open Access</span>
                            </div>
                          </div>
                        </div>

                        {/* Action Button */}
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button className="w-full bg-gradient-to-r from-slate-600 to-amber-500 hover:from-slate-700 hover:to-amber-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2">
                            <FlaskConical className="w-4 h-4" />
                            Access Journal
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {((activeTab === 'books' && filteredBooks.length === 0) || 
          (activeTab === 'journals' && filteredJournals.length === 0)) && (
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
              className="w-32 h-32 bg-gradient-to-br from-slate-200 via-amber-200 to-slate-200 rounded-full mx-auto mb-8 flex items-center justify-center shadow-2xl"
            >
              <Search className="w-16 h-16 text-slate-400" />
            </motion.div>
            <h3 className="text-3xl font-bold text-slate-700 mb-4">No {activeTab} found</h3>
            <p className="text-slate-600 mb-8 text-lg">Try adjusting your search or category filters</p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="bg-gradient-to-r from-amber-500 to-slate-600 hover:from-amber-600 hover:to-slate-700 text-white px-10 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 font-bold text-lg"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Clear Filters
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
