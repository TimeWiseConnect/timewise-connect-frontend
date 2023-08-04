import { createStore, createEvent } from 'effector'
import { checkAuthFx } from '../api/auth/auth'
import { UserResponse } from '../api/auth'
import { setJwtToken } from '../api/auth/lib/jwt'
import { makeACallFx, validateFx } from '../api/auth/logIn'

interface UserStore {
    phase: 0 | 1 | 2
    phone: string
    name: string
    currentUser: UserResponse | null
    isAuthenticated: boolean | null
    error: string | null
    registration: boolean
}

const DEFAULT_STORE: UserStore = {
    phase: 1,
    phone: '',
    name: '',
    currentUser: null,
    error: null,
    isAuthenticated: false,
    registration: false,
}

export const logOut = createEvent()
export const setPhone = createEvent<string>()
export const setName = createEvent<string>()
export const setPhase = createEvent<1 | 2>()
export const setRegistration = createEvent<boolean>()

export const $authStore = createStore<UserStore>(DEFAULT_STORE)
    .on(setPhone, (state, phone) => ({
        ...state,
        phone,
    }))
    .on(setName, (state, name) => ({
        ...state,
        name,
    }))
    .on(setPhase, (state, phase) => ({
        ...state,
        phase,
        error: null,
    }))
    .on(checkAuthFx.doneData, (state, result) => ({
        ...state,
        isAuthenticated: true,
        currentUser: result.user,
    }))
    .on(checkAuthFx.failData, (state, error) => ({
        ...state,
        isAuthenticated: false,
        error: error.message,
    }))
    .on(setRegistration, (state, registration) => {
        return {
            ...state,
            registration,
            error: null,
        }
    })
    .on(makeACallFx.doneData, (state) => ({
        ...state,
        phase: 2,
        error: null,
    }))
    .on(makeACallFx.failData, (state, error) => ({
        ...state,
        error: error.message,
    }))
    .on(validateFx.doneData, (state, data) => ({
        ...state,
        phase: 0,
        currentUser: data.user,
        error: null,
        registration: false,
        isAuthenticated: true,
    }))
    .on(validateFx.failData, (state, error) => ({
        ...state,
        error: error.message,
    }))
    .on(logOut, (state) => {
        setJwtToken('')
        return {
            ...state,
            phase: 1,
            isAuthenticated: false,
            currentUser: null,
            error: null,
            registration: false,
        }
    })
