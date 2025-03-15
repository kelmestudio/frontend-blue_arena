import api from "../lib/api";
import { errorTypes } from "../lib/error-types";

export async function selectAllChatService({ session, token }: { session: string, token: string }) {
    try {
        const result = await api.get(`/chat/list-all`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'session-id': session,
            },
        });

        return result.data;
    } catch (error: any) {
        if (error.response.data.code) {
            return error.response.data.code;
        }

        return errorTypes._500.chat_ns;
    }
}