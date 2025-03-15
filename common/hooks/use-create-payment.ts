import { useState } from 'react';
import toast from 'react-hot-toast';
import { createPayment } from '../actions/create-payment';

export default function useCreatePayment() {
    const [loading, setLoading] = useState(false);

    const execCreatePayment = async (chatId: string) => {
        try {
            setLoading(true);
            const result = await createPayment(chatId);

            if (result.approval_url) {
                toast.success('Payment created successfully');
                return result;
            }

            throw result;
        } catch (error) {
            toast.error('Failed to create payment. Please try again.');
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { execCreatePayment, loading };
} 