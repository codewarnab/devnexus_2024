"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ChevronLeft, ChevronRight, MapPin, Moon, Sun } from "lucide-react"
import Image from 'next/image'

interface Animal {
  name: string
  species: string
  habitat: string
  diet: string
  funFact: string
  image: string
}

const demoAnimals: Animal[] = [
  {
    name: "African Elephant",
    species: "Loxodonta africana",
    habitat: "Savannas and forests",
    diet: "Herbivore",
    funFact: "Largest land animal on Earth",
    image: "https://wallpaperaccess.com/full/372992.jpg"
  },
  {
    name: "Red Panda",
    species: "Ailurus fulgens",
    habitat: "Eastern Himalayas",
    diet: "Omnivore",
    funFact: "Not closely related to giant pandas",
    image: "https://wallpaperaccess.com/full/2027199.jpg"
  },
  {
    name: "Blue Whale",
    species: "Balaenoptera musculus",
    habitat: "Oceans worldwide",
    diet: "Carnivore (krill)",
    funFact: "Largest animal to have ever existed",
    image: "https://wallpaperaccess.com/full/2279083.jpg"
  },
  {
    name: "Komodo Dragon",
    species: "Varanus komodoensis",
    habitat: "Indonesian islands",
    diet: "Carnivore",
    funFact: "Largest living species of lizard",
    image: "https://wallpaperaccess.com/full/2279096.jpg"
  }
]

export default function AnimalDetails() {
  const [animals, setAnimals] = useState<Animal[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setAnimals(demoAnimals)
      setLoading(false)
    }, 1500)
  }, [])

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (animals?.length || 1))
  }

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + (animals?.length || 1)) % (animals?.length || 1))
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  if (loading) {
    return (
      <Card className="w-full max-w-sm mx-auto">
        <CardHeader>
          <Skeleton className="h-6 w-[200px] mx-auto" />
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-4">
          <Skeleton className="h-32 w-32 rounded-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
        </CardContent>
      </Card>
    )
  }

  const currentAnimal = animals?.[currentIndex]

  if (!currentAnimal) {
    return <div>No animal data available.</div>
  }

  return (
    <Card className={`w-full max-w-sm mx-auto  backdrop-blur-xl`}>
      <CardHeader className="relative pb-2">
        <CardTitle className="text-xl font-bold text-center">WildLife Wonders Zoo</CardTitle>
       
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-4 pt-2">
        <div className="relative w-32 h-32">
          <Image
            src={currentAnimal.image}
            alt={currentAnimal.name}
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold">{currentAnimal.name}</h3>
          <p className="text-sm text-muted-foreground">{currentAnimal.species}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 w-full text-sm">
          <div>
            <p className="font-medium flex items-center"><MapPin className="mr-1 h-3 w-3" /> Habitat:</p>
            <p>{currentAnimal.habitat}</p>
          </div>
          <div>
            <p className="font-medium">Diet:</p>
            <p>{currentAnimal.diet}</p>
          </div>
        </div>
        <div className="w-full text-sm">
          <p className="font-medium">Fun Fact:</p>
          <p>{currentAnimal.funFact}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-2">
        <Button onClick={handlePrevious} variant="outline" size="sm">
          <ChevronLeft className="mr-1 h-3 w-3" /> Previous
        </Button>
        <Button onClick={handleNext} variant="outline" size="sm">
          Next <ChevronRight className="ml-1 h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>
  )
}