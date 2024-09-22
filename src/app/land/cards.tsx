import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Palette, Ticket, ThumbsUp, Clock, Sun, Moon, BarChart, ShieldCheck } from "lucide-react"

export default function Cards() {
  const features = [
    {
      title: "100% Customization",
      description: "Build your chatbot exactly how you want. Every element is customizable, ensuring it fits your brand and meets your visitors' unique needs. No coding required.",
    },
    {
      title: "Seamless Ticket Booking",
      description: "Offer visitors a fast, intuitive ticket booking experience, directly within the chatbot. Simplify the process with minimal steps, ensuring higher conversions.",
    },
    {
      title: "User-Friendly Interface",
      description: "Our chatbot is designed with ease of use in mind. Visitors of all ages can interact without hassle, ensuring a smooth experience from start to finish.",
    },
    {
      title: "Real-Time Updates",
      description: "Provide your visitors with up-to-the-minute information. Whether it's ticket availability or event schedules, Conversifi keeps everything fresh and relevant.",
    },
    {
      title: "24/7 Availability",
      description: "Your chatbot is always on, ready to assist visitors at any time. Whether it's booking tickets or answering questions, ensure round-the-clock service.",
      icon: () => (
        <div className="flex">
          <Sun className="w-4 h-4 mr-1" />
          <Moon className="w-4 h-4" />
        </div>
      ),
    },
    {
      title: "Analytics and Insights",
      description: "Gain valuable insights into user interactions with detailed analytics. Track visitor behavior, optimize the user journey, and improve conversions effortlessly.",
    },
    {
      title: "Secure Transactions",
      description: "Protect your visitors with top-tier security for transactions. Our chatbot guarantees safe and encrypted payment processes, giving peace of mind to both you and your customers.",
    },
  ]

  return (
    <div className="bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-white text-center mb-12">
          Powerful Features for Your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            Tourist Chatbot
          </span>
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center mb-4">
                  {typeof feature.icon === 'function' ? (
                    feature.icon()
                  ) : (
                    <ThumbsUp className="w-6 h-6 text-white" />
                  )}
                </div>
                <CardTitle className="text-xl font-semibold text-white">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}