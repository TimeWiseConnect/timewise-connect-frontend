import { createEffect } from 'effector'
import { $authApi } from '..'
import { fetchEventsFx } from './fetchEvents'
import axios from 'axios'

export const clearEvent = (id: number) => {
    return $authApi.post(`/events/clear/${id}`)
}

export const clearEventFx = createEffect(async (id: number) => {
    try {
        await clearEvent(id)
        fetchEventsFx()
    } catch (error) {
        console.log(error)
        if (axios.isAxiosError(error)) throw new Error(error?.response?.data.message)
        else throw new Error('Возникла какая-то ошибка. Попробуйте позже')
    }
})
