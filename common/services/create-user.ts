import { ICreateUser } from "@/@types/@user";
import api from "../lib/api";
import { errorTypes } from "../lib/error-types";

export const createUser = async ({ name, email, password, username }: ICreateUser) => {
    try {
        const result = await api.post("/user/", {
            name,
            email,
            password,
            username
        });

        return result;
    } catch (error: any) {
        if (error.response.data.code) {
            return error.response.data.code;
        }

        return errorTypes._500.user_nc;
    }
}