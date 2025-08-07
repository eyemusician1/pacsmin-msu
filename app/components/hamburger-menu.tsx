"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import Image from "next/image"
import {
  BookOpen,
  ShoppingBag,
  Calendar,
  User,
  Info,
  LogOut,
  ChevronRight,
  Bell,
  Settings,
  HelpCircle,
  FlaskConical,
  LinkIcon
} from 'lucide-react'

interface MenuItem {
  icon: React.ReactNode
  text: string
  href: string
  description?: string
  isNew?: boolean
}

interface HamburgerMenuProps {
  isOpen: boolean
  onClose: () => void
  setActiveTab: (tab: string) => void
}

export function HamburgerMenu({ isOpen, onClose, setActiveTab }: HamburgerMenuProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const menuItems: MenuItem[] = [
    {
      icon: <FlaskConical className="h-5 w-5" />,
      text: "Dashboard",
      href: "#dashboard",
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      text: "E-Library",
      href: "#e-library",
    },
    {
      icon: <ShoppingBag className="h-5 w-5" />,
      text: "Merch Store",
      href: "#merch",
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      text: "Events",
      href: "#events",
    },
    {
      icon: <User className="h-5 w-5" />,
      text: "Profile",
      href: "#profile",
    },
    {
      icon: <Info className="h-5 w-5" />,
      text: "About Us",
      href: "#about-us",
    },
  ]

  const secondaryItems: MenuItem[] = [
    {
      icon: <Bell className="h-5 w-5" />,
      text: "Notifications",
      href: "/notifications",
    },
    {
      icon: <Settings className="h-5 w-5" />,
      text: "Settings",
      href: "/settings",
    },
    {
      icon: <HelpCircle className="h-5 w-5" />,
      text: "Help Center",
      href: "/help",
    },
    {
      icon: <LinkIcon className="h-5 w-5" />,
      text: "Academic Calendar",
      href: "/calendar",
    },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full sm:w-80 bg-white shadow-2xl z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-navy-100">
              <div className="flex items-center gap-2">
                <Image
                  src="/pacsmin.png"
                  alt="PACSMIN Logo"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <h2 className="text-xl font-bold text-navy-900">PACSMIN</h2>
                  <p className="text-xs text-gray-700">Philippine Association of Chemistry Students</p>
                  <p className="text-[10px] text-gray-500">Mindanao Chapter</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-navy-50 rounded-full transition-colors"
              >
                <ChevronRight className="h-6 w-6 text-navy-700" />
              </button>
            </div>

            {/* Main Menu */}
            <div className="p-4 space-y-6">
              {/* Primary Navigation */}
              <div className="space-y-2">
                {menuItems.map((item, index) => (
                  <button
                    key={index}
                    className="block w-full text-left"
                    onClick={() => {
                      setActiveTab(item.href.replace('#', ''))
                      onClose()
                    }}
                  >
                    <motion.div
                      whileHover={{ 
                        scale: 1.02,
                        x: 5,
                        backgroundColor: "rgba(255, 184, 0, 0.1)" 
                      }}
                      onHoverStart={() => setHoveredIndex(index)}
                      onHoverEnd={() => setHoveredIndex(null)}
                      className={cn(
                        "relative flex items-center gap-3 p-3 rounded-xl transition-all duration-300",
                        "group cursor-pointer hover:shadow-md"
                      )}
                    >
                      <motion.span 
                        initial={false}
                        animate={{
                          color: hoveredIndex === index ? "#FFB800" : "#1e293b",
                        }}
                        transition={{ duration: 0.2 }}
                        className="relative"
                      >
                        <span className="absolute -inset-2 rounded-lg bg-gold-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative">{item.icon}</span>
                      </motion.span>
                      <div className="flex flex-col flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-navy-900 group-hover:text-gold-600 transition-colors">{item.text}</span>
                          {item.isNew && (
                            <motion.span 
                              initial={{ scale: 0.9, opacity: 0.8 }}
                              whileHover={{ scale: 1.1, opacity: 1 }}
                              className="px-2 py-1 bg-gold-100 text-gold-800 text-xs rounded-full shadow-sm"
                            >
                              New
                            </motion.span>
                          )}
                        </div>
                        {item.description && (
                          <p className="text-xs text-gold-600/90 group-hover:text-navy-600 transition-colors mt-0.5">{item.description}</p>
                        )}
                        <motion.span
                          initial={{ width: 0 }}
                          whileHover={{ width: "100%" }}
                          className="h-0.5 bg-gold-500/50 mt-1"
                        />
                      </div>
                      <motion.div
                        initial={false}
                        animate={{
                          width: hoveredIndex === index ? "3px" : "0px",
                        }}
                        className="absolute left-0 top-0 h-full bg-gold-500 rounded-full"
                        transition={{ duration: 0.2 }}
                      />
                    </motion.div>
                  </button>
                ))}
              </div>

              {/* Divider */}
              <div className="h-px bg-navy-100" />

              {/* Secondary Navigation */}
              <div className="space-y-2">
                {secondaryItems.map((item, index) => (
                  <button
                    key={index}
                    className="block w-full text-left"
                    onClick={() => {
                      setActiveTab(item.href.replace('#', ''))
                      onClose()
                    }}
                  >
                    <motion.div
                      whileHover={{ 
                        scale: 1.02,
                        x: 5,
                        backgroundColor: "rgba(255, 184, 0, 0.1)" 
                      }}
                      className="flex items-center gap-3 p-3 rounded-xl transition-all duration-300 hover:shadow-md"
                    >
                      <motion.span 
                        initial={false}
                        animate={{
                          color: hoveredIndex === (index + menuItems.length) ? "#FFB800" : "#1e293b",
                        }}
                        className="relative"
                        onHoverStart={() => setHoveredIndex(index + menuItems.length)}
                        onHoverEnd={() => setHoveredIndex(null)}
                      >
                        <span className="absolute -inset-2 rounded-lg bg-gold-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative">{item.icon}</span>
                      </motion.span>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-navy-900 group-hover:text-gold-600 transition-colors">{item.text}</span>
                        <motion.span
                          initial={{ width: 0 }}
                          whileHover={{ width: "100%" }}
                          className="h-0.5 bg-gold-500/50 mt-0.5"
                        />
                      </div>
                    </motion.div>
                  </button>
                ))}
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-navy-100">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="flex items-center gap-2 w-full p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="font-medium">Sign Out</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
