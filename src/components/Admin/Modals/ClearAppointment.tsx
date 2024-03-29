import React from 'react'
import Modal from '../../shared/Modal'
import { useStore } from 'effector-react'
import { $clearAppointmentStore, setClearAppointmentOpen } from '../../../store/clearAppointment'
import { clearEventFx } from '../../../api/events/clearEvent'

export const ClearAppointment = () => {
    const { open, eventId } = useStore($clearAppointmentStore)

    return (
        <Modal
            title="Вы точно хотите очистить запись?"
            isOpen={open}
            setIsOpen={setClearAppointmentOpen}
            agree="Да"
            disagree="Нет"
            action={() => {
                eventId && clearEventFx(eventId)
            }}
        />
    )
}
