import React from 'react'
import { styled } from 'styled-components'
import { areDatesEqual, formatDateWord } from '../../utils/dateTimeUtils'
import { $calendarStore, chooseDate } from '../../store/calendar'
import { useStore } from 'effector-react'
import { device } from '../../styles/const'
import { $eventStore } from '../../store/events'

type Props = {
    date: Date
}

const weekDays = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']

export const Day = ({ date }: Props) => {
    const { choosenDate } = useStore($calendarStore)
    const isChecked = areDatesEqual(choosenDate, date)
    const { events } = useStore($eventStore)

    const windows = events.filter((event) => areDatesEqual(event.dateTime, date)).length
    const lastDigit = windows % 10

    return (
        <Layout $isChecked={isChecked}>
            <SwitchButton onChange={() => chooseDate(date)} id={date.toISOString()} type="radio" checked={isChecked} />
            <Label htmlFor={date.toISOString()}>
                <Row>
                    {formatDateWord(date)} <WeekDay>{weekDays[date.getDay()]}</WeekDay>
                </Row>
                {!!windows &&
                    ((lastDigit === 1 && <Text>{windows} окно</Text>) ||
                        (lastDigit > 1 && lastDigit < 5 && <Text>{windows} окна</Text>) ||
                        (lastDigit > 4 && <Text>{windows} окон</Text>))}
            </Label>
        </Layout>
    )
}

type LayoutProps = {
    $isChecked: boolean
}

const Layout = styled.div<LayoutProps>`
    ${(props) =>
        props.$isChecked
            ? `border-radius: 1px; outline :  1px solid ${props.theme.accent2}; border-bottom: none !important;`
            : ''}
    display: flex;
    width: 100%;

    @media ${device.mobileS} {
        height: 50px;
    }

    @media ${device.tablet} {
        height: 66px;
    }

    @media ${device.laptop} {
        height: 84px;
    }
`

const Label = styled.label`
    background-color: transparent;
    outline: none;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    user-select: none;

    &:hover {
        outline: 1px solid ${(props) => props.theme.accent2}99;
    }

    @media ${device.mobileS} {
        font-size: 12px;
        padding: 16px 20px;
    }

    @media ${device.tablet} {
        font-size: 16px;
        padding: 24px 20px;
    }

    @media ${device.laptop} {
        font-size: 20px;
        padding: 30px 20px;
    }
`
const SwitchButton = styled.input`
    visibility: hidden;
    height: 0;
    width: 0;
`
const Text = styled.p`
    @media ${device.mobileS} {
        font-size: 8px;
    }

    @media ${device.tablet} {
        font-size: 11px;
    }

    @media ${device.laptop} {
        font-size: 13px;
    }
`

const WeekDay = styled.div`
    color: ${(props) => props.theme.gray};
    font-size: 13px;
`

const Row = styled.div`
    display: flex;
    gap: 5px;
    align-items: end;
`
