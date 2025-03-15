'use client'

import { IMatch } from "@/@types/@match";
import { Button } from "../ui/button";
import { toast } from "react-hot-toast";
import { useRouter } from 'next/navigation'
import { useState } from "react";
import { acceptMatch } from "@/common/actions/accept-match";

export function AcceptButton({ match, userId }: { match?: IMatch, userId: string }) {
    if (!match) {
        return null;
    }

    const [isLoading, setLoading] = useState(false);
    const { push } = useRouter();

    const handleClick = async () => {
        try {
            setLoading(true);

            const result = await acceptMatch(match);

            if (!result.chat_id) {
                throw new Error('Error accepting the match.');
            }

            toast.success('Chat started successfully.');
            push(`chats/${result.chat_id}`);
        } catch (error) {
            toast.error('Error accepting the match.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            className="w-full bg-[#3282f6] hover:bg-[#2563eb]"
            disabled={(userId && +userId == match.host.id) || isLoading ? true : false}
            onClick={handleClick}
        >
            Accept
        </Button>
    );
}   