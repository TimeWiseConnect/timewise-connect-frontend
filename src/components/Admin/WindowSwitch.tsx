import React from 'react'
import { styled } from 'styled-components'
import { device } from '../../styles/const'
import { useStore } from 'effector-react'
import { $windowStore, setWindow } from '../../store/window'

export const WindowSwitch = () => {
    const window = useStore($windowStore)

    return (
        <Layout>
            <Switch>
                <Input
                    checked={window === 'management'}
                    type="radio"
                    id="management"
                    onChange={() => setWindow('management')}
                />
                <Label htmlFor="management">Управление окнами</Label>
            </Switch>
            <Switch>
                <Input
                    checked={window === 'appointments'}
                    type="radio"
                    id="appointments"
                    onChange={() => setWindow('appointments')}
                />
                <Label htmlFor="appointments">Записи</Label>
            </Switch>
        </Layout>
    )
}

const Layout = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 40px;
    color: ${(props) => props.theme.accent2};
`

const Switch = styled.div``

const Label = styled.label`
    padding: 0px 10px 6px 10px;
    cursor: pointer;
    @media ${device.mobileS} {
        font-size: 14px;
    }

    @media ${device.laptop} {
        font-size: 16px;
        line-height: 130%;
    }
`

const Input = styled.input`
    visibility: hidden;
    height: 0;
    width: 0;
    z-index: 1;

    &:checked + ${Label} {
        border-bottom: 1px solid ${(props) => props.theme.accent2};
    }
`
