import React from 'react'
import { styled } from 'styled-components'
import { Check } from './icons/Check'
import { device } from '../../styles/const'

type Props = {
    checked: boolean
}

export const CheckButton = ({ checked }: Props) => {
    return <Circle $checked={checked}>{checked && <Check />}</Circle>
}

type StyleProps = {
    $checked: boolean
}

const Circle = styled.div<StyleProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 23px;
    height: 23px;
    border-radius: 50%;
    border: 1px solid ${(props) => props.theme.lightGray};
    ${(props) => (props.$checked ? `border: none; background-color: ${props.theme.accent1};` : ``)}

    @media ${device.mobileS} {
        transform: scale(0.7);
    }

    @media ${device.laptop} {
        transform: scale(1);
    }
`
