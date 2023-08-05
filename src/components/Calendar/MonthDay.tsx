import React from 'react'
import { styled } from 'styled-components'
import { areDatesEqual, formatDateNumber } from '../../utils/dateTimeUtils'
import { $calendarStore, chooseDate } from '../../store/calendar'
import { useStore } from 'effector-react'
import { device } from '../../styles/const'
import { $eventStore } from '../../store/events'

type Props = {
    date: Date
}

export const Day = ({ date }: Props) => {
    const { choosenDate } = useStore($calendarStore)
    const { events } = useStore($eventStore)
    const isChecked = areDatesEqual(choosenDate, date)
    const dateString = formatDateNumber(date)
    const dateNumbers = dateString.split('.')
    const yesterday = new Date()
    yesterday.setDate(new Date().getDate() - 1)

    const windows = events.filter((event) => areDatesEqual(event.dateTime, date)).length
    const lastDigit = windows % 10
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
                    {!!windows &&
                        ((lastDigit === 1 && <Text>{windows} окно</Text>) ||
                            (lastDigit > 1 && lastDigit < 5 && <Text>{windows} окна</Text>) ||
                            (lastDigit > 4 && <Text>{windows} окна</Text>))}
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
    background-color: ${(props) => props.theme.bg};
`

const Label = styled.label<LayoutProps>`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    outline: none;
    border: none;
    cursor: pointer;
    width: 100%;
    height: 100%;
    user-select: none;
    transition: 200ms all;
    outline: 1px solid ${(props) => props.theme.accent2}50;
    @media ${device.mobileS} {
        font-size: 12px;
        ${(props) => (props.$isChecked ? `padding: 10px;` : `padding: 13px 10px;`)};
    }

    @media ${device.tablet} {
        font-size: 16px;
        ${(props) => (props.$isChecked ? `padding: 10px;` : `padding: 14px;`)};
    }

    @media ${device.laptop} {
        font-size: 20px;
        ${(props) => (props.$isChecked ? `padding: 10px;` : `padding: 40px 20px;`)};
    }

    @media ${device.laptopL} {
        ${(props) => (props.$isChecked ? `padding: 10px;` : `padding: 40px 20px;`)};
    }
`

const Month = styled.span`
    @media ${device.mobileS} {
        font-size: 8px;
    }

    @media ${device.tablet} {
        font-size: 12px;
    }

    @media ${device.laptop} {
        font-size: 13px;
    }

    @media ${device.laptopL} {
        font-size: 14px;
    }
`

const Upper = styled.span`
    display: flex;
    @media ${device.mobileS} {
        justify-content: center;
        align-items: end;
    }

    @media ${device.tablet} {
        justify-content: start;
    }
`

const Lower = styled.span`
    display: flex;
    @media ${device.mobileS} {
        justify-content: center;
        align-items: end;
    }

    @media ${device.tablet} {
        justify-content: end;
    }
`

const SwitchButton = styled.input`
    visibility: hidden;
    height: 0;
    width: 0;
    z-index: 1;

    &:checked + ${Label} {
        outline: 1px solid ${(props) => props.theme.accent2};
        z-index: 2;
        background-color: ${(props) => props.theme.bg};
    }

    &:checked + ${Label} > ${Upper} {
        justify-content: start;
    }

    &:checked + ${Label} > ${Lower} {
        justify-content: end;
        align-items: end;
    }

    &:disabled + ${Label} {
        background-color: ${(props) => props.theme.disable};
        color: ${(props) => props.theme.gray};
        outline: none;
        border: none !important;
        cursor: default;
    }

    &:disabled + ${Layout} {
        outline: none;
    }
`

const Text = styled.p`
    @media ${device.mobileS} {
        font-size: 6px;
    }

    @media ${device.mobileM} {
        font-size: 8px;
    }

    @media ${device.tablet} {
        font-size: 10px;
    }

    @media ${device.laptop} {
        font-size: 13px;
    }
`
