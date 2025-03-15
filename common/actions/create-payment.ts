'use server'

import { cookies } from 'next/headers';
import { createPayment as createPaymentService } from '../services/create-payment';

export async function createPayment(chatId: string) {
    const cookieStore = cookies();
    const token = cookieStore.get('token');
    const session = cookieStore.get('session-code');

    if (!token || !session) {
        throw new Error('Authentication required');
    }

    const result = await createPaymentService({
        chatId,
        session: session.value,
        token: token.value
    });

    return result;
} 