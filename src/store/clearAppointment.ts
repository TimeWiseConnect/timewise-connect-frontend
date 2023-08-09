import { createEvent, createStore } from 'effector'
import { clearEventFx } from '../api/events/clearEvent'
import { logOut } from './userStore'

interface ClearAppointmentStore {
    open: boolean
    eventId: number | null
    error: string
    action: (eventId: number) => void
}

const DEFAULT_STORE: ClearAppointmentStore = {
    open: false,
    eventId: null,
    error: '',
    action: (eventId) => clearEventFx(eventId),
}

export const setClearAppointmentOpen = createEvent<boolean>()
export const setClearAppointmentId = createEvent<number>()

export const $clearAppointmentStore = createStore<ClearAppointmentStore>(DEFAULT_STORE)
    .on(setClearAppointmentOpen, (state, open) => ({
        ...state,
        open,
    }))
    .on(setClearAppointmentId, (state, eventId) => ({
        ...state,
        eventId,
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
