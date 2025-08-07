"use client"

import { useState, useEffect, useRef } from "react"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import { Calendar, Clock, Users, ChevronLeft, ChevronRight, Megaphone, BookOpen, ShoppingBag, Sparkles, FlaskConical, TrendingUp, Bell, ArrowRight, Zap } from 'lucide-react'
import Image from "next/image"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from 'framer-motion'

interface FeaturedPost {
  id: number;
  title: string;
  description: string;
  category: string;
  date: string;
  image: string;
  priority?: 'high' | 'medium' | 'low';
}

// Enhanced BackgroundGradientAnimation with smoother transitions
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
    document.body.style.setProperty("--gradient-background-start", "#f8fafc")
    document.body.style.setProperty("--gradient-background-end", "#fefce8")
    document.body.style.setProperty("--first-color", "15, 23, 42")
    document.body.style.setProperty("--second-color", "217, 119, 6")
    document.body.style.setProperty("--third-color", "255, 255, 255")
    document.body.style.setProperty("--fourth-color", "180, 83, 9")
    document.body.style.setProperty("--fifth-color", "30, 41, 59")
    document.body.style.setProperty("--pointer-color", "217, 119, 6")
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
      style={{ minHeight: 'min(28rem, 70vw)' }}
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

export function DashboardContent() {
  const [currentFeaturedPostIndex, setCurrentFeaturedPostIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const featuredPosts: FeaturedPost[] = [
    {
      id: 1,
      title: "Breakthrough in Quantum Chemistry Research",
      description: "Explore the latest advancements from our faculty and students in quantum chemistry, opening new avenues for material science.",
      category: "Research",
      date: "May 20, 2024",
      image: "/dashboard/quantum-chem.jpg",
      priority: 'high'
    },
    {
      id: 2,
      title: "Student Success: National Chemistry Olympiad",
      description: "Celebrate our students' outstanding achievements bringing home multiple medals and recognition.",
      category: "Student Life",
      date: "May 18, 2024",
      image: "/dashboard/chem-olympiad.jpg",
      priority: 'high'
    },
    {
      id: 3,
      title: "New State-of-the-Art Lab Equipment",
      description: "Our cutting-edge spectroscopy lab enhances research capabilities for students and faculty.",
      category: "Campus News",
      date: "May 15, 2024",
      image: "/dashboard/spectroscopy.jpg",
      priority: 'medium'
    },
    {
      id: 4,
      title: "Alumni Spotlight: Dr. Elena Rodriguez",
      description: "Learn about Dr. Rodriguez's inspiring journey from PACSMIN to leading pharmaceutical innovations.",
      category: "Alumni",
      date: "May 10, 2024",
      image: "/dashboard/elena-rodriguez.jpg",
      priority: 'medium'
    }
  ];

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentFeaturedPostIndex((prevIndex) =>
        (prevIndex + 1) % featuredPosts.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, featuredPosts.length]);

  const goToNextPost = () => {
    setIsAutoPlaying(false);
    setCurrentFeaturedPostIndex((prevIndex) =>
      (prevIndex + 1) % featuredPosts.length
    );
  };

  const goToPreviousPost = () => {
    setIsAutoPlaying(false);
    setCurrentFeaturedPostIndex((prevIndex) =>
      (prevIndex - 1 + featuredPosts.length) % featuredPosts.length
    );
  };

  const currentPost = featuredPosts[currentFeaturedPostIndex];

  return (
    <div className="relative space-y-8 sm:space-y-12">
      {/* Enhanced Hero Section */}
      <BackgroundGradientAnimation containerClassName="mb-12">
        <div className="relative z-10 bg-white/95 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-slate-200/50 p-6 sm:p-8 md:p-12">
          {/* Subtle floating elements */}
          <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-amber-400/20 to-amber-600/20 rounded-full blur-xl animate-pulse" />
          <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-gradient-to-br from-slate-400/20 to-slate-600/20 rounded-full blur-lg animate-pulse delay-1000" />
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            {/* Content Section */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex-1 text-center lg:text-left space-y-6"
            >
              <motion.div 
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2, duration: 1 }}
  className="space-y-4 sm:space-y-6"
>
  {/* Enhanced Welcome Text with Mobile-First Design */}
  <div className="relative">
    {/* Mobile-optimized floating particles background */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full opacity-40 sm:opacity-30"
          animate={{
            x: [0, 60 + i * 20, 0],
            y: [0, -30 - i * 10, 0],
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut"
          }}
          style={{
            left: `${15 + i * 20}%`,
            top: `${25 + i * 15}%`
          }}
        />
      ))}
    </div>

    <motion.h1 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.8 }}
      className="relative text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black leading-[0.85] sm:leading-[0.9] tracking-tight"
    >
      {/* Welcome text with enhanced mobile styling */}
      <span className="relative inline-block mb-1 sm:mb-2">
        <span className="relative z-10 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent drop-shadow-sm">
          Welcome to
        </span>
        {/* Enhanced mobile shadow */}
        <span className="absolute inset-0 bg-gradient-to-r from-slate-400/30 via-slate-500/30 to-slate-600/30 bg-clip-text text-transparent blur-sm -z-10 translate-x-0.5 translate-y-0.5 sm:translate-x-1 sm:translate-y-1">
          Welcome to
        </span>
      </span>
      
      <br />
      
      {/* PACSMIN with mobile-optimized effects */}
      <span className="relative inline-block group">
        {/* Main PACSMIN text with mobile-first gradient */}
        <motion.span 
          className="relative z-20 bg-gradient-to-r from-amber-600 via-amber-500 via-amber-600 to-amber-700 bg-clip-text text-transparent font-black"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundSize: '200% 200%',
            textShadow: '0 0 20px rgba(217, 119, 6, 0.4), 0 0 40px rgba(217, 119, 6, 0.2)',
            filter: 'drop-shadow(0 2px 4px rgba(217, 119, 6, 0.3))'
          }}
        >
          PACSMIN
        </motion.span>
        
        {/* Mobile-optimized glowing background effect */}
        <motion.span 
          className="absolute inset-0 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent blur-sm opacity-60 -z-10"
          animate={{
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.03, 1]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          PACSMIN
        </motion.span>
        
        {/* Mobile-responsive animated underline */}
        <motion.div
          className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-1 sm:h-2 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 rounded-full shadow-lg"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
        >
          {/* Mobile-optimized shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full"
            animate={{
              x: ['-100%', '100%']
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              delay: 2,
              ease: "easeInOut"
            }}
          />
        </motion.div>
        
        {/* Mobile-optimized sparkle effects */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 sm:w-1 sm:h-1 bg-amber-400 rounded-full"
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 1, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              delay: 1.5 + i * 0.4,
              ease: "easeInOut"
            }}
            style={{
              left: `${25 + i * 25}%`,
              top: `${15 + (i % 2) * 70}%`
            }}
          />
        ))}
      </span>
    </motion.h1>
    
    {/* Mobile-optimized subtitle with better spacing */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.8 }}
      className="mt-4 sm:mt-6 md:mt-8"
    >
      <motion.p 
        className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium px-2 sm:px-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        Your comprehensive hub for{" "}
        <motion.span 
          className="relative inline-block font-bold bg-gradient-to-r from-amber-600 to-amber-700 bg-clip-text text-transparent"
          animate={{
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          chemistry education
          <motion.div
            className="absolute -bottom-0.5 sm:-bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 2.2, duration: 0.6 }}
          />
        </motion.span>
        , research, and academic excellence.
      </motion.p>
    </motion.div>
    
    {/* Mobile-optimized quote with responsive design */}
    <motion.blockquote 
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2.5, duration: 0.8 }}
      className="relative mt-4 sm:mt-6 md:mt-8 text-xs xs:text-sm sm:text-base text-amber-800 italic font-medium pl-4 sm:pl-6 py-3 sm:py-4 bg-gradient-to-r from-amber-50/90 via-amber-50/70 to-transparent rounded-xl sm:rounded-2xl border-l-2 sm:border-l-4 border-amber-400 shadow-sm backdrop-blur-sm mx-2 sm:mx-0"
    >
      {/* Mobile-optimized quote icon */}
      <motion.div
        className="absolute -left-1 sm:-left-2 -top-1 sm:-top-2 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg"
        animate={{
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <span className="text-white text-xs sm:text-sm font-bold">&ldquo;</span>
      </motion.div>
      
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 1 }}
        className="block leading-relaxed"
      >
        &ldquo;Chemistry is the melodies you can play on vibrating strings.&rdquo;
      </motion.span>
      
      <motion.cite 
        className="block mt-1 sm:mt-2 text-xs text-amber-700 font-semibold not-italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2, duration: 0.8 }}
      >
        — Michio Kaku
      </motion.cite>
    </motion.blockquote>
  </div>
</motion.div>

              <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.8, duration: 0.8 }}
  className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start px-2 sm:px-0"
>
  <Button 
    size="lg"
    className="bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 sm:gap-3 font-semibold text-sm sm:text-base"
  >
    <FlaskConical className="h-4 w-4 sm:h-5 sm:w-5" />
    Explore Dashboard
    <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
  </Button>
  <Button 
    variant="outline" 
    size="lg"
    className="border-2 border-slate-300 hover:border-amber-400 hover:bg-amber-50 text-slate-700 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-300 font-semibold text-sm sm:text-base"
  >
    Quick Tour
  </Button>
</motion.div>
            </motion.div>

            {/* Enhanced Featured Posts Carousel */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative w-full lg:w-2/3 xl:w-1/2 h-[300px] sm:h-[400px] lg:h-[450px]"
            >
              <Card className="relative w-full h-full overflow-hidden border-0 shadow-2xl bg-transparent rounded-3xl group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPost.id}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={currentPost.image || "/placeholder.svg?height=450&width=600&query=chemistry+research"}
                      alt={currentPost.title}
                      fill
                      className="object-cover rounded-3xl"
                    />
                    
                    {/* Enhanced gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent rounded-3xl" />
                    
                    {/* Content overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-4"
                      >
                        <div className="flex items-center gap-3">
                          <Badge 
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              currentPost.priority === 'high' 
                                ? 'bg-amber-500 text-white' 
                                : 'bg-white/20 text-white backdrop-blur-sm'
                            }`}
                          >
                            {currentPost.category}
                          </Badge>
                          {currentPost.priority === 'high' && (
                            <div className="flex items-center gap-1 text-amber-400">
                              <TrendingUp className="h-3 w-3" />
                              <span className="text-xs font-medium">Trending</span>
                            </div>
                          )}
                        </div>
                        
                        <h3 className="text-xl sm:text-2xl font-bold leading-tight">
                          {currentPost.title}
                        </h3>
                        
                        <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                          {currentPost.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-white/70">{currentPost.date}</span>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="text-white hover:bg-white/20 rounded-xl"
                          >
                            Read More
                            <ArrowRight className="h-3 w-3 ml-1" />
                          </Button>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation controls */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                  onClick={goToPreviousPost}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                  onClick={goToNextPost}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>

                {/* Enhanced indicators */}
                <div className="absolute bottom-4 right-4 flex space-x-2">
                  {featuredPosts.map((_, index) => (
                    <button
                      key={index}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentFeaturedPostIndex 
                          ? 'bg-amber-400 w-8 shadow-lg' 
                          : 'bg-white/40 w-2 hover:bg-white/60'
                      }`}
                      onClick={() => {
                        setCurrentFeaturedPostIndex(index);
                        setIsAutoPlaying(false);
                      }}
                    />
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </BackgroundGradientAnimation>

      {/* Enhanced Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity Feed */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="lg:col-span-2 space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-slate-900">Recent Activity</h2>
            <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
              <Bell className="h-4 w-4 mr-2" />
              View All
            </Button>
          </div>
          
          <Card className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-200/50 overflow-hidden">
            <CardContent className="p-0">
              <div className="space-y-0">
                {[
                  {
                    type: 'announcement',
                    title: 'Organic Chemistry Midterm Schedule Released',
                    description: 'Check your course pages for updated exam dates and locations.',
                    time: '2 hours ago',
                    priority: 'high',
                    icon: Megaphone
                  },
                  {
                    type: 'event',
                    title: 'Study Group - Linear Algebra Session',
                    description: 'Join us for a collaborative study session. All levels welcome!',
                    time: 'Friday 3:00 PM • Library Room 204',
                    priority: 'medium',
                    icon: Calendar
                  },
                  {
                    type: 'announcement',
                    title: 'New Lab Safety Protocols Implemented',
                    description: 'Updated safety guidelines for all chemistry labs are now in effect.',
                    time: '1 day ago',
                    priority: 'medium',
                    icon: Zap
                  },
                  {
                    type: 'event',
                    title: 'Guest Lecture: AI Ethics in Science',
                    description: 'Insightful lecture on ethical implications of AI in research.',
                    time: 'Next Monday 1:00 PM • Auditorium A',
                    priority: 'low',
                    icon: Users
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                    className="flex items-start gap-4 p-6 hover:bg-slate-50/80 transition-all duration-300 cursor-pointer group border-b border-slate-100 last:border-b-0"
                  >
                    <div className={`p-2 rounded-xl ${
                      item.priority === 'high' 
                        ? 'bg-amber-100 text-amber-700' 
                        : item.priority === 'medium'
                        ? 'bg-slate-100 text-slate-700'
                        : 'bg-slate-50 text-slate-600'
                    }`}>
                      <item.icon className="h-4 w-4" />
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-slate-900 group-hover:text-slate-700 transition-colors">
                          {item.title}
                        </h3>
                        {item.priority === 'high' && (
                          <Badge className="bg-amber-100 text-amber-800 text-xs">
                            Priority
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {item.description}
                      </p>
                      
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Clock className="h-3 w-3" />
                        {item.time}
                      </div>
                    </div>
                    
                    <ChevronRight className="h-4 w-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Access */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold text-slate-900">Quick Access</h2>
          
          <Card className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-200/50">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Users, label: 'My Profile', color: 'amber' },
                  { icon: BookOpen, label: 'E-Library', color: 'slate' },
                  { icon: ShoppingBag, label: 'Merch Store', color: 'amber' },
                  { icon: Calendar, label: 'Calendar', color: 'slate' }
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      variant="outline" 
                      className={`w-full h-20 flex flex-col items-center justify-center gap-2 rounded-2xl border-2 transition-all duration-300 ${
                        item.color === 'amber'
                          ? 'border-amber-200 hover:border-amber-400 hover:bg-amber-50 text-amber-700'
                          : 'border-slate-200 hover:border-slate-400 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl shadow-xl border-0 overflow-hidden">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-amber-400" />
                Today&apos;s Overview
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-300">Active Courses</span>
                  <span className="text-xl font-bold text-amber-400">4</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-300">Pending Tasks</span>
                  <span className="text-xl font-bold">7</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-300">Next Event</span>
                  <span className="text-sm font-medium text-amber-400">2 hours</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
