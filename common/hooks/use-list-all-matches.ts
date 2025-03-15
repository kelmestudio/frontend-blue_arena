import { cookies } from "next/headers";
import { listAllMatches } from "../services/list-all-matches";
import toast from "react-hot-toast";
import { displayInitials } from "../lib/utils";

export default function useListAllMatches() {
    const execListAllMatches = async () => {
        const cookieStore = await cookies()

        const token = cookieStore.get('token');
        const session = cookieStore.get('session-code');

        const promise = listAllMatches({
            token: token ? token.value : '',
            session: session ? session.value : ''
        });

        return promise
            .then(result => {
                if (result.status === 200) {
                    return result.data.map((match: any) => {
                        return {
                            id: match.id,   
                            game_title: match.game_title,
                            date: new Date(match.date),
                            type: match.type,
                            prize: match.prize,
                            paid: match.paid,
                            host: {
                                id: match.host_id,
                                username: match.host.username,
                                initials: displayInitials(match.host.username)
                            },
                            status: match.status,
                        }
                    });
                }

                throw result;
            })
            .catch(() => {
                toast.error('No matches could be listed. If the problem persists, please contact support.');
                return [];
            })
    }

    return { execListAllMatches };
}