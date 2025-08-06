"use client"

import { useState, useEffect } from "react"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Calendar, Clock, MapPin, Users, ChevronLeft, ChevronRight } from 'lucide-react' // Import Chevron icons
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
      description: "Discover the latest advancements from our faculty and students in quantum chemistry, opening new avenues for material science.",
      category: "Research",
      date: "May 20, 2024",
      image: "/dashboard/quantum-chem.jpg"
    },
    {
      id: 2,
      title: "Student Success: National Chemistry Olympiad",
      description: "Congratulations to our students who excelled in the National Chemistry Olympiad, bringing home multiple medals!",
      category: "Student Life",
      date: "May 18, 2024",
      image: "/dashboard/chem-olympiad.jpg"
    },
    {
      id: 3,
      title: "New State-of-the-Art Lab Equipment Unveiled",
      description: "Our state-of-the-art spectroscopy lab is now fully operational, enhancing research capabilities for all students.",
      category: "Campus News",
      date: "May 15, 2024",
      image: "/placeholder.svg?height=400&width=800&text=New+Lab+Equipment"
    },
    {
      id: 4,
      title: "Alumni Spotlight: Dr. Elena Rodriguez",
      description: "Learn about Dr. Rodriguez's journey from PACSMIN to leading pharmaceutical innovations.",
      category: "Alumni",
      date: "May 10, 2024",
      image: "/placeholder.svg?height=400&width=800&text=Alumni+Spotlight"
    }
  ];

  // Removed the useEffect for automatic slide change

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
    <div className="space-y-6 animate-fade-in-slide-up">
      {/* Featured Posts Section - Now with image slideshow and manual controls */}
      <Card key={currentPost.id} className="overflow-hidden group relative hover:shadow-xl hover:scale-[1.01] transition-all duration-300 ease-in-out border-navy-100 hover:border-gold-300 animate-fade-in-slide-up">
        <div className="relative h-80 w-full">
          <Image
            src={currentPost.image || "/placeholder.svg"}
            alt={currentPost.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent bg-gradient-to-b from-black/10 to-transparent" />
          
          {/* Navigation Buttons */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white hover:text-navy-900 rounded-full z-10"
            onClick={goToPreviousPost}
            aria-label="Previous post"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white hover:text-navy-900 rounded-full z-10"
            onClick={goToNextPost}
            aria-label="Next post"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          <div className="absolute bottom-4 left-4 text-white">
            <Badge className="bg-gold-500 text-white mb-2">{currentPost.category}</Badge>
            <h2 className="text-2xl font-bold drop-shadow-md">{currentPost.title}</h2>
          </div>

          {/* Indicators */}
          <div className="absolute bottom-4 right-4 flex space-x-2 z-10">
            {featuredPosts.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  index === currentFeaturedPostIndex ? 'bg-gold-500 w-6' : 'bg-white/50 hover:bg-white/80'
                }`}
                onClick={() => setCurrentFeaturedPostIndex(index)}
                aria-label={`Go to post ${index + 1}`}
              />
            ))}
          </div>
        </div>
        <CardContent className="p-6">
          <p className="text-gray-700 mb-4">
            {currentPost.description}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">{currentPost.date}</span>
            <Button variant="link" className="p-0 h-auto text-gold-600 hover:text-gold-800">
              Read More <span className="sr-only">about {currentPost.title}</span>
            </Button>
          </div>
        </CardContent>
      </Card>

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
              <div className="w-2 h-2 bg-gold-600 rounded-full mt-2 group-hover:scale-150 transition-transform"></div>
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
              <Calendar className="h-5 w-5 text-navy-600 group-hover:text-gold-600 transition-colors" />
              <div>
                <p className="font-medium text-navy-900">CS 301 - Data Structures Quiz</p>
                <p className="text-sm text-gray-600 flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-gray-400 group-hover:text-navy-600 transition-colors" />
                  Tomorrow, 2:00 PM
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 group hover:bg-navy-50 p-2 rounded-md transition-colors cursor-pointer">
              <Calendar className="h-5 w-5 text-gold-600 group-hover:text-navy-600 transition-colors" />
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

      {/* Latest University Updates (Moved from Updates Tab) */}
      <h2 className="text-2xl font-bold text-navy-900 mt-8">Latest Updates</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="group hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out border-navy-100 hover:border-gold-300">
          <CardHeader>
            <CardTitle className="text-navy-900">Campus Renovation Project</CardTitle>
            <CardDescription className="text-gray-600">Posted: May 15, 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700">
              Exciting news! Phase 1 of the campus renovation is complete, featuring new study spaces and a modernized chemistry lab.
            </p>
            <Button variant="link" className="mt-2 p-0 h-auto text-gold-600 hover:text-gold-800">Read More</Button>
          </CardContent>
        </Card>
        <Card className="group hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out border-navy-100 hover:border-gold-300">
          <CardHeader>
            <CardTitle className="text-navy-900">New Scholarship Opportunities</CardTitle>
            <CardDescription className="text-gray-600">Posted: May 10, 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700">
              A new round of scholarships for STEM students is now open for applications. Check the financial aid portal for details.
            </p>
            <Button variant="link" className="mt-2 p-0 h-auto text-gold-600 hover:text-gold-800">Apply Now</Button>
          </CardContent>
        </Card>
        <Card className="group hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out border-navy-100 hover:border-gold-300">
          <CardHeader>
            <CardTitle className="text-navy-900">Student Research Showcase</CardTitle>
            <CardDescription className="text-gray-600">Posted: May 01, 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700">
              Join us for the annual student research showcase on June 5th, featuring groundbreaking projects from various departments.
            </p>
            <Button variant="link" className="mt-2 p-0 h-auto text-gold-600 hover:text-gold-800">View Schedule</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
