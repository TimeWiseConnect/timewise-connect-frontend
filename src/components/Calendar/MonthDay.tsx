import React from 'react'
import { styled } from 'styled-components'
import { areDatesEqual, formatDateNumber } from '../../utils/dateTimeUtils'
import { $calendarStore, chooseDate } from '../../store/calendar'
import { useStore } from 'effector-react'

type Props = {
    date: Date
}

export const Day = ({ date }: Props) => {
    const { choosenDate } = useStore($calendarStore)
    const isChecked = areDatesEqual(choosenDate, date)
    const dateString = formatDateNumber(date)
    const dateNumbers = dateString.split('.')
    const yesterday = new Date()
    yesterday.setDate(new Date().getDate() - 1)
    return (
        <Layout $isChecked={isChecked}>
            <SwitchButton
                disabled={date.getTime() < yesterday.getTime()}
                onChange={() => chooseDate(date)}
                id={date.toISOString()}
                type="radio"
                checked={isChecked}
            />
            <Label $isChecked={isChecked} htmlFor={date.toISOString()}>
                <Upper>
                    {dateNumbers[0]}
                    <Month>.{dateNumbers[1]}</Month>
                </Upper>
                <Lower>
                    <Text>3 окна</Text>
                </Lower>
            </Label>
        </Layout>
    )
}

type LayoutProps = {
    $isChecked: boolean
}

const Layout = styled.div<LayoutProps>`
    display: flex;
    flex-direction: column;
    justify-content: start;
    border-bottom: 1px solid ${(props) => props.theme.accent2};
    border-right: 1px solid ${(props) => props.theme.accent2};
    background-color: ${(props) => props.theme.bg};

    ${(props) =>
        props.$isChecked ? `z-index: 50; outline: 2px solid ${props.theme.accent2}; border: none !important;` : ``};

    transition: 300ms background-color;
`

const Label = styled.label<LayoutProps>`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: transparent;
    outline: none;
    border: none;
    cursor: pointer;
    width: 100%;
    height: 149px;
    font-size: 20px;
    ${(props) => (props.$isChecked ? `padding: 10px;` : `padding: 40px 20px;`)};
    transition: 300ms all;
`

const Month = styled.span`
    font-size: 14px;
`

const Upper = styled.span``

const Lower = styled.span`
    display: flex;
    justify-content: end;
    align-items: end;
`

const SwitchButton = styled.input`
    visibility: hidden;
    height: 0;
    width: 0;
`
const Text = styled.p`
    font-size: 13px;
`
