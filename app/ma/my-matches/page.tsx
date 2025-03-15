import { MatchesTable } from "@/components/matches/matches-table"
import { MatchesHeader } from "@/components/matches/matches-header"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import useListAllMatches from "@/common/hooks/use-list-all-matches";
import useListMyMatches from "@/common/hooks/use-list-my-matches";

export default async function MatchesPage() {
  const { execListMyMatches } = useListMyMatches();
  const _matches = await execListMyMatches();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="max-w-[1024px] mx-auto px-[24px]">
          <MatchesHeader tab="my" />
          <MatchesTable matches={_matches} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

