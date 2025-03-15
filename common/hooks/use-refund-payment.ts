import { useState } from 'react';
import toast from 'react-hot-toast';
import { refundPayment } from '../actions/refund-payment';

export default function useRefundPayment() {
    const [loading, setLoading] = useState(false);

    const execRefundPayment = async (captureId: string) => {
        try {
            setLoading(true);
            const result = await refundPayment(captureId);

            if (result.status === 200) {
                toast.success('Payment refunded successfully');
                return result.data;
            }

            throw result;
        } catch (error) {
            toast.error('Failed to refund payment. Please try again.');
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { execRefundPayment, loading };
} 