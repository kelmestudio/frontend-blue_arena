import { IAuthenticateUser } from "@/@types/@user";
import api from "../lib/api";
import { errorTypes } from "../lib/error-types";

export const authenticateUser = async ({ username, password }: IAuthenticateUser) => {
    try {
        const response = await api.post("/user/authenticate", {
            username,
            password,
        });

        return response;
    } catch (error: any) {
        if (error.response.data.code) {
            return error.response.data.code;
        }

        return errorTypes._500.user_una;
    }
}