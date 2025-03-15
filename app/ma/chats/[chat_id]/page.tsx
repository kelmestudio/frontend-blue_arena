'use client'

import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { ChatContainer } from "@/components/matches/chat-container"
import io from 'socket.io-client';
import { useEffect, useState } from "react";
import { selectChat } from "@/common/actions/select-chat";
import toast from "react-hot-toast";
import { IChat } from "@/@types/@chat";

export default function ChatPage({ params }: { params: { chat_id: string } }) {
  if (!params.chat_id) {
    return null;
  }

  const [chat, setChat] = useState<IChat | null>(null);
  const [socket, setSocket] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);

  const select = () => {
    selectChat(params.chat_id)
      .then((data) => {
        setChat(data)
      })
      .catch((error) => {
        toast.error('Could not start the chat. Please try again later.')
      });
  }

  useEffect(() => {
    select();
  }, [])

  useEffect(() => {
    if (chat) {
      const socket = io('http://localhost:5000');
      setSocket(socket);

      const userId = chat.user_type === 'player' ? chat.player.id.toString() : chat.host.id.toString();
      const receiverId = chat.user_type === 'player' ? chat.host.id.toString() : chat.player.id.toString();
      
      socket.emit('joinRoom', { 
        userId, 
        receiverId, 
        chatId: chat.chat_id 
      });

      socket.on('messageHistory', (messageHistory) => {
        setMessages(messageHistory);
      });

      socket.on('messageError', (error) => {
        toast.error(error.error);
      });

      return () => {
        socket.disconnect();
      }
    }
  }, [chat])

  return (
    <div className="min-h-screen flex flex-col bg-[#00041a]">
      <Header />
      <main className="flex-1 py-8">
        <div className="max-w-[1024px] mx-auto px-[24px]">
          <ChatContainer chat={chat} socket={socket} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

