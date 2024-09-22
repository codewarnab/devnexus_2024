'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Loader2, PlusCircle, MinusCircle } from "lucide-react"
import { format } from "date-fns"
import { Slider } from "@/components/ui/slider"

interface ZooTicketBookingProps {
  zooName: string;
}

interface TicketType {
  name: string;
  price: number;
}

const ticketTypes: TicketType[] = [
  { name: "Adult", price: 25 },
  { name: "Child (3-12)", price: 15 },
  { name: "Senior (65+)", price: 20 },
  { name: "Student", price: 18 },
]

const addOns = [
  { name: "Guided Tour", price: 10 },
  { name: "Animal Feeding Experience", price: 15 },
  { name: "Souvenir Photo", price: 8 },
]

export default function ZooTicketBooking({ zooName = 'WildLife Wonders Zoo' }: ZooTicketBookingProps) {
  const [isBooking, setIsBooking] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const [selectedTickets, setSelectedTickets] = useState<{ [key: string]: number }>({})
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  const [groupSize, setGroupSize] = useState(1)

  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    calculateTotalPrice()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTickets, selectedAddOns, groupSize])

  const calculateTotalPrice = () => {
    let price = 0
    Object.entries(selectedTickets).forEach(([type, quantity]) => {
      const ticketPrice = ticketTypes.find(t => t.name === type)?.price || 0
      price += ticketPrice * quantity
    })
    selectedAddOns.forEach(addOn => {
      const addOnPrice = addOns.find(a => a.name === addOn)?.price || 0
      price += addOnPrice
    })
    price *= groupSize
    setTotalPrice(price)
  }

  const handleBooking = async () => {
    if (!date) {
      setErrorMessage("Please select a date")
      return
    }
    if (Object.values(selectedTickets).every(v => v === 0)) {
      setErrorMessage("Please select at least one ticket")
      return
    }
    setIsBooking(true)
    setErrorMessage(null)

    // Simulate a booking API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsBooking(false)
    setIsConfirmationOpen(true)
  }

  return (
    <div className="max-w-md mx-auto backdrop-blur-xl border shadow-xl rounded-xl overflow-hidden">
      <div className="p-6 space-y-6">
        <h2 className="text-3xl font-bold text-center text-primary">{zooName} Tickets</h2>
        
        <div className="space-y-2">
          <Label htmlFor="date">Visit Date</Label>
          <div className="relative">
            <Button
              variant="outline"
              className={`w-full justify-start text-left font-normal ${!date && "text-muted-foreground"}`}
              onClick={() => setDate(new Date())}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
            {date && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="absolute right-0 top-0 h-full">
                    Change
                  </Button>
                </DialogTrigger>
                <DialogContent className="p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => setDate(newDate)}
                    initialFocus
                  />
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <Label>Ticket Types</Label>
          {ticketTypes.map((type) => (
            <div key={type.name} className="flex items-center justify-between">
              <span>{type.name} (${type.price})</span>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setSelectedTickets(prev => ({ ...prev, [type.name]: Math.max((prev[type.name] || 0) - 1, 0) }))}
                >
                  <MinusCircle className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{selectedTickets[type.name] || 0}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setSelectedTickets(prev => ({ ...prev, [type.name]: (prev[type.name] || 0) + 1 }))}
                >
                  <PlusCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <Label>Group Size</Label>
          <Slider
            value={[groupSize]}
            onValueChange={(value) => setGroupSize(value[0])}
            max={20}
            step={1}
          />
          <div className="text-center">{groupSize} {groupSize === 1 ? 'person' : 'people'}</div>
        </div>

        <div className="space-y-2">
          <Label>Add-ons</Label>
          {addOns.map((addOn) => (
            <div key={addOn.name} className="flex items-center space-x-2">
              <input
              title='abc'
                type="checkbox"
                id={addOn.name}
                checked={selectedAddOns.includes(addOn.name)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedAddOns(prev => [...prev, addOn.name])
                  } else {
                    setSelectedAddOns(prev => prev.filter(name => name !== addOn.name))
                  }
                }}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor={addOn.name}>{addOn.name} (+${addOn.price})</Label>
            </div>
          ))}
        </div>

        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

        <div className="text-xl font-bold text-center">
          Total: ${totalPrice}
        </div>

        <Button
          className="w-full"
          onClick={handleBooking}
          disabled={isBooking}
        >
          {isBooking ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Booking...
            </>
          ) : (
            'Book Now'
          )}
        </Button>
      </div>

      <Dialog open={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Booking Confirmed!</DialogTitle>
            <DialogDescription>
              Your zoo tickets have been successfully booked.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-2">
            <p><strong>Zoo:</strong> {zooName}</p>
            <p><strong>Date:</strong> {date ? format(date, "PPP") : 'Not selected'}</p>
            <p><strong>Tickets:</strong></p>
            <ul className="list-disc list-inside">
              {Object.entries(selectedTickets).map(([type, quantity]) => (
                quantity > 0 && <li key={type}>{type}: {quantity}</li>
              ))}
            </ul>
            <p><strong>Group Size:</strong> {groupSize}</p>
            {selectedAddOns.length > 0 && (
              <>
                <p><strong>Add-ons:</strong></p>
                <ul className="list-disc list-inside">
                  {selectedAddOns.map(addOn => (
                    <li key={addOn}>{addOn}</li>
                  ))}
                </ul>
              </>
            )}
            <p className="text-lg font-bold">Total Price: ${totalPrice}</p>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsConfirmationOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}