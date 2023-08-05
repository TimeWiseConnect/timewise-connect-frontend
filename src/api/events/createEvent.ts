import { createEffect } from 'effector'
import { $authApi } from '..'
import { fetchEventsFx } from './fetchEvents'

export const createEvent = (date: string) => {
    return $authApi.post('/events/add', { dateTime: date })
}

export const createEventFx = createEffect(async (date: string) => {
    try {
        await createEvent(date)
        fetchEventsFx()
    } catch (error) {
        console.log(error)

        throw new Error('Возникла какая-то ошибка')
    }
})
