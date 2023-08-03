import { createEffect } from 'effector'
import { $api } from '..'
import { setJwtToken } from './lib/jwt'

export type LogInRequest = {
    phone: string
}

type ValidateRequest = {
    phone: string
    code: string
}

const logIn = (req: LogInRequest) => {
    return $api.post('/auth/login', req)
}

const validate = (req: ValidateRequest) => {
    return $api.post('/auth/validate', req)
}

export const makeACallFx = createEffect(async (req: LogInRequest) => {
    try {
        await logIn(req)
    } catch (error) {
        console.log(error)

        throw new Error('Возникла какая-то ошибка')
    }
})

export const validateFx = createEffect(async (req: ValidateRequest) => {
    try {
        const { data } = await validate(req)
        setJwtToken(data.token)
        return data
    } catch (error) {
        console.log(error)

        throw new Error('Возникла какая-то ошибка')
    }
})
