import { createEvent, createStore } from 'effector'

export type SwitcherType = 'week' | 'month'

export type Calendar = {
    view: SwitcherType
    choosenDate: Date
    startDate: Date
}

const DEFAULT_STORE: Calendar = {
    view: (localStorage.getItem('view') as SwitcherType) || 'week',
    choosenDate: new Date(),
    startDate: new Date(),
}

export const chooseDate = createEvent<Date>()
export const changeView = createEvent<SwitcherType>()

export const $calendarStore = createStore<Calendar>(DEFAULT_STORE)
    .on(chooseDate, (oldState, choosenDate) => ({
        ...oldState,
        choosenDate,
    }))
    .on(changeView, (oldState, view) => ({
        ...oldState,
        view,
    }))
