import { createStore, createEvent } from 'effector'
import { checkAuthFx } from '../api/auth/auth'
import { UserResponse } from '../api/auth'
import { setJwtToken } from '../api/auth/lib/jwt'
import { makeACallFx, validateFx } from '../api/auth/logIn'

interface UserStore {
    phase: 0 | 1 | 2
    phone: string
    currentUser: UserResponse | null
    isAuthenticated: boolean | null
    error: string | null
}

const DEFAULT_STORE: UserStore = {
    phase: 1,
    phone: '',
    currentUser: null,
    error: null,
    isAuthenticated: false,
}

export const logOut = createEvent()
export const setPhone = createEvent<string>()
export const setPhase = createEvent<1 | 2>()

export const $authStore = createStore<UserStore>(DEFAULT_STORE)
    .on(setPhone, (state, phone) => ({
        ...state,
        phone,
    }))
    .on(setPhase, (state, phase) => ({
        ...state,
        phase,
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
    .on(makeACallFx.doneData, (state) => ({
        ...state,
        phase: 2,
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
        }
    })
