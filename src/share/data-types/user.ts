export type UserType = {
    id: number,
    name: string
}

export type AuthResponseType = {
    session: {
        access_token: string,
    },
    data: UserType
}
