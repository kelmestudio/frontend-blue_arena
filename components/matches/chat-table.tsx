import { EMatchStatus, EMatchType, IMatch } from "@/@types/@match"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { CompletePaymentButton } from "./complete-payment-button"
import { cookies } from "next/headers";
import toast from "react-hot-toast";
import { AcceptButton } from "./accept-button";
import useSelectAllChat from "@/common/hooks/use-select-all-chat";
import { IChat } from "@/@types/@chat";
import { displayInitials } from "@/common/lib/utils";
import OpenChatButton from "../ui/open-chat-button";

async function getStatusButton(status: number, { match, buttonsActions }: { match?: IMatch, buttonsActions?: { onCompletePayment?: (match: IMatch) => void | Promise<void> } }) {
  const cookieStore = await cookies()
  const userId = cookieStore.get('user');

  if (match && !match?.paid) {
    return <CompletePaymentButton match={match} />
  }

  switch (status) {
    case EMatchStatus.waiting_for_players:
      return <AcceptButton userId={userId?.value ?? ''} match={match} />
    case EMatchStatus.finished:
    case EMatchStatus.in_progress:
    case EMatchStatus.dispute:
      return <Button className="w-full bg-[#047857] hover:bg-[#047857]/90">View messages</Button>
    default:
      return (
        <Button variant="outline" className="w-full bg-[#1e293b] text-gray-300 hover:bg-[#1e293b]/80 hover:text-white" disabled={true}>
          View messages
        </Button>
      )
  }
}

function getStatusLabel(type: number) {
  switch (type) {
    case EMatchStatus.waiting_for_players:
    case EMatchStatus.pending_approval:
      return 'Pending'
    case EMatchStatus.in_progress:
      return 'In progress'
    case EMatchStatus.finished:
      return 'Completed'
    case EMatchStatus.canceled:
      return 'Canceled'
    case EMatchStatus.dispute:
      return 'In dispute'
    default:
      return null
  }
}

function getTypeLabel(type: number) {
  switch (type) {
    case EMatchType.solo:
      return 'Solo'
    case EMatchType.team:
      return 'Team'
  }
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

export async function ChatTable({ chats }: { chats: IChat[] }) {
  return (
    <div className="rounded-lg border border-[#1e293b] overflow-hidden">
      <div className="w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <thead className="bg-[#1e293b]/50">
            <tr>
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-300">Another Player</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-300">Game Title</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-300">Time</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-300">Type</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-300">Status</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-300">Prize</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-300"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1e293b]">
            {chats.map((chat) => (
              <tr key={1} className="hover:bg-[#1e293b]/50">
                <td className="p-4 text-gray-300 capitalize flex items-center">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 bg-[#1e293b] text-white flex items-center justify-center">
                      <span className="text-sm">
                        {
                          displayInitials(chat.user_type == 'player' ?
                            chat.host.username :
                            chat.player.username)
                        }
                      </span>
                    </Avatar>
                    <span className="text-gray-300">
                      {
                        chat.user_type == 'player' ?
                          chat.host.username :
                          chat.player.username
                      }
                    </span>
                  </div>
                </td>
                <td className="p-4 text-gray-300">{chat.match.game_title}</td>
                <td className="p-4 text-gray-300">{getDateLabel(chat.match.date.toString())}</td>
                <td className="p-4 text-gray-300">{getTypeLabel(chat.match.type)}</td>
                <td className="p-4 text-gray-300">{getStatusLabel(chat.match.status)}</td>
                <td className="p-4 text-gray-300">{chat.match.prize}</td>
                <td className="p-4 w-[200px]">
                  <OpenChatButton chat_id={chat.chat_id} />
                </td>
              </tr>
            ))}

            {chats.length === 0 && (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-300">No matches found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

