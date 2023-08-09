import { createEvent, createStore } from 'effector'
import { formatDateToYYYYMMDD } from '../utils/dateTimeUtils'
import { createEventFx } from '../api/events/createEvent'
import { $calendarStore } from './calendar'
import { logOut } from './userStore'

interface AddWindowStore {
    open: boolean
    date: string
    time: string
    error: string
    action: (date: string, time: string) => void
}

const DEFAULT_STORE: AddWindowStore = {
    open: false,
    date: formatDateToYYYYMMDD(new Date()),
    time: '12:00',
    error: '',
    action: (date, time) => createEventFx(`${date}T${time}:00`),
}

export const setDate = createEvent<string>()
export const setTime = createEvent<string>()
export const setAddWindowOpen = createEvent<boolean>()

export const $addWindowStore = createStore<AddWindowStore>(DEFAULT_STORE)
    .on(setDate, (state, date) => ({
        ...state,
        date,
    }))
    .on(setTime, (state, time) => ({
        ...state,
        time,
    }))
    .on(setAddWindowOpen, (state, open) => ({
        ...state,
        open,
    }))
    .on(createEventFx.doneData, (state) => ({
        ...state,
        open: false,
        error: '',
    }))
    .on(createEventFx.failData, (state, error) => ({
        ...state,
        error: error.message,
    }))
    .on(logOut, () => {
        return DEFAULT_STORE
    })

$calendarStore.watch((state) => {
    setDate(formatDateToYYYYMMDD(state.choosenDate))
})
