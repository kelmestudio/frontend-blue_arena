'use server'

import { IMatch } from "@/@types/@match";
import { cookies } from 'next/headers';
import { completePayment as completePaymentService } from '../services/complete-match-payment';

export async function completePayment(match: IMatch) {
    const cookieStore = cookies();
    const token = cookieStore.get('token');
    const session = cookieStore.get('session-code');

    if (!token || !session) {
        throw new Error('Authentication required');
    }

    const result = completePaymentService({
        matchId: match.id,
        token: token.value,
        session: session.value
    });

    return result;
}