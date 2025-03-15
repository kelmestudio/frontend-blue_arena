import { getCookie } from "cookies-next/client";
import { meUser } from "../services/me-user";
import { cookies } from "next/headers";

export default function useMeUser() {
    const execMeUser = async () => {
        const cookieStore = await cookies()

        const token = cookieStore.get('token');
        const session = cookieStore.get('session-code');

        const promise = meUser({
            token: token ? token.value : '',
            session: session ? session.value : ''
        });

        return promise
            .then(result => {
                if (result.status === 200) {
                    return result.data;
                }

                return false;
            })
            .catch((result) => {
                return false;
            })
    }

    return { execMeUser }
}