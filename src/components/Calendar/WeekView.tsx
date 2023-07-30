import React from 'react'
import { styled } from 'styled-components'
import { Day } from './WeekDay'
import { useStore } from 'effector-react'
import { $calendarStore } from '../../store/calendar'
import { device } from '../../styles/const'

const WeekView = () => {
    const { startDate } = useStore($calendarStore)
    const daysInWeek = 7

    const year = startDate.getFullYear()
    const month = startDate.getMonth()
    const date = startDate.getDate()

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
    & > *:not(:last-child) {
        border-bottom: 1px solid ${(props) => props.theme.accent2};
    }

    @media ${device.mobileS} {
        width: calc((100% - 16px) / 2);
    }

    @media ${device.tablet} {
        width: calc(100% / 4);
    }

    @media ${device.laptop} {
        width: calc(100% / 5);
    }

    @media ${device.laptopL} {
        width: calc(100% / 7);
    }

    @media ${device.desktop} {
        width: calc(100% / 7);
    }
`
