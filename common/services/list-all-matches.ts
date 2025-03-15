import { IListAllMatches } from "@/@types/@match";
import api from "../lib/api";
import { errorTypes } from "../lib/error-types";

export const listAllMatches = async ({ session, token }: IListAllMatches) => {
    try {
        const result = await api.get("/match", {
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