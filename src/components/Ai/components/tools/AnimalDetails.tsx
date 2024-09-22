
"use client"
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface AnimalDetailsProps {
  animalName: string
}

export default function AnimalDetails({ animalName }: AnimalDetailsProps) {
  const [animalInfo, setAnimalInfo] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulating API call to get animal details
    setTimeout(() => {
      setAnimalInfo({
        name: animalName,
        species: 'Example Species',
        habitat: 'Natural Habitat',
        diet: 'Typical Diet',
        funFact: 'An interesting fact about the animal.'
      })
      setLoading(false)
    }, 1500)
  }, [animalName])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-4 w-[250px]" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-[300px] mb-2" />
          <Skeleton className="h-4 w-[250px] mb-2" />
          <Skeleton className="h-4 w-[200px]" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{animalInfo.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p><strong>Species:</strong> {animalInfo.species}</p>
        <p><strong>Habitat:</strong> {animalInfo.habitat}</p>
        <p><strong>Diet:</strong> {animalInfo.diet}</p>
        <p><strong>Fun Fact:</strong> {animalInfo.funFact}</p>
      </CardContent>
    </Card>
  )
}