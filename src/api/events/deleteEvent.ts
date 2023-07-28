import { createEffect } from 'effector'
import { $authApi } from '..'
import { Event } from '../../store/events'
import { fetchEventsFx } from './fetchEvents'

export const deleteEvent = (id: number) => {
    return $authApi.delete(`/events/${id}`)
}

export const deleteEventFx = createEffect(async (id: number): Promise<Event[]> => {
    try {
        const { data } = await deleteEvent(id)
        fetchEventsFx()
        return data.map((event: Event) => ({ ...event, dateTime: new Date(event.dateTime) }))
    } catch (error) {
        console.log(error)

        throw new Error('Возникла какая-то ошибка')
    }
})
