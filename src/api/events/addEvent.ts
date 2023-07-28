import { createEffect } from 'effector'
import { $authApi } from '..'
import { Event } from '../../store/events'
import { fetchEventsFx } from './fetchEvents'

type addEventRequest = {
    phone: string
    request: string
    name: string
    childAge: number
}

export const addEvent = (data: addEventRequest, id: number) => {
    return $authApi.post(`/events/${id}`, data)
}

export const addEventFx = createEffect(async (reqBody: addEventRequest, id: number): Promise<Event[]> => {
    try {
        const { data } = await addEvent(reqBody, id)
        fetchEventsFx()
        return data.map((event: Event) => ({ ...event, dateTime: new Date(event.dateTime) }))
    } catch (error) {
        console.log(error)

        throw new Error('Возникла какая-то ошибка')
    }
})
