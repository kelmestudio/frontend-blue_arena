"use client"

import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NewMatchModal } from "../modals/new-match-modal"
import { useState } from "react"
import { ICreateMach } from "@/@types/@match"
import Link from "next/link"

export function MatchesHeader({ tab, title = 'Matches' }: { title?: string, tab?: 'all' | 'my' | 'chats' }) {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const onSearchSubmit = () => {
    
  }

  return (
    <div className="space-y-6 mb-6">
      <h1 className="text-4xl font-bold text-white">{title}</h1>

      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
        <div defaultValue="all" className="w-full sm:w-auto">
          <div className="bg-[#1e293b] p-1 flex items-center h-[40px] rounded-sm">
            <div
              data-state={!tab || tab == 'all' ? 'active' : 'inactive'}
              className="h-[30px] flex items-center justify-center rounded-sm px-5 data-[state=active]:bg-[#3282f6] text-gray-300 data-[state=active]:text-white"
            >
              <Link href={'/ma/matches'}>All matches</Link>
            </div>
            <div
              data-state={tab == 'my' ? 'active' : 'inactive'}
              className="h-[30px] flex items-center justify-center rounded-sm px-5 data-[state=active]:bg-[#3282f6] text-gray-300 data-[state=active]:text-white"
            >
              <Link href={'/ma/my-matches'}>My matches</Link>
            </div>
            <div
              data-state={tab == 'chats' ? 'active' : 'inactive'}
              className="h-[30px] flex items-center justify-center rounded-sm px-5 data-[state=active]:bg-[#3282f6] text-gray-300 data-[state=active]:text-white"
            >
              <Link href={'/ma/chats'}>Chats</Link>
            </div>
          </div>
        </div>

        <div className="relative flex-1">
          {" "}
          {/* Update 1 */}
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search"
            onSubmit={onSearchSubmit}
            className="pl-9 bg-[#1e293b] border-0 text-white placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-gray-700 w-full"
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto flex-shrink-0 items-center">
          <Button className="px-4 bg-[#3282f6] hover:bg-[#2563eb] whitespace-nowrap" onClick={openModal}>New match</Button>
          {/* <Select defaultValue="newer">
            <SelectTrigger className="h-10 bg-[#1e293b] border-0 text-gray-300 focus:ring-1 focus:ring-gray-700">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newer">Newer matches</SelectItem>
              <SelectItem value="older">Older matches</SelectItem>
              <SelectItem value="value-asc">Value: Low to High</SelectItem>
              <SelectItem value="value-desc">Value: High to Low</SelectItem>
            </SelectContent>
          </Select> */}
        </div>
      </div>

      <NewMatchModal onClose={closeModal} isOpen={isOpen} />
    </div>
  )
}

