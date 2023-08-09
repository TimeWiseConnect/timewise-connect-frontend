import { createEvent, createStore } from 'effector'
import { clearEventFx } from '../api/events/clearEvent'
import { logOut } from './userStore'

interface ClearAppointmentStore {
    open: boolean
    error: string
    action: (eventId: number) => void
}

const DEFAULT_STORE: ClearAppointmentStore = {
    open: false,
    error: '',
    action: (eventId) => clearEventFx(eventId),
}

export const setClearAppointmentOpen = createEvent<boolean>()

export const $clearAppointmentStore = createStore<ClearAppointmentStore>(DEFAULT_STORE)
    .on(setClearAppointmentOpen, (state, open) => ({
        ...state,
        open,
    }))
    .on(clearEventFx.doneData, (state) => ({
        ...state,
        open: false,
        error: '',
    }))
    .on(clearEventFx.failData, (state, error) => ({
        ...state,
        error: error.message,
    }))
    .on(logOut, () => {
        return DEFAULT_STORE
    })
