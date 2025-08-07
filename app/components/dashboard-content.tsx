"use client"

import { useState } from "react"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Calendar, Clock, MapPin, Users, ChevronLeft, ChevronRight, Megaphone, Lightbulb, BookOpen, LinkIcon, ShoppingBag } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

interface FeaturedPost {
  id: number;
  title: string;
  description: string;
  category: string;
  date: string;
  image: string;
}

export function DashboardContent() {
  const [currentFeaturedPostIndex, setCurrentFeaturedPostIndex] = useState(0);

  const featuredPosts: FeaturedPost[] = [
    {
      id: 1,
      title: "Breakthrough in Quantum Chemistry Research",
      description: "Explore the latest advancements from our faculty and students in quantum chemistry, opening new avenues for material science and innovation.",
      category: "Research",
      date: "May 20, 2024",
      image: "/dashboard/quantum-chem.jpg"
    },
    {
      id: 2,
      title: "Student Success: National Chemistry Olympiad",
      description: "Celebrate our students' outstanding achievements in the National Chemistry Olympiad, bringing home multiple medals and recognition.",
      category: "Student Life",
      date: "May 18, 2024",
      image: "/dashboard/chem-olympiad.jpg"
    },
    {
      id: 3,
      title: "New State-of-the-Art Lab Equipment Unveiled",
      description: "Our cutting-edge spectroscopy lab is now fully operational, significantly enhancing research capabilities for all students and faculty.",
      category: "Campus News",
      date: "May 15, 2024",
      image: "/placeholder.svg?height=500&width=1000&text=New+Lab+Equipment"
    },
    {
      id: 4,
      title: "Alumni Spotlight: Dr. Elena Rodriguez",
      description: "Learn about Dr. Rodriguez's inspiring journey from PACSMIN to leading pharmaceutical innovations and making a global impact.",
    category: "Alumni",
      date: "May 10, 2024",
      image: "/placeholder.svg?height=500&width=1000&text=Alumni+Spotlight"
    }
  ];

  const goToNextPost = () => {
    setCurrentFeaturedPostIndex((prevIndex) =>
      (prevIndex + 1) % featuredPosts.length
    );
  };

  const goToPreviousPost = () => {
    setCurrentFeaturedPostIndex((prevIndex) =>
      (prevIndex - 1 + featuredPosts.length) % featuredPosts.length
    );
  };

  const currentPost = featuredPosts[currentFeaturedPostIndex];

  return (
    <div className="space-y-6 sm:space-y-12 animate-fade-in-slide-up">
      {/* New Hero Section: Clean, Professional, and Engaging */}
      <div className="relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-navy-100 p-4 sm:p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-12 transform transition-all duration-500 hover:scale-[1.005]">
        <div className="flex-1 text-center lg:text-left animate-fade-in-slide-up" style={{ animationDelay: '0.2s' }}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight text-navy-900">
            Welcome to <span className="text-gold-600">PACSMIN!</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 mb-6 sm:mb-8 text-gray-700">
            Your central hub for all things chemistry. Explore the latest updates, events, and resources tailored for your academic journey.
          </p>
          <Button className="bg-navy-700 text-white hover:bg-navy-800 transition-all duration-300 text-base sm:text-lg px-6 sm:px-10 py-4 sm:py-7 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Explore Dashboard
          </Button>
        </div>

        {/* Featured Posts Carousel (integrated into hero, but visually distinct) */}
        <Card className="relative w-full lg:w-2/3 xl:w-1/2 h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] overflow-hidden group border-none shadow-2xl bg-transparent rounded-2xl">
          <Image
            src={currentPost.image || "/placeholder.svg"}
            alt={currentPost.title}
            fill
            className="object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500 ease-in-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent bg-gradient-to-b from-black/40 to-transparent rounded-2xl" />
          
          {/* Navigation Buttons */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0.5 top-1/2 -translate-y-1/2 text-white z-10 transition-all duration-300 transform hover:scale-110 sm:bg-black/15 sm:hover:bg-black/35 sm:rounded-full sm:backdrop-blur-sm"
            onClick={goToPreviousPost}
            aria-label="Previous post"
          >
            <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0.5 top-1/2 -translate-y-1/2 text-white z-10 transition-all duration-300 transform hover:scale-110 sm:bg-black/15 sm:hover:bg-black/35 sm:rounded-full sm:backdrop-blur-sm"
            onClick={goToNextPost}
            aria-label="Next post"
          >
            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>

          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-white animate-fade-in-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="space-y-4 max-w-[200px] sm:max-w-[240px] md:max-w-[280px]">
              <Badge className="bg-gold-500 text-white text-xs px-3 py-1 rounded-full shadow-md font-medium inline-block">{currentPost.category}</Badge>
              <div className="space-y-3">
                <h3 className="text-sm sm:text-base md:text-lg font-bold drop-shadow-lg leading-tight">{currentPost.title}</h3>
                <p className="text-xs sm:text-xs drop-shadow-md leading-relaxed opacity-90">{currentPost.description}</p>
              </div>
            </div>
          </div>

          {/* Indicators */}
          <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 flex space-x-1.5 sm:space-x-2 z-10">
            {featuredPosts.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full transition-all duration-300 ${
                  index === currentFeaturedPostIndex ? 'bg-gold-500 w-6 sm:w-8' : 'bg-white/50 hover:bg-white/80'
                }`}
                onClick={() => setCurrentFeaturedPostIndex(index)}
                aria-label={`Go to post ${index + 1}`}
              />
            ))}
          </div>
        </Card>
      </div>

      {/* Main Content Area: Activity Feed & Quick Links */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
        {/* Left Column: Activity Feed (Announcements & Events Combined) */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy-900">Your Activity Feed</h2>
          <Card className="bg-white rounded-2xl shadow-lg border border-navy-100 animate-fade-in-slide-up" style={{ animationDelay: '0.8s' }}>
            <CardHeader className="pb-4">
              <CardTitle className="text-navy-900 flex items-center gap-2">
                <Megaphone className="h-6 w-6 text-gold-600" /> Latest Updates & Events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Announcement */}
              <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-xl transition-all duration-300 cursor-pointer hover:bg-navy-50 hover:shadow-md transform hover:-translate-y-0.5">
                <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-navy-600 rounded-full mt-2 sm:mt-2.5 flex-shrink-0 animate-pulse" />
                <div>
                  <p className="font-semibold text-base sm:text-lg text-navy-900">Organic Chemistry Midterm Schedule Released</p>
                  <p className="text-sm text-gray-700">Check your course pages for updated exam dates and locations. Prepare accordingly!</p>
                  <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                    <Clock className="h-3 w-3" /> 2 hours ago
                  </p>
                </div>
              </div>
              {/* Event */}
              <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-xl transition-all duration-300 cursor-pointer hover:bg-navy-50 hover:shadow-md transform hover:-translate-y-0.5">
                <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-gold-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-base sm:text-lg text-navy-900">Study Group - Linear Algebra Session</p>
                  <p className="text-sm text-gray-700">Join us for a collaborative study session on Linear Algebra topics. All levels welcome!</p>
                  <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> Library Room 204, Friday 3:00 PM
                  </p>
                </div>
              </div>
              {/* Announcement */}
              <div className="flex items-start space-x-4 p-4 rounded-xl transition-all duration-300 cursor-pointer hover:bg-navy-50 hover:shadow-md transform hover:-translate-y-0.5">
                <div className="w-3 h-3 bg-gold-600 rounded-full mt-2.5 flex-shrink-0 animate-pulse" />
                <div>
                  <p className="font-semibold text-lg text-navy-900">New Lab Safety Protocols Implemented</p>
                  <p className="text-sm text-gray-700">Updated safety guidelines for all chemistry labs are now in effect. Review the changes before your next session.</p>
                  <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                    <Clock className="h-3 w-3" /> 1 day ago
                  </p>
                </div>
              </div>
              {/* Event */}
              <div className="flex items-start space-x-4 p-4 rounded-xl transition-all duration-300 cursor-pointer hover:bg-navy-50 hover:shadow-md transform hover:-translate-y-0.5">
                <Calendar className="h-6 w-6 text-purple-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-lg text-navy-900">Guest Lecture: AI Ethics in Science</p>
                  <p className="text-sm text-gray-700">Don't miss this insightful lecture on the ethical implications of AI in scientific research.</p>
                  <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                    <Users className="h-3 w-3" /> Auditorium A, Next Monday 1:00 PM
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Quick Links */}
        <div className="lg:col-span-1 space-y-6">
          <h2 className="text-3xl font-bold text-navy-900">Quick Access</h2>
          <Card className="bg-white rounded-2xl shadow-lg border border-navy-100 animate-fade-in-slide-up" style={{ animationDelay: '0.9s' }}>
            <CardHeader className="pb-4">
              <CardTitle className="text-navy-900 flex items-center gap-2">
                <LinkIcon className="h-6 w-6 text-navy-600" /> Important Links
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="flex flex-col h-auto py-4 items-center justify-center text-navy-700 border-navy-200 hover:bg-navy-100 hover:border-navy-300 transition-all duration-300 transform hover:-translate-y-0.5">
                <Users className="h-6 w-6 mb-1 text-gold-600" />
                <span className="text-sm font-medium">My Profile</span>
              </Button>
              <Button variant="outline" className="flex flex-col h-auto py-4 items-center justify-center text-navy-700 border-navy-200 hover:bg-navy-100 hover:border-navy-300 transition-all duration-300 transform hover:-translate-y-0.5">
                <BookOpen className="h-6 w-6 mb-1 text-navy-600" />
                <span className="text-sm font-medium">E-Library</span>
              </Button>
              <Button variant="outline" className="flex flex-col h-auto py-4 items-center justify-center text-navy-700 border-navy-200 hover:bg-navy-100 hover:border-navy-300 transition-all duration-300 transform hover:-translate-y-0.5">
                <ShoppingBag className="h-6 w-6 mb-1 text-gold-600" />
                <span className="text-sm font-medium">Merch Store</span>
              </Button>
              <Button variant="outline" className="flex flex-col h-auto py-4 items-center justify-center text-navy-700 border-navy-200 hover:bg-navy-100 hover:border-navy-300 transition-all duration-300 transform hover:-translate-y-0.5">
                <Calendar className="h-6 w-6 mb-1 text-navy-600" />
                <span className="text-sm font-medium">Academic Calendar</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
