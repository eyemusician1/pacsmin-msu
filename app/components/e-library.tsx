"use client"

import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Search } from 'lucide-react'

export function ELibraryContent() {
  return (
    <div className="space-y-6 animate-fade-in-slide-up">
      <h2 className="text-2xl font-bold text-navy-900">PACSMIN E-Library</h2>
      <div className="relative group">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 group-focus-within:text-navy-700 transition-colors" />
        <Input
          placeholder="Search books, journals, articles..."
          className="pl-10 w-full border-navy-200 focus:border-navy-700 focus:ring-navy-700 transition-all duration-200"
        />
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold text-navy-900 mb-4">Featured Journals</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="group hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out border-navy-100 hover:border-teal-300">
              <CardHeader>
                <CardTitle className="text-navy-900">Journal of Chemical Education</CardTitle>
                <CardDescription className="text-gray-600">Latest Issue: Vol 101, Issue 5</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">
                  Peer-reviewed articles on chemical education, research, and best practices.
                </p>
                <Button variant="link" className="mt-2 p-0 h-auto text-teal-600 hover:text-teal-800">Access Journal</Button>
              </CardContent>
            </Card>
            <Card className="group hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out border-navy-100 hover:border-teal-300">
              <CardHeader>
                <CardTitle className="text-navy-900">Nature Chemistry</CardTitle>
                <CardDescription className="text-gray-600">Latest Issue: Vol 16, Issue 4</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">
                  High-quality research across all disciplines of chemistry.
                </p>
                <Button variant="link" className="mt-2 p-0 h-auto text-teal-600 hover:text-teal-800">Access Journal</Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-navy-900 mb-4">Recommended Textbooks</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="group hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out border-navy-100 hover:border-teal-300">
              <CardHeader>
                <CardTitle className="text-navy-900">Organic Chemistry (Clayden)</CardTitle>
                <CardDescription className="text-gray-600">Edition: 2nd</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">
                  A comprehensive guide to organic chemistry principles and reactions.
                </p>
                <Button variant="link" className="mt-2 p-0 h-auto text-teal-600 hover:text-teal-800">Read Online</Button>
              </CardContent>
            </Card>
            <Card className="group hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out border-navy-100 hover:border-teal-300">
              <CardHeader>
                <CardTitle className="text-navy-900">Physical Chemistry (Atkins)</CardTitle>
                <CardDescription className="text-gray-600">Edition: 11th</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">
                  A classic textbook covering thermodynamics, quantum mechanics, and kinetics.
                </p>
                <Button variant="link" className="mt-2 p-0 h-auto text-teal-600 hover:text-teal-800">Read Online</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
