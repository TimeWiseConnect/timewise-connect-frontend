import React from 'react'
import { styled } from 'styled-components'
import { Day } from './MonthDay'
import { useStore } from 'effector-react'
import { $calendarStore } from '../../store/calendar'

export const MonthView = () => {
    const { startDate } = useStore($calendarStore)
    const daysInView = 35

    const year = startDate.getUTCFullYear()
    const month = startDate.getUTCMonth()
    const date = startDate.getUTCDate()

    const days: Date[] = Array(daysInView)
    for (let day = 0; day < daysInView; day++) {
        days[day] = new Date(year, month, date + day - 1)
    }
    return (
        <Layout>
            {days.map((day) => (
                <Day key={day.toISOString()} date={day} />
            ))}
        </Layout>
    )
}

const Layout = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 100px);
    grid-auto-rows: 149px;
    border-top: 1px solid ${(props) => props.theme.accent2};
    border-left: 1px solid ${(props) => props.theme.accent2};

    & > :first-child {
        background-color: ${(props) => props.theme.disable};
        color: ${(props) => props.theme.gray};
    }
    & > :first-child > * {
        cursor: default !important;
    }
`
