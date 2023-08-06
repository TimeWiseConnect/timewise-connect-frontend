import React, { useEffect } from 'react'
import { styled } from 'styled-components'
import { device } from '../styles/const'
import { useStore } from 'effector-react'
import { $authStore } from '../store/auth'
import { WindowSwitch } from '../components/Admin/WindowSwitch'
import { $windowStore } from '../store/window'
import { Calendar } from '../components/Calendar/Calendar'
import { Appointments } from '../components/Appointments/Appointments'
import { fetchEventsFx } from '../api/events/fetchEvents'

export const Main = () => {
    const { role } = useStore($authStore)
    const window = useStore($windowStore)

    useEffect(() => {
        fetchEventsFx()
    }, [])

    return (
        <Layout>
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
