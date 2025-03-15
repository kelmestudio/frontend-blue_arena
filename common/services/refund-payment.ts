import api from "../lib/api";
import { errorTypes } from "../lib/error-types";

export const refundPayment = async ({ captureId, token }: { captureId: string, token: string }) => {
    try {
        const response = await api.post(`/payment/refund/${captureId}`, null, {
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