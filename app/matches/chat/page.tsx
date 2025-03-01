import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { ChatContainer } from "@/components/matches/chat-container"

export default function ChatPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#00041a]">
      <Header />
      <main className="flex-1 py-8">
        <div className="max-w-[1024px] mx-auto px-[24px]">
          <ChatContainer />
        </div>
      </main>
      <Footer />
    </div>
  )
}

