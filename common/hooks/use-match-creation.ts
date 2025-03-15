import toast from "react-hot-toast";
import { errorTypes } from "@/common/lib/error-types"
import { createMatch } from "../services/create-match";
import { ICreateMach } from "@/@types/@match";
import { getCookie } from "cookies-next";

export default function useMatchCreation() {
    const execMatchCreation = async ({ date, game_title, prize, type }: ICreateMach) => {
        const token = getCookie('token') as string;
        const session = getCookie('session-code') as string;

        const promise = createMatch({
            date,
            game_title,
            prize,
            type: +type,
            token: token,
            session: session
        });

        return promise
            .then(result => {
                if (
                    result.status &&
                    result.status === 201
                ) {
                    toast.success('Match created successfully.');
                    return result.data;
                }

                toast.error('Unable to create your match. Please try again, and if the problem persists, contact support.');
                return false;
            })
            .catch((result) => {
                toast.error('Unable to create your match. Please try again, and if the problem persists, contact support.');
                return false;
            })
    }

    return { execMatchCreation }
}