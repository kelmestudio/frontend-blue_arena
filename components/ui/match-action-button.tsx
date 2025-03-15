'use client'

import { EMatchStatus, IMatch } from "@/@types/@match"
import { Button } from "./button"

export default function MatchActionButton({ status, match, buttonsActions }: { status: number, match?: IMatch, buttonsActions?: { onCompletePayment?: (match: IMatch) => void | Promise<void> } }) {
    const completePayment = buttonsActions && buttonsActions.onCompletePayment ? () => { (buttonsActions as { onCompletePayment: any }).onCompletePayment(match) } : () => { console.log('pa') }

    if (match && !match?.paid) {
        return <Button className="w-full bg-[#047823] hover:bg-[#047823]/90" onClick={completePayment}>Complete payment</Button>
    }

    switch (status) {
        case EMatchStatus.waiting_for_players:
            return <Button className="w-full bg-[#3282f6] hover:bg-[#2563eb]">Accept</Button>
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