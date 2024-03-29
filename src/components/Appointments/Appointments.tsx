import { useStore } from 'effector-react'
import React from 'react'
import { styled } from 'styled-components'
import { $eventStore } from '../../store/events'
import { formatDateWord, getTimeFromDate } from '../../utils/dateTimeUtils'
import { Trash } from '../shared/icons/admin/Trash'
import { InvisibleButton } from '../../styles/InvisibleButton'
import { setDeleteWindowOpen } from '../../store/deleteWindow'
import { setClearAppointmentId, setClearAppointmentOpen } from '../../store/clearAppointment'
import { ClearAppointment } from '../Admin/Modals/ClearAppointment'

export const Appointments = () => {
    const { events } = useStore($eventStore)

    return (
        <Layout>
            {<ClearAppointment />}
            <TableHeaderRow>
                <TableHeader>Дата</TableHeader>
                <TableHeader>Имя родителя</TableHeader>
                <TableHeader>Имя ребёнка</TableHeader>
                <TableHeader>Класс</TableHeader>
                <TableHeader>Запрос</TableHeader>
                <TableHeader>Комментарий</TableHeader>
                <TableHeader>Телефон</TableHeader>
                <TableHeader>Способ связи</TableHeader>
                <TableHeader>Заметка</TableHeader>
            </TableHeaderRow>
            {events.length !== 0 ? (
                events
                    .filter((event) => !event.isAvailable)
                    .map((event) => {
                        const connections = []
                        event.call && connections.push('звонок')
                        event.sms && connections.push('СМС')
                        event.messenger && connections.push('мессенджер')
                        return (
                            <TableRow key={event.id}>
                                <TableCell>
                                    {formatDateWord(event.dateTime)}, {getTimeFromDate(event.dateTime)}
                                </TableCell>
                                <TableCell>{event?.childName ? event.name : '-'}</TableCell>
                                <TableCell>{event?.childName ? event.childName : event.name}</TableCell>
                                <TableCell>
                                    {event.grade}
                                    {event.disability && ' с ОВЗ'}
                                </TableCell>
                                <TableCell>{event.request}</TableCell>
                                <TableCell>{event.comment}</TableCell>
                                <TableCell>+7{event.phone}</TableCell>
                                <TableCell>{connections.join(', ')}</TableCell>
                                <TableCell>
                                    <TableHeader>В разработке</TableHeader>
                                </TableCell>
                                <InvisibleButton
                                    onClick={(e) => {
                                        e.currentTarget.blur()
                                        if (event.isAvailable) {
                                            setDeleteWindowOpen(true)
                                        } else {
                                            setClearAppointmentOpen(true)
                                            setClearAppointmentId(event.id)
                                        }
                                    }}
                                >
                                    <Trash />
                                </InvisibleButton>
                            </TableRow>
                        )
                    })
            ) : (
                <></>
            )}
        </Layout>
    )
}

const Layout = styled.div`
    width: 100%;
`

const TableHeaderRow = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: repeat(3, 3fr) 2fr repeat(2, 5fr) repeat(2, 3fr) 6fr 20px;
    padding-bottom: 3px;
    margin-bottom: 20px;
    gap: 5px;
`

const TableRow = styled(TableHeaderRow)`
    min-height: 50px;
    padding-bottom: 0;
`

const TableHeader = styled.h3`
    font-size: 14px;
    font-weight: 400;
    line-height: 130%;
    color: ${(props) => props.theme.gray};
`

const TableCell = styled.div`
    padding: 16px 0px;
    font-size: 14px;
    line-height: 130%;
    white-space: normal;
    word-wrap: break-word;
    overflow: hidden;
`
