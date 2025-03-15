'use server'

import { cookies } from 'next/headers';
import { capturePayment as capturePaymentService } from '../services/capture-payment';

export async function capturePayment(orderId: string) {
    const cookieStore = cookies();
    const token = cookieStore.get('token');

    if (!token) {
        throw new Error('Authentication required');
    }

    const result = await capturePaymentService({
        orderId,
        token: token.value
    });

    return result;
} 