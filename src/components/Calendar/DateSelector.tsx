import React from 'react'
import WeekView from './WeekView'
import { useStore } from 'effector-react'
import { $calendarStore } from '../../store/calendar'

export const DateSelector = () => {
    const { view } = useStore($calendarStore)

    return <div>{view === 'week' ? <WeekView /> : <></>}</div>
}
