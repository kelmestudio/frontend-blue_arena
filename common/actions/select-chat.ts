'use server'
import { cookies } from 'next/headers';
import { selectChat as selectChatService } from '../services/select-chat';

export async function selectChat(chatId: string) {
    const cookieStore = cookies();
    const token = cookieStore.get('token');
    const session = cookieStore.get('session-code');

    if (!token || !session) {
        throw new Error('Authentication required');
    }

    return await selectChatService({
        chat_id: chatId,
        session: session.value,
        token: token.value,
    });
}