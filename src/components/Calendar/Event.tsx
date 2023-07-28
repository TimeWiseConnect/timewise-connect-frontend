import React from 'react'
import { styled } from 'styled-components'
import { Event } from '../../store/events'

type Props = { event: Event }

const EventComponent: React.FC<Props> = ({ event }) => {
    const eventEndTime: Date = new Date(event.dateTime)
    eventEndTime.setMinutes(eventEndTime.getMinutes() + 40)
    return (
        <EventLayout $isAvailable={event.isAvailable}>
            {`${event.dateTime.getHours()}:${event.dateTime.getMinutes()} - ${eventEndTime.getHours()}:${eventEndTime.getMinutes()}`}
        </EventLayout>
    )
}

type EventProps = {
    $isAvailable: boolean
}

const EventLayout = styled.div<EventProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => (props.$isAvailable ? '#FCFCFC' : '#101010')};
    color: ${(props) => (props.$isAvailable ? '#101010' : '#FCFCFC')};
    height: 1.5em;
    width: 100%;
    border-radius: 20px;
`

export default EventComponent
