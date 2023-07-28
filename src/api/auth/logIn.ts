import { AuthResponse } from '.'
import { createEffect } from 'effector'
import { setJwtToken } from './lib/jwt'
import { $api } from '..'

export type LogInRequest = {
    phone: string
    password: string
}

export const logIn = (req: LogInRequest) => {
    return $api.post('/auth/login', req)
}

export const logInFx = createEffect(async (req: LogInRequest): Promise<AuthResponse> => {
    try {
        const { data } = await logIn(req)
        setJwtToken(data.token)
        return data
    } catch (error) {
        console.log(error)

        throw new Error('Возникла какая-то ошибка')
    }
})
