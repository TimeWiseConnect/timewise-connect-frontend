import React from 'react'
import { styled } from 'styled-components'
import { areDatesEqual, formatDateWord } from '../../utils/dateTimeUtils'
import { $calendarStore, chooseDate } from '../../store/calendar'
import { useStore } from 'effector-react'
import { device } from '../../styles/const'

type Props = {
    date: Date
}

export const Day = ({ date }: Props) => {
    const { choosenDate } = useStore($calendarStore)
    const isChecked = areDatesEqual(choosenDate, date)
    return (
        <Layout $isChecked={isChecked}>
            <SwitchButton onChange={() => chooseDate(date)} id={date.toISOString()} type="radio" checked={isChecked} />
            <Label htmlFor={date.toISOString()}>
                {formatDateWord(date)} <Text>3 окна</Text>
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
            ? ` border-radius: 2px; outline :  2px solid ${props.theme.accent2}; border-bottom: none !important;`
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
