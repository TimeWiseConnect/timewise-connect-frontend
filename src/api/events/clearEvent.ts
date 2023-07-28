import { createEffect } from 'effector'
import { $authApi } from '..'
import { Event } from '../../store/events'
import { fetchEventsFx } from './fetchEvents'

export const clearEvent = (id: number) => {
    return $authApi.post(`/events/clear/${id}`)
}

export const clearEventFx = createEffect(async (id: number): Promise<Event[]> => {
    try {
        const { data } = await clearEvent(id)
        fetchEventsFx()
        return data.map((event: Event) => ({ ...event, dateTime: new Date(event.dateTime) }))
    } catch (error) {
        console.log(error)

        throw new Error('Возникла какая-то ошибка')
    }
})
