import React from 'react'
import { ViewSelector } from '../components/Calendar/ViewSelector'
import { styled } from 'styled-components'
import { DateSelector } from '../components/Calendar/DateSelector'
import { device } from '../styles/const'

export const Calendar = () => {
    return (
        <Layout>
            <Header>Для записи к педагогу выберите дату и время</Header>
            <ViewSelector />
            <DateSelector />
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
