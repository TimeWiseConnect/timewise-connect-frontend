import { useStore } from 'effector-react'
import React from 'react'
import { styled } from 'styled-components'
import { $addWindowStore, setDate, setTime } from '../../store/addWindow'

export const AddWindow = () => {
    const { date, time } = useStore($addWindowStore)
    return (
        <Layout>
            <Column>
                Дата занятия <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </Column>
            <Column>
                Время начала занятия
                <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </Column>
        </Layout>
    )
}

const Layout = styled.div`
    display: flex;
    justify-content: space-between;
`

const Column = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const Input = styled.input`
    border: 1px solid ${(props) => props.theme.lightGray};
    display: flex;
    justify-content: center;
    border-radius: 5px;
    height: 47px;
    font-size: 14px;
    line-height: 130%;
    padding: 14px 20px;
`
