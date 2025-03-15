import api from "../lib/api";
import { errorTypes } from "../lib/error-types";
import { ICreateMach } from "@/@types/@match";

export const createMatch = async ({ date, game_title, prize, type, token, session }: ICreateMach & { token: string, session: string }) => {
    try {
        const result = await api.post("/match/", {
            date, game_title, prize, type
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'session-id': session,
            }
        });

        return result;
    } catch (error: any) {
        if (error.response.data.code) {
            return error.response.data.code;
        }

        return errorTypes._500.match_nc;
    }
}