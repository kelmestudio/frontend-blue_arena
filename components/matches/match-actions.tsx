"use client";

import { EMatchStatus, IMatch } from "@/@types/@match";
import { Button } from "@/components/ui/button";
import { CompletePaymentButton } from "./complete-payment-button";

export function MatchActions({ match, status }: { match: IMatch; status: number }) {
  if (match && !match?.paid) {
    return <CompletePaymentButton match={match} />;
  }

  switch (status) {
    case EMatchStatus.waiting_for_players:
      return <Button className="w-full bg-[#3282f6] hover:bg-[#2563eb]">Accept</Button>;
    case EMatchStatus.finished:
    case EMatchStatus.in_progress:
    case EMatchStatus.dispute:
      return <Button className="w-full bg-[#047857] hover:bg-[#047857]/90">View messages</Button>;
    default:
      return (
        <Button
          variant="outline"
          className="w-full bg-[#1e293b] text-gray-300 hover:bg-[#1e293b]/80 hover:text-white"
          disabled={true}
        >
          View messages
        </Button>
      );
  }
}