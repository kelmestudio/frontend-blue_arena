'use server'

import { cookies } from 'next/headers';
import { getPaymentStatus as getPaymentStatusService } from '../services/get-payment-status';

export async function getPaymentStatus(orderId: string) {
    const cookieStore = cookies();
    const token = cookieStore.get('token');

    if (!token) {
        throw new Error('Authentication required');
    }

    const result = await getPaymentStatusService({
        orderId,
        token: token.value
    });

    return result;
} 