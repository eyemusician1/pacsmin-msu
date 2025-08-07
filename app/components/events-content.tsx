"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Calendar, Clock, MapPin, Users } from 'lucide-react'

export function EventsContent() {
  return (
    <div className="space-y-6 animate-fade-in-slide-up">
      <h2 className="text-2xl font-bold text-navy-900">Upcoming University Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="group hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out border-navy-100 hover:border-gold-300">
          <CardHeader>
            <CardTitle className="text-navy-900">CS 301 - Data Structures Quiz</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-gray-600 flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-navy-600" />
              Tomorrow, May 21, 2024
            </p>
            <p className="text-sm text-gray-600 flex items-center">
              <Clock className="h-4 w-4 mr-2 text-gray-400" />
              2:00 PM - 3:00 PM
            </p>
            <p className="text-sm text-gray-600 flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-gray-400" />
              Online (Zoom Link on Course Page)
            </p>
          </CardContent>
        </Card>
        <Card className="group hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out border-navy-100 hover:border-gold-300">
          <CardHeader>
            <CardTitle className="text-navy-900">Study Group - Linear Algebra</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-gray-600 flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-gold-600" />
              Friday, May 24, 2024
            </p>
            <p className="text-sm text-gray-600 flex items-center">
              <Clock className="h-4 w-4 mr-2 text-gray-400" />
              3:00 PM - 5:00 PM
            </p>
            <p className="text-sm text-gray-600 flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-gray-400" />
              Library Room 204
            </p>
          </CardContent>
        </Card>
        <Card className="group hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out border-navy-100 hover:border-gold-300">
          <CardHeader>
            <CardTitle className="text-navy-900">Guest Lecture - AI Ethics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-gray-600 flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-purple-500" />
              Monday, May 27, 2024
            </p>
            <p className="text-sm text-gray-600 flex items-center">
              <Clock className="h-4 w-4 mr-2 text-gray-400" />
              1:00 PM - 2:30 PM
            </p>
            <p className="text-sm text-gray-600 flex items-center">
              <Users className="h-4 w-4 mr-2 text-gray-400" />
              Auditorium A
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
