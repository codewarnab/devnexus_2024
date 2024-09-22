"use client";
import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../../components/ui/button";
import Image from "next/image";

export default function Screenshot() {
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    {
      title: "Customize Bot",
      description:
        "Tailor your chatbot's appearance and behavior to match your brand perfectly.",
      image: "/images/3.png",
    },
    {
      title: "Chatbot Interface",
      description:
        "Engage visitors with an intuitive and responsive chatbot interface.",
      image: "/images/4.png",
    },
    {
      title: "Analytics Dashboard",
      description:
        "Gain valuable insights with our comprehensive analytics dashboard.",
      image: "/images/1.png",
    },
  ];

  const nextFeature = () => {
    setCurrentFeature((prev) => (prev + 1) % features.length);
  };

  const prevFeature = () => {
    setCurrentFeature((prev) => (prev - 1 + features.length) % features.length);
  };

  return (
    <div className="bg-gray-900 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-center text-3xl font-extrabold text-white">
          Experience the Power of{" "}
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            BOTIFY
          </span>
        </h2>
        <div className="relative">
          <div className="overflow-hidden rounded-xl shadow-2xl">
            <motion.div
              className="flex"
              animate={{ x: `${-currentFeature * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {features.map((feature, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="relative aspect-[16/9] w-full">
                    <Image src={feature.image} alt={feature.title} fill className="object-cover" />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 transform rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
            onClick={prevFeature}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 transform rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
            onClick={nextFeature}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
        <div className="mt-8 text-center">
          <h3 className="mb-2 text-2xl font-bold text-white">
            {features[currentFeature].title}
          </h3>
          <p className="mx-auto max-w-2xl text-gray-300">
            {features[currentFeature].description}
          </p>
        </div>
        <div className="mt-6 flex justify-center space-x-2">
          {features.map((_, index) => (
            <button
              title="abc"
              key={index}
              className={`h-3 w-3 rounded-full ${
                index === currentFeature ? "bg-blue-500" : "bg-gray-600"
              }`}
              onClick={() => setCurrentFeature(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
