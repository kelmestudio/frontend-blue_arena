import { cookies } from "next/headers";
import { selectAllChat } from "../actions/select-all-chat";
import toast from "react-hot-toast";

export default function useSelectAllChat() {
    const execSelectAllChat = async () => {
        const cookieStore = cookies();

        const token = cookieStore.get('token');
        const session = cookieStore.get('session-code');

        const promise = selectAllChat({
            token: token ? token.value : '',
            session: session ? session.value : ''
        });

        return promise
            .then(result => {
                if (!result){
                    throw 'Chats não carregados'
                }
                
                return result
            })
            .catch(() => {
                toast.error('No matches could be listed. If the problem persists, please contact support.');
                return [];
            })
    }

    return { execSelectAllChat };
}