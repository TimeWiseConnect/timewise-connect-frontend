import React from 'react'

type Props = {
    dateTime: Date
}

const WeekView = (props: Props) => {
    return <div>WeekView{+props.dateTime}</div>
}

export default WeekView
