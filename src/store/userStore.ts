import { createStore, createEvent } from 'effector'
import { checkAuthFx } from '../api/auth/auth'
import { UserResponse } from '../api/auth'
import { setJwtToken } from '../api/auth/lib/jwt'
import { makeACallFx, validateFx } from '../api/auth/logIn'
import { getRoleFx } from '../api/roles/getRoles'
import { setRegistration } from './sidebar'

interface UserStore {
    phase: 0 | 1 | 2
    phone: string
    name: string
    currentUser: UserResponse | null
    isAuthenticated: boolean | null
    error: string | null
    role: string
}

const DEFAULT_STORE: UserStore = {
    phase: 1,
    phone: '',
    name: '',
    currentUser: null,
    error: null,
    isAuthenticated: false,
    role: '',
}

export const logOut = createEvent()
export const setAuthPhone = createEvent<string>()
export const setName = createEvent<string>()
export const setPhase = createEvent<1 | 2>()

export const $userStore = createStore<UserStore>(DEFAULT_STORE)
    .on(setAuthPhone, (state, phone) => ({
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
    .on(logOut, () => {
        setJwtToken('')
        return DEFAULT_STORE
    })
    .on(getRoleFx.doneData, (state, role) => ({
        ...state,
        role,
    }))
    .on(setRegistration, (state) => ({ ...state, error: null }))
