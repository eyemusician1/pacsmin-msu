"use client"

import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"

export function AboutUsContent() {
  return (
    <div className="space-y-6 animate-fade-in-slide-up">
      <h2 className="text-2xl font-bold text-navy-900">About PACSMIN Portal</h2>
      <Card className="group hover:shadow-xl hover:scale-[1.01] transition-all duration-300 ease-in-out border-navy-100 hover:border-teal-300">
        <CardHeader>
          <CardTitle className="text-navy-900">Our Mission</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">
            The PACSMIN Portal is dedicated to empowering chemistry students with comprehensive resources,
            fostering academic excellence, and building a vibrant community. We aim to provide a seamless
            digital experience for managing courses, accessing learning materials, staying updated on university
            news, and connecting with peers and faculty.
          </p>
          <p className="text-gray-700">
            Our goal is to support every student's journey through their chemistry education, from foundational
            concepts to advanced research, preparing them for successful careers and contributions to science.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="group hover:shadow-xl hover:scale-[1.01] transition-all duration-300 ease-in-out border-navy-100 hover:border-teal-300">
          <CardHeader>
            <CardTitle className="text-navy-900">Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-gray-700">
            <p>Email: <a href="mailto:support@pacsmin.edu" className="text-teal-600 hover:underline">support@pacsmin.edu</a></p>
            <p>Phone: (123) 456-7890</p>
            <p>Address: University Campus, PACSMIN Building, City, Country</p>
          </CardContent>
        </Card>
        <Card className="group hover:shadow-xl hover:scale-[1.01] transition-all duration-300 ease-in-out border-navy-100 hover:border-teal-300">
          <CardHeader>
            <CardTitle className="text-navy-900">Our Team</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-gray-700">
            <p>The PACSMIN Portal is developed and maintained by a dedicated team of faculty, staff, and student volunteers.</p>
            <Button variant="link" className="p-0 h-auto text-teal-600 hover:underline">Meet the Team</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
