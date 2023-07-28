import { createEffect } from 'effector'
import { $authApi } from '..'
import { Event } from '../../store/events'

export const getEvents = () => {
    return $authApi.get('/events')
}

export const fetchEventsFx = createEffect(async (): Promise<Event[]> => {
    try {
        const { data } = await getEvents()
        return data.map((event: Event) => ({ ...event, dateTime: new Date(event.dateTime) }))
    } catch (error) {
        console.log(error)

        throw new Error('Возникла какая-то ошибка')
    }
})
