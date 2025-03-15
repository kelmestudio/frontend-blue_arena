import { useState } from 'react';
import toast from 'react-hot-toast';
import { capturePayment } from '../actions/capture-payment';

export default function useCapturePayment() {
    const [loading, setLoading] = useState(false);

    const execCapturePayment = async (orderId: string) => {
        try {
            setLoading(true);
            const result = await capturePayment(orderId);

            if (result.status === 200) {
                toast.success('Payment captured successfully');
                return result.data;
            }

            throw result;
        } catch (error) {
            toast.error('Failed to capture payment. Please try again.');
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { execCapturePayment, loading };
} 