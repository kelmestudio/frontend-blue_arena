"use client"

import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

// This would come from your API
const matches = [
  {
    id: 1,
    user: {
      initials: "SL",
      username: "sarinha_leticia",
    },
    game: "Super Mario",
    time: "18:00",
    type: "Solo",
    value: "20€",
    status: "accept",
  },
  {
    id: 2,
    user: {
      initials: "J2",
      username: "johnjohn_2",
    },
    game: "Pokémon GO",
    time: "17:40",
    type: "Solo",
    value: "25€",
    status: "accept",
  },
  {
    id: 3,
    user: {
      initials: "J2",
      username: "johnjohn_2",
    },
    game: "Call of Duty",
    time: "17:39",
    type: "Team",
    value: "5€",
    status: "accept",
  },
  {
    id: 4,
    user: {
      initials: "JC",
      username: "johnjohn_2",
    },
    game: "Fortnite",
    time: "17:10",
    type: "Team",
    value: "18€",
    status: "messages",
  },
  {
    id: 5,
    user: {
      initials: "G1",
      username: "garciaoz1",
    },
    game: "Call of Duty",
    time: "17:07",
    type: "Team",
    value: "5€",
    status: "fighting",
  },
  {
    id: 6,
    user: {
      initials: "AN",
      username: "andrezin",
    },
    game: "Fortnite",
    time: "16:59",
    type: "Team",
    value: "18€",
    status: "edit",
  },
]

function getStatusButton(status: string) {
  switch (status) {
    case "accept":
      return <Button className="w-full bg-[#3282f6] hover:bg-[#2563eb]">Accept</Button>
    case "messages":
      return <Button className="w-full bg-[#047857] hover:bg-[#047857]/90">View messages</Button>
    case "fighting":
      return <Button className="w-full bg-[#f59e0b] hover:bg-[#f59e0b]/90">Fighting</Button>
    case "edit":
      return (
        <Button variant="outline" className="w-full bg-[#1e293b] text-gray-300 hover:bg-[#1e293b]/80 hover:text-white">
          Editar
        </Button>
      )
    default:
      return null
  }
}

export function MatchesTable() {
  return (
    <div className="rounded-lg border border-[#1e293b] overflow-hidden">
      <div className="w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <thead className="bg-[#1e293b]/50">
            <tr>
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-300">User</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-300">Game</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-300">Time</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-300">Type</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-300">Value</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-300">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1e293b]">
            {matches.map((match) => (
              <tr key={match.id} className="hover:bg-[#1e293b]/50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 bg-[#1e293b] text-white">
                      <span className="text-sm">{match.user.initials}</span>
                    </Avatar>
                    <span className="text-gray-300">{match.user.username}</span>
                  </div>
                </td>
                <td className="p-4 text-gray-300">{match.game}</td>
                <td className="p-4 text-gray-300">{match.time}</td>
                <td className="p-4 text-gray-300">{match.type}</td>
                <td className="p-4 text-gray-300">{match.value}</td>
                <td className="p-4 w-[200px]">{getStatusButton(match.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-center py-4 border-t border-[#1e293b]">
        <Button variant="outline" className="bg-[#1e293b] text-gray-300 hover:bg-[#1e293b]/80 hover:text-white">
          Load more
        </Button>
      </div>
    </div>
  )
}

