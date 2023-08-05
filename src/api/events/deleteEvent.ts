import { createEffect } from 'effector'
import { $authApi } from '..'
import { fetchEventsFx } from './fetchEvents'

export const deleteEvent = (id: number) => {
    return $authApi.delete(`/events/${id}`)
}

export const deleteEventFx = createEffect(async (id: number) => {
    try {
        await deleteEvent(id)
        fetchEventsFx()
    } catch (error) {
        console.log(error)

        throw new Error('Возникла какая-то ошибка')
    }
})
