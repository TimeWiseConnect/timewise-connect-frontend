import { createEffect } from 'effector'
import { $authApi } from '..'
import { Event } from '../../store/events'
import { fetchEventsFx } from './fetchEvents'

export const createEvent = (date: string) => {
    return $authApi.post('/events/add', { dateTime: date })
}

export const createEventFx = createEffect(async (date: string): Promise<Event[]> => {
    try {
        const { data } = await createEvent(date)
        fetchEventsFx()
        return data.map((event: Event) => ({ ...event, dateTime: new Date(event.dateTime) }))
    } catch (error) {
        console.log(error)

        throw new Error('Возникла какая-то ошибка')
    }
})
