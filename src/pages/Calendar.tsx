import React from 'react'
import { ViewSelector } from '../components/Calendar/ViewSelector'
import { styled } from 'styled-components'
import { device } from '../styles/const'
import { TimeSelector } from '../components/Calendar/TimeSelector'
import WeekView from '../components/Calendar/WeekView'
import { MonthView } from '../components/Calendar/MonthView'
import { useStore } from 'effector-react'
import { $calendarStore, SwitcherType } from '../store/calendar'
import { AppointmentForm } from '../components/Form/AppointmentForm'
import { getMonth } from '../utils/dateTimeUtils'

export const Calendar = () => {
    const { view, choosenDate } = useStore($calendarStore)
    const { startDate } = useStore($calendarStore)
    const daysInView = 35

    const year = startDate.getUTCFullYear()
    const month = startDate.getUTCMonth()
    const date = startDate.getUTCDate()
    return (
        <Layout>
            <Header>
                Для записи к{'\u00A0'}педагогу выберите дату и{'\u00A0'}время
            </Header>
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
                {!!choosenDate.getHours() && <AppointmentForm />}
            </MainContainer>
        </Layout>
    )
}

const Layout = styled.div`
    color: ${(props) => props.theme.main};
    width: 100%;

    @media ${device.mobileS} {
        padding: 10px 16px;
    }

    @media ${device.tablet} {
        padding: 60px 70px;
    }

    @media ${device.laptop} {
        padding: 60px 28px;
    }

    @media ${device.laptopL} {
        padding: 40px 100px;
    }

    @media ${device.desktop} {
        padding: 40px 329px;
    }
`

const Header = styled.h1`
    color: ${(props) => props.theme.main};
    font-weight: 400;
    @media ${device.mobileS} {
        font-size: 14px;
        margin-bottom: 30px;
    }

    @media ${device.tablet} {
        font-size: 20 px;
        margin-bottom: 40px;
    }

    @media ${device.laptop} {
        font-size: 26px;
    }
`

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
