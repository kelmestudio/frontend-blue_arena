import { useState } from 'react';
import toast from 'react-hot-toast';
import { getPaymentStatus } from '../actions/get-payment-status';

export default function usePaymentStatus() {
    const [loading, setLoading] = useState(false);

    const execGetPaymentStatus = async (orderId: string) => {
        try {
            setLoading(true);
            const result = await getPaymentStatus(orderId);

            if (result.status === 200) {
                return result.data;
            }

            throw result;
        } catch (error) {
            toast.error('Failed to get payment status. Please try again.');
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { execGetPaymentStatus, loading };
} 