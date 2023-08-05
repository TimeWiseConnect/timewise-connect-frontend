import { createEvent, createStore } from 'effector'
import { deleteEventFx } from '../api/events/deleteEvent'

interface DeleteWindowStore {
    open: boolean
    error: string
    action: (eventId: number) => void
}

const DEFAULT_STORE: DeleteWindowStore = {
    open: false,
    error: '',
    action: (eventId) => deleteEventFx(eventId),
}

export const setDeleteWindowOpen = createEvent<boolean>()

export const $deleteWindowStore = createStore<DeleteWindowStore>(DEFAULT_STORE)
    .on(setDeleteWindowOpen, (state, open) => ({
        ...state,
        open,
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
