import React from 'react'
import { styled } from 'styled-components'
import { Day } from './WeekDay'
import { useStore } from 'effector-react'
import { $calendarStore } from '../../store/calendar'

const WeekView = () => {
    const { startDate } = useStore($calendarStore)
    const daysInWeek = 7

    const year = startDate.getUTCFullYear()
    const month = startDate.getUTCMonth()
    const date = startDate.getUTCDate()

    const days: Date[] = Array(7)
    for (let day = 0; day < daysInWeek; day++) {
        days[day] = new Date(year, month, date + day)
    }
    return (
        <Layout>
            {days.map((day) => (
                <Day key={day.toISOString()} date={day} />
            ))}
        </Layout>
    )
}

export default WeekView

const Layout = styled.div`
    width: 229px;

    & > *:not(:last-child) {
        border-bottom: 1px solid ${(props) => props.theme.accent2};
    }
`
