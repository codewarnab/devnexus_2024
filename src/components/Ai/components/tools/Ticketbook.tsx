'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "../ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Loader2 } from "lucide-react"
import { format } from "date-fns"

interface BookTicketProps {
  location: string;
}

export default function BookTicket({ location }: BookTicketProps = { location: 'New York' }) {
  const [isBooking, setIsBooking] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [numTickets, setNumTickets] = useState(1)
  const [seatType, setSeatType] = useState('economy')
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)

  const handleBooking = async () => {
    if (!date) {
      setErrorMessage("Please select a date")
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
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6 space-y-4">
        <h2 className="text-2xl font-bold text-center text-gray-800">Book Your Ticket</h2>
        
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" value={location} readOnly />
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
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
                    onSelect={setDate}
                    initialFocus
                  />
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="numTickets">Number of Tickets</Label>
          <Input
            id="numTickets"
            type="number"
            min={1}
            max={10}
            value={numTickets}
            onChange={(e) => setNumTickets(parseInt(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="seatType">Seat Type</Label>
          <Select value={seatType} onValueChange={setSeatType}>
            <SelectTrigger>
              <SelectValue placeholder="Select seat type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="economy">Economy</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="first">First Class</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

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
              Your ticket has been successfully booked.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p><strong>Location:</strong> {location}</p>
            <p><strong>Date:</strong> {date ? format(date, "PPP") : 'Not selected'}</p>
            <p><strong>Number of Tickets:</strong> {numTickets}</p>
            <p><strong>Seat Type:</strong> {seatType.charAt(0).toUpperCase() + seatType.slice(1)}</p>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsConfirmationOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}