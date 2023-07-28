import React, { useEffect } from 'react'
import { styled } from 'styled-components'
import { areDatesEqual, getDaysInMonth } from '../utils/dateTimeUtils'
import { $eventStore } from '../store/events'
import { useEvent, useStore } from 'effector-react'
import { fetchEventsFx } from '../api/events/fetchEvents'
import Day from '../components/Calendar/Day'

const Calendar: React.FC = () => {
    const today = new Date()
    // today.setDate(today.getDate() + 30)
    // console.log('today', today)

    const year = today.getUTCFullYear()
    const month = today.getUTCMonth()

    const daysInMonth = getDaysInMonth(year, month)
    const startDay = new Date(year, month, 1).getDay() % 7
    const days: Date[] = Array(42)

    let daysFromPrevMonth = startDay - 1
    if (daysFromPrevMonth < 0) daysFromPrevMonth = 6
    const daysInPreviousMonth = getDaysInMonth(year, month - 1)
    for (let i = 0; i < daysFromPrevMonth; i++)
        days[i] = new Date(year, month - 1, daysInPreviousMonth - daysFromPrevMonth + i + 1)

    for (let day = 0; day <= daysInMonth; day++) {
        days[daysFromPrevMonth + day] = new Date(year, month, day + 1)
    }
    const totalCells = 42

    const daysFromNextMonth = totalCells - daysFromPrevMonth - daysInMonth
    for (let day = 0; day < daysFromNextMonth; day++) {
        days[daysFromPrevMonth + daysInMonth + day] = new Date(year, month + 1, day + 1)
    }
    const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

    useEffect(() => {
        fetchEvent()
    }, [])

    const { events } = useStore($eventStore)
    const fetchEvent = useEvent(fetchEventsFx)

    return (
        <CalendarGrid>
            {daysOfWeek.map((day) => (
                <DayOfWeek key={day}>{day}</DayOfWeek>
            ))}
            {days.map((day, index) => (
                <Day
                    key={day.toISOString()}
                    date={day}
                    events={events?.filter((event) => areDatesEqual(event.dateTime, day))}
                    thisMonth={index < daysFromPrevMonth || index >= daysFromPrevMonth + daysInMonth}
                />
            ))}
        </CalendarGrid>
    )
}

const CalendarGrid = styled.div`
    display: grid;
    height: 95%;
    width: 95%;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: 40px repeat(6, 1fr);
    gap: 8px;
`

const DayOfWeek = styled.div`
    display: flex;
    justify-content: end;
    background-color: #222222;
    padding: 10px;
`
export default Calendar
