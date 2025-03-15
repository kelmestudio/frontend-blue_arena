'use server'
import { cookies } from 'next/headers';
import { selectAllChatService } from '../services/select-all-chat';

export async function selectAllChat({
    session,
    token
}: { session: string, token: string }) {
    

    if (!token || !session) {
        throw new Error('Authentication required');
    }

    return await selectAllChatService({
        session: session,
        token: token,
    });
}