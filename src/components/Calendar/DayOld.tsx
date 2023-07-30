import React, { ChangeEvent, useState } from 'react'
import { styled } from 'styled-components'
import EventComponent from './Event'
import { useStore } from 'effector-react'
import { $isAuth } from '../../store/auth'
import { createEventFx } from '../../api/events/createEvent'
import Modal from '../shared/Modal'
import { Event } from '../../store/events'

type DayProps = {
    date: Date
    events: Event[]
    thisMonth: boolean
}

const Day: React.FC<DayProps> = ({ date, events, thisMonth }) => {
    const { isAuthenticated } = useStore($isAuth)

    const [isOpen, setIsOpen] = useState(false)
    const [eventStartTime, setEventStartTime] = useState(new Date().toString())
    const openModal = () => {
        setIsOpen(true)
    }

    const handleEventStartInput = (e: ChangeEvent<HTMLInputElement>) => {
        setEventStartTime(e.target.value.toString())
    }

    const createEvent = () => {
        createEventFx(eventStartTime.toString())
        setIsOpen(false)
    }

    return (
        <DayLayout $thisMonth={thisMonth}>
            <Modal title="Создание окна для занятия" isOpen={isOpen} setIsOpen={setIsOpen}>
                <h4>Выберите дату и время начала занятия:</h4>
                <input type="datetime-local" value={eventStartTime} onChange={handleEventStartInput}></input>
                <button onMouseDown={createEvent}>Создать</button>
            </Modal>
            <Events>
                {events.map((event) => (
                    <EventComponent key={event.id} event={event} />
                ))}
            </Events>
            <DayInfoPanel>
                {date.getDate() + '.' + date.getMonth()}
                {isAuthenticated && <AddEventButton onClick={openModal}>+</AddEventButton>}
            </DayInfoPanel>
        </DayLayout>
    )
}

interface Props {
    $thisMonth: boolean
}

const AddEventButton = styled.button`
    outline: 1px solid white;
    display: none;
    margin-top: 3em;
    padding: 5px;
    border-radius: 25%;
    background-color: transparent;
    color: white;
    cursor: pointer;
`

const DayLayout = styled.div<Props>`
    display: flex;
    justify-content: space-between;
    height: 100%;
    padding: 10px;
    outline: 1px solid #fb3640;
    background-color: ${(props) => props.$thisMonth && '#222222'};
    &:hover ${AddEventButton} {
        display: flex;
    }
`

const Events = styled.div`
    display: flex;
    width: 75%;
    flex-direction: column;
    gap: 0.5em;
`

const DayInfoPanel = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export default Day
