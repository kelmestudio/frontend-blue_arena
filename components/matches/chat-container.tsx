"use client"

import { ArrowLeft, Headphones, Send } from "lucide-react"
import Link from "next/link"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChatMessage } from "./chat-message"
import { IChat } from "@/@types/@chat"
import { useEffect, useState } from "react"
import { displayInitials } from "@/common/lib/utils"
import { EMatchType } from "@/@types/@match"
import { toast } from "react-hot-toast"
import api from "@/common/lib/api"
import useCreatePayment from "@/common/hooks/use-create-payment"
import { useRouter } from "next/navigation"

interface Message {
  content: string;
  timestamp: string;
  isCurrentUser: boolean;
  username?: string;
  userInitials?: string;
}

export function ChatContainer({
  chat,
  socket
}: {
  chat: IChat | any;
  socket: any;
}) {
  const { push } = useRouter();

  const { execCreatePayment, loading: createPaymentLoading } = useCreatePayment();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (socket && chat) {
      // Request message history when component mounts
      socket.emit('joinRoom', {
        chatId: chat.chat_id,
        userId: chat.user_type === 'player' ? chat.player.id.toString() : chat.host.id.toString(),
        receiverId: chat.user_type === 'player' ? chat.host.id.toString() : chat.player.id.toString()
      });

      socket.on('messageHistory', (messageHistory: any[]) => {
        const formattedMessages = messageHistory.map(msg => ({
          content: msg.message,
          timestamp: new Date(msg.created_at).toLocaleTimeString(),
          isCurrentUser: chat?.user_type === 'player' ?
            msg.user_id === chat.player.id :
            msg.user_id === chat.host.id,
          username: msg.User?.username,
          userInitials: msg.User?.username ? displayInitials(msg.User.username) : undefined
        }));
        setMessages(formattedMessages);
      });

      socket.on('message', (data: { senderId: string; message: string }) => {
        const isCurrentUser = chat?.user_type === 'player' ?
          data.senderId === chat.player.id.toString() :
          data.senderId === (chat).host.id.toString();

        const otherUser = chat?.user_type === 'player' ? chat.host : chat.player;

        setMessages(prev => [...prev, {
          content: data.message,
          timestamp: new Date().toLocaleTimeString(),
          isCurrentUser,
          username: isCurrentUser ? undefined : otherUser.username,
          userInitials: isCurrentUser ? undefined : displayInitials(otherUser.username)
        }]);
      });
    }

    return () => {
      if (socket) {
        socket.off('messageHistory');
        socket.off('message');
      }
    };
  }, [socket, chat]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!socket || !chat || !newMessage.trim()) return;

    const senderId = chat.user_type === 'player' ?
      chat.player.id.toString() :
      chat.host.id.toString();

    const receiverId = chat.user_type === 'player' ?
      chat.host.id.toString() :
      chat.player.id.toString();

    socket.emit('message', {
      chatId: chat.chat_id,
      senderId,
      receiverId,
      message: newMessage
    });

    setNewMessage('');
  };

  const completePayment = async () => {
    const result = await execCreatePayment(chat.chat_id);

    if (result?.approval_url) {
      push(result.approval_url);
    }
  }

  if (!chat) {
    return null;
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 md:h-[calc(100vh-200px)]">
      <style jsx>{`
        .mask-edges {
          mask-image: linear-gradient(to bottom, transparent, black 10px, black calc(100% - 10px), transparent);
        }
      `}</style>
      {/* Main Chat Section */}
      <div className="max-md:max-h-[500px] flex-1 bg-[#0f172a] rounded-lg overflow-hidden flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-[#1e293b] flex items-center gap-4">
          <Link href="/ma/chats" className="text-gray-300 hover:text-white">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h2 className="text-xl font-semibold text-white">Messages</h2>
          <Button variant="ghost" size="icon" className="ml-auto text-white">
            <Headphones className="h-5 w-5" />
          </Button>
        </div>

        {/* Chat Messages */}
        <div
          className="flex-1 overflow-y-auto p-4 pr-2 mr-2 mask-edges chat-messages"
          ref={(el) => {
            if (el) {
              el.scrollTop = el.scrollHeight;
            }
          }}
        >
          <div className="text-center space-y-2 mb-4">
            <p className="text-sm text-gray-500">Chat</p>
            <p className="text-sm text-gray-400">Conversation started</p>
          </div>
          <div className="flex flex-col space-y-4">
            {messages.map((message, index) => (
              <ChatMessage key={index} {...message} />
            ))}
          </div>
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-[#1e293b]">
          <form className="flex items-center gap-2" onSubmit={handleSendMessage}>
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
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
          <Avatar className="h-16 w-16 mx-auto bg-[#1e293b] text-white flex items-center justify-center">
            <span className="text-xl">{displayInitials(getOtherPlayer(chat).username)}</span>
          </Avatar>
          <div className="space-y-1">
            <p className="text-white">{getOtherPlayer(chat).username}</p>
          </div>
        </div>

        <div className="text-center space-y-2 w-full">
          <p className="text-5xl font-bold text-white">{chat.match.prize}B</p>
          <h3 className="text-2xl font-semibold text-white">{chat.match.game_title}</h3>
          <p className="text-gray-400">{chat.match.type == EMatchType.solo ? 'Solo' : 'Team'} - {getDateLabel(chat.match.date)}</p>
        </div>

        {
          chat.user_type == 'host' ? (
            <div className="space-y-4 w-full">
              <p className="text-center text-sm text-gray-300">You are the host</p>
            </div>
          ) : (
            <div className="space-y-4 w-full">
              <p className="text-center text-sm text-gray-300">You need to send the amount below to compete</p>
              <Button
                className="w-full bg-[#3282f6] hover:bg-[#2563eb]"
                onClick={completePayment}
                disabled={createPaymentLoading}
              >
                Send {chat.match.prize}B
              </Button>

              <div className="flex justify-center gap-2">
                <img src="https://v0.blob.com/payment-paypal.svg" alt="PayPal" className="h-8 w-auto" />
                <img src="https://v0.blob.com/payment-mastercard.svg" alt="Mastercard" className="h-8 w-auto" />
                <img src="https://v0.blob.com/payment-visa.svg" alt="Visa" className="h-8 w-auto" />
              </div>
            </div>
          )
        }

        <button className="text-sm text-gray-400 hover:text-gray-300 mt-auto">Report an abuse</button>
      </div>
    </div>
  )
}

function getOtherPlayer(chat: IChat) {
  return (
    chat.user_type == 'player'
      ? chat.host
      : chat.player
  )
}

function getDateLabel(input: string): string {
  const date = new Date(input);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format");
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}/${month}/${day} ${hours}:${minutes}`;
}

