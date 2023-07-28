import { createStore } from 'effector'
import { fetchEventsFx } from '../api/events/fetchEvents'
import { createEventFx } from '../api/events/createEvent'
import { useEvent } from 'effector-react'

export interface Event {
    id: number
    dateTime: Date
    isAvailable: boolean
    name?: string
    isApproved?: boolean
    request?: string
    phone?: string
    childAge?: number
}

interface EventStore {
    events: Event[] | []
    isLoading: boolean
}

const DEFAULT_STORE: EventStore = {
    events: [],
    isLoading: true,
}

export const $eventStore = createStore(DEFAULT_STORE)
    .on(fetchEventsFx.doneData, (state, result) => ({
        ...state,
        events: result,
        isLoading: false,
    }))
    .on(createEventFx.doneData, (state, result) => ({
        ...state,
        events: result,
    }))
