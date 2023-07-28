export type UserResponse = {
    id: number
    phone: string
    name: string
}

export type AuthResponse = {
    token: string
    user: UserResponse
}
