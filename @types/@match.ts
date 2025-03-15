export interface IMatch {
    id: number;
    game_title: string;
    date: Date;
    type: number;
    prize: number;
    host: {
        id: number;
        username: string;
        initials: string;
    }
    status: number;
    paid: boolean;
}

export interface ICreateMach {
    game_title: string;
    date: Date;
    type: number;
    prize: number;
}

export enum EMatchType {
    solo = 1,
    team = 2
}

export enum EMatchStatus {
    pending_approval = 1,
    waiting_for_players = 2,
    in_progress = 3,
    finished = 4,
    canceled = 5,
    dispute  = 6
}

export interface IListAllMatches {
    token: string,
    session: string;
}