import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CreditCard, DollarSign, Calendar, ArrowDownToLine, ArrowUpToLine } from "lucide-react"
import DefaultLayout from "@/components/Layouts/DefaultLaout"

export default function PayoutPage() {
  const recentTransactions = [
    { id: 1, date: "2023-06-01", description: "Payout to Bank Account", amount: 1250.00, type: "payout" },
    { id: 2, date: "2023-05-28", description: "Ticket Sales Revenue", amount: 450.00, type: "income" },
    { id: 3, date: "2023-05-25", description: "Ticket Sales Revenue", amount: 800.00, type: "income" },
    { id: 4, date: "2023-05-20", description: "Payout to Bank Account", amount: 2000.00, type: "payout" },
  ]

  return (
    <DefaultLayout>
    <div className="container mx-auto p-4 space-y-8 text-white">
      <h1 className="text-3xl font-bold">Payout Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,250.00</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Payout Date</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">June 15, 2023</div>
            <p className="text-xs text-muted-foreground">Estimated amount: $3,500.00</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payout Method</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Bank Account</div>
            <p className="text-xs text-muted-foreground">Last 4 digits: 1234</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    {transaction.type === "payout" ? (
                      <span className="flex items-center text-red-500">
                        <ArrowUpToLine className="mr-1 h-4 w-4" />
                        Payout
                      </span>
                    ) : (
                      <span className="flex items-center text-green-500">
                        <ArrowDownToLine className="mr-1 h-4 w-4" />
                        Income
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Manage Payouts</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="payoutMethod">Payout Method</Label>
                <Select>
                  <SelectTrigger id="payoutMethod">
                    <SelectValue placeholder="Select payout method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bankAccount">Bank Account</SelectItem>
                    <SelectItem value="paypal">PayPal</SelectItem>
                    <SelectItem value="check">Check</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="payoutFrequency">Payout Frequency</Label>
                <Select>
                  <SelectTrigger id="payoutFrequency">
                    <SelectValue placeholder="Select payout frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="biweekly">Bi-weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="minimumPayout">Minimum Payout Amount ($)</Label>
              <Input className="   bg-slate-400 " id="minimumPayout" type="number" placeholder="Enter minimum payout amount" />
            </div>
            <Button type="submit">Update Payout Settings</Button>
          </form>
        </CardContent>
      </Card>
    </div>
    </DefaultLayout>
    
  )
}