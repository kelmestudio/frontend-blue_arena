export interface IChat {
    chat_id: string,
    user_type: string,
    host: {
        id: number,
        username: string,
        avatar: string,
    },
    player: {
        id: number,
        username: string,
        name: string
    },
    match: {
        id: number,
        status: number,
        game_title: string,
        prize: number,
        date: string,
        type: number,
    },
    messages: []
}