import { Avatar } from "@/components/ui/avatar"

interface ChatMessageProps {
  content: string
  timestamp: string
  isCurrentUser: boolean
  username?: string
  userInitials?: string
}

export function ChatMessage({ content, timestamp, isCurrentUser, username, userInitials }: ChatMessageProps) {
  if (isCurrentUser) {
    return (
      <div className="flex flex-col items-end mb-4">
        <div className="bg-[#3282f6] text-white rounded-lg py-2 px-4 max-w-[70%]">
          <p>{content}</p>
        </div>
        <span className="text-xs text-gray-400 mt-1">{timestamp}</span>
      </div>
    )
  }

  return (
    <div className="flex mb-4">
      <Avatar className="h-8 w-8 mr-2 bg-[#1e293b] text-white">
        <span className="text-sm">{userInitials}</span>
      </Avatar>
      <div className="flex flex-col">
        <div className="bg-[#1e293b] text-white rounded-lg py-2 px-4 max-w-[70%]">
          <p className="font-semibold mb-1">{username}</p>
          <p>{content}</p>
        </div>
        <span className="text-xs text-gray-400 mt-1">{timestamp}</span>
      </div>
    </div>
  )
}

