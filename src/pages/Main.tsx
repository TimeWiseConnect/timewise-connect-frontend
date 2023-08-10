import React, { useEffect } from 'react'
import { styled } from 'styled-components'
import { device } from '../styles/const'
import { useStore } from 'effector-react'
import { WindowSwitch } from '../components/Admin/WindowSwitch'
import { $windowStore } from '../store/window'
import { Calendar } from '../components/Calendar/Calendar'
import { Appointments } from '../components/Appointments/Appointments'
import { fetchEventsFx } from '../api/events/fetchEvents'
import { $userStore } from '../store/userStore'
import { $sidebarStore } from '../store/sidebar'

export const Main = () => {
    const { role } = useStore($userStore)
    const window = useStore($windowStore)
    const closed = useStore($sidebarStore).closed === 'closed'

    useEffect(() => {
        fetchEventsFx()
    }, [])

    return (
        <Layout $collapsed={closed}>
            {role === 'ADMIN' ? (
                <WindowSwitch />
            ) : (
                <Header>
                    Для записи к{'\u00A0'}педагогу выберите дату и{'\u00A0'}время
                </Header>
            )}
            {window === 'management' && <Calendar />}
            {role === 'ADMIN' && window === 'appointments' && <Appointments />}
        </Layout>
    )
}

const Layout = styled.div<{ $collapsed: boolean }>`
    color: ${(props) => props.theme.main};
    width: 100%;

    @media ${device.mobileS} {
        display: ${(props) => (props.$collapsed ? '' : 'none')};
        padding: 10px 16px;
    }

    @media ${device.tablet} {
        display: block;
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
