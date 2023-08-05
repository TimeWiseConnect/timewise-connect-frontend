import { createEffect } from 'effector'
import { $api } from '..'
import { setJwtToken } from './lib/jwt'
import axios from 'axios'

export type LogInRequest = {
    type: 'LogIn'
    phone: string
}

export type RegistrationRequest = {
    type: 'Registration'
    phone: string
    name: string
}

type ValidateRequest = {
    phone: string
    code: string
}

const logIn = (req: LogInRequest) => {
    return $api.post('/auth/login', req)
}

const reg = (req: RegistrationRequest) => {
    return $api.post('/auth/reg', req)
}

const validate = (req: ValidateRequest) => {
    return $api.post('/auth/validate', req)
}

export const makeACallFx = createEffect(async (req: LogInRequest | RegistrationRequest) => {
    try {
        switch (req.type) {
            case 'LogIn':
                await logIn(req)
                break
            case 'Registration':
                await reg(req)
                break
        }
    } catch (error) {
        console.log(error)
        if (axios.isAxiosError(error)) throw new Error(error?.response?.data.message)
        else throw new Error('Возникла какая-то ошибка. Попробуйте позже')
    }
})

export const validateFx = createEffect(async (req: ValidateRequest) => {
    try {
        const { data } = await validate(req)
        setJwtToken(data.token)
        return data
    } catch (error) {
        console.log(error)
        if (axios.isAxiosError(error)) throw new Error(error?.response?.data.message)
        else throw new Error('Возникла какая-то ошибка. Попробуйте позже')
    }
})
