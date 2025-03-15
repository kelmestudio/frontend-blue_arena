export interface ICreateUser {
    name: string;
    email: string;
    username: string;
    password: string;
}

export interface IAuthenticateUser {
    username: string;
    password: string;
}

export interface IMeUser {
    token: string,
    session: string;
}