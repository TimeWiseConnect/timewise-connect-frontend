import { createEvent, createStore } from 'effector'

type SidebarStatus = 'closed' | 'open'

export type SidebarStore = {
    closed: SidebarStatus
    registration: boolean
}

const DEFAULT_STORE: SidebarStore = {
    closed: 'closed',
    registration: false,
}

export const changeSidebarStatus = createEvent<SidebarStatus>()
export const setRegistration = createEvent<boolean>()

export const $sidebarStore = createStore<SidebarStore>(DEFAULT_STORE)
    .on(changeSidebarStatus, (state, closed) => ({
        ...state,
        registration: false,
        closed,
    }))
    .on(setRegistration, (state, registration) => ({
        ...state,
        registration,
    }))
