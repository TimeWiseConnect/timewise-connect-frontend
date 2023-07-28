import { createStore, createEvent } from 'effector'
import { checkAuthFx } from '../api/auth/auth'
import { UserResponse } from '../api/auth'
import { setJwtToken } from '../api/auth/lib/jwt'
import { logInFx } from '../api/auth/logIn'

interface UserStore {
    currentUser: UserResponse | null
    isAuthenticated: boolean | null
    error: string | null
    isLoading: boolean
}

const DEFAULT_STORE: UserStore = {
    currentUser: null,
    error: null,
    isAuthenticated: false,
    isLoading: true,
}

export const logOut = createEvent()
export const setLoadingFalse = createEvent()

export const $isAuth = createStore(DEFAULT_STORE)
    .on(checkAuthFx.doneData, (state, result) => ({
        ...state,
        isAuthenticated: true,
        currentUser: result.user,
        isLoading: false,
    }))
    .on(checkAuthFx.failData, (state, error) => ({
        ...state,
        isAuthenticated: false,
        error: error.message,
        isLoading: false,
    }))
    .on(setLoadingFalse, (state) => {
        return {
            ...state,
            isAuthenticated: false,
            isLoading: false,
        }
    })
    .on(logInFx.doneData, (state, result) => ({
        ...state,
        isAuthenticated: true,
        currentUser: result.user,
        isLoading: false,
    }))
    .on(logInFx.failData, (state, error) => ({
        ...state,
        isAuthenticated: false,
        error: error.message,
        isLoading: false,
    }))
    .on(logOut, (state) => {
        setJwtToken('')
        return {
            ...state,
            isAuthenticated: false,
            currentUser: null,
        }
    })
