import { createEffect } from 'effector'
import { $api } from '..'
import { setJwtToken } from './lib/jwt'
import axios from 'axios'

export type LogInRequest = {
    phone: string
}

export type RegistrationRequest = {
    phone: string
    name: string
}

type ValidateRequest = {
    phone: string
    code: string
}

const logIn = (req: LogInRequest | RegistrationRequest) => {
    return $api.post('/auth/login', req)
}

const validate = (req: ValidateRequest) => {
    return $api.post('/auth/validate', req)
}

export const makeACallFx = createEffect(async (req: LogInRequest | RegistrationRequest) => {
    try {
        await logIn(req)
    } catch (error) {
        console.log(error)
        if (axios.isAxiosError(error)) {
            if (error?.response) throw new Error(error?.response?.data.message)
            else throw new Error(error.message)
        } else throw new Error('Возникла какая-то ошибка. Попробуйте позже')
    }
})

export const validateFx = createEffect(async (req: ValidateRequest) => {
    try {
        const { data } = await validate(req)
        setJwtToken(data.token)
        return data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error?.response) throw new Error(error?.response?.data.message)
            else throw new Error(error.message)
        } else throw new Error('Возникла какая-то ошибка. Попробуйте позже')
    }
})
