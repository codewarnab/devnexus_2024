"use client"
import { SetStateAction, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from 'sonner'

export default function ComplaintForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [complaint, setComplaint] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the complaint to your backend
    console.log('Complaint submitted:', { name, email, complaint })
    toast.success('Your complaint has been submitted. We will get back to you soon.')
    setName('')
    setEmail('')
    setComplaint('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="complaint" className="block text-sm font-medium text-gray-700">Complaint</label>
        <Textarea
          id="complaint"
          value={complaint}
          onChange={(e: { target: { value: SetStateAction<string> } }) => setComplaint(e.target.value)}
          required
        />
      </div>
      <Button type="submit">Submit Complaint</Button>
    </form>
  )
}