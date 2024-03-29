import React from 'react'
import Modal from '../../shared/Modal'
import { $deleteWindowStore, setDeleteWindowOpen } from '../../../store/deleteWindow'
import { useStore } from 'effector-react'
import { deleteEventFx } from '../../../api/events/deleteEvent'

export const DeleteWindow = () => {
    const { open, eventId } = useStore($deleteWindowStore)

    return (
        <Modal
            title="Вы точно хотите закрыть окно для записи?"
            isOpen={open}
            setIsOpen={setDeleteWindowOpen}
            agree="Да"
            disagree="Нет"
            action={() => {
                eventId && deleteEventFx(eventId)
            }}
        />
    )
}
