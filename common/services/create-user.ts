import { ICreateUser } from "@/@types/@user";
import api from "../lib/api";
import { errorTypes } from "../lib/error-types";

export const createUser = async ({ email, password, username }: ICreateUser) => {
    try {
        const result = await api.post("/user/", {
            email,
            password,
            username
        });

        console.log(result)
    } catch (error) {
        return errorTypes._500.user_nc;
    }
}