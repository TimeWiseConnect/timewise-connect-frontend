import { useStore } from 'effector-react'
import React from 'react'
import { styled } from 'styled-components'
import { $calendarStore, changeView } from '../../store/calendar'

export const ViewSelector = () => {
    const { view } = useStore($calendarStore)
    return (
        <Layout>
            <div>
                <SwitchButton onChange={() => changeView('week')} id="week" type="radio" checked={view === 'week'} />
                <Label htmlFor="week">Неделя</Label>
                <SwitchButton onChange={() => changeView('month')} id="month" type="radio" checked={view === 'month'} />
                <Label htmlFor="month">Месяц</Label>
            </div>
            <ReturnButton>30</ReturnButton>
        </Layout>
    )
}

const Layout = styled.div`
    display: flex;
    justify-content: space-between;
    width: 229px;
    margin-bottom: 20px;
`

const Label = styled.label`
    font-size: 13px;
    padding: 6px 12px;
    background-color: transparent;
    outline: none;
    border: none;
    border-radius: 17px;
    cursor: pointer;
`
const SwitchButton = styled.input`
    visibility: hidden;
    height: 0;
    width: 0;

    &:checked + ${Label} {
        background-color: ${(props) => props.theme.accent1};
        color: ${(props) => props.theme.contrast};
    }
`

const ReturnButton = styled.button`
    font-size: 13px;
    padding: 5px;
    background-color: transparent;
    color: ${(props) => props.theme.main};
    border: 1px solid ${(props) => props.theme.main};
    cursor: pointer;
`
