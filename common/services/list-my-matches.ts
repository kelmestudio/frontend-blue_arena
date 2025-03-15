import { IListAllMatches } from "@/@types/@match";
import { errorTypes } from "../lib/error-types";
import api from "../lib/api";

export const listMyMatches = async ({ session, token }: IListAllMatches) => {
    try {
        const result = await api.get("/match/my-matches", {
            headers: {
                Authorization: `Bearer ${token}`,
                'session-id': session,
            },
        });

        return result;
    } catch (error: any) {
        if (error.response.data.code) {
            return error.response.data.code;
        }

        return errorTypes._500.listing_match;
    }
}