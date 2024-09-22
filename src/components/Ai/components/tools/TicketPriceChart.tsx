import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const ticketPrices = [
  { type: 'Adult', weekday: 25, weekend: 30 },
  { type: 'Child (3-12)', weekday: 15, weekend: 20 },
  { type: 'Senior (65+)', weekday: 20, weekend: 25 },
  { type: 'Student', weekday: 22, weekend: 27 },
]

export default function TicketPriceChart() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Ticket Prices</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ticket Type</TableHead>
            <TableHead>Weekday Price</TableHead>
            <TableHead>Weekend Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ticketPrices.map((ticket) => (
            <TableRow key={ticket.type}>
              <TableCell>{ticket.type}</TableCell>
              <TableCell>${ticket.weekday}</TableCell>
              <TableCell>${ticket.weekend}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}