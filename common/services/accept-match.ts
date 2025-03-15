import api from "../lib/api";
import { errorTypes } from "../lib/error-types";

interface IAccepMatch {
    matchId: number,
    hostId: number,
    session: string,
    token: string,
}

export const acceptMatch = async ({ matchId, hostId, session, token }: IAccepMatch) => {
    try {
        const response = await api.post(`/chat`, {
            host_id: hostId,
            match_id: matchId,
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

        return errorTypes._500.accept_match;
    }
}