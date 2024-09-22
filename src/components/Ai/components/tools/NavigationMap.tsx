"use client"
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { MapPin } from 'lucide-react'

export default function NavigationMap() {
  const [selectedArea, setSelectedArea] = useState<string | null>(null)

  const zooAreas = [
    { id: 'entrance', name: 'Main Entrance', x: 10, y: 90 },
    { id: 'savanna', name: 'African Savanna', x: 30, y: 30 },
    { id: 'jungle', name: 'Tropical Jungle', x: 70, y: 40 },
    { id: 'arctic', name: 'Arctic Zone', x: 80, y: 70 },
    { id: 'aquarium', name: 'Aquarium', x: 50, y: 60 },
  ]

  return (
    <div className="relative w-full h-96 bg-green-100 rounded-lg overflow-hidden">
      {zooAreas.map((area) => (
        <Button
          key={area.id}
          variant="outline"
          size="sm"
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${area.x}%`, top: `${area.y}%` }}
          onClick={() => setSelectedArea(area.id)}
        >
          <MapPin className="w-4 h-4 mr-1" />
          {area.name}
        </Button>
      ))}
      {selectedArea && (
        <div className="absolute bottom-0 left-0 right-0 bg-white p-4">
          <h3 className="font-bold">{zooAreas.find(a => a.id === selectedArea)?.name}</h3>
          <p>Information about {zooAreas.find(a => a.id === selectedArea)?.name} goes here.</p>
        </div>
      )}
    </div>
  )
}