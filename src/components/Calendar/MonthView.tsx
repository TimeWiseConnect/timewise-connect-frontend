import React from 'react'
import { styled } from 'styled-components'
import { Day } from './MonthDay'
import { useStore } from 'effector-react'
import { $calendarStore } from '../../store/calendar'
import { device } from '../../styles/const'

export const MonthView = () => {
    const { startDate } = useStore($calendarStore)
    const daysInView = 35

    const year = startDate.getUTCFullYear()
    const month = startDate.getUTCMonth()
    const date = startDate.getUTCDate()

    const days: Date[] = Array(daysInView)

    const startDay = new Date(year, month, 1).getDay() % 7
    for (let i = 0; i <= startDay; i++) days[startDay - i] = new Date(year, month, date - i)
    for (let i = 0; i < daysInView - startDay; i++) days[startDay + i] = new Date(year, month, date + i)

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

    @media ${device.mobileS} {
        width: 100%;
        height: 100vmin;
        grid-template-columns: repeat(7, calc(100% / 7));
        grid-auto-rows: calc(100vmin / 5);
    }

    @media ${device.tablet} {
        width: calc(100% * 3 / 4);
        height: 425px;
        grid-template-columns: repeat(7, calc(100% / 7));
        grid-auto-rows: 85px;
    }

    @media ${device.laptop} {
        width: 700px;
        height: 750px;
        grid-template-columns: repeat(7, 100px);
        grid-auto-rows: 150px;
    }
`
