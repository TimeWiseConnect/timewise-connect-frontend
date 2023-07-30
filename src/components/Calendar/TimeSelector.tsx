import React from 'react'
import { styled } from 'styled-components'
import { formatDateWord, getTimeFromDate, isTimeEqual } from '../../utils/dateTimeUtils'
import { useStore } from 'effector-react'
import { $calendarStore, SwitcherType, chooseDate } from '../../store/calendar'
import { device } from '../../styles/const'

type Appointment = {
    dateTime: string
    isAvailable: boolean
    hasAppointment: boolean
}

const appointments: Appointment[] = [
    {
        dateTime: '2023-07-31T12:00:00.000Z',
        isAvailable: true,
        hasAppointment: false,
    },
    {
        dateTime: '2023-07-31T13:00:00.000Z',
        isAvailable: false,
        hasAppointment: false,
    },
    {
        dateTime: '2023-07-31T14:00:00.000Z',
        isAvailable: false,
        hasAppointment: true,
    },
    {
        dateTime: '2023-07-31T15:00:00.000Z',
        isAvailable: true,
        hasAppointment: false,
    },
]

export const TimeSelector = () => {
    const { choosenDate, view } = useStore($calendarStore)

    return (
        <Layout $view={view}>
            <Header $view={view}>{formatDateWord(choosenDate)}</Header>
            <Appointments $view={view}>
                {appointments.length === 0 ? (
                    <NoAppointmentsText>
                        В{'\u00A0'}данный момент окон для{'\u00A0'}записи нет
                    </NoAppointmentsText>
                ) : (
                    appointments.map((appointment) => {
                        const date = new Date(appointment.dateTime)
                        const isChecked = isTimeEqual(choosenDate, date)
                        return (
                            <Time $view={view} key={appointment.dateTime}>
                                <SwitchButton
                                    $view={view}
                                    disabled={!appointment.isAvailable}
                                    $hasAppointment={appointment.hasAppointment}
                                    onChange={() => chooseDate(date)}
                                    id={date.toISOString()}
                                    type="radio"
                                    checked={isChecked}
                                />
                                <Label htmlFor={date.toISOString()}>
                                    {getTimeFromDate(new Date(appointment.dateTime))}
                                    {appointment.hasAppointment && <Text>вы записаны</Text>}
                                </Label>
                            </Time>
                        )
                    })
                )}
            </Appointments>
        </Layout>
    )
}

type Props = {
    $view: SwitcherType
}
const Layout = styled.div<Props>`
    display: flex;
    flex-direction: column;

    @media ${device.mobileS} {
        ${(props) => (props.$view === 'week' ? '' : 'margin-top: 20px;')}
        width: ${(props) => (props.$view === 'week' ? 'calc((100% - 16px) / 2)' : '100%')};
    }

    @media ${device.tablet} {
        margin-top: 0;
        width: calc(100% / 4);
    }

    @media ${device.laptop} {
        width: calc(100% / 5);
    }

    @media ${device.laptopL} {
    }

    @media ${device.desktop} {
    }
`

const Header = styled.h2<Props>`
    border-bottom: solid 1px ${(props) => props.theme.lightGray};
    color: ${(props) => props.theme.accent2};
    font-weight: 400;

    @media ${device.mobileS} {
        width: ${(props) => (props.$view === 'week' ? '100%' : 'calc((100% - 16px) / 2)')};
        font-size: 14px;
        padding-left: 7px;
        padding-bottom: 9px;
    }

    @media ${device.tablet} {
        width: 100%;
        font-size: 16px;
        padding-left: 10px;
        padding-bottom: 7px;
    }

    @media ${device.laptop} {
        font-size: 20px;
        padding-bottom: 8px;
    }

    @media ${device.laptopL} {
    }

    @media ${device.desktop} {
    }
`

interface TimeProps extends Props {
    $hasAppointment: boolean
}

const Text = styled.p`
    @media ${device.mobileS} {
        font-size: 9px;
    }
    @media ${device.mobileM} {
        font-size: 10px;
    }

    @media ${device.laptop} {
        font-size: 13px;
    }
`

const NoAppointmentsText = styled.p`
    @media ${device.mobileS} {
        font-size: 12px;
        line-height: 140%;
        padding: 9px 7px;
    }

    @media ${device.tablet} {
        line-height: 130%;
        padding: 20px 15px;
    }

    @media ${device.laptop} {
        font-size: 16px;
    }
`

const Label = styled.label`
    width: 100%;
    position: relative;
    display: flex;
    align-items: end;
    cursor: pointer;
    margin: 1px;

    @media ${device.mobileS} {
        padding: 22px 15px;
        gap: 5px;
        font-size: 14px;
    }

    @media ${device.tablet} {
        padding: 20px;
        font-size: 16px;
    }

    @media ${device.laptop} {
        padding: 30px 20px;
        font-size: 20px;
        gap: 10px;
    }
`

const SwitchButton = styled.input<TimeProps>`
    visibility: hidden;
    height: 0;
    width: 0;

    &:disabled + ${Label} {
        background-color: ${(props) => props.theme.disable};
        color: ${(props) => props.theme.gray};
        cursor: default;
    }

    ${(props) =>
        props.$hasAppointment
            ? `& + ${Label} {
                            color: ${props.theme.accent1} !important;
                            outline: 1px solid  ${props.theme.accent1};
                            background-color: transparent !important;
                            }
                            `
            : ''}

    &:checked + ${Label} {
        outline: 1px solid ${(props) => props.theme.accent2};
        z-index: 5;
    }
`

const Time = styled.div<Props>`
    display: flex;
    position: relative;

    @media ${device.mobileS} {
        height: 60px;
        width: ${(props) => (props.$view === 'week' ? '100%' : 'calc((100% - 16px) / 2)')};
    }

    @media ${device.tablet} {
        width: 100%;
    }

    @media ${device.laptop} {
        height: 84px;
    }
`

const Appointments = styled.div<Props>`
    width: 100%;

    @media ${device.mobileS} {
        ${(props) =>
            props.$view === 'week'
                ? ''
                : `display: flex; 
    flex-wrap: wrap;
    column-gap: 16px;`}
    }

    @media ${device.tablet} {
        display: block;
        width: 100%;
    }
`
