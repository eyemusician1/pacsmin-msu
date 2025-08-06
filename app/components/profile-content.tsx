"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { User } from 'lucide-react'

export function ProfileContent() {
  return (
    <div className="space-y-6 animate-fade-in-slide-up">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 group hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out border-navy-100 hover:border-gold-300">
          <CardHeader className="text-center">
            <div className="w-24 h-24 bg-navy-50 rounded-full mx-auto flex items-center justify-center border-2 border-navy-200 group-hover:border-gold-400 transition-colors">
              <User className="h-12 w-12 text-navy-700 group-hover:text-gold-600 transition-colors" />
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

        <Card className="lg:col-span-2 group hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out border-navy-100 hover:border-gold-300">
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
                    <div className="bg-gold-600 h-2 rounded-full" style={{ width: '68%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
