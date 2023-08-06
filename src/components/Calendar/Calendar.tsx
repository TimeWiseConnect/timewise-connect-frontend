import React from 'react'
import { device } from '../../styles/const'
import { styled } from 'styled-components'
import { $calendarStore, SwitcherType } from '../../store/calendar'
import { ViewSelector } from './ViewSelector'
import { useStore } from 'effector-react'
import { getMonth } from '../../utils/dateTimeUtils'
import WeekView from './WeekView'
import { MonthView } from './MonthView'
import { TimeSelector } from './TimeSelector'
import { AppointmentForm } from '../Form/AppointmentForm'
import { $authStore } from '../../store/auth'

export const Calendar = () => {
    const { view, choosenDate, startDate } = useStore($calendarStore)
    const { role } = useStore($authStore)
    const daysInView = 35

    const year = startDate.getUTCFullYear()
    const month = startDate.getUTCMonth()
    const date = startDate.getUTCDate()

    return (
        <>
            <Row $view={view}>
                <ViewSelector />
                {view === 'month' && (
                    <Month>
                        {getMonth(new Date(year, month, date - (new Date(year, month, 1).getDay() % 7)))}
                        {' – '}
                        {getMonth(new Date(year, month, date + daysInView - (new Date(year, month, 1).getDay() % 7)))}
                    </Month>
                )}
            </Row>
            <MainContainer>
                <Container $view={view}>
                    {view === 'week' ? <WeekView /> : <MonthView />}
                    <TimeSelector />
                </Container>
                {role !== 'ADMIN' && !!choosenDate.getHours() && <AppointmentForm />}
            </MainContainer>
        </>
    )
}

type Props = {
    $view: SwitcherType
}

const MainContainer = styled.div`
    @media ${device.mobileS} {
        display: flex;
        flex-direction: column;
    }
    @media ${device.tablet} {
        flex-direction: row;
        width: 100%;
        gap: 16px;
    }
`

const Container = styled.div<Props>`
    @media ${device.mobileS} {
        ${(props) =>
            props.$view === 'week'
                ? `
      display: flex;
      flex-direction: row;
      width: 100%;
      gap: 16px;`
                : ``}
    }

    @media ${device.tablet} {
        width: 100%;
        display: flex;
        gap: 16px;
    }

    @media ${device.laptopL} {
        width: ${(props) => (props.$view === 'week' ? `calc(100% / 7 * 2)` : `950px`)};
    }
`

const Month = styled.div`
    color: ${(props) => props.theme.main};

    @media ${device.mobileS} {
        font-size: 12px;
        line-height: 140%;
    }
    @media ${device.tablet} {
        font-size: 14px;
        line-height: 130%;
    }
    @media ${device.laptop} {
        font-size: 16px;
    }
`

const Row = styled.div<Props>`
    display: flex;
    justify-content: space-between;

    @media ${device.mobileS} {
        width: 100%;
    }

    @media ${device.tablet} {
        width: ${(props) => (props.$view === 'week' ? '100%' : 'calc(100% * 3 / 4)')};
    }

    @media ${device.laptop} {
        width: ${(props) => (props.$view === 'week' ? '100%' : '700px')};
    }
`
