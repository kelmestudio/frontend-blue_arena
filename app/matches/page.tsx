import { MatchesTable } from "@/components/matches/matches-table"
import { MatchesHeader } from "@/components/matches/matches-header"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

export default function MatchesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="max-w-[1024px] mx-auto px-[24px]">
          <MatchesHeader />
          <MatchesTable />
        </div>
      </main>
      <Footer />
    </div>
  )
}

