import { createEvent, createStore } from 'effector'
import { deleteEventFx } from '../api/events/deleteEvent'
import { logOut } from './userStore'

interface DeleteWindowStore {
    open: boolean
    eventId: number | null
    error: string
    action: (eventId: number) => void
}

const DEFAULT_STORE: DeleteWindowStore = {
    open: false,
    eventId: null,
    error: '',
    action: (eventId) => deleteEventFx(eventId),
}

export const setDeleteWindowOpen = createEvent<boolean>()
export const setEventId = createEvent<number>()

export const $deleteWindowStore = createStore<DeleteWindowStore>(DEFAULT_STORE)
    .on(setDeleteWindowOpen, (state, open) => ({
        ...state,
        open,
    }))
    .on(setEventId, (state, eventId) => ({
        ...state,
        eventId,
    }))
    .on(deleteEventFx.doneData, (state) => ({
        ...state,
        open: false,
        error: '',
    }))
    .on(deleteEventFx.failData, (state, error) => ({
        ...state,
        error: error.message,
    }))
    .on(logOut, () => {
        return DEFAULT_STORE
    })
