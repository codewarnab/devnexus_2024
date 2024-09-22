



// import { ThemeToggle } from '@/components/theme-toggle'


import { Toaster } from '@/components/Ai/components/ui/sonner'
import { TooltipProvider } from '@/components/Ai/components/ui/tooltip'
import { ZooHeader } from '@/components/Ai/components/zooheader'


export const metadata = {
  metadataBase: process.env.VERCEL_URL
    ? new URL(`https://${process.env.VERCEL_URL}`)
    : undefined,
  title: {
    default: 'StockBot powered by Groq',
    template: `%s - StockBot powered by Groq`
  },
  description:
    'Lightning Fast AI Chatbot that Responds With Live Interactive Stock Charts, Financials, News, Screeners, and More.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  }
}



interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
   <>
      
        <Toaster position="top-center" />

       <TooltipProvider>
          <div className="flex flex-col min-h-screen">
          
            <main className="flex flex-col flex-1 bg-muted/50">{children}</main>
          </div>
          {/* <ThemeToggle /> */}
          
          </TooltipProvider>
          </>
  )
}
