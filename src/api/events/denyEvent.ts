import { createEffect } from 'effector'
import { $authApi } from '..'
import { Event } from '../../store/events'
import { fetchEventsFx } from './fetchEvents'

export const denyEvent = (id: number) => {
    return $authApi.post(`/events/deny${id}`)
}

export const denyEventFx = createEffect(async (id: number): Promise<Event[]> => {
    try {
        const { data } = await denyEvent(id)
        fetchEventsFx()
        return data.map((event: Event) => ({ ...event, dateTime: new Date(event.dateTime) }))
    } catch (error) {
        console.log(error)

        throw new Error('Возникла какая-то ошибка')
    }
})
