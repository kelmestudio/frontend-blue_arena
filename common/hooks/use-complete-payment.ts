import { cookies } from "next/headers";
import toast from "react-hot-toast";
import { completePayment } from "../services/complete-match-payment";

export default function useCompletePayment() {
    const execCompletePayment = async (matchId: number) => {
        const cookieStore = await cookies()

        const token = cookieStore.get('token');
        const session = cookieStore.get('session-code');

        const promise = completePayment({
            matchId,
            token: token ? token.value : '',
            session: session ? session.value : ''
        });

        return promise
            .then(result => {
                if (result.status === 200) {
                    return true;
                }

                throw result;
            })
            .catch(() => {
                toast.error('Your payment could not be completed. Please contact support.');
                return [];
            })
    }

    return { execCompletePayment };
}