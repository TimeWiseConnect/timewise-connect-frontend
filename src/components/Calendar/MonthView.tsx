import React from 'react'
import { styled } from 'styled-components'
import { Day } from './MonthDay'
import { useStore } from 'effector-react'
import { $calendarStore } from '../../store/calendar'
import { device } from '../../styles/const'

export const MonthView = () => {
    const { startDate, choosenDate } = useStore($calendarStore)
    const daysInView = 35

    const year = startDate.getUTCFullYear()
    const month = startDate.getUTCMonth()
    const date = startDate.getUTCDate()
    console.log(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()))
    console.log(new Date(choosenDate.getFullYear(), choosenDate.getMonth(), choosenDate.getDate()))

    const days: Date[] = Array(daysInView)

    let startDay = (new Date(year, month, date).getDay() % 7) - 1
    if (startDay < 0) startDay = 6
    for (let i = 0; i <= startDay; i++) days[startDay - i] = new Date(year, month, date - i)
    for (let i = 0; i < daysInView - startDay; i++) days[startDay + i] = new Date(year, month, date + i)

    const weekDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']

    return (
        <Layout>
            {weekDays.map((day) => (
                <WeekDay key={day}>{day}</WeekDay>
            ))}
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
        height: calc(100vmin + 24px);
        grid-template-columns: repeat(7, calc(100% / 7));
        grid-template-rows: 24px repeat(5, calc(100vmin / 5));
    }

    @media ${device.tablet} {
        width: calc(100% * 3 / 4);
        height: 425px;
        grid-template-columns: repeat(7, calc(100% / 7));
        grid-template-rows: 24px repeat(5, 85px);
    }

    @media ${device.laptop} {
        width: 700px;
        height: 774px;
        grid-template-columns: repeat(7, 100px);
        grid-template-rows: 24px repeat(5, 150px);
    }
`

const WeekDay = styled.div`
    color: ${(props) => props.theme.gray};
    display: flex;
    align-items: center;
    justify-content: center;

    @media ${device.mobileS} {
        font-size: 13px;
        margin-bottom: 10px;
    }

    @media ${device.tablet} {
        font-size: 13px;
        margin-bottom: 10px;
    }

    @media ${device.laptop} {
        font-size: 13px;
        margin-bottom: 10px;
    }
`
