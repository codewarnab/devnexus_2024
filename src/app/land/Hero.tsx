import React from "react"
import { Button } from "../../components/ui/button"
import { MessageSquare, Ticket, Globe, Zap } from "lucide-react"

export default function Hero() {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col justify-center overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=600')] opacity-10 bg-repeat"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight animate-pulse">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">CONVERSIFI</span>
              <span className="block">Your Tourist Site's</span>
              <span className="block">AI Concierge</span>
            </h1>
            <p className="text-xl text-gray-300">
              Build customizable chatbots for your tourist website. Engage visitors, answer queries, and streamline ticket bookings - all in one intelligent interface.
            </p>
            <div>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 text-lg">
                Get Started
              </Button>
            </div>
            <div className="flex space-x-6 text-gray-400">
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                <span>Lightning Fast</span>
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
                  <p className="text-sm">Hi! I'd like to book tickets for tomorrow.</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-sm">I can help you with that. How many tickets would you like to book?</p>
                </div>
                <div className="bg-blue-600 p-4 rounded-lg ml-8">
                  <p className="text-sm">2 adult tickets, please.</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-sm">Great! I've found 2 adult tickets for tomorrow. Would you like to proceed with the booking?</p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between text-sm text-gray-400">
                <div className="flex items-center">
                  <Zap className="mr-2 h-4 w-4 text-yellow-400" />
                  <span>Instant Responses</span>
                </div>
                <div className="flex items-center">
                  <Ticket className="mr-2 h-4 w-4 text-pink-400" />
                  <span>Secure Booking</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}