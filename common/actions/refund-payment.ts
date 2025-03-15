'use server'

import { cookies } from 'next/headers';
import { refundPayment as refundPaymentService } from '../services/refund-payment';

export async function refundPayment(captureId: string) {
    const cookieStore = cookies();
    const token = cookieStore.get('token');

    if (!token) {
        throw new Error('Authentication required');
    }

    const result = await refundPaymentService({
        captureId,
        token: token.value
    });

    return result;
} 