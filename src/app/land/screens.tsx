"use client";
import React from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '../../components/ui/button'
import Image from 'next/image'

export default function Screenshot() {
  const [currentFeature, setCurrentFeature] = useState(0)

  const features = [
    {
      title: 'Customize Bot',
      description: 'Tailor your chatbot\'s appearance and behavior to match your brand perfectly.',
      image: '/placeholder.svg?height=400&width=600',
    },
    {
      title: 'Chatbot Interface',
      description: 'Engage visitors with an intuitive and responsive chatbot interface.',
      image: '/placeholder.svg?height=400&width=600',
    },
    {
      title: 'Analytics Dashboard',
      description: 'Gain valuable insights with our comprehensive analytics dashboard.',
      image: '/placeholder.svg?height=400&width=600',
    },
  ]

  const nextFeature = () => {
    setCurrentFeature((prev) => (prev + 1) % features.length)
  }

  const prevFeature = () => {
    setCurrentFeature((prev) => (prev - 1 + features.length) % features.length)
  }

  return (
    <div className="bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-white text-center mb-12">
          Experience the Power of{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
          BOTIFY
          </span>
        </h2>
        <div className="relative">
          <div className="overflow-hidden rounded-xl shadow-2xl">
            <motion.div
              className="flex"
              animate={{ x: `${-currentFeature * 100}%` }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {features.map((feature, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    width={600}
                    height={400}
                    layout="responsive"
                  />
                </div>
              ))}
            </motion.div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70"
            onClick={prevFeature}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70"
            onClick={nextFeature}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
        <div className="mt-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">
            {features[currentFeature].title}
          </h3>
          <p className="text-gray-300 max-w-2xl mx-auto">
            {features[currentFeature].description}
          </p>
        </div>
        <div className="flex justify-center mt-6 space-x-2">
          {features.map((_, index) => (
            <button
            title='abc'
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentFeature ? 'bg-blue-500' : 'bg-gray-600'
              }`}
              onClick={() => setCurrentFeature(index)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}