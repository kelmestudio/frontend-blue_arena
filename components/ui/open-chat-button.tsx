'use client'

import { useRouter } from "next/navigation";
import { Button } from "./button";

export default function OpenChatButton({ chat_id }: { chat_id: string }) {
    const {push} = useRouter();

    return (
        <Button variant="default" className="w-full bg-[#047857] hover:bg-[#047857]/80 text-gray-300 hover:text-white" onClick={() => push(`/ma/chats/${chat_id}`)}>
            Open Chat
        </Button>
    );
}