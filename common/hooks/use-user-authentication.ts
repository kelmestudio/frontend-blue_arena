'use client'

import toast from "react-hot-toast";
import { errorTypes } from "@/common/lib/error-types"
import { IAuthenticateUser } from "@/@types/@user";
import { authenticateUser } from "../services/authenticate-user";
import { setCookie } from "cookies-next";

export default function useUserAuthentication() {
    const execUserAuthentication = async ({ username, password }: IAuthenticateUser) => {
        const promise = authenticateUser({
            username,
            password
        });

        return promise
            .then(async result => {
                if (
                    result.status &&
                    result.status === 200 &&
                    result.data.session_token
                ) {
                    await setCookie("session-code", result.data.session_id, {
                        maxAge: 60 * 60 * 24,
                    });

                    await setCookie("user", result.data.details.id, {
                        maxAge: 60 * 60 * 24,
                    });

                    await setCookie("token", result.data.session_token, {
                        maxAge: 60 * 60 * 24,
                    });

                    await setCookie("session_name", result.data.details.name, {
                        maxAge: 60 * 60 * 24,
                    });

                    return true;
                }

                switch (result) {
                    case errorTypes._401.user_username_nf:
                        toast.error('Username not found.');
                        break;
                    case errorTypes._401.user_password_in:
                        toast.error('Invalid password.');
                        break;
                    default:
                        toast.error('Login error. If the problem persists, please contact support.');
                }

                return false;
            })
            .catch((result) => {
                toast.error('Login error. If the problem persists, please contact support.');
                return false;
            })
    }

    return { execUserAuthentication };
}