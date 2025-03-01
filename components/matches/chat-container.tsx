"use client"

import { ArrowLeft, Headphones, Send } from "lucide-react"
import Link from "next/link"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChatMessage } from "./chat-message"

// Sample messages for demonstration
const sampleMessages = [
  {
    content: "Hey, are you ready for the match?",
    timestamp: "10:30 AM",
    isCurrentUser: false,
    username: "johnjohn2",
    userInitials: "JJ",
  },
  {
    content: "Yes, I'm all set! Can't wait to start.",
    timestamp: "10:32 AM",
    isCurrentUser: true,
  },
  {
    content: "Great! Let's go over the rules one last time.",
    timestamp: "10:33 AM",
    isCurrentUser: false,
    username: "johnjohn2",
    userInitials: "JJ",
  },
  {
    content: "Sounds good. I'm ready when you are!",
    timestamp: "10:35 AM",
    isCurrentUser: true,
  },
]

export function ChatContainer() {
  return (
    <div className="flex flex-col md:flex-row gap-6 md:h-[calc(100vh-200px)]">
      <style jsx>{`
        .mask-edges {
          mask-image: linear-gradient(to bottom, transparent, black 10px, black calc(100% - 10px), transparent);
        }
      `}</style>
      {/* Main Chat Section */}
      <div className="max-md:min-h-[500px] flex-1 bg-[#0f172a] rounded-lg overflow-hidden flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-[#1e293b] flex items-center gap-4">
          <Link href="/matches" className="text-gray-300 hover:text-white">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h2 className="text-xl font-semibold text-white">Messages</h2>
          <Button variant="ghost" size="icon" className="ml-auto">
            <Headphones className="h-5 w-5" />
          </Button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 pr-2 mr-2 mask-edges">
          <div className="text-center space-y-2 mb-4">
            <p className="text-sm text-gray-500">TODAY</p>
            <p className="text-sm text-gray-400">You&apos;ve started this conversation</p>
          </div>
          {sampleMessages.map((message, index) => (
            <ChatMessage key={index} {...message} />
          ))}
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-[#1e293b]">
          <form className="flex items-center gap-2">
            <Input
              placeholder="Start typing..."
              className="flex-1 bg-[#1e293b] border-0 text-white placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-gray-700"
            />
            <Button type="submit" size="icon" className="bg-[#3282f6] hover:bg-[#2563eb]">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </div>
      </div>

      {/* Match Details Sidebar */}
      <div className="w-full md:w-80 bg-[#0f172a] rounded-lg p-6 flex flex-col items-center gap-6">
        <div className="text-center space-y-4">
          <Avatar className="h-16 w-16 mx-auto bg-[#1e293b] text-white">
            <span className="text-xl">JC</span>
          </Avatar>
          <div className="space-y-1">
            <p className="text-white">johnjohn2</p>
          </div>
        </div>

        <div className="text-center space-y-2 w-full">
          <p className="text-5xl font-bold text-white">20€</p>
          <h3 className="text-2xl font-semibold text-white">Super Mario</h3>
          <p className="text-gray-400">Solo - 18:00</p>
        </div>

        <div className="space-y-4 w-full">
          <p className="text-center text-sm text-gray-300">You need to send the amount below to compete</p>
          <Button className="w-full bg-[#3282f6] hover:bg-[#2563eb]">Send 20€</Button>

          <div className="flex justify-center gap-2">
            <img src="https://v0.blob.com/payment-paypal.svg" alt="PayPal" className="h-8 w-auto" />
            <img src="https://v0.blob.com/payment-mastercard.svg" alt="Mastercard" className="h-8 w-auto" />
            <img src="https://v0.blob.com/payment-visa.svg" alt="Visa" className="h-8 w-auto" />
          </div>
        </div>

        <button className="text-sm text-gray-400 hover:text-gray-300 mt-auto">Report an abuse</button>
      </div>
    </div>
  )
}

