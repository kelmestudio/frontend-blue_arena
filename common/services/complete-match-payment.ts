import api from "../lib/api";
import { errorTypes } from "../lib/error-types";

export const completePayment = async ({ matchId, session, token }: { matchId: number, token: string, session: string }) => {
    try {
        const response = await api.post(`/payment/complete-payment`, {
            match_id: String(matchId)
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'session-id': session,
            },
        });

        return response.data;
    } catch (error: any) {
        if (error.response.data.code) {
            return error.response.data.code;
        }

        return errorTypes._500.complete_pay;
    }
}