import { useStore } from 'effector-react'
import React from 'react'
import { $formStore, setPhase } from '../../store/form'
import { styled } from 'styled-components'
import { device } from '../../styles/const'

export const ProgressBar = () => {
    const { phase, availablePhase } = useStore($formStore)

    return (
        <Layout>
            <Circle onClick={() => setPhase(1)} $done={phase > 1} $active={phase === 1} />
            <Line />
            <Circle disabled={availablePhase < 2} onClick={() => setPhase(2)} $done={phase > 2} $active={phase === 2} />
            <Line />
            <Circle disabled={availablePhase < 3} onClick={() => setPhase(3)} $done={phase > 3} $active={phase === 3} />
        </Layout>
    )
}

type Props = {
    $active: boolean
    $done: boolean
}

const Circle = styled.button<Props>`
    cursor: pointer;
    background-color: transparent;
    border-radius: 50%;
    border: ${(props) => (props.$active ? `1px solid ${props.theme.gray}` : `1px dashed ${props.theme.gray}`)};
    ${(props) =>
        props.$done
            ? `
        background-color: ${props.theme.accent2};
        border: none;
    `
            : ``}

    &:disabled {
        cursor: default;
    }

    @media ${device.mobileS} {
        min-width: 11px;
        min-height: 11px;
    }

    @media ${device.laptop} {
        min-width: 16px;
        min-height: 16px;
    }
`
const Line = styled.div`
    width: 48px;
    border: 1px solid ${(props) => props.theme.gray};
`

const Layout = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 11px;
    gap: 7px;

    @media ${device.mobileS} {
        margin-bottom: 40px;
    }

    @media ${device.laptop} {
        margin-bottom: 74px;
    }
`
