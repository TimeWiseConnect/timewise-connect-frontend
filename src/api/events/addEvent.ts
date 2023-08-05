import { createEffect } from 'effector'
import { $authApi } from '..'
import { Event } from '../../store/events'
import { fetchEventsFx } from './fetchEvents'

type addEventRequest = {
    phone: string
    request: string
    name: string
    childName?: string
    grade: number
    disability: boolean
    call: boolean
    sms: boolean
    messenger: boolean
    comment?: string
}

export const addEvent = (data: addEventRequest, id: number) => {
    return $authApi.post(`/events/${id}`, data)
}

export const addEventFx = createEffect(
    async ({ reqBody, id }: { reqBody: addEventRequest; id: number }): Promise<Event> => {
        try {
            const { data } = await addEvent(reqBody, id)
            fetchEventsFx()
            return data
        } catch (error) {
            console.log(error)

            throw new Error('Возникла какая-то ошибка')
        }
    },
)
