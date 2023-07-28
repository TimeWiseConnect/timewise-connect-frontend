import { AuthResponse } from '.'
import { createEffect } from 'effector'
import { setJwtToken } from './lib/jwt'
import { $authApi } from '..'

export const checkAuth = () => {
    return $authApi.get('/auth')
}

export const checkAuthFx = createEffect(async (): Promise<AuthResponse> => {
    try {
        const { data } = await checkAuth()
        setJwtToken(data.token)
        return data
    } catch (error) {
        console.log(error)

        throw new Error('Возникла какая-то ошибка')
    }
})
