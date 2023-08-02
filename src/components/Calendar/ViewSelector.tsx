import { useStore } from 'effector-react'
import React from 'react'
import { styled } from 'styled-components'
import { $calendarStore, changeView, chooseDate } from '../../store/calendar'
import { device } from '../../styles/const'

export const ViewSelector = () => {
    const { view } = useStore($calendarStore)
    return (
        <Layout $week={view === 'week'}>
            <div>
                <SwitchButton onChange={() => changeView('week')} id="week" type="radio" checked={view === 'week'} />
                <Label htmlFor="week">Неделя</Label>
                <SwitchButton onChange={() => changeView('month')} id="month" type="radio" checked={view === 'month'} />
                <Label htmlFor="month">Месяц</Label>
            </div>
            <ReturnButton
                onClick={() => {
                    chooseDate(new Date())
                }}
            >
                {new Date().getDate()}
            </ReturnButton>
        </Layout>
    )
}

type Props = {
    $week: boolean
}

const Layout = styled.div<Props>`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    transition: 300ms all;

    @media ${device.mobileS} {
        width: ${(props) => (props.$week ? 'calc((100% - 16px) / 2)' : '100%')};
        margin-bottom: 16px;
    }

    @media ${device.tablet} {
        width: ${(props) => (props.$week ? 'calc(100% / 4)' : 'calc((100% - 16px) * 3 / 4)')};
    }

    @media ${device.laptop} {
        width: ${(props) => (props.$week ? 'calc(100% / 5)' : '200px')};
        margin-bottom: 20px;
    }

    @media ${device.laptopL} {
        width: ${(props) => (props.$week ? 'calc(100% / 7)' : '200px')};
    }

    @media ${device.desktop} {
        width: ${(props) => (props.$week ? 'calc(100% / 7)' : '200px')};
    }
`

const Label = styled.label`
    background-color: transparent;
    outline: none;
    border: none;
    border-radius: 17px;
    cursor: pointer;

    @media ${device.mobileS} {
        font-size: 10px;
        padding: 3px 10px;
    }

    @media ${device.tablet} {
        font-size: 11px;
    }

    @media ${device.laptop} {
        font-size: 13px;
        padding: 6px 12px;
    }
`

const SwitchButton = styled.input`
    visibility: hidden;
    height: 0;
    width: 0;

    &:checked + ${Label} {
        background-color: ${(props) => props.theme.accent1};
        color: ${(props) => props.theme.contrast};
    }
`

const ReturnButton = styled.button`
    background-color: transparent;
    color: ${(props) => props.theme.main};
    border: 1px solid ${(props) => props.theme.main};
    cursor: pointer;

    @media ${device.mobileS} {
        font-size: 10px;
        padding: 3px;
    }

    @media ${device.tablet} {
        font-size: 11px;
    }

    @media ${device.laptop} {
        font-size: 13px;
        padding: 5px;
    }
`
