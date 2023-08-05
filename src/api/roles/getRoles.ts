import { createEffect } from 'effector'
import { $authApi } from '..'

export const getRole = () => {
    return $authApi.get(`/auth/roles`)
}

export const getRoleFx = createEffect(async (): Promise<string> => {
    try {
        const { data } = await getRole()
        return data
    } catch (error) {
        console.log(error)

        throw new Error('Возникла какая-то ошибка')
    }
})
