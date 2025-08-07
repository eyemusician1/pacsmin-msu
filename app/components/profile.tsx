"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { User, GraduationCap, BookOpen, Award, TrendingUp, Edit, Camera, Mail, Phone, MapPin, Star, Trophy, Sparkles, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from "@/lib/utils"

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

export function ProfileContent() {
  const [activeTab, setActiveTab] = useState('overview');

  const achievements = [
    { id: 1, title: "Dean's List", description: "Fall 2023", icon: Trophy, color: "from-amber-500 to-yellow-600" },
    { id: 2, title: "Research Excellence", description: "Chemistry Symposium", icon: Award, color: "from-blue-500 to-indigo-600" },
    { id: 3, title: "Lab Safety Certified", description: "Advanced Level", icon: Star, color: "from-emerald-500 to-teal-600" },
  ];

  const courses = [
    { code: "CHEM 301", name: "Organic Chemistry II", grade: "A", credits: 4, progress: 85, color: "from-green-500 to-emerald-600" },
    { code: "CHEM 315", name: "Physical Chemistry", grade: "A-", credits: 3, progress: 78, color: "from-blue-500 to-cyan-600" },
    { code: "MATH 290", name: "Linear Algebra", grade: "B+", credits: 3, progress: 92, color: "from-purple-500 to-violet-600" },
    { code: "CHEM 410", name: "Advanced Analytical", grade: "A", credits: 4, progress: 88, color: "from-amber-500 to-orange-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-amber-50/20 relative overflow-hidden">
      {/* Animated Background Elements */}
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
          className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-slate-400/10 to-slate-600/10 rounded-full blur-3xl"
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
          className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-tr from-amber-400/10 to-amber-600/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 space-y-8 sm:space-y-12 px-6 py-8">
        {/* Enhanced Header with BackgroundGradientAnimation */}
        <BackgroundGradientAnimation containerClassName="mb-12">
          <div className="relative z-10 bg-white/95 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-slate-200/50 p-6 sm:p-8 md:p-12">
            {/* Subtle floating elements */}
            <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-amber-400/20 to-amber-600/20 rounded-full blur-xl animate-pulse" />
            <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-gradient-to-br from-slate-400/20 to-slate-600/20 rounded-full blur-lg animate-pulse delay-1000" />
            
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
              {/* Profile Picture Section */}
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="relative group flex-shrink-0"
              >
                <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-slate-900 to-amber-600 rounded-full p-1 shadow-2xl">
                  <div className="w-full h-full bg-gradient-to-br from-slate-100 to-blue-50 rounded-full flex items-center justify-center relative overflow-hidden">
                    <User className="w-16 h-16 sm:w-20 sm:h-20 text-slate-600" />
                    <motion.div 
                      className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                      whileHover={{ opacity: 1 }}
                    >
                      <Camera className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </motion.div>
                  </div>
                </div>
                <motion.div
                  className="absolute -bottom-2 -right-2 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full"></div>
                </motion.div>
              </motion.div>

              {/* Profile Info */}
              <div className="flex-1 text-center lg:text-left space-y-6 min-w-0">
                <div className="space-y-4">
                  <motion.h1 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight"
                  >
                    <span className="text-slate-900">Abby </span>
                    <span className="relative">
                      <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 bg-clip-text text-transparent">
                        Bongcayao
                      </span>
                      <motion.div
                        className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 1, duration: 0.8 }}
                      />
                    </span>
                  </motion.h1>
                  
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="flex flex-wrap justify-center lg:justify-start gap-3"
                  >
                    <Badge className="bg-slate-100 text-slate-800 px-4 py-2 rounded-full text-sm font-semibold shadow-lg border border-slate-200 hover:shadow-xl hover:border-slate-300 transition-all duration-300">
                      <GraduationCap className="w-4 h-4 mr-2" />
                      Chemistry Major
                    </Badge>
                    <Badge className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold shadow-lg border border-amber-200 hover:shadow-xl hover:border-amber-300 transition-all duration-300">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Junior Year
                    </Badge>
                  </motion.div>
                </div>

                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="flex flex-col sm:flex-row sm:flex-wrap justify-center lg:justify-start gap-4 text-sm text-slate-600"
                >
                  <div className="flex items-center justify-center lg:justify-start gap-2">
                    <Mail className="w-4 h-4 text-slate-500 flex-shrink-0" />
                    <span className="truncate">abby.bongcayao@pacsmin.edu</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start gap-2">
                    <Phone className="w-4 h-4 text-slate-500 flex-shrink-0" />
                    <span>+63 912 345 6789</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start gap-2">
                    <MapPin className="w-4 h-4 text-slate-500 flex-shrink-0" />
                    <span>Manila, Philippines</span>
                  </div>
                </motion.div>
              </div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="flex flex-col gap-4 w-full sm:w-auto lg:flex-shrink-0"
              >
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 text-white px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-3 font-semibold"
                >
                  <Edit className="h-5 w-5" />
                  Edit Profile
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-slate-300 hover:border-amber-400 hover:bg-amber-50 text-slate-700 px-8 py-4 rounded-2xl transition-all duration-300 font-semibold"
                >
                  View Transcript
                </Button>
              </motion.div>
            </div>
          </div>
        </BackgroundGradientAnimation>

        {/* Enhanced Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex justify-center"
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-2 shadow-xl border border-slate-200/50">
            <div className="flex gap-2">
              {[
                { id: 'overview', label: 'Overview', icon: User },
                { id: 'academic', label: 'Academic', icon: BookOpen },
                { id: 'achievements', label: 'Achievements', icon: Trophy },
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-6 sm:px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 text-sm sm:text-base ${
                    activeTab === tab.id
                      ? 'text-white shadow-lg'
                      : 'text-slate-600 hover:text-slate-800 hover:bg-white/50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-slate-900 to-amber-600 rounded-xl"
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

        {/* Enhanced Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Academic Progress */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  <Card className="bg-white/90 backdrop-blur-xl border border-slate-200/50 shadow-2xl rounded-3xl overflow-hidden h-full">
                    <CardHeader className="bg-gradient-to-r from-slate-50 to-amber-50/50 pb-6">
                      <CardTitle className="text-slate-900 flex items-center gap-3 text-xl">
                        <div className="w-12 h-12 bg-gradient-to-r from-slate-900 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg">
                          <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                        Academic Progress
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 space-y-8">
                      <div className="space-y-6">
                        <div>
                          <div className="flex justify-between text-sm mb-3">
                            <span className="font-semibold text-slate-700">Overall Progress</span>
                            <span className="text-slate-600 font-medium">74% (89/120 credits)</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden shadow-inner">
                            <motion.div 
                              className="bg-gradient-to-r from-slate-900 to-amber-600 h-full rounded-full shadow-lg"
                              initial={{ width: 0 }}
                              animate={{ width: '74%' }}
                              transition={{ duration: 1.5, delay: 0.5 }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-3">
                            <span className="font-semibold text-slate-700">Major Requirements</span>
                            <span className="text-slate-600 font-medium">68% (41/60 credits)</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden shadow-inner">
                            <motion.div 
                              className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full shadow-lg"
                              initial={{ width: 0 }}
                              animate={{ width: '68%' }}
                              transition={{ duration: 1.5, delay: 0.7 }}
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Student Information */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  <Card className="bg-white/90 backdrop-blur-xl border border-slate-200/50 shadow-2xl rounded-3xl overflow-hidden h-full">
                    <CardHeader className="bg-gradient-to-r from-amber-50/50 to-slate-50 pb-6">
                      <CardTitle className="text-slate-900 flex items-center gap-3 text-xl">
                        <div className="w-12 h-12 bg-gradient-to-r from-amber-600 to-slate-900 rounded-2xl flex items-center justify-center shadow-lg">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        Student Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 space-y-4">
                      {[
                        { label: "Student ID", value: "CS2024001" },
                        { label: "Major", value: "Chemistry" },
                        { label: "Minor", value: "Mathematics" },
                        { label: "Advisor", value: "Dr. Sarah Mitchell" },
                        { label: "Expected Graduation", value: "Spring 2025" },
                        { label: "Department", value: "Chemistry Department" },
                      ].map((info, index) => (
                        <motion.div
                          key={info.label}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * index }}
                          className="flex justify-between items-center py-3 border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50 rounded-lg px-2 transition-colors duration-200"
                        >
                          <span className="text-sm font-semibold text-slate-500">{info.label}</span>
                          <span className="text-sm font-bold text-slate-800">{info.value}</span>
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            )}

            {activeTab === 'academic' && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="space-y-8"
              >
                <Card className="bg-white/90 backdrop-blur-xl border border-slate-200/50 shadow-2xl rounded-3xl overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50/50 pb-6">
                    <CardTitle className="text-slate-900 flex items-center gap-3 text-2xl">
                      <div className="w-12 h-12 bg-gradient-to-r from-slate-900 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      Current Courses
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid gap-6">
                      {courses.map((course, index) => (
                        <motion.div
                          key={course.code}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * index }}
                          className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-slate-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                          <div className="flex justify-between items-start mb-6">
                            <div>
                              <h3 className="font-black text-2xl text-slate-900 mb-2">{course.code}</h3>
                              <p className="text-slate-600 text-lg font-medium">{course.name}</p>
                            </div>
                            <div className="text-right">
                              <Badge className={`${
                                course.grade.startsWith('A') ? 'bg-green-100 text-green-800 border-green-200' :
                                course.grade.startsWith('B') ? 'bg-blue-100 text-blue-800 border-blue-200' :
                                'bg-amber-100 text-amber-800 border-amber-200'
                              } font-bold px-4 py-2 shadow-lg text-lg`}>
                                {course.grade}
                              </Badge>
                              <p className="text-sm text-slate-500 mt-2 font-medium">{course.credits} credits</p>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-3">
                              <span className="text-slate-600 font-semibold">Progress</span>
                              <span className="font-bold text-slate-700">{course.progress}%</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden shadow-inner">
                              <motion.div 
                                className={`bg-gradient-to-r ${course.color} h-full rounded-full shadow-lg`}
                                initial={{ width: 0 }}
                                animate={{ width: `${course.progress}%` }}
                                transition={{ duration: 1, delay: 0.2 * index }}
                              />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeTab === 'achievements' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index, duration: 0.6 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                  >
                    <Card className="bg-white/90 backdrop-blur-xl border border-slate-200/50 shadow-2xl rounded-3xl overflow-hidden h-full transform transition-all duration-300">
                      <CardContent className="p-8 text-center space-y-6">
                        <motion.div
                          className={`w-20 h-20 bg-gradient-to-r ${achievement.color} rounded-3xl mx-auto flex items-center justify-center shadow-2xl`}
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                        >
                          <achievement.icon className="w-10 h-10 text-white" />
                        </motion.div>
                        <div>
                          <h3 className="font-black text-2xl text-slate-900 mb-3">{achievement.title}</h3>
                          <p className="text-slate-600 text-lg font-medium">{achievement.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
