import React from 'react'
import { ViewSelector } from '../components/Calendar/ViewSelector'
import { styled } from 'styled-components'
import { device } from '../styles/const'
import { TimeSelector } from '../components/Calendar/TimeSelector'
import WeekView from '../components/Calendar/WeekView'
import { MonthView } from '../components/Calendar/MonthView'
import { useStore } from 'effector-react'
import { $calendarStore, SwitcherType } from '../store/calendar'

export const Calendar = () => {
    const { view } = useStore($calendarStore)
    return (
        <Layout>
            <Header>
                Для записи к{'\u00A0'}педагогу выберите дату и{'\u00A0'}время
            </Header>
            <ViewSelector />
            <Container $view={view}>
                <>
                    {view === 'week' ? <WeekView /> : <MonthView />}
                    <TimeSelector />
                </>
            </Container>
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

const Container = styled.div<Props>`
    @media ${device.mobileS} {
        ${(props) =>
            props.$view === 'week'
                ? `
    display: flex;
    width: 100%;
    gap: 16px;`
                : ``}
    }

    @media ${device.tablet} {
        display: flex;
        width: 100%;
        gap: 16px;
    }
`
