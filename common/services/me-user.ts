import api from "../lib/api";
import { errorTypes } from "../lib/error-types";
import { IMeUser } from "@/@types/@user";

export const meUser = async ({ session, token }: IMeUser) => {
    try {
        const result = await api.get("/user/me", {
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

        return errorTypes._500.user_nc;
    }
}