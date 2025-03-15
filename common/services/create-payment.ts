import api from "../lib/api";
import { errorTypes } from "../lib/error-types";

export const createPayment = async ({ chatId, token, session }: { chatId: string, token: string, session: string }) => {
    try {
        const response = await api.post('/payment/create', { chatId }, {
            headers: {
                'session-id': session,
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error: any) {
        if (error.response?.data?.code) {
            return error.response.data.code;
        }

        return errorTypes._500.complete_pay;
    }
} 