import React from 'react'
import { ViewSelector } from '../components/Calendar/ViewSelector'
import { styled } from 'styled-components'
import { DateSelector } from '../components/Calendar/DateSelector'

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
    padding-top: 40px;
    padding-left: 100px;
    color: ${(props) => props.theme.main};
`

const Header = styled.h1`
    color: ${(props) => props.theme.main};
    font-size: 26px;
    margin-bottom: 40px;
`
