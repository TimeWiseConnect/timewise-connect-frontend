import React from 'react'
import { styled } from 'styled-components'
import { areDatesEqual, formatDateWord, getTimeFromDate, isTimeEqual } from '../../utils/dateTimeUtils'
import { useStore } from 'effector-react'
import { $calendarStore, SwitcherType, chooseDate } from '../../store/calendar'
import { device } from '../../styles/const'
import { $eventStore } from '../../store/events'
import { $authStore } from '../../store/auth'
import { FormButton } from '../../styles/FormButton'
import { setId } from '../../store/form'
import { InvisibleButton } from '../../styles/InvisibleButton'
import { Trash } from '../shared/icons/admin/Trash'
import Modal from '../shared/Modal'
import { AddWindow } from '../Admin/AddWindow'
import { setDeleteWindowOpen } from '../../store/deleteWindow'
import { setClearAppointmentOpen } from '../../store/clearAppointment'
import { DeleteWindow } from '../Admin/Modals/DeleteWindow'
import { ClearAppointment } from '../Admin/Modals/ClearAppointment'
import { $addWindowStore, setAddWindowOpen } from '../../store/addWindow'

export const TimeSelector = () => {
    const { choosenDate, view } = useStore($calendarStore)
    const { events } = useStore($eventStore)
    const { currentUser, role } = useStore($authStore)
    const { action, date, time, open } = useStore($addWindowStore)

    const currentEvents = events
        .filter((event) => areDatesEqual(event.dateTime, choosenDate))
        .sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime())

    return (
        <Layout $view={view}>
            <Header $view={view}>{formatDateWord(choosenDate)}</Header>
            <Appointments $view={view}>
                {currentEvents.length === 0 ? (
                    <NoAppointmentsText>
                        В{'\u00A0'}данный момент окон для{'\u00A0'}записи нет
                    </NoAppointmentsText>
                ) : (
                    currentEvents.map((appointment) => {
                        const date = new Date(appointment.dateTime)
                        const isChecked = isTimeEqual(choosenDate, date)
                        return (
                            <Time $view={view} key={appointment.dateTime.toISOString()}>
                                <SwitchButton
                                    $view={view}
                                    disabled={!appointment.isAvailable}
                                    $hasAppointment={!!appointment.userId && appointment.userId === currentUser?.id}
                                    onChange={() => {
                                        if (role !== 'ADMIN') chooseDate(date)
                                        setId(appointment.id)
                                    }}
                                    id={date.toISOString()}
                                    type="radio"
                                    checked={isChecked}
                                />
                                <Label $admin={role === 'ADMIN'} htmlFor={date.toISOString()}>
                                    <AppointmentInfo>
                                        {getTimeFromDate(new Date(appointment.dateTime))}
                                        {!!appointment.userId && appointment.userId === currentUser?.id && (
                                            <Text>вы записаны</Text>
                                        )}
                                    </AppointmentInfo>
                                    {!appointment.isAvailable &&
                                        (role === 'ADMIN' ||
                                            (!!appointment.userId && appointment.userId === currentUser?.id)) && (
                                            <>
                                                <InvisibleButton
                                                    onClick={(event) => {
                                                        event.currentTarget.blur()
                                                        if (appointment.isAvailable && role === 'ADMIN') {
                                                            setDeleteWindowOpen(true)
                                                        } else {
                                                            setClearAppointmentOpen(true)
                                                        }
                                                    }}
                                                >
                                                    <Trash />
                                                </InvisibleButton>
                                                {<ClearAppointment eventId={appointment.id} />}
                                                {role === 'ADMIN' && <DeleteWindow eventId={appointment.id} />}
                                            </>
                                        )}
                                </Label>
                            </Time>
                        )
                    })
                )}
            </Appointments>
            {role === 'ADMIN' && (
                <>
                    <AddTimeButton onClick={() => setAddWindowOpen(true)}>Добавить время</AddTimeButton>
                    <Modal
                        title="Добавить окно для записи"
                        isOpen={open}
                        setIsOpen={setAddWindowOpen}
                        agree="Создать запись"
                        disagree="Отмена"
                        action={() => {
                            action(date, time)
                        }}
                    >
                        <AddWindow />
                    </Modal>
                </>
            )}
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
        width: ${(props) => (props.$view === 'week' ? 'calc(100% / 2)' : 'calc((100% - 16px) / 4)')};
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

const AppointmentInfo = styled.div`
    display: flex;
    align-items: end;

    @media ${device.mobileS} {
        gap: 5px;
        font-size: 14px;
    }

    @media ${device.laptop} {
        font-size: 20px;
        gap: 10px;
    }
`

type RoleProps = { $admin: boolean }

const Label = styled.label<RoleProps>`
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: ${(props) => (props.$admin ? '' : 'pointer')};
    margin: 1px;

    @media ${device.mobileS} {
        padding: 22px 15px;
    }

    @media ${device.tablet} {
        padding: 20px;
    }

    @media ${device.laptop} {
        padding: 30px 20px;
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
        outline: 1px solid ${(props) => props.theme.disable};
    }

    ${(props) =>
        props.$hasAppointment
            ? `& + ${Label} {
                            color: ${props.theme.accent1} !important;
                            outline: 1px solid  ${props.theme.accent1} !important;
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

const AddTimeButton = styled(FormButton)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`
