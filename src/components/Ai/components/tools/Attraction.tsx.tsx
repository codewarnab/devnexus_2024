import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Attraction {
    id: number;
    name: string;
    description: string;
  }
  
  const attractions: Attraction[] = [
    {
      id: 1,
      name: 'Lion\'s Den',
      description: 'Home to our majestic lions',
    },
    {
      id: 2,
      name: 'Penguin Pool',
      description: 'Watch penguins swim and play',
    },
    {
      id: 3,
      name: 'Butterfly Garden',
      description: 'Walk among colorful butterflies',
    },
    {
      id: 4,
      name: 'Elephant Enclosure',
      description: 'See our gentle giants up close',
    },
    {
      id: 5,
      name: 'Reptile House',
      description: 'Discover fascinating reptiles',
    },
  ];

export default function AttractionsList() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Top Attractions</h2>
      {attractions.map((attraction) => (
        <Card key={attraction.id}>
          <CardHeader>
            <CardTitle>{attraction.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{attraction.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}