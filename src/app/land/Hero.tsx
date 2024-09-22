'use client';

import React from "react"
import { Button } from "@/components/ui/button"
import { MessageSquare, Ticket, Globe, Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <nav className=" backdrop-blur-lg py-4 sticky top-0 z-10">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-xl font-bold">BOTIFY</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <Link href="#" className="hover:text-blue-400 transition-colors">Home</Link>
            <Link href="#" className="hover:text-blue-400 transition-colors">Features</Link>
            <Link href="#" className="hover:text-blue-400 transition-colors">Pricing</Link>
            <Link href="#" className="hover:text-blue-400 transition-colors">About</Link>
            <Link href="#" className="hover:text-blue-400 transition-colors">Contact</Link>
          </div>
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="text-white focus:outline-none"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 py-2 sticky top-16 z-10">
          <div className="container mx-auto px-4 flex flex-col space-y-2">
            <Link href="#" className="hover:text-blue-400 transition-colors py-2">Home</Link>
            <Link href="#" className="hover:text-blue-400 transition-colors py-2">Features</Link>
            <Link href="#" className="hover:text-blue-400 transition-colors py-2">Pricing</Link>
            <Link href="#" className="hover:text-blue-400 transition-colors py-2">About</Link>
            <Link href="#" className="hover:text-blue-400 transition-colors py-2">Contact</Link>
          </div>
        </div>
      )}
      <div className="flex-grow flex flex-col justify-center">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight animate-pulse">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">BOTIFY</span>
                <span className="block">Your Tourist Sites</span>
                <span className="block">AI Concierge</span>
              </h1>
              <p className="text-xl text-gray-300">
                Build customizable chatbots for your tourist website. Engage visitors, answer queries, and streamline ticket bookings - all in one intelligent interface.
              </p>
              <div>
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105">
                 <Link href='/dashboard'> Get Started</Link> 
                </Button>
              </div>
              <div className="flex space-x-6 text-gray-400">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5 text-blue-400" />
                  <span>Smart Responses</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-green-400" />
                  <span>Multi-lingual</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Ticket className="h-5 w-5 text-pink-400" />
                  <span>Easy Booking</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl opacity-30 blur-xl animate-pulse"></div>
              <div className="relative bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <MessageSquare className="text-purple-400" />
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm">Hello! Welcome to EiffelTower.com. How can I assist you today?</p>
                  </div>
                  <div className="bg-blue-600 p-4 rounded-lg ml-8">
                    <p className="text-sm">Hi! I d like to book tickets for tomorrow.</p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm">I can help you with that. How many tickets would you like to book?</p>
                  </div>
                  <div className="bg-blue-600 p-4 rounded-lg ml-8">
                    <p className="text-sm">2 adult tickets, please.</p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm">Great! Ive found 2 adult tickets for tomorrow. Would you like to proceed with the booking?</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
