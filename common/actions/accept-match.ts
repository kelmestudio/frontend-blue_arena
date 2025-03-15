'use server'

import { IMatch } from "@/@types/@match";
import { cookies } from 'next/headers';
import { acceptMatch as acceptMatchService } from '../services/accept-match';

export async function acceptMatch(match: IMatch) {
    const cookieStore = cookies();
    const token = cookieStore.get('token');
    const session = cookieStore.get('session-code');

    return acceptMatchService({
        matchId: match.id,
        hostId: match.host.id,
        token: token ? token.value : '',
        session: session ? session.value : ''
    });
}