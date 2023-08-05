import { createStore } from 'effector'
import { fetchEventsFx } from '../api/events/fetchEvents'

export interface Event {
    dateTime: Date
    isAvailable: boolean
    id: number
    name?: string
    childName?: string
    disability: boolean
    grade?: number | null
    request?: string
    call?: boolean
    sms?: boolean
    messenger?: boolean
    phone?: string
    comment?: string
    userId?: number
}

interface EventStore {
    events: Event[] | []
    isLoading: boolean
}

const DEFAULT_STORE: EventStore = {
    events: [],
    isLoading: true,
}

export const $eventStore = createStore(DEFAULT_STORE).on(fetchEventsFx.doneData, (state, result) => ({
    ...state,
    events: result,
    isLoading: false,
}))
