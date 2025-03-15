import { MatchesTable } from "@/components/matches/matches-table"
import { MatchesHeader } from "@/components/matches/matches-header"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import useListAllMatches from "@/common/hooks/use-list-all-matches";
import useListMyMatches from "@/common/hooks/use-list-my-matches";
import { ChatTable } from "@/components/matches/chat-table";
import useSelectAllChat from "@/common/hooks/use-select-all-chat";

export default async function MatchesPage() {
  const { execSelectAllChat } = useSelectAllChat();
  const _chats = await execSelectAllChat();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="max-w-[1024px] mx-auto px-[24px]">
          <MatchesHeader tab="chats" title="Chats" />
          <ChatTable chats={_chats} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

