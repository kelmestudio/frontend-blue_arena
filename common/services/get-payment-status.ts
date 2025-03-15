import api from "../lib/api";
import { errorTypes } from "../lib/error-types";

export const getPaymentStatus = async ({ orderId, token }: { orderId: string, token: string }) => {
    try {
        const response = await api.get(`/payment/status/${orderId}`, {
            headers: {
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